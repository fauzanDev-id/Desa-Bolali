import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Daftar Pengguna',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
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
        // Hanya super-admin yang bisa mengubah role
        update: ({ req: { user } }) => {
          return user?.role === 'super-admin'
        },
      },
    },
  ],
  versions: false,
}
