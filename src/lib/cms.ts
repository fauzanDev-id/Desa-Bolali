import configPromise from '@payload-config'
import { getPayload } from 'payload'

export interface WebsiteSettingsData {
  namaWebsite: string
  namaInstansi: string
  subInstansi: string
  tagline: string
  deskripsiHero: string
  logo?: any
  bannerSlider?: Array<{
    gambar: any
    judul?: string | null
    subjudul?: string | null
    teksTombolUtama?: string | null
    tautanTombolUtama?: string | null
  }> | null
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

export interface StatistikDesaData {
  jumlahPenduduk: number
  jumlahKK: number
  luasWilayah: string
  jumlahDusun: number
  indeksDesaMembangun: string
  taglineIDM: string
  statusDesaDigital: string
  taglineDesaDigital: string
}

export interface SambutanKadesData {
  namaKepalaDesa: string
  jabatan: string
  foto?: any
  kutipanSingkat: string
  isiLengkap?: any
}

export interface BeritaItem {
  id: string | number
  judul: string
  slug: string
  ringkasan: string
  isi?: any
  gambar?: any
  kategori: string
  tanggalTerbit: string
  status: 'draft' | 'terbit'
  unggulan?: boolean | null
}

export interface DokumenTransparansiItem {
  id: string | number
  judul: string
  kategori: string
  tahun: number
  persentaseRealisasi?: number | null
  nominalAnggaran?: number | null
  filePdf?: any
  keterangan?: string | null
  tampilkanDiBeranda?: boolean | null
}

export interface PotensiItem {
  id: string | number
  judul: string
  slug: string
  kategori: string
  ringkasan: string
  gambar?: any
  unggulan?: boolean | null
  urutan?: number | null
}

export interface GaleriItem {
  id: string | number
  judul: string
  slug: string
  tipe: 'foto' | 'video'
  album?: string | null
  foto?: any
  videoUrl?: string | null
  tanggal: string
  keterangan?: string | null
  tampilkanDiBeranda?: boolean | null
}

// ======================== DEFAULT FALLBACK DATA ========================

export const defaultWebsiteSettings: WebsiteSettingsData = {
  namaWebsite: 'Desa Bolali',
  namaInstansi: 'Pemerintah Desa Bolali',
  subInstansi: 'Kecamatan Wonosari - Kabupaten Klaten - Jawa Tengah',
  tagline: 'Desa Maju, Mandiri, Sejahtera',
  deskripsiHero:
    'Bersama membangun desa dengan pelayanan terbaik, informasi yang transparan dan inovasi untuk masa depan.',
  bannerSlider: [
    {
      gambar: '/images/hero-desa.jpg',
      judul: 'Selamat Datang di Desa Bolali',
      subjudul: '“Desa Maju, Mandiri, Sejahtera”',
      teksTombolUtama: 'Jelajahi Desa',
      tautanTombolUtama: '#potensi',
    },
  ],
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

export const defaultStatistikDesa: StatistikDesaData = {
  jumlahPenduduk: 5248,
  jumlahKK: 1642,
  luasWilayah: '3,75 km²',
  jumlahDusun: 4,
  indeksDesaMembangun: 'Mandiri',
  taglineIDM: 'Maju Bersama Untuk Desa Lebih Baik',
  statusDesaDigital: 'Desa Digital',
  taglineDesaDigital: 'Transparan, Partisipatif, dan Inovatif',
}

export const defaultSambutanKades: SambutanKadesData = {
  namaKepalaDesa: 'H. Ahmad Santoso [Data Dummy]',
  jabatan: 'Kepala Desa Bolali',
  foto: '/images/kades.jpg',
  kutipanSingkat:
    '“Mari kita bersama-sama membangun Desa Bolali menuju desa yang maju, mandiri dan sejahtera.”',
}

export const defaultBeritaList: BeritaItem[] = [
  {
    id: 1,
    judul: 'Desa Bolali Gelar Gerakan Penghijauan untuk Masa Depan',
    slug: 'desa-bolali-gelar-gerakan-penghijauan-untuk-masa-depan',
    ringkasan:
      'Pemerintah Desa Bolali bersama masyarakat melaksanakan gerakan penghijauan di seluruh wilayah desa.',
    gambar: '/images/berita-1.jpg',
    kategori: 'Lingkungan & Pertanian',
    tanggalTerbit: '2026-11-10T08:00:00.000Z',
    status: 'terbit',
    unggulan: true,
  },
  {
    id: 2,
    judul: 'Pembangunan Infrastruktur Jalan Desa',
    slug: 'pembangunan-infrastruktur-jalan-desa',
    ringkasan: 'Realisasi pengaspalan dan pelebaran jalan poros desa penghubung antar dusun.',
    gambar: '/images/berita-2.jpg',
    kategori: 'Pembangunan',
    tanggalTerbit: '2026-11-05T09:00:00.000Z',
    status: 'terbit',
  },
  {
    id: 3,
    judul: 'Pelatihan UMKM untuk Warga Desa',
    slug: 'pelatihan-umkm-untuk-warga-desa',
    ringkasan: 'Pelatihan pengemasan dan pemasaran digital bagi pelaku usaha mikro dan industri rumahan.',
    gambar: '/images/berita-3.jpg',
    kategori: 'Perekonomian',
    tanggalTerbit: '2026-11-01T10:00:00.000Z',
    status: 'terbit',
  },
  {
    id: 4,
    judul: 'Festival Budaya Desa Bolali Sukamaju',
    slug: 'festival-budaya-desa-bolali-sukamaju',
    ringkasan: 'Pentas seni tradisional dan kirab budaya melestarikan warisan leluhur desa.',
    gambar: '/images/berita-4.jpg',
    kategori: 'Kebudayaan',
    tanggalTerbit: '2026-10-28T13:30:00.000Z',
    status: 'terbit',
  },
]

export const defaultTransparansiList: DokumenTransparansiItem[] = [
  {
    id: 1,
    judul: 'APBDes 2026',
    kategori: 'APBDes',
    tahun: 2026,
    persentaseRealisasi: 92.3,
    filePdf: '/docs/apbdes-2026.pdf',
    tampilkanDiBeranda: true,
  },
  {
    id: 2,
    judul: 'Laporan Realisasi',
    kategori: 'Realisasi',
    tahun: 2026,
    filePdf: '/docs/laporan-realisasi.pdf',
    tampilkanDiBeranda: true,
  },
  {
    id: 3,
    judul: 'Rencana Kerja',
    kategori: 'Rencana Kerja',
    tahun: 2026,
    filePdf: '/docs/rkpdes-2026.pdf',
    tampilkanDiBeranda: true,
  },
]

export const defaultPotensiList: PotensiItem[] = [
  {
    id: 1,
    judul: 'Pertanian',
    slug: 'pertanian',
    kategori: 'Pertanian',
    ringkasan: 'Lahan persawahan subur penghasil padi organik berkualitas unggul.',
    gambar: '/images/potensi-pertanian.jpg',
    unggulan: true,
  },
  {
    id: 2,
    judul: 'UMKM',
    slug: 'umkm',
    kategori: 'UMKM',
    ringkasan: 'Kerajinan gerabah, olahan pangan lokal, dan produk kreatif rumahan.',
    gambar: '/images/potensi-umkm.jpg',
    unggulan: true,
  },
  {
    id: 3,
    judul: 'Wisata Alam',
    slug: 'wisata-alam',
    kategori: 'Wisata',
    ringkasan: 'Pesona embung desa, aliran sungai jernih, dan agrowisata pedesaan.',
    gambar: '/images/potensi-wisata.jpg',
    unggulan: true,
  },
  {
    id: 4,
    judul: 'Budaya',
    slug: 'budaya',
    kategori: 'Seni & Budaya',
    ringkasan: 'Kesenian jathilan, karawitan, dan tradisi bersih dusun yang lestari.',
    gambar: '/images/potensi-budaya.jpg',
    unggulan: true,
  },
]

export const defaultGaleriList: GaleriItem[] = [
  {
    id: 1,
    judul: 'Wisata Embung & Alam',
    slug: 'wisata-embung-alam',
    tipe: 'foto',
    album: 'Pariwisata',
    foto: '/images/galeri-1.jpg',
    tanggal: '2026-11-08',
  },
  {
    id: 2,
    judul: 'Sentra UMKM Gerabah',
    slug: 'sentra-umkm-gerabah',
    tipe: 'foto',
    album: 'Perekonomian',
    foto: '/images/galeri-2.jpg',
    tanggal: '2026-11-04',
  },
  {
    id: 3,
    judul: 'Tradisi & Budaya Gotong Royong',
    slug: 'tradisi-budaya-gotong-royong',
    tipe: 'foto',
    album: 'Kebudayaan',
    foto: '/images/galeri-3.jpg',
    tanggal: '2026-10-25',
  },
  {
    id: 4,
    judul: 'Pembangunan Infrastruktur Dusun',
    slug: 'pembangunan-infrastruktur-dusun',
    tipe: 'foto',
    album: 'Pembangunan',
    foto: '/images/galeri-4.jpg',
    tanggal: '2026-10-18',
  },
]

// ======================== API FETCH FUNCTIONS ========================

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
      bannerSlider:
        data.bannerSlider && data.bannerSlider.length > 0
          ? data.bannerSlider
          : defaultWebsiteSettings.bannerSlider,
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
      googleMapsEmbedUrl: data.googleMapsEmbedUrl || undefined,
    }
  } catch (error) {
    return defaultContactData
  }
}

