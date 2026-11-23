import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Revalidasi Next.js cache untuk koleksi setelah pembuatan atau pembaruan dokumen
 */
export const revalidateCollection =
  (paths: string | string[], tag?: string): CollectionAfterChangeHook =>
  async ({ doc, req: { payload } }) => {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      const pathList = Array.isArray(paths) ? paths : [paths]
      for (const p of pathList) {
        revalidatePath(p)
      }
      revalidatePath('/', 'layout')

      if (tag) {
        revalidateTag(tag)
        revalidateTag(`collection-${tag}`)
      }
      payload.logger.info(`Revalidated paths: ${pathList.join(', ')}, layout, and tags: ${tag || 'none'}, collection-${tag || ''}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate: ${err}`)
    }
    return doc
  }

/**
 * Revalidasi Next.js cache untuk koleksi setelah penghapusan dokumen
 */
export const revalidateCollectionDelete =
  (paths: string | string[], tag?: string): CollectionAfterDeleteHook =>
  async ({ doc, req: { payload } }) => {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      const pathList = Array.isArray(paths) ? paths : [paths]
      for (const p of pathList) {
        revalidatePath(p)
      }
      revalidatePath('/', 'layout')

      if (tag) {
        revalidateTag(tag)
        revalidateTag(`collection-${tag}`)
      }
      payload.logger.info(`Revalidated paths after delete: ${pathList.join(', ')}, layout, and tags: ${tag || 'none'}, collection-${tag || ''}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate after delete: ${err}`)
    }
    return doc
  }

/**
 * Revalidasi Next.js cache untuk singleton global
 */
export const revalidateGlobal =
  (tag: string, ...paths: string[]): GlobalAfterChangeHook =>
  async ({ doc, req: { payload } }) => {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      for (const p of paths) {
        revalidatePath(p)
      }
      revalidatePath('/', 'layout')
      revalidateTag(tag)
      revalidateTag(`global-${tag}`)
      revalidateTag('global')
      payload.logger.info(`Revalidated global tag: ${tag}, global-${tag}, global, and paths: ${paths.join(', ')}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate globals: ${err}`)
    }
    return doc
  }

