import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SEED_DIR = path.resolve('public/seed')

async function optimizeImages() {
  console.log('Optimizing images in:', SEED_DIR)
  const files = fs.readdirSync(SEED_DIR)

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue

    const filePath = path.join(SEED_DIR, file)
    const baseName = path.basename(file, ext)
    const targetWebp = path.join(SEED_DIR, `${baseName}.webp`)

    // Aturan dimensi & target:
    // 1. Hero: max 1920px width, quality 80
    // 2. Thumbnail: max 400px width, quality 80
    // 3. Lainnya: max 1200px width, quality 80
    let maxWidth = 1200
    let quality = 80

    if (baseName.startsWith('hero')) {
      maxWidth = 1920
      quality = 82
    } else if (baseName.includes('thumb')) {
      maxWidth = 400
      quality = 80
    } else if (baseName.startsWith('kades')) {
      maxWidth = 800
      quality = 82
    } else {
      maxWidth = 1200
      quality = 80
    }

    try {
      const buffer = fs.readFileSync(filePath)
      const image = sharp(buffer)
      const metadata = await image.metadata()

      let transformer = sharp(buffer)
      if (metadata.width && metadata.width > maxWidth) {
        transformer = transformer.resize({ width: maxWidth, withoutEnlargement: true })
      }

      const webpBuffer = await transformer.webp({ quality, effort: 6 }).toBuffer()

      // Tulis file webp yang dioptimasi
      fs.writeFileSync(targetWebp, webpBuffer)
      const sizeKB = (webpBuffer.length / 1024).toFixed(1)
      console.log(`✓ ${baseName}.webp: ${metadata.width}px -> max ${maxWidth}px (${sizeKB} KB)`)

      // Jika file asli adalah .jpg/.jpeg/.png dan bukan .webp, kita bisa hapus file asli yang duplikat
      if (ext !== '.webp' && fs.existsSync(targetWebp)) {
        // Hapus file jpg/jpeg non-webp lama jika webp sudah tersedia
        fs.unlinkSync(filePath)
        console.log(`  - Dihapus versi non-webp lama: ${file}`)
      }
    } catch (err) {
      console.error(`Gagal mengoptimasi ${file}:`, err.message)
    }
  }

  console.log('\nSelesai mengoptimasi seluruh aset public/seed/!')
}

optimizeImages().catch(console.error)
