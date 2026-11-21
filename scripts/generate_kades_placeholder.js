import sharp from 'sharp'
import fs from 'fs'

const svg = `<svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#B91C1C" />
    </linearGradient>
    <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Latar Bendera Merah Putih Indonesia -->
  <rect x="0" y="0" width="600" height="400" fill="url(#redGrad)" />
  <rect x="0" y="400" width="600" height="400" fill="url(#whiteGrad)" />
  <line x1="0" y1="400" x2="600" y2="400" stroke="#CBD5E1" stroke-width="1.5" opacity="0.6" />

  <!-- Siluet Aparatur Sipil / Kepala Desa Netral Abu-abu (Bukan Pink / Biru) -->
  <g fill="#475569" filter="url(#shadow)">
    <!-- Peci / Kopiah Nasional Hitam -->
    <path d="M225,230 C225,190 245,170 300,170 C355,170 375,190 375,230 Z" fill="#1E293B" />
    
    <!-- Kepala -->
    <path d="M236,225 C236,225 228,270 234,315 C240,360 265,390 300,390 C335,390 360,360 366,315 C372,270 364,225 364,225 Z" />
    
    <!-- Leher -->
    <path d="M272,385 L328,385 L338,425 L262,425 Z" fill="#334155" />
    
    <!-- Bahu & Seragam Dinas Resmi -->
    <path d="M140,495 C140,440 215,415 260,415 L282,465 L300,478 L318,465 L340,415 C385,415 460,440 460,495 L490,800 L110,800 Z" />
    
    <!-- Kerah Kemeja Resmi Putih Bersih di Dalam -->
    <polygon points="282,465 300,498 318,465 300,475" fill="#E2E8F0" />
    <polygon points="260,415 282,465 295,445" fill="#94A3B8" opacity="0.4" />
    <polygon points="340,415 318,465 305,445" fill="#94A3B8" opacity="0.4" />
  </g>

  <!-- Badge Tanda GANTI FOTO ASLI -->
  <g transform="translate(170, 715)">
    <rect x="0" y="0" width="260" height="42" rx="21" fill="#0F172A" fill-opacity="0.88" stroke="#FFFFFF" stroke-width="1.5" />
    <text x="130" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
      GANTI FOTO ASLI
    </text>
  </g>
</svg>`

const buf = Buffer.from(svg)

await sharp(buf)
  .webp({ quality: 90 })
  .toFile('public/seed/kades-placeholder.webp')

if (fs.existsSync('media')) {
  await sharp(buf).webp({ quality: 90 }).toFile('media/kades-placeholder.webp')
  await sharp(buf).resize(400, 300, { fit: 'cover' }).webp({ quality: 90 }).toFile('media/kades-placeholder-400x300.webp')
  await sharp(buf).resize(768, 512, { fit: 'cover' }).webp({ quality: 90 }).toFile('media/kades-placeholder-768x512.webp')
}

// Clear Next.js image cache if exists
const nextImgCache = '.next/cache/images'
if (fs.existsSync(nextImgCache)) {
  fs.rmSync(nextImgCache, { recursive: true, force: true })
  console.log('Cleared .next/cache/images')
}

console.log('Successfully generated public/seed and media kades-placeholder.webp')
