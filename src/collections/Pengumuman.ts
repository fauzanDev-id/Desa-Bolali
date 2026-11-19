import type { CollectionConfig } from 'payload'
import { anyone, canManageOperatorContent } from '../access/roles'
import { formatSlugHook } from '../hooks/slug'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Pengumuman: CollectionConfig = {
  slug: 'pengumuman',
  labels: {
    singular: 'Pengumuman',
    plural: 'Pengumuman Warga',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'prioritas', 'tanggal', 'status'],
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
      label: 'Judul Pengumuman',
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
      },
      hooks: {
        beforeValidate: [formatSlugHook('judul')],
      },
    },
    {
      name: 'ringkasan',
      label: 'Ringkasan Pengumuman',
      type: 'textarea',
      required: false,
    },
    {
      name: 'isi',
      label: 'Isi Lengkap Pengumuman',
      type: 'richText',
      required: true,
    },
    {
      name: 'tanggal',
      label: 'Tanggal Pengumuman',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lampiran',
      label: 'Berkas Lampiran (Surat Edaran / PDF / Gambar)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'prioritas',
      label: 'Tingkat Prioritas',
      type: 'select',
      required: true,
      defaultValue: 'Biasa',
      options: [
        { label: 'Biasa / Umum', value: 'Biasa' },
        { label: 'Penting', value: 'Penting' },
        { label: 'Mendesak / Darurat', value: 'Mendesak' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      label: 'Status Publikasi',
      type: 'select',
      required: true,
      defaultValue: 'terbit',
      options: [
        { label: 'Draf', value: 'draft' },
        { label: 'Terbit', value: 'terbit' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection('/informasi/pengumuman')],
    afterDelete: [revalidateCollectionDelete('/informasi/pengumuman')],
  },
}
