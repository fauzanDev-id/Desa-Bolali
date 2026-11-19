import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Pustaka Media',
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Pustaka & Konten',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      name: 'alt',
      label: 'Deskripsi Berkas / Teks Alt (Wajib untuk Aksesibilitas Gambar)',
      type: 'text',
      required: false,
    },
    {
      name: 'caption',
      label: 'Keterangan Singkat',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
}
