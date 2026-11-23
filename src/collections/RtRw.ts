import type { CollectionConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const RtRw: CollectionConfig = {
  slug: 'rt-rw',
  labels: {
    singular: 'Pengurus RT/RW',
    plural: 'Data RT & RW',
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'jenis', 'nomor', 'dusun', 'urutan'],
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
      label: 'Nama Ketua / Pengurus',
      type: 'text',
      required: true,
    },
    {
      name: 'jenis',
      label: 'Jenis Lembaga',
      type: 'select',
      required: true,
      defaultValue: 'RT',
      options: [
        { label: 'Rukun Tetangga (RT)', value: 'RT' },
        { label: 'Rukun Warga (RW)', value: 'RW' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'nomor',
      label: 'Nomor RT / RW',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'contoh: 01, 02, 05',
        position: 'sidebar',
      },
    },
    {
      name: 'dusun',
      label: 'Wilayah Dusun',
      type: 'relationship',
      relationTo: 'dusun',
      required: false,
    },
    {
      name: 'telepon',
      label: 'Kontak / No. Telepon',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'urutan',
      label: 'Nomor Urutan Tampilan',
      type: 'number',
      required: true,
      defaultValue: 1,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      revalidateCollection(
        ['/pemerintahan', '/pemerintahan/rt-rw'],
        'rt-rw'
      ),
    ],
    afterDelete: [
      revalidateCollectionDelete(
        ['/pemerintahan', '/pemerintahan/rt-rw'],
        'rt-rw'
      ),
    ],
  },
}
