import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const BRAIN_DIR = 'C:\\Users\\fauza\\.gemini\\antigravity\\brain\\804d6308-88df-4ee3-8f72-65699ae69e26'
const PUBLIC_SEED = path.resolve('public', 'seed')
const PUBLIC_IMAGES = path.resolve('public', 'images')

if (!fs.existsSync(PUBLIC_SEED)) fs.mkdirSync(PUBLIC_SEED, { recursive: true })
if (!fs.existsSync(PUBLIC_IMAGES)) fs.mkdirSync(PUBLIC_IMAGES, { recursive: true })

// 1. Pemetaan Sumber Gambar ke Target Aset WebP
const targets = [
  // Hero Images (1920x900)
  {
    src: path.join(BRAIN_DIR, 'desa_bolali_panoramic_landscape_1795195791641.jpg'),
    dest: 'hero-1.webp',
    width: 1920,
    height: 900,
  },
  {
    src: path.join(BRAIN_DIR, 'central_java_sunrise_landscape_1795195799653.jpg'),
    dest: 'hero-2.webp',
    width: 1920,
    height: 900,
  },
  {
    src: path.join(BRAIN_DIR, 'klaten_rural_village_landscape_1795195842024.jpg'),
    dest: 'hero-3.webp',
    width: 1920,
    height: 900,
  },
  {
    src: path.join(BRAIN_DIR, 'central_java_valley_dawn_1795195840511.jpg'),
    dest: 'hero-4.webp',
    width: 1920,
    height: 900,
  },

  // Potensi Desa (800x600)
  {
    src: path.join(BRAIN_DIR, 'indonesian_rural_village_landscape_1795108718770.jpg'),
    fallback: path.resolve('public', 'images', 'potensi-pertanian.jpg'),
    dest: 'potensi-pertanian.webp',
    width: 800,
    height: 600,
  },
  {
    src: path.join(BRAIN_DIR, 'pengrajin_gerabah_tradisional_jawa_1795195798356.jpg'),
    fallback: path.resolve('public', 'images', 'potensi-umkm.jpg'),
    dest: 'potensi-umkm.webp',
    width: 800,
    height: 600,
  },
  {
    src: path.join(BRAIN_DIR, 'umbul_mata_air_klaten_1795195840504.jpg'),
    fallback: path.resolve('public', 'images', 'potensi-wisata.jpg'),
    dest: 'potensi-wisata.webp',
    width: 800,
    height: 600,
  },
  {
    src: path.join(BRAIN_DIR, 'tari_tradisional_jawa_pendopo_1795195843356.jpg'),
    fallback: path.resolve('public', 'images', 'potensi-budaya.jpg'),
    dest: 'potensi-budaya.webp',
    width: 800,
    height: 600,
  },

  // Peta Satelit / Hybrid (1200x700)
  {
    src: path.join(BRAIN_DIR, 'satellite_klaten_village_map_1795195798414.jpg'),
    dest: 'peta-desa.webp',
    width: 1200,
    height: 700,
  },

  // Berita 1 - 6 (1200x800 & Thumb 400x300)
  {
    src: path.join(BRAIN_DIR, 'kegiatan_penanaman_pohon_1795195847747.jpg'),
    fallback: path.resolve('public', 'images', 'berita-1.jpg'),
    dest: 'berita-1.webp',
    thumbDest: 'berita-1-thumb.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'berita-2.jpg'),
    dest: 'berita-2.webp',
    thumbDest: 'berita-2-thumb.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'berita-3.jpg'),
    dest: 'berita-3.webp',
    thumbDest: 'berita-3-thumb.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.join(BRAIN_DIR, 'desa_harvest_festival_kirab_gunungan_1795195848334.jpg'),
    fallback: path.resolve('public', 'images', 'berita-4.jpg'),
    dest: 'berita-4.webp',
    thumbDest: 'berita-4-thumb.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'berita-4.jpg'),
    dest: 'berita-5.webp',
    thumbDest: 'berita-5-thumb.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'berita-1.jpg'),
    dest: 'berita-6.webp',
    thumbDest: 'berita-6-thumb.webp',
    width: 1200,
    height: 800,
  },

  // Galeri 1 - 6 (1200x800)
  {
    src: path.join(BRAIN_DIR, 'balai_desa_bolali_joglo_1795195846083.jpg'),
    fallback: path.resolve('public', 'images', 'galeri-1.jpg'),
    dest: 'galeri-1.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'galeri-1.jpg'),
    dest: 'galeri-2.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'galeri-4.jpg'),
    dest: 'galeri-3.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.resolve('public', 'images', 'galeri-2.jpg'),
    dest: 'galeri-4.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.join(BRAIN_DIR, 'desa_harvest_festival_kirab_gunungan_1795195848334.jpg'),
    fallback: path.resolve('public', 'images', 'galeri-3.jpg'),
    dest: 'galeri-5.webp',
    width: 1200,
    height: 800,
  },
  {
    src: path.join(BRAIN_DIR, 'central_java_sunrise_landscape_1795195799653.jpg'),
    dest: 'galeri-6.webp',
    width: 1200,
    height: 800,
  },
]

