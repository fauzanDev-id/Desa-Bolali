import type { CollectionConfig } from 'payload'
import { canManageUsers, isSuperAdminField } from '../access/roles'

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
  },
  access: {
    read: canManageUsers,
    create: canManageUsers,
    update: canManageUsers,
    delete: ({ req: { user } }) => Boolean(user && user.role === 'super-admin'),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Nama Lengkap',
      type: 'text',
      required: true,
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
        update: isSuperAdminField,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        // Otomatis jadikan super-admin jika user pertama kali dibuat di sistem
        if (operation === 'create') {
          const count = await req.payload.count({ collection: 'users' })
          if (count.totalDocs === 0) {
            data.role = 'super-admin'
          }
        }
        return data
      },
    ],
  },
  versions: false,
}
