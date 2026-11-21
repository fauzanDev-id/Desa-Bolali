import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Revalidasi Next.js cache untuk koleksi setelah pembuatan atau pembaruan dokumen
 */
export const revalidateCollection =
  (path: string, tag?: string): CollectionAfterChangeHook =>
  async ({ doc, req: { payload } }) => {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      revalidatePath(path)
      revalidatePath('/')
      if (tag) revalidateTag(tag)
      payload.logger.info(`Revalidated path: ${path}, /, and tag: ${tag || 'none'}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate path ${path}: ${err}`)
    }
    return doc
  }

/**
 * Revalidasi Next.js cache untuk koleksi setelah penghapusan dokumen
 */
export const revalidateCollectionDelete =
  (path: string, tag?: string): CollectionAfterDeleteHook =>
  async ({ doc, req: { payload } }) => {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache')
      revalidatePath(path)
      revalidatePath('/')
      if (tag) revalidateTag(tag)
      payload.logger.info(`Revalidated path after delete: ${path}, /, and tag: ${tag || 'none'}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate path ${path}: ${err}`)
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
      revalidatePath('/')
      revalidateTag(tag)
      revalidateTag('global')
      payload.logger.info(`Revalidated global tag: ${tag}, global, and paths: ${paths.join(', ')}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate globals: ${err}`)
    }
    return doc
  }
