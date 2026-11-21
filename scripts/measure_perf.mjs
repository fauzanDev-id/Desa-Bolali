import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9295 + Math.floor(Math.random() * 20)
const BASE_URL = 'http://localhost:3000'

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.ws = null
    this.id = 1
    this.pending = new Map()
    this.eventListeners = new Map()
  }

  on(method, cb) {
    if (!this.eventListeners.has(method)) {
      this.eventListeners.set(method, [])
    }
    this.eventListeners.get(method).push(cb)
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
          } else if (data.method) {
            const listeners = this.eventListeners.get(data.method) || []
            for (const l of listeners) l(data.params)
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

  close() {
    if (this.ws) this.ws.close()
  }
}

async function measureTTFB(url) {
  const times = []
  for (let i = 0; i < 3; i++) {
    const start = performance.now()
    const res = await fetch(url)
    await res.text()
    const ttfb = performance.now() - start
    times.push(ttfb)
  }
  // Ambil median
  times.sort((a, b) => a - b)
  return Math.round(times[1])
}

async function run() {
  console.log('--- MEASURING TTFB (3-run median) ---')
  const routes = [
    { name: '/', url: `${BASE_URL}/` },
    { name: '/berita', url: `${BASE_URL}/informasi/berita` },
    { name: '/profil/sejarah', url: `${BASE_URL}/profil/sejarah` },
    { name: '/galeri', url: `${BASE_URL}/galeri` },
    { name: '/kontak', url: `${BASE_URL}/kontak` },
  ]

  const ttfbResults = {}
  for (const r of routes) {
    const ttfb = await measureTTFB(r.url)
    ttfbResults[r.name] = ttfb
    console.log(`TTFB ${r.name}: ${ttfb}ms`)
  }

  console.log('\n--- LAUNCHING HEADLESS CHROME (MOBILE EMULATION) ---')
  const tmpProfile = path.join(os.tmpdir(), 'chrome-perf-' + Date.now())
  const proc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmpProfile}`,
    '--no-sandbox',
  ])

  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 200))
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      if (res.ok) break
    } catch {}
  }

  const v = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()
  const cdp = new CDPClient(v.webSocketDebuggerUrl)
  await cdp.connect()

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' })
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()
  const pageTarget = targets.find((t) => t.id === targetId)

  const pageCdp = new CDPClient(pageTarget.webSocketDebuggerUrl)
  await pageCdp.connect()

  await pageCdp.send('Page.enable')
  await pageCdp.send('Network.enable')
  await pageCdp.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  })
  await pageCdp.send('Emulation.setUserAgentOverride', {
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  })

  // 1. MEASURE HOMEPAGE NETWORK & ASSETS
  console.log('\n--- MEASURING HOMEPAGE (/) ASSETS & WEB VITALS ---')
  const networkRequests = new Map()

  pageCdp.on('Network.responseReceived', (params) => {
    const { requestId, response } = params
    networkRequests.set(requestId, {
      url: response.url,
      mimeType: response.mimeType,
      status: response.status,
      encodedDataLength: response.encodedDataLength,
    })
  })

  pageCdp.on('Network.loadingFinished', (params) => {
    const { requestId, encodedDataLength } = params
    if (networkRequests.has(requestId)) {
      const req = networkRequests.get(requestId)
      req.encodedDataLength = encodedDataLength
    }
  })

  await pageCdp.send('Page.navigate', { url: `${BASE_URL}/` })
  await new Promise((r) => setTimeout(r, 4000))

  const perfMetrics = await pageCdp.send('Performance.getMetrics')
  const timing = await pageCdp.send('Runtime.evaluate', {
    expression: `(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const paints = performance.getEntriesByType('paint');
      const fcp = paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      let lcp = 0;
      let cls = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      }).observe({type: 'layout-shift', buffered: true});
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          lcp = entries[entries.length - 1].startTime;
        }
      }).observe({type: 'largest-contentful-paint', buffered: true});

      return {
        ttfb: nav ? nav.responseStart - nav.requestStart : 0,
        domInteractive: nav ? nav.domInteractive : 0,
        domComplete: nav ? nav.domComplete : 0,
        loadEventEnd: nav ? nav.loadEventEnd : 0,
        fcp,
        lcp,
        cls,
      };
    })()`,
    returnByValue: true,
  })

  // Tunggu sejenak agar observer menangkap LCP & CLS
  await new Promise((r) => setTimeout(r, 1000))

  const finalVitals = await pageCdp.send('Runtime.evaluate', {
    expression: `(() => {
      const paints = performance.getEntriesByType('paint');
      const fcp = paints.find(p => p.name === 'first-contentful-paint')?.startTime || 0;
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      const lcp = lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : 0;
      return { fcp: Math.round(fcp), lcp: Math.round(lcp) };
    })()`,
    returnByValue: true,
  })

  const reqList = Array.from(networkRequests.values())
  const totalRequests = reqList.length
  const totalTransferred = reqList.reduce((acc, r) => acc + (r.encodedDataLength || 0), 0)

  // Top 10 Aset Terbesar
  const top10Assets = [...reqList]
    .sort((a, b) => (b.encodedDataLength || 0) - (a.encodedDataLength || 0))
    .slice(0, 10)
    .map((r) => ({
      url: r.url.replace(BASE_URL, ''),
      mimeType: r.mimeType,
      sizeKB: Math.round((r.encodedDataLength || 0) / 1024),
    }))

  console.log(`Total Requests: ${totalRequests}`)
  console.log(`Total Transferred: ${(totalTransferred / 1024).toFixed(1)} KB`)
  console.log('Top 10 Largest Assets:', JSON.stringify(top10Assets, null, 2))
  console.log('Web Vitals:', finalVitals.result?.value)

  // Catat hasil ke file JSON sementara untuk dokumentasi
  const summary = {
    ttfb: ttfbResults,
    network: {
      totalRequests,
      totalTransferredKB: Math.round(totalTransferred / 1024),
      top10Assets,
    },
    vitals: finalVitals.result?.value,
  }

  fs.writeFileSync('docs/perf_baseline.json', JSON.stringify(summary, null, 2))
  console.log('\nSaved baseline to docs/perf_baseline.json')

  pageCdp.close()
  cdp.close()
  proc.kill('SIGKILL')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
