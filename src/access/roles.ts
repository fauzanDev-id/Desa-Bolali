import type { Access, FieldAccess } from 'payload'

export type UserRole = 'super-admin' | 'admin-desa' | 'operator'

/**
 * Akses publik (siapa saja bisa membaca)
 */
export const anyone: Access = () => true

/**
 * Akses khusus pengguna yang sudah login
 */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/**
 * Hanya Super Admin
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'super-admin')
}

/**
 * Super Admin atau Admin Desa
 */
export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'super-admin' || user.role === 'admin-desa'))
}

/**
 * Semua staf terdaftar (Super Admin, Admin Desa, Operator)
 */
export const isStaff: Access = ({ req: { user } }) => {
  return Boolean(
    user && (user.role === 'super-admin' || user.role === 'admin-desa' || user.role === 'operator')
  )
}

/**
 * Akses kelola akun pengguna:
 * Super Admin bisa kelola semua pengguna, pengguna biasa hanya bisa mengedit profilnya sendiri
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
 * Field Access: Hanya Super Admin yang bisa mengubah nilai field tertentu (misal: role)
 */
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user.role === 'super-admin')
}
