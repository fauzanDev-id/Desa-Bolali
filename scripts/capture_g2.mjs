import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9240 + Math.floor(Math.random() * 20)
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
  const tmpProfile = path.join(os.tmpdir(), 'chrome-capture-' + Date.now())
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

  // Give Chrome time to start up
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
    for (let i = 0; i < 25; i++) {
      const loaded = await pageCdp.evaluate(`
        Boolean(!document.querySelector('div[role="status"]') && document.querySelector('h2'))
      `)
      if (loaded) return true
      await new Promise((r) => setTimeout(r, 600))
    }
    return false
  }

  // 1. Desktop 1440
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForContent()
  await new Promise((r) => setTimeout(r, 1500))

  const shot1440 = await pageCdp.send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g2_1440.png'), Buffer.from(shot1440.data, 'base64'))
  console.log('Saved g2_1440.png')

  const clip = await pageCdp.evaluate(`
    (() => {
      const el1 = document.querySelector('section[aria-label="Informasi Utama Desa"]');
      const el2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!el1 || !el2) return null;
      const r1 = el1.getBoundingClientRect();
      const r2 = el2.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(r1.left, r2.left) - 6),
        y: Math.max(0, Math.min(r1.top, r2.top) + window.scrollY - 6),
        width: Math.max(r1.width, r2.width) + 12,
        height: (r2.bottom - r1.top) + 12,
        scale: 1
      };
    })()
  `)

  if (clip) {
    const shotClip = await pageCdp.send('Page.captureScreenshot', {
      format: 'png',
      clip,
      captureBeyondViewport: true,
    })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g2_baris1_2_crop.png'), Buffer.from(shotClip.data, 'base64'))
    console.log('Saved g2_baris1_2_crop.png')
  }

  // 2. Tablet 768
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1600,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForContent()
  await new Promise((r) => setTimeout(r, 1000))
  const shot768 = await pageCdp.send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g2_768.png'), Buffer.from(shot768.data, 'base64'))
  console.log('Saved g2_768.png')

  // 3. Mobile 390
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 2400,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForContent()
  await new Promise((r) => setTimeout(r, 1000))
  const shot390 = await pageCdp.send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g2_390.png'), Buffer.from(shot390.data, 'base64'))
  console.log('Saved g2_390.png')

  pageCdp.close()
  cdp.close()
  proc.kill('SIGKILL')
  console.log('Capture completed successfully!')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
