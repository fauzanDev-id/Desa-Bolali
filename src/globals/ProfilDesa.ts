import type { GlobalConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateGlobal } from '../hooks/revalidate'

export const ProfilDesa: GlobalConfig = {
  slug: 'profil-desa',
  label: 'Profil Desa',
  admin: {
    group: 'Profil Desa',
    hidden: hideForOperator,
  },
  access: {
    read: anyone,
    update: canManageContent,
  },
  fields: [
    {
      name: 'sejarah',
      label: 'Sejarah Singkat Desa Bolali',
      type: 'richText',
      required: true,
    },
    {
      name: 'visi',
      label: 'Visi Desa',
      type: 'textarea',
      required: true,
      defaultValue: 'Mewujudkan Desa Bolali yang Maju, Mandiri, dan Sejahtera Berbasis Pertanian dan Gotong Royong.',
    },
    {
      name: 'misi',
      label: 'Daftar Misi Desa',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'poin',
          label: 'Poin Misi',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'geografis',
      label: 'Kondisi Geografis & Topografi',
      type: 'richText',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'batasUtara',
          label: 'Batas Utara',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'batasSelatan',
          label: 'Batas Selatan',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'batasTimur',
          label: 'Batas Timur',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'batasBarat',
          label: 'Batas Barat',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'luasWilayah',
          label: 'Luas Wilayah Total',
          type: 'text',
          defaultValue: '3,75 km²',
          admin: { width: '50%' },
        },
        {
          name: 'tipologi',
          label: 'Tipologi Wilayah',
          type: 'text',
          defaultValue: 'Dataran Rendah / Pertanian',
          admin: { width: '50%' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/profil/sejarah', '/profil/visi-misi', '/profil/geografis')],
  },
}
