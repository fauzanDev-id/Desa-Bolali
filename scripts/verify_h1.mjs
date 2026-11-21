import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9285 + Math.floor(Math.random() * 20)
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
  const tmpProfile = path.join(os.tmpdir(), 'chrome-verify-h1-' + Date.now())
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

  async function waitForPageLoad() {
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 400))
      const ready = await pageCdp.evaluate(`
        Boolean(!document.querySelector('div[role="status"]') && document.querySelector('header'))
      `)
      if (ready) break
    }
    await new Promise((r) => setTimeout(r, 1200))
  }

  // ==========================================
  // 1. BERANDA (1440px)
  // ==========================================
  console.log('=== TEST 1: BERANDA 1440px ===')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForPageLoad()

  // (a) Scroll = 0: TopBar visible, Navbar transparent
  const shotTop = await pageCdp.send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 1440, height: 150, scale: 1 },
  })
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_beranda_top_1440.png'), Buffer.from(shotTop.data, 'base64'))
  console.log('Saved h1_beranda_top_1440.png')

  // (b) Scroll = 200px: TopBar collapsed to 0, Navbar sticky at top:0 with shadow
  await pageCdp.evaluate('window.scrollTo(0, 200)')
  await new Promise((r) => setTimeout(r, 500))

  const stickyMetrics = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h?.getBoundingClientRect();
      const style = window.getComputedStyle(h);
      return {
        top: r?.top,
        height: r?.height,
        position: style.position,
        zIndex: style.zIndex,
        scrollY: window.scrollY,
      };
    })()
  `)
  console.log('Sticky header metrics at scroll=200px:', stickyMetrics)

  // Capture sticky header at scroll position
  const stickyClip = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 1440, height: r.height + 20, scale: 1 };
    })()
  `)
  if (stickyClip) {
    const shotScrolled = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: stickyClip })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_beranda_scrolled_1440.png'), Buffer.from(shotScrolled.data, 'base64'))
    console.log('Saved h1_beranda_scrolled_1440.png')
  }

  // (c) Capture Row 2 Crop at 1440px
  await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (s2) s2.scrollIntoView({ block: 'center' });
    })()
  `)
  await new Promise((r) => setTimeout(r, 500))

  const s2CurRect = await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!s2) return null;
      const r = s2.getBoundingClientRect();
      return { x: Math.max(0, r.left), y: r.top + window.scrollY, width: r.width, height: r.height, scale: 1 };
    })()
  `)
  if (s2CurRect) {
    const shotRow2 = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: s2CurRect })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_row2_1440.png'), Buffer.from(shotRow2.data, 'base64'))
    console.log('Saved h1_row2_1440.png')
  }

  // Row 2 height & body metrics check
  const row2Metrics = await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      const cards = s2 ? Array.from(s2.querySelectorAll('div.rounded-desa-card')) : [];
      return cards.map((c, i) => {
        const header = c.children[0];
        const body = c.querySelector('.row2-potensi-body, .row2-card-body') || c.children[1];
        return {
          cardIndex: i,
          cardHeight: c.offsetHeight,
          headerHeight: header ? header.offsetHeight : 0,
          bodyHeight: body ? body.offsetHeight : 0,
          bodyClass: body ? body.className : null,
          bodyComputedHeight: body ? window.getComputedStyle(body).height : null,
          firstChildHeight: body && body.children[0] ? body.children[0].offsetHeight : null,
        };
      });
    })()
  `)
  console.log('Row 2 Cards Dimensions at 1440px:', JSON.stringify(row2Metrics, null, 2))

  // ==========================================
  // 2. BERANDA (768px)
  // ==========================================
  console.log('=== TEST 2: BERANDA 768px ===')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1024,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForPageLoad()

  await pageCdp.evaluate('window.scrollTo(0, 200)')
  await new Promise((r) => setTimeout(r, 500))

  const sticky768 = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 768, height: r.height + 10, scale: 1 };
    })()
  `)
  if (sticky768) {
    const shot768 = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: sticky768 })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_beranda_768_scroll.png'), Buffer.from(shot768.data, 'base64'))
    console.log('Saved h1_beranda_768_scroll.png')
  }

  // Capture Row 2 at 768px
  await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (s2) s2.scrollIntoView({ block: 'center' });
    })()
  `)
  await new Promise((r) => setTimeout(r, 500))
  const s2Rect768 = await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (!s2) return null;
      const r = s2.getBoundingClientRect();
      return { x: Math.max(0, r.left), y: r.top + window.scrollY, width: r.width, height: r.height, scale: 1 };
    })()
  `)
  if (s2Rect768) {
    const shotRow2_768 = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: s2Rect768 })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_row2_768.png'), Buffer.from(shotRow2_768.data, 'base64'))
    console.log('Saved h1_row2_768.png')
  }

  // ==========================================
  // 3. BERANDA (390px)
  // ==========================================
  console.log('=== TEST 3: BERANDA 390px ===')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await pageCdp.send('Page.navigate', { url: BASE_URL })
  await waitForPageLoad()

  await pageCdp.evaluate('window.scrollTo(0, 250)')
  await new Promise((r) => setTimeout(r, 500))

  const sticky390 = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 390, height: r.height + 10, scale: 1 };
    })()
  `)
  if (sticky390) {
    const shot390 = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: sticky390 })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_beranda_390_scroll.png'), Buffer.from(shot390.data, 'base64'))
    console.log('Saved h1_beranda_390_scroll.png')
  }

  // Capture Row 2 at 390px
  await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      if (s2) s2.scrollIntoView();
    })()
  `)
  await new Promise((r) => setTimeout(r, 500))
  const r2_390 = await pageCdp.evaluate(`
    (() => {
      const s2 = document.querySelector('section[aria-label="Potensi dan Dokumentasi Desa"]');
      const r = s2?.getBoundingClientRect();
      return r ? { x: 0, y: r.top + window.scrollY, width: 390, height: Math.min(844, r.height), scale: 1 } : null;
    })()
  `)
  if (r2_390) {
    const shotRow2_390 = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: r2_390 })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_row2_390.png'), Buffer.from(shotRow2_390.data, 'base64'))
    console.log('Saved h1_row2_390.png')
  }

  // ==========================================
  // 4. TEST 3 HALAMAN DALAM
  // ==========================================
  // Halaman 1: /profil/sejarah (1440px)
  console.log('=== TEST 4a: /profil/sejarah 1440px ===')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: `${BASE_URL}/profil/sejarah` })
  await waitForPageLoad()
  await pageCdp.evaluate('window.scrollTo(0, 200)')
  await new Promise((r) => setTimeout(r, 500))

  const stickySejarah = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 1440, height: r.height + 10, scale: 1 };
    })()
  `)
  if (stickySejarah) {
    const shotSejarah = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: stickySejarah })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_sejarah_scrolled_1440.png'), Buffer.from(shotSejarah.data, 'base64'))
    console.log('Saved h1_sejarah_scrolled_1440.png')
  }

  // Halaman 2: /informasi/berita (768px)
  console.log('=== TEST 4b: /informasi/berita 768px ===')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await pageCdp.send('Page.navigate', { url: `${BASE_URL}/informasi/berita` })
  await waitForPageLoad()
  await pageCdp.evaluate('window.scrollTo(0, 200)')
  await new Promise((r) => setTimeout(r, 500))

  const stickyBerita = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 768, height: r.height + 10, scale: 1 };
    })()
  `)
  if (stickyBerita) {
    const shotBerita = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: stickyBerita })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_berita_scrolled_768.png'), Buffer.from(shotBerita.data, 'base64'))
    console.log('Saved h1_berita_scrolled_768.png')
  }

  // Halaman 3: /transparansi (390px)
  console.log('=== TEST 4c: /transparansi 390px ===')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  })
  await pageCdp.send('Page.navigate', { url: `${BASE_URL}/transparansi` })
  await waitForPageLoad()
  await pageCdp.evaluate('window.scrollTo(0, 200)')
  await new Promise((r) => setTimeout(r, 500))

  const stickyTrans = await pageCdp.evaluate(`
    (() => {
      const h = document.querySelector('header');
      const r = h.getBoundingClientRect();
      return { x: 0, y: r.top + window.scrollY, width: 390, height: r.height + 10, scale: 1 };
    })()
  `)
  if (stickyTrans) {
    const shotTrans = await pageCdp.send('Page.captureScreenshot', { format: 'png', clip: stickyTrans })
    fs.writeFileSync(path.join(ARTIFACT_DIR, 'h1_transparansi_scrolled_390.png'), Buffer.from(shotTrans.data, 'base64'))
    console.log('Saved h1_transparansi_scrolled_390.png')
  }

  pageCdp.close()
  cdp.close()
  proc.kill('SIGKILL')
  console.log('ALL TAHAP H1 VERIFICATIONS COMPLETED SUCCESSFULLY!')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
