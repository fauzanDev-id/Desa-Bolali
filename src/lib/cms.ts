import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface WebsiteSettingsData {
  namaWebsite: string
  namaInstansi: string
  subInstansi: string
  tagline: string
  deskripsiHero: string
  logo?: any
  menuNavigasi?: Array<{
    label: string
    url: string
    submenus?: Array<{
      label: string
      url: string
    }> | null
  }> | null
  mediaSosial?: {
    youtube?: string | null
    facebook?: string | null
    instagram?: string | null
    tiktok?: string | null
  } | null
  teksFooter?: string | null
  copyright?: string | null
}

export interface ContactData {
  alamat: string
  kodePos?: string | null
  telepon: string
  whatsapp?: string | null
  email: string
  jamOperasional: string
  latitude?: number | null
  longitude?: number | null
  googleMapsEmbedUrl?: string | null
}

export const defaultWebsiteSettings: WebsiteSettingsData = {
  namaWebsite: 'Desa Bolali',
  namaInstansi: 'Pemerintah Desa Bolali',
  subInstansi: 'Kecamatan Wonosari - Kabupaten Klaten - Jawa Tengah',
  tagline: 'Desa Maju, Mandiri, Sejahtera',
  deskripsiHero:
    'Bersama membangun desa dengan pelayanan terbaik, informasi yang transparan dan inovasi untuk masa depan.',
  menuNavigasi: [
    { label: 'Beranda', url: '/' },
    {
      label: 'Profil Desa',
      url: '/profil',
      submenus: [
        { label: 'Sejarah Desa', url: '/profil#sejarah' },
        { label: 'Visi & Misi', url: '/profil#visi-misi' },
        { label: 'Geografis & Wilayah', url: '/profil#geografis' },
        { label: 'Data Kependudukan', url: '/profil#kependudukan' },
        { label: 'Wilayah & Dusun', url: '/profil#dusun' },
      ],
    },
    {
      label: 'Pemerintahan',
      url: '/pemerintahan',
      submenus: [
        { label: 'Struktur Organisasi', url: '/pemerintahan#struktur' },
        { label: 'Kepala Desa', url: '/pemerintahan#kepala-desa' },
        { label: 'Perangkat Desa', url: '/pemerintahan#perangkat' },
        { label: 'Badan Permusyawaratan Desa (BPD)', url: '/pemerintahan#bpd' },
        { label: 'Rukun Tetangga & RW', url: '/pemerintahan#rt-rw' },
      ],
    },
    {
      label: 'Informasi',
      url: '/informasi',
      submenus: [
        { label: 'Berita Desa', url: '/informasi/berita' },
        { label: 'Pengumuman Warga', url: '/informasi/pengumuman' },
        { label: 'Agenda Kegiatan', url: '/informasi/agenda' },
      ],
    },
    {
      label: 'Potensi Desa',
      url: '/potensi-desa',
      submenus: [
        { label: 'BUMDes', url: '/potensi-desa#bumdes' },
        { label: 'Pertanian & Perkebunan', url: '/potensi-desa#pertanian' },
        { label: 'UMKM & Industri Warga', url: '/potensi-desa#umkm' },
        { label: 'Wisata Alam & Edukasi', url: '/potensi-desa#wisata' },
        { label: 'Seni & Kebudayaan', url: '/potensi-desa#seni-budaya' },
      ],
    },
    {
      label: 'Transparansi',
      url: '/transparansi',
      submenus: [
        { label: 'APBDes', url: '/transparansi#apbdes' },
        { label: 'Realisasi APBDes', url: '/transparansi#realisasi' },
        { label: 'Laporan Pembangunan', url: '/transparansi#laporan' },
      ],
    },
    {
      label: 'Galeri',
      url: '/galeri',
      submenus: [
        { label: 'Galeri Foto', url: '/galeri?tipe=foto' },
        { label: 'Galeri Video', url: '/galeri?tipe=video' },
      ],
    },
    { label: 'Kontak', url: '/kontak' },
  ],
  mediaSosial: {
    youtube: 'https://youtube.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  },
  teksFooter: '“Bersama Membangun Desa yang Lebih Baik”',
  copyright: '© 2026 Desa Bolali. All Rights Reserved',
}

export const defaultContactData: ContactData = {
  alamat: 'Jl. Mawar No. 10, Desa Bolali, Kec. Wonosari, Kab. Klaten, Jawa Tengah',
  kodePos: '57473',
  telepon: '(0271) 1234567',
  whatsapp: '08123456789',
  email: 'desa@bolali.desa.id',
  jamOperasional: 'Senin - Jumat: 08.00 - 15.30 WIB',
  latitude: -7.6321,
  longitude: 110.7432,
}

/**
 * Mengambil Pengaturan Website dari Payload CMS secara dinamis
 */
export async function getWebsiteSettings(): Promise<WebsiteSettingsData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'pengaturan-website' })
    if (!data) return defaultWebsiteSettings

    return {
      namaWebsite: data.namaWebsite || defaultWebsiteSettings.namaWebsite,
      namaInstansi: data.namaInstansi || defaultWebsiteSettings.namaInstansi,
      subInstansi: data.subInstansi || defaultWebsiteSettings.subInstansi,
      tagline: data.tagline || defaultWebsiteSettings.tagline,
      deskripsiHero: data.deskripsiHero || defaultWebsiteSettings.deskripsiHero,
      logo: data.logo,
      menuNavigasi:
        data.menuNavigasi && data.menuNavigasi.length > 0
          ? data.menuNavigasi.map((item) => ({
              label: item.label,
              url: item.url,
              submenus: item.submenus
                ? item.submenus.map((sub) => ({
                    label: sub.label,
                    url: sub.url,
                  }))
                : [],
            }))
          : defaultWebsiteSettings.menuNavigasi,
      mediaSosial: {
        youtube: data.mediaSosial?.youtube || defaultWebsiteSettings.mediaSosial?.youtube,
        facebook: data.mediaSosial?.facebook || defaultWebsiteSettings.mediaSosial?.facebook,
        instagram: data.mediaSosial?.instagram || defaultWebsiteSettings.mediaSosial?.instagram,
        tiktok: data.mediaSosial?.tiktok || defaultWebsiteSettings.mediaSosial?.tiktok,
      },
      teksFooter: data.teksFooter || defaultWebsiteSettings.teksFooter,
      copyright: data.copyright || defaultWebsiteSettings.copyright,
    }
  } catch (error) {
    return defaultWebsiteSettings
  }
}

/**
 * Mengambil Data Kontak dari Payload CMS secara dinamis
 */
export async function getContactData(): Promise<ContactData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'kontak' })
    if (!data) return defaultContactData

    return {
      alamat: data.alamat || defaultContactData.alamat,
      kodePos: data.kodePos || defaultContactData.kodePos,
      telepon: data.telepon || defaultContactData.telepon,
      whatsapp: data.whatsapp || defaultContactData.whatsapp,
      email: data.email || defaultContactData.email,
      jamOperasional: data.jamOperasional || defaultContactData.jamOperasional,
      latitude: data.latitude || defaultContactData.latitude,
      longitude: data.longitude || defaultContactData.longitude,
      googleMapsEmbedUrl: data.googleMapsEmbedUrl,
    }
  } catch (error) {
    return defaultContactData
  }
}
