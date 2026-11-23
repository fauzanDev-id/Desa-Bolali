import type { CollectionConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Dusun: CollectionConfig = {
  slug: 'dusun',
  labels: {
    singular: 'Wilayah Dusun',
    plural: 'Wilayah & Dusun',
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'kepalaDusun', 'jumlahRT', 'jumlahRW', 'urutan'],
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
      label: 'Nama Dusun',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'contoh: Dusun Bolali I, Dusun Bolali II',
      },
    },
    {
      name: 'kepalaDusun',
      label: 'Nama Kepala Dusun (Kadus)',
      type: 'text',
      required: true,
    },
    {
      name: 'jumlahRT',
      label: 'Jumlah RT',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'jumlahRW',
      label: 'Jumlah RW',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'luasWilayah',
      label: 'Perkiraan Luas Wilayah Dusun',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'contoh: 0,95 km²',
      },
    },
    {
      name: 'deskripsi',
      label: 'Keterangan / Batas Wilayah Dusun',
      type: 'textarea',
      required: false,
    },
    {
      name: 'urutan',
      label: 'Nomor Urutan',
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
        ['/profil', '/profil/wilayah-dusun', '/pemerintahan/struktur'],
        'dusun'
      ),
    ],
    afterDelete: [
      revalidateCollectionDelete(
        ['/profil', '/profil/wilayah-dusun', '/pemerintahan/struktur'],
        'dusun'
      ),
    ],
  },
}
