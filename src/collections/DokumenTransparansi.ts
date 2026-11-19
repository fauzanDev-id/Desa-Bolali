import type { CollectionConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const DokumenTransparansi: CollectionConfig = {
  slug: 'dokumen-transparansi',
  labels: {
    singular: 'Dokumen Transparansi',
    plural: 'Transparansi & APBDes',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'tahun', 'persentaseRealisasi', 'tampilkanDiBeranda'],
    group: 'Transparansi',
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
      name: 'judul',
      label: 'Nama Dokumen / Laporan',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'contoh: APBDes Tahun 2026, Laporan Realisasi Tahap I',
      },
    },
    {
      name: 'kategori',
      label: 'Kategori Dokumen Transparansi',
      type: 'select',
      required: true,
      defaultValue: 'APBDes',
      options: [
        { label: 'APBDes (Anggaran Pendapatan & Belanja Desa)', value: 'APBDes' },
        { label: 'Laporan Realisasi APBDes', value: 'Realisasi' },
        { label: 'Laporan Pembangunan & Infrastruktur', value: 'Laporan Pembangunan' },
        { label: 'Rencana Kerja Pemerintah Desa (RKPDes)', value: 'Rencana Kerja' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tahun',
      label: 'Tahun Anggaran',
      type: 'number',
      required: true,
      defaultValue: 2026,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'persentaseRealisasi',
      label: 'Persentase Realisasi (%)',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Digunakan untuk diagram persentase donat realisasi APBDes di beranda (misal: 92.3).',
      },
    },
    {
      name: 'nominalAnggaran',
      label: 'Nominal Total Anggaran (Rp)',
      type: 'number',
      required: false,
      admin: {
        position: 'sidebar',
        placeholder: 'contoh: 1850000000',
      },
    },
    {
      name: 'filePdf',
      label: 'Berkas Dokumen PDF',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Unggah berkas dokumen PDF resmi yang dapat diunduh publik.',
      },
    },
    {
      name: 'keterangan',
      label: 'Catatan / Keterangan Tambahan',
      type: 'textarea',
      required: false,
    },
    {
      name: 'tampilkanDiBeranda',
      label: 'Tampilkan di Bagian Transparansi Beranda',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'urutan',
      label: 'Nomor Urutan Tampilan',
      type: 'number',
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection('/transparansi')],
    afterDelete: [revalidateCollectionDelete('/transparansi')],
  },
}
