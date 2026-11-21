import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9260 + Math.floor(Math.random() * 20)
const BASE_URL = 'http://localhost:3000'
const ARTIFACT_DIR = 'C:/Users/fauza/.gemini/antigravity/brain/804d6308-88df-4ee3-8f72-65699ae69e26'

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.ws = null
    this.id = 1
    this.pending = new Map()
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl)
      this.ws.onopen = () => resolve()
      this.ws.onerror = (err) => reject(err)
      this.ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data)
          if (data.id && this.pending.has(data.id)) {
            const { resolve, reject } = this.pending.get(data.id)
            this.pending.delete(data.id)
            if (data.error) reject(new Error(data.error.message))
            else resolve(data.result)
          }
        } catch (e) {
          console.error('WS Parse Error', e)
        }
      }
    })
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++
      this.pending.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  async evaluate(expression) {
    try {
      const res = await this.send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      })
      return res.result?.value
    } catch (e) {
      return null
    }
  }

  close() {
    if (this.ws) this.ws.close()
  }
}

async function run() {
  const tmpProfile = path.join(os.tmpdir(), 'chrome-capture-clean-' + Date.now())
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmpProfile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--no-sandbox',
  ])

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 300))
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (res.ok) break
    } catch {}
  }

  const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/version`)
  const versionData = await versionRes.json()
  const cdp = new CDPClient(versionData.webSocketDebuggerUrl)
  await cdp.connect()

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const targetRes = await fetch(`http://127.0.0.1:${PORT}/json`)
  const targets = await targetRes.json()
  const pageTarget = targets.find((t) => t.id === targetId)

  const pageCdp = new CDPClient(pageTarget.webSocketDebuggerUrl)
  await pageCdp.connect()

  await pageCdp.send('Page.enable')
  await pageCdp.send('DOM.enable')
  await pageCdp.send('Runtime.enable')

  async function loadAndSettle(width, mobile = false) {
    await pageCdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile,
    })
    await pageCdp.send('Page.navigate', { url: BASE_URL })
    
    // Wait for Next.js streaming loading spinner to finish and footer to appear
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 400))
      const ready = await pageCdp.evaluate(`
        Boolean(!document.querySelector('div[role="status"]') && document.querySelector('footer') && document.querySelector('h2'))
      `)
      if (ready) break
    }
    // Extra settle time for Leaflet map tiles and images
    await new Promise((r) => setTimeout(r, 1500))

    const height = await pageCdp.evaluate(`
      Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0
      )
    `)

    await pageCdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: Math.max(height, 900),
      deviceScaleFactor: 1,
      mobile,
    })
    await new Promise((r) => setTimeout(r, 400))
    return Math.max(height, 900)
  }

  // 1. Desktop 1440
  console.log('--- Capturing Desktop 1440 ---')
  const h1440 = await loadAndSettle(1440, false)
  const shot1440 = await pageCdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_1440_full.png'), Buffer.from(shot1440.data, 'base64'))
  console.log(`Saved g3_1440_full.png (${1440}x${h1440})`)

  // Crop Footer at 1440
  const fRect = await pageCdp.evaluate(`
    (() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return { x: r.left, y: r.top + window.scrollY, width: r.width, height: r.height, scale: 1 };
    })()
  `)
  if (fRect) {
    console.log('Footer height at 1440:', fRect.height)
    const shotF = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: fRect, captureBeyondViewport: true })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_footer_1440.png'), Buffer.from(shotF.data, 'base64'))
    console.log('Saved g3_footer_1440.png')
  }

  // Crop Baris 1 & 2 at 1440
  const bRect = await pageCdp.evaluate(`
    (() => {
      const s1 = document.querySelector('section[aria-label="Informasi Utama Desa"]');
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!s1 || !s2) return null;
      const r1 = s1.getBoundingClientRect();
      const r2 = s2.getBoundingClientRect();
      return {
        x: Math.min(r1.left, r2.left) - 4,
        y: Math.min(r1.top, r2.top) + window.scrollY - 4,
        width: Math.max(r1.width, r2.width) + 8,
        height: (r2.bottom - r1.top) + 8,
        scale: 1
      };
    })()
  `)
  if (bRect) {
    const shotB = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: bRect, captureBeyondViewport: true })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_baris1_2_1440.png'), Buffer.from(shotB.data, 'base64'))
    console.log('Saved g3_baris1_2_1440.png')
  }

  // 2. Tablet 1024
  console.log('--- Capturing Tablet 1024 ---')
  const h1024 = await loadAndSettle(1024, false)
  const shot1024 = await pageCdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_1024_full.png'), Buffer.from(shot1024.data, 'base64'))
  console.log(`Saved g3_1024_full.png (${1024}x${h1024})`)

  // 3. Tablet 768
  console.log('--- Capturing Tablet 768 ---')
  const h768 = await loadAndSettle(768, false)
  const shot768 = await pageCdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_768_full.png'), Buffer.from(shot768.data, 'base64'))
  console.log(`Saved g3_768_full.png (${768}x${h768})`)

  // 4. Mobile 390
  console.log('--- Capturing Mobile 390 ---')
  const h390 = await loadAndSettle(390, true)
  const shot390 = await pageCdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_390_full.png'), Buffer.from(shot390.data, 'base64'))
  console.log(`Saved g3_390_full.png (${390}x${h390})`)

  // Crop Footer at 390
  const f390 = await pageCdp.evaluate(`
    (() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return { x: r.left, y: r.top + window.scrollY, width: r.width, height: r.height, scale: 1 };
    })()
  `)
  if (f390) {
    const shotF390 = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: f390, captureBeyondViewport: true })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_footer_390.png'), Buffer.from(shotF390.data, 'base64'))
    console.log('Saved g3_footer_390.png')
  }

  // 5. Test 360 Scroll & Integrity
  console.log('--- Testing Mobile 360 Audit ---')
  await loadAndSettle(360, true)
  const audit = await pageCdp.evaluate(`
    (() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const hasHorizontalScroll = scrollW > clientW;
      const lucideIcons = document.querySelectorAll('.lucide, svg.lucide, [class*="lucide-"]');
      return {
        scrollW,
        clientW,
        hasHorizontalScroll,
        lucideCount: lucideIcons.length,
      };
    })()
  `)
  console.log('360 Audit Result:', JSON.stringify(audit, null, 2))

  pageCdp.close()
  cdp.close()
  proc.kill('SIGKILL')
  console.log('SUCCESS: All G3 captures and verifications completed!')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
