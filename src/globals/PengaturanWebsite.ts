import type { GlobalConfig } from 'payload'
import { anyone, canManageWebsiteSettings, hideForNonSuperAdmin } from '../access/roles'
import { revalidateGlobal } from '../hooks/revalidate'

export const PengaturanWebsite: GlobalConfig = {
  slug: 'pengaturan-website',
  label: 'Pengaturan Website',
  admin: {
    group: 'Pengaturan Website',
    hidden: hideForNonSuperAdmin,
  },
  access: {
    read: anyone,
    update: canManageWebsiteSettings,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identitas & Logo',
          fields: [
            {
              name: 'namaWebsite',
              label: 'Nama Website / Desa',
              type: 'text',
              required: true,
              defaultValue: 'Desa Bolali',
            },
            {
              name: 'namaInstansi',
              label: 'Nama Instansi',
              type: 'text',
              required: true,
              defaultValue: 'Pemerintah Desa Bolali',
            },
            {
              name: 'subInstansi',
              label: 'Keterangan Wilayah',
              type: 'text',
              required: true,
              defaultValue: 'Kecamatan Wonosari - Kabupaten Klaten - Jawa Tengah',
            },
            {
              name: 'tagline',
              label: 'Tagline Desa',
              type: 'text',
              required: true,
              defaultValue: 'Desa Maju, Mandiri, Sejahtera',
            },
            {
              name: 'deskripsiHero',
              label: 'Teks Deskripsi Hero Banner',
              type: 'textarea',
              required: true,
              defaultValue:
                'Bersama membangun desa dengan pelayanan terbaik, informasi yang transparan dan inovasi untuk masa depan.',
            },
            {
              name: 'logo',
              label: 'Logo Resmi Desa / Kabupaten',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
          ],
        },
        {
          label: 'Banner Slider Beranda',
          fields: [
            {
              name: 'bannerSlider',
              label: 'Daftar Slide Banner',
              type: 'array',
              fields: [
                {
                  name: 'gambar',
                  label: 'Gambar Latar Banner (High Resolution)',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'judul',
                  label: 'Judul Banner',
                  type: 'text',
                  defaultValue: 'Selamat Datang di Desa Bolali',
                },
                {
                  name: 'subjudul',
                  label: 'Subjudul / Slogan',
                  type: 'text',
                  defaultValue: 'Desa Maju, Mandiri, Sejahtera',
                },
                {
                  name: 'teksTombolUtama',
                  label: 'Teks Tombol Aksi',
                  type: 'text',
                  defaultValue: 'Jelajahi Desa',
                },
                {
                  name: 'tautanTombolUtama',
                  label: 'Tautan Tombol Aksi',
                  type: 'text',
                  defaultValue: '#potensi',
                },
              ],
            },
          ],
        },
        {
          label: 'Media Sosial',
          fields: [
            {
              name: 'mediaSosial',
              label: 'Tautan Akun Media Sosial Resmi',
              type: 'group',
              fields: [
                {
                  name: 'youtube',
                  label: 'URL Channel YouTube',
                  type: 'text',
                  defaultValue: 'https://youtube.com',
                },
                {
                  name: 'facebook',
                  label: 'URL Halaman Facebook',
                  type: 'text',
                  defaultValue: 'https://facebook.com',
                },
                {
                  name: 'instagram',
                  label: 'URL Akun Instagram',
                  type: 'text',
                  defaultValue: 'https://instagram.com',
                },
                {
                  name: 'tiktok',
                  label: 'URL Akun TikTok',
                  type: 'text',
                  defaultValue: 'https://tiktok.com',
                },
              ],
            },
          ],
        },
        {
          label: 'Footer & Hak Cipta',
          fields: [
            {
              name: 'teksFooter',
              label: 'Slogan / Teks Informasi Footer',
              type: 'textarea',
              defaultValue: '“Bersama Membangun Desa yang Lebih Baik”',
            },
            {
              name: 'copyright',
              label: 'Teks Hak Cipta (Copyright)',
              type: 'text',
              required: true,
              defaultValue: '© 2026 Desa Bolali. All Rights Reserved',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('/')],
  },
}
