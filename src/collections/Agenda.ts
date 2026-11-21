import type { CollectionConfig } from 'payload'
import { anyone, canManageOperatorContent } from '../access/roles'
import { formatSlugHook } from '../hooks/slug'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Agenda: CollectionConfig = {
  slug: 'agenda',
  labels: {
    singular: 'Agenda Kegiatan',
    plural: 'Agenda Kegiatan',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'tanggalMulai', 'lokasi', 'status'],
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
      label: 'Nama Kegiatan / Agenda',
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
      name: 'deskripsi',
      label: 'Deskripsi Rincian Kegiatan',
      type: 'textarea',
      required: false,
    },
    {
      name: 'tanggalMulai',
      label: 'Waktu Mulai',
      type: 'date',
      required: true,
      index: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'tanggalSelesai',
      label: 'Waktu Selesai (Opsional)',
      type: 'date',
      required: false,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'lokasi',
      label: 'Lokasi / Tempat Pelaksanaan',
      type: 'text',
      required: true,
      defaultValue: 'Balai Desa Bolali',
    },
    {
      name: 'penyelenggara',
      label: 'Pihak Penyelenggara',
      type: 'text',
      defaultValue: 'Pemerintah Desa Bolali',
    },
    {
      name: 'status',
      label: 'Status Agenda',
      type: 'select',
      required: true,
      index: true,
      defaultValue: 'Akan Datang',
      options: [
        { label: 'Akan Datang', value: 'Akan Datang' },
        { label: 'Sedang Berlangsung', value: 'Berlangsung' },
        { label: 'Telah Selesai', value: 'Selesai' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection('/informasi/agenda', 'agenda')],
    afterDelete: [revalidateCollectionDelete('/informasi/agenda', 'agenda')],
  },
}
