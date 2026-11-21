import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const ARTIFACT_DIR = 'C:/Users/fauza/.gemini/antigravity/brain/804d6308-88df-4ee3-8f72-65699ae69e26'
const PUBLIC_SEED = 'public/seed'
const MEDIA_DIR = 'media'

const ASSET_MAPPING = [
  // 1. Hero Sliders (1920x900, 16:9 crop)
  {
    source: 'hero_1_1795257834055.jpg',
    targets: ['hero-1.webp'],
    width: 1920,
    height: 900,
  },
  {
    source: 'hero_2_1795257853078.jpg',
    targets: ['hero-2.webp'],
    width: 1920,
    height: 900,
  },
  {
    source: 'hero_3_1795257870331.jpg',
    targets: ['hero-3.webp'],
    width: 1920,
    height: 900,
  },
  {
    source: 'hero_4_1795257887308.jpg',
    targets: ['hero-4.webp'],
    width: 1920,
    height: 900,
  },

  // 2. Potensi Unggulan (800x600, 4:3)
  {
    source: 'potensi_pertanian_1795257839266.jpg',
    targets: ['potensi-pertanian.webp'],
    width: 800,
    height: 600,
  },
  {
    source: 'potensi_umkm_1795257858237.jpg',
    targets: ['potensi-umkm.webp'],
    width: 800,
    height: 600,
  },
  {
    source: 'potensi_wisata_1795257876007.jpg',
    targets: ['potensi-wisata.webp'],
    width: 800,
    height: 600,
  },
  {
    source: 'tari_tradisional_jawa_pendopo_1795195843356.jpg',
    targets: ['potensi-budaya.webp'],
    width: 800,
    height: 600,
  },

  // 3. Berita Desa (1200x800) + Thumbnails (400x300 & 88x62)
  {
    source: 'berita_1_1795257838995.jpg',
    targets: ['berita-1.webp'],
    width: 1200,
    height: 800,
    thumb: 'berita-1-thumb.webp',
  },
  {
    source: 'berita_2_1795257858053.jpg',
    targets: ['berita-2.webp'],
    width: 1200,
    height: 800,
    thumb: 'berita-2-thumb.webp',
  },
  {
    source: 'berita_3_1795257877026.jpg',
    targets: ['berita-3.webp'],
    width: 1200,
    height: 800,
    thumb: 'berita-3-thumb.webp',
  },
  {
    source: 'desa_harvest_festival_kirab_gunungan_1795195848334.jpg',
    targets: ['berita-4.webp'],
    width: 1200,
    height: 800,
    thumb: 'berita-4-thumb.webp',
  },
  {
    source: 'galeri_4_1795257894660.jpg',
    targets: ['berita-5.webp'],
    width: 1200,
    height: 800,
    thumb: 'berita-5-thumb.webp',
  },
  {
    source: 'balai_desa_bolali_joglo_1795195846083.jpg',
    targets: ['berita-6.webp'],
    width: 1200,
    height: 800,
    thumb: 'berita-6-thumb.webp',
  },

  // 4. Galeri Desa (1200x800)
  {
    source: 'galeri_1_1795257839980.jpg',
    targets: ['galeri-1.webp'],
    width: 1200,
    height: 800,
  },
  {
    source: 'galeri_2_1795257859109.jpg',
    targets: ['galeri-2.webp'],
    width: 1200,
    height: 800,
  },
  {
    source: 'galeri_3_1795257876322.jpg',
    targets: ['galeri-3.webp'],
    width: 1200,
    height: 800,
  },
  {
    source: 'galeri_4_1795257894660.jpg',
    targets: ['galeri-4.webp'],
    width: 1200,
    height: 800,
  },
  {
    source: 'desa_harvest_festival_kirab_gunungan_1795195848334.jpg',
    targets: ['galeri-5.webp'],
    width: 1200,
    height: 800,
  },
  {
    source: 'klaten_rural_village_landscape_1795195842024.jpg',
    targets: ['galeri-6.webp'],
    width: 1200,
    height: 800,
  },
]

async function processAll() {
  console.log('Starting comprehensive asset processing to WebP & JPG...')

  for (const item of ASSET_MAPPING) {
    const srcPath = path.join(ARTIFACT_DIR, item.source)
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source not found: ${srcPath}`)
      continue
    }

    for (const target of item.targets) {
      const baseName = target.replace(/\.webp$/i, '')
      const jpgName = `${baseName}.jpg`

      // 1. WebP version (public/seed & media)
      const pubWebP = path.join(PUBLIC_SEED, target)
      await sharp(srcPath)
        .resize(item.width, item.height, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(pubWebP)

      // 2. JPG version (public/seed & media)
      const pubJpg = path.join(PUBLIC_SEED, jpgName)
      await sharp(srcPath)
        .resize(item.width, item.height, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toFile(pubJpg)

      if (fs.existsSync(MEDIA_DIR)) {
        fs.copyFileSync(pubWebP, path.join(MEDIA_DIR, target))
        fs.copyFileSync(pubJpg, path.join(MEDIA_DIR, jpgName))

        // Also generate media resized versions that Payload might expect:
        // 400x300
        await sharp(srcPath)
          .resize(400, 300, { fit: 'cover' })
          .webp({ quality: 80 })
          .toFile(path.join(MEDIA_DIR, `${baseName}-400x300.webp`))
        await sharp(srcPath)
          .resize(400, 300, { fit: 'cover' })
          .jpeg({ quality: 85 })
          .toFile(path.join(MEDIA_DIR, `${baseName}-400x300.jpg`))

        // 768x512
        await sharp(srcPath)
          .resize(768, 512, { fit: 'cover' })
          .webp({ quality: 80 })
          .toFile(path.join(MEDIA_DIR, `${baseName}-768x512.webp`))
        await sharp(srcPath)
          .resize(768, 512, { fit: 'cover' })
          .jpeg({ quality: 85 })
          .toFile(path.join(MEDIA_DIR, `${baseName}-768x512.jpg`))
      }
      console.log(`Generated: ${baseName}.webp & .jpg (+ thumbs)`)
    }

    if (item.thumb) {
      const pubThumb = path.join(PUBLIC_SEED, item.thumb)
      await sharp(srcPath)
        .resize(400, 300, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(pubThumb)

      if (fs.existsSync(MEDIA_DIR)) {
        fs.copyFileSync(pubThumb, path.join(MEDIA_DIR, item.thumb))
      }
    }
  }

  // Clear .next/cache/images
  if (fs.existsSync('.next/cache/images')) {
    fs.rmSync('.next/cache/images', { recursive: true, force: true })
    console.log('Cleared Next.js image cache.')
  }

  console.log('Comprehensive asset processing completed successfully!')
}

processAll().catch(console.error)
