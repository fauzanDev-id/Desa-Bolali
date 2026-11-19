import type { CollectionConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { formatSlugHook } from '../hooks/slug'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Potensi: CollectionConfig = {
  slug: 'potensi',
  labels: {
    singular: 'Potensi Desa',
    plural: 'Potensi Unggulan Desa',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'unggulan', 'urutan'],
    group: 'Potensi Desa',
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
      label: 'Nama Potensi / Komoditas / Objek',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'contoh: Kerajinan Gerabah Tradisional, Agrowisata Padi Organik',
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
      name: 'kategori',
      label: 'Kategori Potensi',
      type: 'select',
      required: true,
      defaultValue: 'Pertanian',
      options: [
        { label: 'BUMDes (Badan Usaha Milik Desa)', value: 'BUMDes' },
        { label: 'Pertanian & Perkebunan', value: 'Pertanian' },
        { label: 'UMKM & Industri Kreatif', value: 'UMKM' },
        { label: 'Wisata Alam & Edukasi', value: 'Wisata' },
        { label: 'Seni, Budaya & Tradisi', value: 'Seni-Budaya' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ringkasan',
      label: 'Ringkasan Singkat',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Ringkasan yang ditampilkan pada kartu potensi di halaman beranda.',
      },
    },
    {
      name: 'deskripsi',
      label: 'Deskripsi Lengkap',
      type: 'richText',
      required: false,
    },
    {
      name: 'gambar',
      label: 'Foto / Gambar Utama',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'kontakPengelola',
      label: 'Kontak Pengelola / Narahubung',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
        placeholder: 'contoh: 081234567890 (Pak Sugeng)',
      },
    },
    {
      name: 'lokasi',
      label: 'Lokasi / Alamat Usaha',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'unggulan',
      label: 'Tampilkan di Beranda sebagai Potensi Unggulan',
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
    afterChange: [revalidateCollection('/potensi-desa')],
    afterDelete: [revalidateCollectionDelete('/potensi-desa')],
  },
}
