import { spawn } from 'child_process'
import os from 'os'
import path from 'path'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9222
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const VIEWPORTS = [
  { name: '360px (Small Mobile)', width: 360, height: 640 },
  { name: '390px (Mobile)', width: 390, height: 844 },
  { name: '768px (Tablet)', width: 768, height: 1024 },
  { name: '1024px (Small Desktop)', width: 1024, height: 768 },
  { name: '1280px (Standard Desktop)', width: 1280, height: 800 },
  { name: '1440px (Wide Desktop)', width: 1440, height: 900 },
]

const PAGES = [
  '/',
  '/profil/sejarah',
  '/profil/visi-misi',
  '/profil/geografis',
  '/pemerintahan/struktur',
  '/pemerintahan/perangkat-desa',
  '/pemerintahan/bpd',
  '/informasi/berita',
  '/transparansi',
  '/galeri',
  '/kontak',
]

// Simple CDP client over native WebSocket
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.ws = null
    this.id = 1
    this.pending = new Map()
    this.events = []
    this.consoleErrors = []
    this.consoleWarnings = []
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
        } else if (data.method) {
          if (data.method === 'Runtime.consoleAPICalled') {
            const type = data.params.type
            const text = data.params.args.map((a) => a.value || a.description || '').join(' ')
            if (type === 'error') this.consoleErrors.push(text)
            if (type === 'warning') this.consoleWarnings.push(text)
          }
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

async function startChrome() {
  const tmpProfile = path.join(os.tmpdir(), 'chrome-qa-profile-' + Date.now())
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmpProfile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--no-sandbox',
    '--disable-gpu',
  ])

  // Wait for Chrome port to be ready
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (res.ok) {
        return proc
      }
    } catch (e) {
      // wait
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error('Chrome failed to start')
}

