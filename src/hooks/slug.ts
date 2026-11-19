import type { FieldHook } from 'payload'

/**
 * Format string menjadi slug URL yang bersih dan ramah SEO
 */
export const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Hapus karakter non-alphanumeric selain spasi dan hyphen
    .replace(/[\s_-]+/g, '-') // Ganti spasi/underscore dengan tanda hubung tunggal
    .replace(/^-+|-+$/g, '') // Hapus tanda hubung di awal dan akhir
}

/**
 * Payload Field Hook untuk otomatis membuat atau memperbarui slug berdasarkan field sumber (misal: 'judul')
 */
export const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string' && value.trim() !== '') {
      return formatSlug(value)
    }

    if (operation === 'create' || operation === 'update') {
      const fallbackData = data?.[fallbackField] || originalDoc?.[fallbackField]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