export async function getStatistikDesa(): Promise<StatistikDesaData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'statistik-desa' })
    if (!data) return defaultStatistikDesa

    return {
      jumlahPenduduk: data.jumlahPenduduk || defaultStatistikDesa.jumlahPenduduk,
      jumlahKK: data.jumlahKK || defaultStatistikDesa.jumlahKK,
      luasWilayah: data.luasWilayah || defaultStatistikDesa.luasWilayah,
      jumlahDusun: data.jumlahDusun || defaultStatistikDesa.jumlahDusun,
      indeksDesaMembangun: data.indeksDesaMembangun || defaultStatistikDesa.indeksDesaMembangun,
      taglineIDM: data.taglineIDM || defaultStatistikDesa.taglineIDM,
      statusDesaDigital: data.statusDesaDigital || defaultStatistikDesa.statusDesaDigital,
      taglineDesaDigital: data.taglineDesaDigital || defaultStatistikDesa.taglineDesaDigital,
    }
  } catch (error) {
    return defaultStatistikDesa
  }
}

export async function getSambutanKades(): Promise<SambutanKadesData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'sambutan-kepala-desa' })
    if (!data) return defaultSambutanKades

    return {
      namaKepalaDesa: data.namaKepalaDesa || defaultSambutanKades.namaKepalaDesa,
      jabatan: data.jabatan || defaultSambutanKades.jabatan,
      foto: data.foto || defaultSambutanKades.foto,
      kutipanSingkat: data.kutipanSingkat || defaultSambutanKades.kutipanSingkat,
      isiLengkap: data.isiLengkap,
    }
  } catch (error) {
    return defaultSambutanKades
  }
}

