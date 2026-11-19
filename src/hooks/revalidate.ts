import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Revalidasi Next.js cache untuk koleksi setelah pembuatan atau pembaruan dokumen
 */
export const revalidateCollection =
  (path: string): CollectionAfterChangeHook =>
  ({ doc, req: { payload } }) => {
    try {
      revalidatePath(path)
      revalidatePath('/') // Revalidasi beranda jika ada data terkait yang ditampilkan
      payload.logger.info(`Revalidated path: ${path} and /`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate path ${path}: ${err}`)
    }
    return doc
  }

/**
 * Revalidasi Next.js cache untuk koleksi setelah penghapusan dokumen
 */
export const revalidateCollectionDelete =
  (path: string): CollectionAfterDeleteHook =>
  ({ doc, req: { payload } }) => {
    try {
      revalidatePath(path)
      revalidatePath('/')
      payload.logger.info(`Revalidated path after delete: ${path} and /`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate path ${path}: ${err}`)
    }
    return doc
  }

/**
 * Revalidasi Next.js cache untuk singleton global
 */
export const revalidateGlobal =
  (...paths: string[]): GlobalAfterChangeHook =>
  ({ doc, req: { payload } }) => {
    try {
      for (const p of paths) {
        revalidatePath(p)
      }
      revalidatePath('/')
      payload.logger.info(`Revalidated global paths: ${paths.join(', ')}`)
    } catch (err) {
      payload.logger.warn(`Could not revalidate globals: ${err}`)
    }
    return doc
  }
