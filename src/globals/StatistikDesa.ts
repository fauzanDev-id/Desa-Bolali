import type { GlobalConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateGlobal } from '../hooks/revalidate'

export const StatistikDesa: GlobalConfig = {
  slug: 'statistik-desa',
  label: 'Statistik & Status Desa',
  admin: {
    group: 'Profil Desa',
    hidden: hideForOperator,
  },
  access: {
    read: anyone,
    update: canManageContent,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'jumlahPenduduk',
          label: 'Jumlah Penduduk (Jiwa)',
          type: 'number',
          required: true,
          defaultValue: 5248,
          admin: { width: '50%' },
        },
        {
          name: 'jumlahKK',
          label: 'Jumlah Kepala Keluarga (KK)',
          type: 'number',
          required: true,
          defaultValue: 1642,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'luasWilayah',
          label: 'Luas Wilayah',
          type: 'text',
          required: true,
          defaultValue: '3,75 km²',
          admin: { width: '50%' },
        },
        {
          name: 'jumlahDusun',
          label: 'Jumlah Dusun',
          type: 'number',
          required: true,
          defaultValue: 4,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'indeksDesaMembangun',
          label: 'Status Indeks Desa Membangun (IDM)',
          type: 'select',
          required: true,
          defaultValue: 'Mandiri',
          options: [
            { label: 'Sangat Tertinggal', value: 'Sangat-Tertinggal' },
            { label: 'Tertinggal', value: 'Tertinggal' },
            { label: 'Berkembang', value: 'Berkembang' },
            { label: 'Maju', value: 'Maju' },
            { label: 'Mandiri', value: 'Mandiri' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'taglineIDM',
          label: 'Slogan IDM',
          type: 'text',
          defaultValue: 'Maju Bersama Untuk Desa Lebih Baik',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'statusDesaDigital',
          label: 'Label Desa Digital',
          type: 'text',
          defaultValue: 'Desa Digital',
          admin: { width: '50%' },
        },
        {
          name: 'taglineDesaDigital',
          label: 'Deskripsi Singkat Desa Digital',
          type: 'text',
          defaultValue: 'Transparan, Partisipatif, dan Inovatif',
          admin: { width: '50%' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('statistik-desa', '/')],
  },
}
