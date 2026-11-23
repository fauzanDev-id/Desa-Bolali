import type { GlobalConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateGlobal } from '../hooks/revalidate'

export const SambutanKepalaDesa: GlobalConfig = {
  slug: 'sambutan-kepala-desa',
  label: 'Sambutan Kepala Desa',
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
      name: 'namaKepalaDesa',
      label: 'Nama Kepala Desa',
      type: 'text',
      required: true,
      defaultValue: 'H. Ahmad Santoso [Data Dummy]',
    },
    {
      name: 'jabatan',
      label: 'Jabatan Resmi',
      type: 'text',
      required: true,
      defaultValue: 'Kepala Desa Bolali',
    },
    {
      name: 'foto',
      label: 'Pas Foto Resmi Kepala Desa (Seragam Putih / PDU)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'kutipanSingkat',
      label: 'Kutipan / Quote Sambutan (Untuk Kartu Beranda)',
      type: 'textarea',
      required: true,
      defaultValue:
        '“Mari kita bersama-sama membangun Desa Bolali menuju desa yang maju, mandiri dan sejahtera.”',
    },
    {
      name: 'isiLengkap',
      label: 'Naskah Sambutan Lengkap',
      type: 'richText',
      required: false,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('sambutan-kades', '/', '/profil/sambutan-kades')],
  },
}
