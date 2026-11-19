import type { GlobalConfig } from 'payload'
import { anyone, canManageContent, hideForOperator } from '../access/roles'
import { revalidateGlobal } from '../hooks/revalidate'

export const Kontak: GlobalConfig = {
  slug: 'kontak',
  label: 'Informasi & Halaman Kontak',
  admin: {
    group: 'Halaman Kontak',
    hidden: hideForOperator,
  },
  access: {
    read: anyone,
    update: canManageContent,
  },
  fields: [
    {
      name: 'alamat',
      label: 'Alamat Lengkap Kantor Desa',
      type: 'textarea',
      required: true,
      defaultValue: 'Jl. Mawar No. 10, Desa Bolali, Kec. Wonosari, Kab. Klaten, Jawa Tengah',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'kodePos',
          label: 'Kode Pos',
          type: 'text',
          defaultValue: '57473',
          admin: { width: '50%' },
        },
        {
          name: 'telepon',
          label: 'Nomor Telepon Kantor',
          type: 'text',
          required: true,
          defaultValue: '(0271) 1234567',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'whatsapp',
          label: 'Nomor WhatsApp Layanan Warga',
          type: 'text',
          defaultValue: '08123456789',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          label: 'Alamat Email Resmi Desa',
          type: 'text',
          required: true,
          defaultValue: 'desa@bolali.desa.id',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'jamOperasional',
      label: 'Jam Pelayanan Kantor',
      type: 'text',
      required: true,
      defaultValue: 'Senin - Jumat: 08.00 - 15.30 WIB',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          label: 'Koordinat Latitude',
          type: 'number',
          defaultValue: -7.6321,
          admin: { width: '50%' },
        },
        {
          name: 'longitude',
          label: 'Koordinat Longitude',
          type: 'number',
          defaultValue: 110.7432,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'googleMapsEmbedUrl',
      label: 'Tautan Sematan (Embed URL) Google Maps',
      type: 'textarea',
      required: false,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/', '/kontak')],
  },
}
