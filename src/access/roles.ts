import type { Access, FieldAccess } from 'payload'

export type UserRole = 'super-admin' | 'admin-desa' | 'operator'

/**
 * Akses publik: Siapa saja dapat melihat/membaca konten
 */
export const anyone: Access = () => true

/**
 * Akses khusus pengguna yang telah terautentikasi (login)
 */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/**
 * Hak akses khusus: Hanya Super Admin
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'super-admin')
}

/**
 * Hak akses Pengaturan Website: Hanya Super Admin
 */
export const canManageWebsiteSettings: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'super-admin')
}

/**
 * Hak akses Manajemen Pengguna (Users):
 * - Super Admin dapat mengelola semua akun pengguna
 * - Pengguna terautentikasi lain hanya dapat melihat/mengedit profil mereka sendiri
 */
export const canManageUsers: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * Hak akses Semua Konten Desa (Profil, Pemerintahan, Potensi, Transparansi, dsb.):
 * - Super Admin dan Admin Desa memiliki akses penuh (CRUD)
 * - Operator ditolak (tidak bisa CRUD)
 */
export const canManageContent: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super-admin' || user.role === 'admin-desa'
}

/**
 * Hak akses Konten Operasional (Berita, Pengumuman, Agenda, Galeri):
 * - Super Admin, Admin Desa, dan Operator dapat membuat, mengubah, dan menghapus (CRUD)
 */
export const canManageOperatorContent: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['super-admin', 'admin-desa', 'operator'].includes(user.role as string)
}

/**
 * Hak akses staf untuk mengunggah media
 */
export const isStaff: Access = canManageOperatorContent

/**
 * Field Access: Hanya Super Admin yang berhak memodifikasi kolom sensitif (seperti role)
 */
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user.role === 'super-admin')
}

/**
 * UI Admin Panel: Sembunyikan menu navigasi bagi Operator
 */
export const hideForOperator = ({ user }: { user?: any }) => {
  return Boolean(user && user.role === 'operator')
}

/**
 * UI Admin Panel: Sembunyikan menu navigasi bagi pengguna selain Super Admin
 */
export const hideForNonSuperAdmin = ({ user }: { user?: any }) => {
  return Boolean(!user || user.role !== 'super-admin')
}
