import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import {
  canCreateUsers,
  canReadUsers,
  canUpdateUsers,
  canDeleteUsers,
  hideForNonSuperAdmin,
  isSuperAdminField,
  canReadSensitiveUserField,
} from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Daftar Pengguna',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
    group: 'Manajemen Sistem',
    hidden: hideForNonSuperAdmin,
  },
  access: {
    read: canReadUsers,
    create: canCreateUsers,
    update: canUpdateUsers,
    delete: canDeleteUsers,
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // Terkunci selama 10 menit setelah 5 kali gagal login berturut-turut
    tokenExpiration: 7200, // Sesi login valid selama 2 jam
    verify: false,
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Lengkap',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Alamat Email',
      type: 'email',
      required: true,
      unique: true,
      access: {
        read: canReadSensitiveUserField,
      },
    },
    {
      name: 'role',
      label: 'Peran / Hak Akses',
      type: 'select',
      required: true,
      defaultValue: 'operator',
      options: [
        { label: 'Super Admin (Akses Penuh)', value: 'super-admin' },
        { label: 'Admin Desa (Kelola Konten Desa)', value: 'admin-desa' },
        { label: 'Operator (Berita, Pengumuman, Agenda, Galeri)', value: 'operator' },
      ],
      access: {
        create: isSuperAdminField,
        update: isSuperAdminField,
        read: canReadSensitiveUserField,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data, req, originalDoc }) => {
        // Otomatis jadikan super-admin jika user pertama kali dibuat di sistem
        if (operation === 'create') {
          const count = await req.payload.count({ collection: 'users' })
          if (count.totalDocs === 0) {
            data.role = 'super-admin'
          }
        }

        // Perlindungan Super Admin Terakhir: Jangan izinkan menurunkan role Super Admin jika hanya tersisa 1
        if (
          operation === 'update' &&
          originalDoc?.role === 'super-admin' &&
          data?.role &&
          data.role !== 'super-admin'
        ) {
          const superAdminCount = await req.payload.count({
            collection: 'users',
            where: {
              role: {
                equals: 'super-admin',
              },
            },
          })
          if (superAdminCount.totalDocs <= 1) {
            throw new APIError(
              'Pelanggaran Keamanan: Super Admin terakhir tidak dapat diturunkan role-nya demi integritas sistem.',
              403
            )
          }
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ req, id }) => {
        const userToDelete = await req.payload.findByID({
          collection: 'users',
          id,
        })
        if (userToDelete?.role === 'super-admin') {
          const superAdminCount = await req.payload.count({
            collection: 'users',
            where: {
              role: {
                equals: 'super-admin',
              },
            },
          })
          if (superAdminCount.totalDocs <= 1) {
            throw new APIError(
              'Pelanggaran Keamanan: Super Admin terakhir tidak dapat dihapus demi keamanan sistem.',
              403
            )
          }
        }
      },
    ],
  },
  versions: false,
}
