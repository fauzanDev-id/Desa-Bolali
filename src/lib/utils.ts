/**
 * Utilitas Murni (Client-Safe) untuk Komponen Frontend & Layout
 */

/**
 * Mengambil URL file/gambar dari objek Media Payload CMS atau string URL statis
 */
export function getMediaUrl(media: any, fallback = '/images/hero-desa.jpg'): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    if (media.url) return media.url
    if (media.sizes?.hero?.url) return media.sizes.hero.url
    if (media.sizes?.card?.url) return media.sizes.card.url
    if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url
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
 * Format angka mata uang Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}
