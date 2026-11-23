import type { CollectionConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const PerangkatDesa: CollectionConfig = {
  slug: 'perangkat-desa',
  labels: {
    singular: 'Perangkat Desa',
    plural: 'Perangkat Desa',
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'jabatan', 'kategoriJabatan', 'urutan', 'statusAktif'],
    group: 'Pemerintahan',
    hidden: hideForOperator,
  },
  access: {
    read: anyone,
    create: canManageContent,
    update: canManageContent,
    delete: canManageContent,
  },
  fields: [
    {
      name: 'nama',
      label: 'Nama Lengkap (Beserta Gelar)',
      type: 'text',
      required: true,
    },
    {
      name: 'jabatan',
      label: 'Nama Jabatan',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'contoh: Kepala Desa, Sekretaris Desa, Kaur Keuangan',
      },
    },
    {
      name: 'kategoriJabatan',
      label: 'Kelompok Jabatan',
      type: 'select',
      required: true,
      defaultValue: 'Sekretariat',
      options: [
        { label: 'Kepala Desa', value: 'Kepala-Desa' },
        { label: 'Sekretariat Desa', value: 'Sekretariat' },
        { label: 'Pelaksana Teknis (Kasi)', value: 'Teknis' },
        { label: 'Pelaksana Kewilayahan (Kepala Dusun)', value: 'Kewilayahan' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'niap',
      label: 'NIAP / NIPD',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'foto',
      label: 'Pas Foto Resmi',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'urutan',
      label: 'Nomor Urutan Tampilan',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
        description: 'Semakin kecil angka, semakin awal ditampilkan di bagan/daftar.',
      },
    },
    {
      name: 'statusAktif',
      label: 'Status Menjabat Aktif',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      revalidateCollection(
        ['/pemerintahan', '/pemerintahan/struktur', '/pemerintahan/perangkat-desa'],
        'perangkat-desa'
      ),
    ],
    afterDelete: [
      revalidateCollectionDelete(
        ['/pemerintahan', '/pemerintahan/struktur', '/pemerintahan/perangkat-desa'],
        'perangkat-desa'
      ),
    ],
  },
}
