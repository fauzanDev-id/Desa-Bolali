import type { Access, FieldAccess } from 'payload'

export type UserRole = 'super-admin' | 'admin-desa' | 'operator'

/**
 * Akses publik: Siapa saja dapat melihat/membaca konten
 */
export const anyone: Access = () => true

/**
 * Akses publik khusus konten terbit:
 * - Pengunjung publik (anonim) HANYA dapat membaca dokumen dengan status 'terbit'.
 * - Pengguna terautentikasi (staf) dapat membaca semua dokumen termasuk 'draft' di admin panel.
 */
export const readPublishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    status: {
      equals: 'terbit',
    },
  }
}

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
export const canManageWebsiteSettings: Access = isSuperAdmin

/**
 * Hak akses Pembuatan Pengguna (Users CREATE):
 * HANYA Super Admin yang boleh membuat akun baru.
 */
export const canCreateUsers: Access = isSuperAdmin

/**
 * Hak akses Membaca Pengguna (Users READ):
 * - Super Admin dapat melihat seluruh daftar pengguna
 * - Admin Desa dan Operator HANYA dapat melihat data profil mereka sendiri
 * - Pengunjung publik (tanpa login) DITOLAK total (false)
 */
export const canReadUsers: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * Hak akses Memperbarui Pengguna (Users UPDATE):
 * - Super Admin dapat mengedit semua pengguna
 * - Admin Desa dan Operator HANYA dapat mengedit akun miliknya sendiri
 * - Pengunjung publik dilarang
 */
export const canUpdateUsers: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

/**
 * Hak akses Menghapus Pengguna (Users DELETE):
 * HANYA Super Admin.
 */
export const canDeleteUsers: Access = isSuperAdmin

/**
 * Alias backward compatibility untuk canManageUsers
 */
export const canManageUsers: Access = canReadUsers

/**
 * Hak akses Semua Konten Desa (Profil, Pemerintahan, Potensi, Transparansi, dsb.):
 * - Super Admin dan Admin Desa memiliki akses penuh (CRUD)
 * - Operator ditolak (403)
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
 * Hak akses Unggah Media:
 * Seluruh staf (Super Admin, Admin Desa, Operator) boleh mengunggah berkas baru.
 */
export const canCreateMedia: Access = canManageOperatorContent
export const isStaff: Access = canCreateMedia

/**
 * Hak akses Memperbarui Media:
 * - Super Admin dan Admin Desa dapat mengubah semua media
 * - Operator HANYA dapat mengubah media yang diunggah oleh dirinya sendiri
 */
export const canUpdateMedia: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin' || user.role === 'admin-desa') return true
  if (user.role === 'operator') {
    return {
      uploadedBy: {
        equals: user.id,
      },
    }
  }
  return false
}

/**
 * Hak akses Menghapus Media:
 * - Super Admin dan Admin Desa dapat menghapus semua media
 * - Operator HANYA dapat menghapus media yang diunggah oleh dirinya sendiri
 */
export const canDeleteMedia: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin' || user.role === 'admin-desa') return true
  if (user.role === 'operator') {
    return {
      uploadedBy: {
        equals: user.id,
      },
    }
  }
  return false
}

/**
 * Field Access: Hanya Super Admin yang berhak membuat atau memodifikasi kolom sensitif (seperti role)
 */
export const isSuperAdminField: FieldAccess = ({ req: { user } }) => {
  return Boolean(user && user.role === 'super-admin')
}

/**
 * Field Access: Pembacaan data sensitif akun (seperti email & role):
 * - Super Admin dapat membaca semua
 * - Pengguna hanya dapat membaca data sensitif miliknya sendiri
 */
export const canReadSensitiveUserField: FieldAccess = ({ req: { user }, doc }) => {
  if (!user) return false
  if (user.role === 'super-admin') return true
  return Boolean(doc && doc.id === user.id)
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
