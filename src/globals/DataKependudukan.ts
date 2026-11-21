import type { GlobalConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateGlobal } from '../hooks/revalidate'

export const DataKependudukan: GlobalConfig = {
  slug: 'data-kependudukan',
  label: 'Data Kependudukan',
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
          name: 'totalPenduduk',
          label: 'Total Jumlah Penduduk (Jiwa)',
          type: 'number',
          required: true,
          defaultValue: 5248,
          admin: { width: '50%' },
        },
        {
          name: 'jumlahKepalaKeluarga',
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
          name: 'jumlahLakiLaki',
          label: 'Jumlah Laki-laki (Jiwa)',
          type: 'number',
          required: true,
          defaultValue: 2614,
          admin: { width: '50%' },
        },
        {
          name: 'jumlahPerempuan',
          label: 'Jumlah Perempuan (Jiwa)',
          type: 'number',
          required: true,
          defaultValue: 2634,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'tahunData',
      label: 'Tahun Pembaruan Data Kependudukan',
      type: 'number',
      required: true,
      defaultValue: 2026,
    },
    {
      name: 'kelompokUmur',
      label: 'Distribusi Berdasarkan Kelompok Umur',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'rentang',
              label: 'Rentang Usia (Tahun)',
              type: 'text',
              required: true,
              admin: { width: '50%', placeholder: 'contoh: 0 - 5 Tahun, 6 - 12 Tahun' },
            },
            {
              name: 'jumlah',
              label: 'Jumlah Penduduk (Jiwa)',
              type: 'number',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'pekerjaan',
      label: 'Distribusi Berdasarkan Mata Pencaharian / Pekerjaan',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'namaPekerjaan',
              label: 'Jenis Pekerjaan',
              type: 'text',
              required: true,
              admin: { width: '50%', placeholder: 'contoh: Petani, Buruh Tani, Wiraswasta, PNS' },
            },
            {
              name: 'jumlah',
              label: 'Jumlah Penduduk (Jiwa)',
              type: 'number',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'pendidikan',
      label: 'Distribusi Berdasarkan Tingkat Pendidikan',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'jenjang',
              label: 'Jenjang Pendidikan',
              type: 'text',
              required: true,
              admin: { width: '50%', placeholder: 'contoh: SD / Sederajat, SMP, SMA, Sarjana' },
            },
            {
              name: 'jumlah',
              label: 'Jumlah Penduduk (Jiwa)',
              type: 'number',
              required: true,
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('data-kependudukan', '/profil/kependudukan')],
  },
}
