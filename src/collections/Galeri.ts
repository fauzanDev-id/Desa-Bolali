import type { CollectionConfig } from 'payload'
import { anyone, canManageOperatorContent } from '../access/roles'
import { formatSlugHook } from '../hooks/slug'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Galeri: CollectionConfig = {
  slug: 'galeri',
  labels: {
    singular: 'Dokumentasi Galeri',
    plural: 'Galeri Foto & Video',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'tipe', 'album', 'tanggal', 'tampilkanDiBeranda'],
    group: 'Galeri',
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
      label: 'Judul Dokumentasi',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'contoh: Pentas Seni Tradisional Desa Bolali, Panen Raya Dusun I',
      },
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
      },
      hooks: {
        beforeValidate: [formatSlugHook('judul')],
      },
    },
    {
      name: 'tipe',
      label: 'Tipe Media Dokumentasi',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'foto',
      options: [
        { label: 'Foto / Gambar', value: 'foto' },
        { label: 'Video (YouTube / Tautan)', value: 'video' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'album',
      label: 'Nama Album / Kelompok Kegiatan',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'contoh: Festival Budaya 2026, Pembangunan Fisik',
      },
    },
    {
      name: 'foto',
      label: 'Berkas Foto',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (data) => data?.tipe === 'foto',
      },
    },
    {
      name: 'videoUrl',
      label: 'URL Video YouTube',
      type: 'text',
      required: false,
      admin: {
        condition: (data) => data?.tipe === 'video',
        placeholder: 'contoh: https://www.youtube.com/watch?v=xxxxxx',
      },
    },
    {
      name: 'tanggal',
      label: 'Tanggal Dokumentasi',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'keterangan',
      label: 'Keterangan / Cerita Dokumentasi',
      type: 'textarea',
      required: false,
    },
    {
      name: 'tampilkanDiBeranda',
      label: 'Tampilkan di Carousel Galeri Beranda',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection('/galeri', 'galeri')],
    afterDelete: [revalidateCollectionDelete('/galeri', 'galeri')],
  },
}
