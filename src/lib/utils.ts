/**
 * Utilitas Murni (Client-Safe) untuk Komponen Frontend & Layout
 */

/**
 * Memetakan path atau nama berkas media ke berkas statis terkompresi di /seed/
 */
export function resolveSeedUrl(input: string, fallback = '/seed/hero-1.webp'): string {
  if (!input) return fallback
  if (
    input.startsWith('/seed/') ||
    input.startsWith('http://') ||
    input.startsWith('https://') ||
    input.startsWith('data:')
  ) {
    return input
  }

  const filename = input.replace('/api/media/file/', '').replace('/media/', '').split('?')[0]
  const cleanName = filename.replace(/-\d+x\d+/, '').replace('-thumb', '')

  if (cleanName.startsWith('hero-')) {
    const numMatch = cleanName.match(/hero-(\d+)/)
    if (numMatch) {
      const n = parseInt(numMatch[1], 10)
      const mapped = ((n - 1) % 4) + 1
      return `/seed/hero-${mapped}.webp`
    }
    return '/seed/hero-1.webp'
  }
  if (cleanName.startsWith('hero-desa')) return '/seed/hero-1.webp'
  if (cleanName.startsWith('kades')) return '/seed/kades-placeholder.webp'
  if (cleanName.startsWith('logo-desa')) return '/seed/logo-desa-placeholder.svg'
  if (cleanName.startsWith('berita-')) {
    const numMatch = cleanName.match(/berita-(\d+)/)
    if (numMatch) {
      const n = parseInt(numMatch[1], 10)
      const mapped = ((n - 1) % 6) + 1
      return `/seed/berita-${mapped}.webp`
    }
    return '/seed/berita-1.webp'
  }
  if (cleanName.startsWith('galeri-')) {
    const numMatch = cleanName.match(/galeri-(\d+)/)
    if (numMatch) {
      const n = parseInt(numMatch[1], 10)
      const mapped = ((n - 1) % 6) + 1
      return `/seed/galeri-${mapped}.webp`
    }
    return '/seed/galeri-1.webp'
  }
  if (cleanName.startsWith('potensi-pertanian')) return '/seed/potensi-pertanian.webp'
  if (cleanName.startsWith('potensi-umkm')) return '/seed/potensi-umkm.webp'
  if (cleanName.startsWith('potensi-wisata')) return '/seed/potensi-wisata.webp'
  if (cleanName.startsWith('potensi-budaya')) return '/seed/potensi-budaya.webp'
  if (cleanName.startsWith('peta-desa')) return '/seed/peta-desa.webp'
  if (cleanName.startsWith('motif-footer') || cleanName.startsWith('footer-decoration')) {
    return '/seed/motif-footer.svg'
  }

  return fallback
}

/**
 * Mengambil URL file/gambar dari objek Media Payload CMS atau string URL statis
 */
export function getMediaUrl(media: any, fallback = '/seed/hero-1.webp'): string {
  if (!media) return fallback
  if (typeof media === 'string') {
    return resolveSeedUrl(media, fallback)
  }
  if (typeof media === 'object') {
    const rawUrl =
      media.url ||
      media.sizes?.hero?.url ||
      media.sizes?.card?.url ||
      media.sizes?.thumbnail?.url
    if (rawUrl) {
      return resolveSeedUrl(rawUrl, fallback)
    }
    if (media.filename) {
      return resolveSeedUrl(media.filename, fallback)
    }
  }
  return fallback
}

/**
 * Format tanggal Indonesia (misal: "10 Nov 2026")
 */
export function formatDateIndonesia(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/**
 * Format tanggal Indonesia lengkap (misal: "10 November 2026")
 */
export function formatDateFullIndonesia(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

/**
 * Format tanggal dan waktu Indonesia (misal: "10 November 2026, 08.00 WIB")
 */
export function formatDateTimeIndonesia(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    const dateFormatted = d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    const timeFormatted = d.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }).replace(':', '.')
    return `${dateFormatted}, ${timeFormatted} WIB`
  } catch {
    return dateStr
  }
}

/**
 * Format angka mata uang Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}
