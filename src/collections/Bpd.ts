import type { CollectionConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

export const Bpd: CollectionConfig = {
  slug: 'bpd',
  labels: {
    singular: 'Anggota BPD',
    plural: 'Badan Permusyawaratan Desa (BPD)',
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'jabatan', 'keterangan', 'urutan'],
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
      label: 'Nama Lengkap Anggota BPD',
      type: 'text',
      required: true,
    },
    {
      name: 'jabatan',
      label: 'Jabatan di BPD',
      type: 'text',
      required: true,
      defaultValue: 'Anggota',
      admin: {
        placeholder: 'contoh: Ketua BPD, Wakil Ketua, Sekretaris, Anggota',
      },
    },
    {
      name: 'keterangan',
      label: 'Keterwakilan Wilayah / Bidang',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'contoh: Keterwakilan Perempuan, Keterwakilan Dusun Bolali I',
      },
    },
    {
      name: 'foto',
      label: 'Foto Anggota',
      type: 'upload',
      relationTo: 'media',
      required: false,
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
    afterChange: [revalidateCollection('/pemerintahan')],
    afterDelete: [revalidateCollectionDelete('/pemerintahan')],
  },
}
