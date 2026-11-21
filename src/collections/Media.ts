import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'
import { anyone, canCreateMedia, canUpdateMedia, canDeleteMedia } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Pustaka Media',
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Pustaka & Konten',
    defaultColumns: ['filename', 'alt', 'uploadedBy', 'createdAt'],
  },
  access: {
    read: anyone,
    create: canCreateMedia,
    update: canUpdateMedia,
    delete: canDeleteMedia,
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
    {
      name: 'uploadedBy',
      label: 'Diunggah Oleh',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ req, operation, value }) => {
            if (operation === 'create' && req?.user) {
              return req.user.id
            }
            return value
          },
        ],
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ req }) => {
        if (req && req.file) {
          const { size, mimetype, name } = req.file

          // 1. Validasi Batas Ukuran Berkas
          if (mimetype.startsWith('image/') && size > 5 * 1024 * 1024) {
            throw new APIError('Ukuran gambar melebihi batas maksimum 5MB.', 400)
          }
          if (mimetype === 'application/pdf' && size > 20 * 1024 * 1024) {
            throw new APIError('Ukuran dokumen PDF melebihi batas maksimum 20MB.', 400)
          }
          if (mimetype === 'video/mp4' && size > 50 * 1024 * 1024) {
            throw new APIError('Ukuran video MP4 melebihi batas maksimum 50MB.', 400)
          }

          // 2. Sanitasi Nama Berkas (Karakter khusus diganti garis bawah, huruf kecil)
          if (name) {
            req.file.name = name
              .toLowerCase()
              .replace(/[^a-z0-9._-]/g, '_')
              .replace(/_{2,}/g, '_')
          }
        }
      },
    ],
  },
  upload: {
    staticDir: 'media',
    formatOptions: {
      format: 'webp',
      options: { quality: 80 },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        formatOptions: { format: 'webp', options: { quality: 80 } },
      },
    ],
    adminThumbnail: 'thumbnail',
    // Dibatasi ketat hanya untuk tipe file yang diizinkan (jpg, png, webp, pdf, mp4)
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'video/mp4',
    ],
  },
}
