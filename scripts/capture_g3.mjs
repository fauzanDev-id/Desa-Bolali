import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9250 + Math.floor(Math.random() * 20)
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
        const data = JSON.parse(msg.data)
        if (data.id && this.pending.has(data.id)) {
          const { resolve, reject } = this.pending.get(data.id)
          this.pending.delete(data.id)
          if (data.error) reject(new Error(data.error.message))
          else resolve(data.result)
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
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    })
    return res.result?.value
  }

  close() {
    if (this.ws) this.ws.close()
  }
}

async function run() {
  const tmpProfile = path.join(os.tmpdir(), 'chrome-capture-g3-' + Date.now())
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

  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 400))
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

  async function waitForContent() {
    for (let i = 0; i < 30; i++) {
      const loaded = await pageCdp.evaluate(`
        Boolean(!document.querySelector('div[role="status"]') && document.querySelector('h2') && document.querySelector('footer'))
      `)
      if (loaded) return true
      await new Promise((r) => setTimeout(r, 600))
    }
    return false
  }

  async function captureFullPage(filename, width, dpr = 1, mobile = false) {
    await pageCdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: dpr,
      mobile,
    })
    await pageCdp.send('Page.navigate', { url: BASE_URL })
    await waitForContent()
    await new Promise((r) => setTimeout(r, 1200))

    const totalHeight = await pageCdp.evaluate(`
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      )
    `)

    await pageCdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: totalHeight,
      deviceScaleFactor: dpr,
      mobile,
    })
    await new Promise((r) => setTimeout(r, 500))

    const shot = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    })
    fs.writeFileSync(path.join(ARTIFACT_DIR, filename), Buffer.from(shot.data, 'base64'))
    console.log(`Saved ${filename} (${width}x${totalHeight})`)
    return totalHeight
  }

  // 1. Capture Desktop 1440
  console.log('--- Capturing 1440 Desktop ---')
  await captureFullPage('g3_1440_full.png', 1440, 1, false)

  // Capture Footer crop at 1440
  const footerRect = await pageCdp.evaluate(`
    (() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return {
        x: Math.max(0, r.left),
        y: Math.max(0, r.top + window.scrollY),
        width: r.width,
        height: r.height,
        scale: 1
      };
    })()
  `)
  if (footerRect) {
    console.log('Footer height at 1440:', footerRect.height)
    const shotFooter = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: footerRect,
      captureBeyondViewport: true,
    })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_footer_1440.png'), Buffer.from(shotFooter.data, 'base64'))
    console.log('Saved g3_footer_1440.png')
  }

  // Capture Baris 1 & 2 crop at 1440
  const rowsRect = await pageCdp.evaluate(`
    (() => {
      const s1 = document.querySelector('section[aria-label="Informasi Utama Desa"]');
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!s1 || !s2) return null;
      const r1 = s1.getBoundingClientRect();
      const r2 = s2.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(r1.left, r2.left) - 4),
        y: Math.max(0, Math.min(r1.top, r2.top) + window.scrollY - 4),
        width: Math.max(r1.width, r2.width) + 8,
        height: (r2.bottom - r1.top) + 8,
        scale: 1
      };
    })()
  `)
  if (rowsRect) {
    const shotRows = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: rowsRect,
      captureBeyondViewport: true,
    })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_baris1_2_1440.png'), Buffer.from(shotRows.data, 'base64'))
    console.log('Saved g3_baris1_2_1440.png')
  }

  // 2. Capture Tablet 1024
  console.log('--- Capturing 1024 Tablet ---')
  await captureFullPage('g3_1024_full.png', 1024, 1, false)

  // 3. Capture Tablet 768
  console.log('--- Capturing 768 Tablet ---')
  await captureFullPage('g3_768_full.png', 768, 1, false)

  // 4. Capture Mobile 390
  console.log('--- Capturing 390 Mobile ---')
  await captureFullPage('g3_390_full.png', 390, 1, true)

  // Crop Footer at 390
  const footer390Rect = await pageCdp.evaluate(`
    (() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return {
        x: Math.max(0, r.left),
        y: Math.max(0, r.top + window.scrollY),
        width: r.width,
        height: r.height,
        scale: 1
      };
    })()
  `)
  if (footer390Rect) {
    const shotFooter390 = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: footer390Rect,
      captureBeyondViewport: true,
    })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_footer_390.png'), Buffer.from(shotFooter390.data, 'base64'))
    console.log('Saved g3_footer_390.png')
  }

  // 5. Test 360 Horizontal Scroll & Audit
  console.log('--- Testing 360 Mobile & Integrity ---')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 800,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForContent()
  await new Promise((r) => setTimeout(r, 1000))

  const auditResult = await pageCdp.evaluate(`
    (() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const hasHorizontalScroll = scrollW > clientW;

      // Check Lucide icons presence
      const lucideIcons = document.querySelectorAll('.lucide, svg.lucide, [class*="lucide-"]');

      // Check small tap targets (< 44px) in critical interactive elements
      const interactive = Array.from(document.querySelectorAll('button, a, input, select'));
      const smallTargets = interactive
        .filter(el => {
          const r = el.getBoundingClientRect();
          // only check visible elements
          return r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40) && !el.closest('header nav.hidden');
        })
        .map(el => ({ tag: el.tagName, text: el.innerText?.slice(0, 20), w: el.offsetWidth, h: el.offsetHeight }));

      return {
        scrollW,
        clientW,
        hasHorizontalScroll,
        lucideCount: lucideIcons.length,
        smallTargetsCount: smallTargets.length,
        smallTargetsSample: smallTargets.slice(0, 5)
      };
    })()
  `)
  console.log('360 Audit Result:', JSON.stringify(auditResult, null, 2))

  pageCdp.close()
  cdp.close()
  proc.kill('SIGKILL')
  console.log('Tahap G3 verification capture completed successfully!')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
