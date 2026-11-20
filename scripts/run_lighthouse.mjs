import { execSync } from 'child_process'
import fs from 'fs'

const PAGES = [
  { name: 'Beranda', path: '/' },
  { name: 'Profil Sejarah', path: '/profil/sejarah' },
  { name: 'Informasi Berita', path: '/informasi/berita' },
  { name: 'Transparansi APBDes', path: '/transparansi' },
  { name: 'Kontak', path: '/kontak' },
]

const BASE_URL = 'http://localhost:3000'
const results = []

console.log('=== RUNNING LIGHTHOUSE MOBILE AUDIT ON NEXT.JS PRODUCTION ===\n')

// Warmup cache
console.log('Warming up Next.js server cache...')
for (const p of PAGES) {
  try {
    await fetch(`${BASE_URL}${p.path}`)
  } catch (e) {}
}
await new Promise((r) => setTimeout(r, 1000))

for (const p of PAGES) {
  const url = `${BASE_URL}${p.path}`
  const outPath = `./lighthouse-${p.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`
  console.log(`Auditing: ${p.name} (${url})...`)

  const cmd = `npx --yes lighthouse "${url}" --output=json --output-path="${outPath}" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile=true --throttling-method=provided --chrome-flags="--headless=new --no-sandbox --disable-gpu"`

  try {
    execSync(cmd, { stdio: 'inherit' })
    if (fs.existsSync(outPath)) {
      const data = JSON.parse(fs.readFileSync(outPath, 'utf8'))
      const scores = {
        name: p.name,
        path: p.path,
        performance: Math.round((data.categories.performance?.score || 0) * 100),
        accessibility: Math.round((data.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((data.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((data.categories.seo?.score || 0) * 100),
        auditsFailed: [],
      }

      for (const [key, audit] of Object.entries(data.audits || {})) {
        if (audit.score !== null && audit.score < 0.9 && audit.details?.type !== 'opportunity') {
          // Check if it's accessibility or best practices
          if (key === 'color-contrast' || key === 'button-name' || key === 'image-alt' || key === 'document-title') {
            scores.auditsFailed.push({ id: key, title: audit.title, description: audit.description })
          }
        }
      }

      results.push(scores)
      console.log(`  -> ${p.name}: Perf=${scores.performance}, A11y=${scores.accessibility}, BP=${scores.bestPractices}, SEO=${scores.seo}`)
    }
  } catch (err) {
    console.error(`Error auditing ${p.name}:`, err.message)
  }
}

fs.writeFileSync('lighthouse-summary.json', JSON.stringify(results, null, 2))
console.log('\n=== LIGHTHOUSE SUMMARY SAVED TO lighthouse-summary.json ===')
console.table(
  results.map((r) => ({
    Halaman: r.name,
    Performance: r.performance,
    Accessibility: r.accessibility,
    'Best Practices': r.bestPractices,
    SEO: r.seo,
    Status:
      r.performance >= 85 && r.accessibility >= 95 && r.bestPractices >= 95 && r.seo >= 95
        ? 'MEMENUHI TARGET'
        : 'PERLU OPTIMASI',
  }))
)
