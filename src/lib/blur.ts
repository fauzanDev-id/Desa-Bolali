import blurMap from '../../public/seed/blur-map.json'

/**
 * Mengambil blurDataURL base64 untuk placeholder blur next/image
 */
export function getBlurDataUrl(filenameOrPath: string): string | undefined {
  if (!filenameOrPath) return undefined
  const basename = filenameOrPath.split('/').pop() || ''
  return (blurMap as Record<string, string>)[basename] || undefined
}
