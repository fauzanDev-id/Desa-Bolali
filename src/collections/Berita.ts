import type { CollectionConfig } from 'payload'
import { anyone, canManageOperatorContent } from '../access/roles'
import { formatSlugHook } from '../hooks/slug'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Berita: CollectionConfig = {
  slug: 'berita',
  labels: {
    singular: 'Berita',
    plural: 'Berita Desa',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'tanggalTerbit', 'status'],
    group: 'Informasi',
  },
  access: {
    read: anyone,
    create: canManageOperatorContent,
    update: canManageOperatorContent,
    delete: canManageOperatorContent,
  },
  fields: [
    {
      name: 'judul',
      label: 'Judul Berita',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug URL',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Dibuat otomatis dari judul berita jika dikosongkan.',
      },
      hooks: {
        beforeValidate: [formatSlugHook('judul')],
      },
    },
    {
      name: 'ringkasan',
      label: 'Ringkasan Berita',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Ringkasan 1-2 kalimat untuk kartu pratinjau berita di beranda.',
      },
    },
    {
      name: 'isi',
      label: 'Isi Lengkap Berita',
      type: 'richText',
      required: true,
    },
    {
      name: 'gambar',
      label: 'Gambar Utama / Thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'kategori',
      label: 'Kategori Berita',
      type: 'select',
      required: true,
      defaultValue: 'Pemerintahan',
      options: [
        { label: 'Pemerintahan', value: 'Pemerintahan' },
        { label: 'Pembangunan & Infrastruktur', value: 'Pembangunan' },
        { label: 'Kemasyarakatan', value: 'Kemasyarakatan' },
        { label: 'Pertanian & Lingkungan', value: 'Pertanian' },
        { label: 'Pendidikan & Kesehatan', value: 'Pendidikan-Kesehatan' },
        { label: 'Seni, Budaya & Tradisi', value: 'Seni-Budaya' },
        { label: 'Kegiatan Warga', value: 'Kegiatan-Warga' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tanggalTerbit',
      label: 'Tanggal Terbit',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      label: 'Status Publikasi',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'terbit',
      options: [
        { label: 'Draf', value: 'draft' },
        { label: 'Terbit', value: 'terbit' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'unggulan',
      label: 'Tampilkan sebagai Berita Utama di Beranda',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection('/informasi/berita', 'berita')],
    afterDelete: [revalidateCollectionDelete('/informasi/berita', 'berita')],
  },
}