export async function getBeritaTerbaru(limit = 4): Promise<BeritaItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'berita',
      where: {
        status: { equals: 'terbit' },
      },
      sort: '-tanggalTerbit',
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultBeritaList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      slug: doc.slug,
      ringkasan: doc.ringkasan,
      isi: doc.isi,
      gambar: doc.gambar,
      kategori: doc.kategori,
      tanggalTerbit: doc.tanggalTerbit,
      status: doc.status,
      unggulan: doc.unggulan,
    }))
  } catch (error) {
    return defaultBeritaList
  }
}

export async function getDokumenTransparansi(limit = 3): Promise<DokumenTransparansiItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'dokumen-transparansi',
      sort: 'urutan',
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultTransparansiList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      kategori: doc.kategori,
      tahun: doc.tahun,
      persentaseRealisasi: doc.persentaseRealisasi,
      nominalAnggaran: doc.nominalAnggaran,
      filePdf: doc.filePdf,
      keterangan: doc.keterangan,
      tampilkanDiBeranda: doc.tampilkanDiBeranda,
    }))
  } catch (error) {
    return defaultTransparansiList
  }
}

export async function getPotensiUnggulan(limit = 4): Promise<PotensiItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'potensi',
      sort: 'urutan',
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultPotensiList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      slug: doc.slug,
      kategori: doc.kategori,
      ringkasan: doc.ringkasan,
      gambar: doc.gambar,
      unggulan: doc.unggulan,
    }))
  } catch (error) {
    return defaultPotensiList
  }
}

export async function getGaleriTerbaru(limit = 6): Promise<GaleriItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'galeri',
      sort: '-tanggal',
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultGaleriList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      slug: doc.slug,
      tipe: doc.tipe,
      album: doc.album,
      foto: doc.foto,
      videoUrl: doc.videoUrl,
      tanggal: doc.tanggal,
      keterangan: doc.keterangan,
      tampilkanDiBeranda: doc.tampilkanDiBeranda,
    }))
  } catch (error) {
    return defaultGaleriList
  }
}

/**
 * Helper untuk mendapatkan URL gambar aman dari field Media Payload CMS
 */
export function getMediaUrl(media: any, fallback = '/images/placeholder.jpg'): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (typeof media === 'object') {
    if (media.url) return media.url
    if (media.sizes?.card?.url) return media.sizes.card.url
    if (media.sizes?.thumbnail?.url) return media.sizes.thumbnail.url
  }
  return fallback
}