// 2. Buat Siluet Resmi Kepala Desa Placeholder (GANTI DENGAN ASLI)
async function generateKadesPlaceholder() {
  const width = 640
  const height = 800
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#E2E8F0" />
          <stop offset="100%" stop-color="#CBD5E1" />
        </linearGradient>
      </defs>
      <!-- Background Netral Studio -->
      <rect width="100%" height="100%" fill="url(#bg)" />

      <!-- Bendera Merah Putih Halus di Belakang Kanan -->
      <path d="M400,0 L640,0 L640,300 L400,200 Z" fill="#DC2626" fill-opacity="0.25" />
      <path d="M400,200 L640,300 L640,500 L400,400 Z" fill="#FFFFFF" fill-opacity="0.4" />

      <!-- Siluet Aparatur Sipil Formal / PDU Kepala Desa -->
      <g fill="#475569">
        <!-- Peci Hitam -->
        <path d="M250 210 Q 320 190 390 210 L 385 270 Q 320 280 255 270 Z" />
        <!-- Kepala / Wajah Netral -->
        <circle cx="320" cy="300" r="70" />
        <path d="M290 350 Q 320 375 350 350 L 360 410 L 280 410 Z" />
        <!-- Bahu & Seragam Putih Formal -->
        <path d="M140 540 Q 320 440 500 540 L 530 800 L 110 800 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4" />
        <!-- Dasi & Kerah -->
        <polygon points="320,440 300,500 320,620 340,500" fill="#1E293B" />
        <!-- Pangkat Bahu Emas (Epaulet) -->
        <rect x="160" y="520" width="70" height="24" rx="6" fill="#FACC15" stroke="#CA8A04" stroke-width="2" />
        <rect x="410" y="520" width="70" height="24" rx="6" fill="#FACC15" stroke="#CA8A04" stroke-width="2" />
      </g>

      <!-- Badge Label GANTI DENGAN ASLI -->
      <rect x="120" y="720" width="400" height="50" rx="25" fill="#0F2E24" stroke="#FACC15" stroke-width="3" />
      <text x="320" y="752" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#FACC15" letter-spacing="1">
        GANTI DENGAN ASLI
      </text>
    </svg>
  `

  const buffer = Buffer.from(svg)
  const outputPathSeed = path.join(PUBLIC_SEED, 'kades-placeholder.webp')
  const outputPathImages = path.join(PUBLIC_IMAGES, 'kades-placeholder.webp')

  await sharp(buffer)
    .webp({ quality: 80 })
    .toFile(outputPathSeed)
  fs.copyFileSync(outputPathSeed, outputPathImages)

  console.log('✅ Berhasil membuat kades-placeholder.webp (Siluet Netral)')
}

async function run() {
  console.log('🚀 Memulai pemrosesan aset WebP kualitas 80...')
  const blurMap = {}

  for (const item of targets) {
    let sourcePath = item.src
    if (!fs.existsSync(sourcePath)) {
      if (item.fallback && fs.existsSync(item.fallback)) {
        sourcePath = item.fallback
      } else {
        console.warn(`⚠️ File sumber tidak ditemukan: ${item.src}`)
        continue
      }
    }

    const outSeed = path.join(PUBLIC_SEED, item.dest)
    const outImages = path.join(PUBLIC_IMAGES, item.dest)

    try {
      // 1. Resize & Crop ke Target Dimensi & WebP Q80
      await sharp(sourcePath)
        .resize(item.width, item.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 80, effort: 6 })
        .toFile(outSeed)

      fs.copyFileSync(outSeed, outImages)
      console.log(`✅ [${item.width}x${item.height}] ${item.dest}`)

      // 2. Buat Thumbnail jika ada (misal berita thumb 400x300)
      if (item.thumbDest) {
        const outThumbSeed = path.join(PUBLIC_SEED, item.thumbDest)
        const outThumbImages = path.join(PUBLIC_IMAGES, item.thumbDest)

        await sharp(sourcePath)
          .resize(400, 300, {
            fit: 'cover',
            position: 'center',
          })
          .webp({ quality: 80, effort: 5 })
          .toFile(outThumbSeed)

        fs.copyFileSync(outThumbSeed, outThumbImages)
        console.log(`   └─ 400x300 ${item.thumbDest}`)
      }

      // 3. Generate Tiny Blur Placeholder Data URL (20px width)
      const tinyBuf = await sharp(outSeed)
        .resize(20, Math.round((20 * item.height) / item.width), { fit: 'cover' })
        .webp({ quality: 30 })
        .toBuffer()
      blurMap[item.dest] = `data:image/webp;base64,${tinyBuf.toString('base64')}`
    } catch (err) {
      console.error(`❌ Gagal memproses ${item.dest}:`, err.message)
    }
  }

  await generateKadesPlaceholder()

  // Simpan blurDataURL map ke JSON
  fs.writeFileSync(
    path.join(PUBLIC_SEED, 'blur-map.json'),
    JSON.stringify(blurMap, null, 2),
    'utf-8'
  )
  console.log('✅ blur-map.json berhasil disimpan.')
  console.log('🎉 Pemrosesan seluruh aset visual WebP selesai!')
}

run()
