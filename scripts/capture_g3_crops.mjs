import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9270 + Math.floor(Math.random() * 20)
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
          console.error(e)
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
  const tmpProfile = path.join(os.tmpdir(), 'chrome-capture-crops-' + Date.now())
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
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()
  const pageTarget = targets.find((t) => t.id === targetId)

  const pageCdp = new CDPClient(pageTarget.webSocketDebuggerUrl)
  await pageCdp.connect()

  await pageCdp.send('Page.enable')
  await pageCdp.send('DOM.enable')
  await pageCdp.send('Runtime.enable')

  // Force reveal of all ScrollReveal components
  await pageCdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  })

  // 1. SETUP DESKTOP 1440 (Set height to 2000 so all elements fit comfortably within viewport for clipping)
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 2000,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })

  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 400))
    const ready = await pageCdp.evaluate(`
      Boolean(!document.querySelector('div[role="status"]') && document.querySelector('footer') && document.querySelector('h2'))
    `)
    if (ready) break
  }
  await new Promise((r) => setTimeout(r, 1500))

  // Crop Desktop Header & Hero
  const heroRect = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const hero = document.querySelector('section[aria-label="Pemberitahuan dan Banner Utama Desa"]');
      if (!hero) return null;
      const top = h ? h.getBoundingClientRect().top + window.scrollY : 0;
      const bottom = hero.getBoundingClientRect().bottom + window.scrollY;
      return { x: 0, y: top, width: 1440, height: bottom - top + 10, scale: 1 };
    })()
  `)
  if (heroRect) {
    const sHero = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: heroRect })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_desktop_hero.png'), Buffer.from(sHero.data, 'base64'))
    console.log('Saved g3_desktop_hero.png')
  }

  // Crop Desktop Baris 1 & 2
  const bRect = await pageCdp.evaluate(`
    (() => {
      const s1 = document.querySelector('section[aria-label="Informasi Utama Desa"]');
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!s1 || !s2) return null;
      const r1 = s1.getBoundingClientRect();
      const r2 = s2.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(r1.left, r2.left) - 6),
        y: Math.max(0, r1.top + window.scrollY - 6),
        width: Math.max(r1.width, r2.width) + 12,
        height: (r2.bottom - r1.top) + 12,
        scale: 1
      };
    })()
  `)
  if (bRect) {
    const sRows = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: bRect })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_desktop_baris1_2.png'), Buffer.from(sRows.data, 'base64'))
    console.log('Saved g3_desktop_baris1_2.png')
  }

  // Crop Desktop Footer
  const fRect = await pageCdp.evaluate(`
    (() => {
      const f = document.querySelector('footer');
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 1440, height: r.height, scale: 1 };
    })()
  `)
  if (fRect) {
    console.log('Desktop Footer height:', fRect.height)
    const sFooter = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: fRect })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_desktop_footer.png'), Buffer.from(sFooter.data, 'base64'))
    console.log('Saved g3_desktop_footer.png')
  }

  // Full Desktop 1440 Viewport
  const totalH1440 = await pageCdp.evaluate(`document.documentElement.scrollHeight`)
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: totalH1440,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await new Promise((r) => setTimeout(r, 400))
  const sFull1440 = await pageCdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_1440_full.png'), Buffer.from(sFull1440.data, 'base64'))
  console.log(`Saved g3_1440_full.png (1440x${totalH1440})`)

  // 2. SETUP MOBILE 390
  console.log('--- Setting up Mobile 390 ---')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 4000,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 400))
    const ready = await pageCdp.evaluate(`
      Boolean(!document.querySelector('div[role="status"]') && document.querySelector('footer') && document.querySelector('h2'))
    `)
    if (ready) break
  }
  await new Promise((r) => setTimeout(r, 1500))

  const totalH390 = await pageCdp.evaluate(`document.documentElement.scrollHeight`)
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: totalH390,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await new Promise((r) => setTimeout(r, 400))

  const sFull390 = await pageCdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_390_full.png'), Buffer.from(sFull390.data, 'base64'))
  console.log(`Saved g3_390_full.png (390x${totalH390})`)

  // Crop Mobile Header & Hero
  const mHero = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const hero = document.querySelector('section[aria-label="Pemberitahuan dan Banner Utama Desa"]');
      if (!hero) return null;
      const top = h ? h.getBoundingClientRect().top + window.scrollY : 0;
      const bottom = hero.getBoundingClientRect().bottom + window.scrollY;
      return { x: 0, y: top, width: 390, height: bottom - top + 10, scale: 1 };
    })()
  `)
  if (mHero) {
    const sMHero = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: mHero })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_mobile_hero.png'), Buffer.from(sMHero.data, 'base64'))
    console.log('Saved g3_mobile_hero.png')
  }

  // Crop Mobile Baris 1 (Sambutan, Berita, Transparansi)
  const mRows = await pageCdp.evaluate(`
    (() => {
      const s1 = document.querySelector('section[aria-label="Informasi Utama Desa"]');
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!s1 || !s2) return null;
      const r1 = s1.getBoundingClientRect();
      const r2 = s2.getBoundingClientRect();
      return {
        x: 0,
        y: r1.top + window.scrollY - 6,
        width: 390,
        height: (r2.bottom - r1.top) + 12,
        scale: 1
      };
    })()
  `)
  if (mRows) {
    const sMRows = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: mRows })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'g3_mobile_cards.png'), Buffer.from(sMRows.data, 'base64'))
    console.log('Saved g3_mobile_cards.png')
  }

  pageCdp.close()
  cdp.close()
  proc.kill('SIGKILL')
  console.log('Finished capturing all G3 crops!')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