async function run() {
  console.log('Starting Chrome...')
  const chromeProc = await startChrome()

  const results = {
    viewports: [],
    keyboard: {},
    consoleErrors: [],
  }

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`)
    const targets = await listRes.json()
    let pageTarget = targets.find((t) => t.type === 'page')

    if (!pageTarget) {
      const newRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${BASE_URL}`)
      pageTarget = await newRes.json()
    }

    const client = new CDPClient(pageTarget.webSocketDebuggerUrl)
    await client.connect()

    await client.send('Page.enable')
    await client.send('DOM.enable')
    await client.send('Runtime.enable')

    console.log(`\n=== 1. VIEWPORT & OVERFLOW AUDIT (${BASE_URL}) ===`)

    for (const pagePath of PAGES) {
      const url = `${BASE_URL}${pagePath}`
      console.log(`\nTesting Page: ${pagePath}`)

      for (const vp of VIEWPORTS) {
        await client.send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768,
        })

        // Navigate
        await client.send('Page.navigate', { url })
        // Wait for page load
        await new Promise((r) => setTimeout(r, 1200))

        // Check horizontal scroll & overflowing elements
        const overflowCheck = await client.evaluate(`
          (() => {
            const scrollW = document.documentElement.scrollWidth;
            const innerW = window.innerWidth;
            const hasHorizontalScroll = scrollW > innerW + 1;

            const overflowing = [];
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const r = el.getBoundingClientRect();
              if (r.right > innerW + 2 && r.width > 0) {
                const tag = el.tagName.toLowerCase();
                const cls = (typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join('.') : '');
                overflowing.push(tag + (cls ? '.' + cls : '') + ' (right: ' + Math.round(r.right) + 'px)');
                if (overflowing.length >= 3) break;
              }
            }

            // Check images aspect ratio & broken images
            const brokenImages = [];
            for (const img of document.querySelectorAll('img')) {
              if (img.complete && img.naturalWidth === 0) {
                brokenImages.push(img.src);
              }
            }

            return {
              scrollW,
              innerW,
              hasHorizontalScroll,
              overflowing,
              brokenImages
            };
          })()
        `)

        const status = !overflowCheck.hasHorizontalScroll && overflowCheck.brokenImages.length === 0 ? 'PASS' : 'FAIL'
        console.log(`  [${status}] ${vp.name.padEnd(26)}: scrollWidth=${overflowCheck.scrollW}px, innerWidth=${overflowCheck.innerW}px`)
        if (overflowCheck.hasHorizontalScroll) {
          console.warn(`    WARNING: Overflow elements: ${overflowCheck.overflowing.join(', ')}`)
        }
        if (overflowCheck.brokenImages.length > 0) {
          console.warn(`    WARNING: Broken images: ${overflowCheck.brokenImages.join(', ')}`)
        }

        results.viewports.push({
          page: pagePath,
          viewport: vp.name,
          width: vp.width,
          scrollWidth: overflowCheck.scrollW,
          hasHorizontalScroll: overflowCheck.hasHorizontalScroll,
          overflowing: overflowCheck.overflowing,
          brokenImages: overflowCheck.brokenImages,
          status,
        })
      }
    }

    console.log(`\n=== 2. KEYBOARD NAVIGATION & FOCUS AUDIT ===`)

    // Test Keyboard on Home Page
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    })
    await client.send('Page.navigate', { url: `${BASE_URL}/` })
    await new Promise((r) => setTimeout(r, 1000))

    // Check Skip link or first focusable elements
    const focusableInfo = await client.evaluate(`
      (() => {
        const focusable = document.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])');
        return {
          count: focusable.length,
          firstThree: Array.from(focusable).slice(0, 3).map(el => el.textContent?.trim() || el.getAttribute('aria-label') || el.tagName)
        };
      })()
    `)
    console.log(`  Focusable elements found on Home: ${focusableInfo.count} elements`)
    console.log(`  First focus targets: ${focusableInfo.firstThree.join(' -> ')}`)

    // Simulate Tab navigation
    await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 })
    await new Promise((r) => setTimeout(r, 100))

    const activeEl = await client.evaluate(`
      (() => {
        const el = document.activeElement;
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          text: el.textContent?.trim()?.slice(0, 30),
          outline: style.outline,
          outlineOffset: style.outlineOffset,
          boxShadow: style.boxShadow
        };
      })()
    `)
    console.log(`  Tab Focus Active Element: <${activeEl?.tag}> "${activeEl?.text}" (Outline: ${activeEl?.outline})`)

    // Test Lightbox on Galeri page
    console.log(`\nTesting Galeri Lightbox Keyboard Interaction...`)
    await client.send('Page.navigate', { url: `${BASE_URL}/galeri` })
    await new Promise((r) => setTimeout(r, 1500))

    const openLightbox = await client.evaluate(`
      (() => {
        const firstGalleryBtn = document.querySelector('button[aria-label*="Buka dokumentasi"]');
        if (firstGalleryBtn) {
          firstGalleryBtn.click();
          return true;
        }
        return false;
      })()
    `)

    await new Promise((r) => setTimeout(r, 300))
    const dialogOpen = await client.evaluate(`Boolean(document.querySelector('[role="dialog"]'))`)
    console.log(`  Gallery Modal opened on click: ${dialogOpen}`)

    // Press Escape to close modal
    await client.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await client.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
    await new Promise((r) => setTimeout(r, 300))

    const dialogClosed = await client.evaluate(`!Boolean(document.querySelector('[role="dialog"]'))`)
    console.log(`  Gallery Modal closed on [Escape]: ${dialogClosed}`)

    results.keyboard = {
      focusableCount: focusableInfo.count,
      focusRingVerified: Boolean(activeEl?.outline || activeEl?.boxShadow),
      galleryModalOpens: dialogOpen,
      galleryModalClosesOnEsc: dialogClosed,
    }

    results.consoleErrors = client.consoleErrors
    results.consoleWarnings = client.consoleWarnings

    console.log(`\n=== 3. CONSOLE REPORT ===`)
    console.log(`  Console Errors: ${client.consoleErrors.length}`)
    if (client.consoleErrors.length > 0) {
      client.consoleErrors.forEach((e) => console.error('   -', e))
    }
    console.log(`  Console Warnings: ${client.consoleWarnings.length}`)

    client.close()
  } finally {
    chromeProc.kill()
  }

  // Output summary
  const failedVp = results.viewports.filter((v) => v.status === 'FAIL')
  console.log(`\n=== QA SUMMARY ===`)
  console.log(`Total Viewport Tests: ${results.viewports.length}`)
  console.log(`Passed: ${results.viewports.length - failedVp.length}`)
  console.log(`Failed: ${failedVp.length}`)
  console.log(`Keyboard Nav Verified: ${results.keyboard.galleryModalClosesOnEsc ? 'YES' : 'NO'}`)
  console.log(`Console Clean: ${results.consoleErrors.length === 0 ? 'YES' : 'NO'}`)

  import('fs').then((fs) => {
    fs.writeFileSync('qa-report.json', JSON.stringify(results, null, 2))
    console.log('Saved qa-report.json')
  })
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
