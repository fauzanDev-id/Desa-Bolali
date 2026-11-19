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

export interface ProfilDesaData {
  sejarah: any
  visi: string
  misi: Array<{ poin: string }>
  geografis?: any
  batasUtara?: string | null
  batasSelatan?: string | null
  batasTimur?: string | null
  batasBarat?: string | null
  luasWilayah?: string | null
  tipologi?: string | null
}

export interface DataKependudukanData {
  totalPenduduk: number
  jumlahKepalaKeluarga: number
  jumlahLakiLaki: number
  jumlahPerempuan: number
  tahunData: number
  kelompokUmur?: Array<{ rentang: string; jumlah: number }>
  pekerjaan?: Array<{ namaPekerjaan: string; jumlah: number }>
  pendidikan?: Array<{ jenjang: string; jumlah: number }>
}

export interface DusunItem {
  id: string | number
  nama: string
  kepalaDusun: string
  jumlahRT: number
  jumlahRW: number
  luasWilayah?: string | null
  deskripsi?: string | null
  urutan: number
}

export interface PerangkatDesaItem {
  id: string | number
  nama: string
  jabatan: string
  kategoriJabatan: string
  niap?: string | null
  foto?: any
  urutan: number
  statusAktif: boolean
}

export interface BpdItem {
  id: string | number
  nama: string
  jabatan: string
  keterangan?: string | null
  foto?: any
  urutan: number
}

export interface RtRwItem {
  id: string | number
  nama: string
  jenis: 'RT' | 'RW'
  nomor: string
  dusun?: any
  telepon?: string | null
  urutan: number
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
        { label: 'Sejarah Desa', url: '/profil/sejarah' },
        { label: 'Visi & Misi', url: '/profil/visi-misi' },
        { label: 'Geografis & Wilayah', url: '/profil/geografis' },
        { label: 'Data Kependudukan', url: '/profil/kependudukan' },
        { label: 'Wilayah & Dusun', url: '/profil/wilayah-dusun' },
      ],
    },
    {
      label: 'Pemerintahan',
      url: '/pemerintahan',
      submenus: [
        { label: 'Struktur Organisasi', url: '/pemerintahan/struktur' },
        { label: 'Perangkat Desa', url: '/pemerintahan/perangkat-desa' },
        { label: 'Badan Permusyawaratan Desa (BPD)', url: '/pemerintahan/bpd' },
        { label: 'Rukun Tetangga & RW', url: '/pemerintahan/rt-rw' },
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

export const defaultProfilDesa: ProfilDesaData = {
  sejarah:
    'Desa Bolali adalah sebuah desa agraris yang terletak di Kecamatan Wonosari, Kabupaten Klaten, Provinsi Jawa Tengah. Nama Desa Bolali menurut cerita turun-temurun berasal dari kata leluhur yang mencerminkan keteguhan hati warga dalam memelihara kerukunan dan persatuan. Sejak masa lampau, masyarakat Desa Bolali hidup dari sektor pertanian padi dan palawija yang subur, ditopang oleh aliran sungai irigasi alami. Dalam perkembangannya, Desa Bolali terus bertransformasi menjadi desa yang maju, mandiri, dan berdaya saing dengan tetap mempertahankan nilai-nilai luhur kearifan lokal dan gotong royong [Data Dummy].',
  visi: 'Mewujudkan Desa Bolali yang Maju, Mandiri, dan Sejahtera Berbasis Pertanian dan Gotong Royong.',
  misi: [
    { poin: 'Meningkatkan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berorientasi pada pelayanan masyarakat.' },
    { poin: 'Mengembangkan potensi ekonomi desa melalui modernisasi pertanian, penguatan BUMDes, dan pemberdayaan pelaku UMKM lokal.' },
    { poin: 'Membangun dan memelihara sarana prasarana infrastruktur desa yang merata, berkelanjutan, dan ramah lingkungan.' },
    { poin: 'Meningkatkan kualitas sumber daya manusia melalui pelayanan kesehatan masyarakat dan pemerataan akses pendidikan.' },
    { poin: 'Melestarikan seni, budaya tradisional, dan mempererat kerukunan hidup antarwarga desa.' },
  ],
  geografis:
    'Desa Bolali secara topografis berada di kawasan dataran rendah Kabupaten Klaten dengan ketinggian rata-rata 110 - 130 meter di atas permukaan laut. Struktur tanah didominasi oleh tanah aluvial yang sangat subur untuk budidaya tanaman pangan padi dan hortikultura [Data Dummy].',
  batasUtara: 'Desa Boto, Kec. Wonosari',
  batasSelatan: 'Desa Teloyo, Kec. Wonosari',
  batasTimur: 'Desa Bentakan, Kec. Wonosari',
  batasBarat: 'Desa Wadunggetas, Kec. Wonosari',
  luasWilayah: '3,75 km²',
  tipologi: 'Dataran Rendah / Kawasan Pertanian & Permukiman',
}

export const defaultDataKependudukan: DataKependudukanData = {
  totalPenduduk: 5248,
  jumlahKepalaKeluarga: 1642,
  jumlahLakiLaki: 2614,
  jumlahPerempuan: 2634,
  tahunData: 2026,
  kelompokUmur: [
    { rentang: '0 - 5 Tahun (Balita)', jumlah: 412 },
    { rentang: '6 - 12 Tahun (Anak-anak)', jumlah: 580 },
    { rentang: '13 - 17 Tahun (Remaja)', jumlah: 495 },
    { rentang: '18 - 59 Tahun (Usia Produktif)', jumlah: 3120 },
    { rentang: '60+ Tahun (Lanjut Usia)', jumlah: 641 },
  ],
  pekerjaan: [
    { namaPekerjaan: 'Petani & Pekebun', jumlah: 1420 },
    { namaPekerjaan: 'Buruh Tani & Pekerja Lepas', jumlah: 830 },
    { namaPekerjaan: 'Karyawan Swasta & Industri', jumlah: 940 },
    { namaPekerjaan: 'Wiraswasta / Pedagang', jumlah: 610 },
    { namaPekerjaan: 'Pegawai Negeri / ASN / TNI / Polri', jumlah: 135 },
    { namaPekerjaan: 'Lain-lain / Belum Bekerja', jumlah: 1313 },
  ],
  pendidikan: [
    { jenjang: 'Tamat SD / Sederajat', jumlah: 910 },
    { jenjang: 'Tamat SMP / Sederajat', jumlah: 1140 },
    { jenjang: 'Tamat SMA / SMK / Sederajat', jumlah: 1890 },
    { jenjang: 'Diploma / Sarjana (D3/S1/S2)', jumlah: 520 },
    { jenjang: 'Tidak / Belum Tamat SD', jumlah: 788 },
  ],
}

export const defaultDusunList: DusunItem[] = [
  {
    id: 1,
    nama: 'Dusun Bolali I',
    kepalaDusun: 'Sutrisno [Data Dummy]',
    jumlahRT: 6,
    jumlahRW: 2,
    luasWilayah: '0,92 km²',
    deskripsi: 'Pusat pemerintahan kantor desa dan sentra permukiman utama warga.',
    urutan: 1,
  },
  {
    id: 2,
    nama: 'Dusun Bolali II',
    kepalaDusun: 'Bambang Irawan [Data Dummy]',
    jumlahRT: 5,
    jumlahRW: 2,
    luasWilayah: '0,95 km²',
    deskripsi: 'Kawasan persawahan irigasi teknis dan lumbung pangan desa.',
    urutan: 2,
  },
  {
    id: 3,
    nama: 'Dusun Tegalrejo',
    kepalaDusun: 'Wahyu Widodo [Data Dummy]',
    jumlahRT: 4,
    jumlahRW: 1,
    luasWilayah: '0,98 km²',
    deskripsi: 'Sentra kerajinan UMKM gerabah dan industri rumahan kreatif.',
    urutan: 3,
  },
  {
    id: 4,
    nama: 'Dusun Karanganyar',
    kepalaDusun: 'Agus Setiawan [Data Dummy]',
    jumlahRT: 5,
    jumlahRW: 2,
    luasWilayah: '0,90 km²',
    deskripsi: 'Kawasan agrowisata embung desa dan paguyuban seni tradisional.',
    urutan: 4,
  },
]

export const defaultPerangkatDesaList: PerangkatDesaItem[] = [
  {
    id: 1,
    nama: 'H. Ahmad Santoso [Data Dummy]',
    jabatan: 'Kepala Desa',
    kategoriJabatan: 'Kepala-Desa',
    foto: '/images/kades.jpg',
    urutan: 1,
    statusAktif: true,
  },
  {
    id: 2,
    nama: 'Joko Susilo, S.Sos [Data Dummy]',
    jabatan: 'Sekretaris Desa',
    kategoriJabatan: 'Sekretariat',
    foto: '/images/kades.jpg',
    urutan: 2,
    statusAktif: true,
  },
  {
    id: 3,
    nama: 'Sri Wahyuni, S.E [Data Dummy]',
    jabatan: 'Kepala Urusan Keuangan',
    kategoriJabatan: 'Sekretariat',
    foto: '/images/kades.jpg',
    urutan: 3,
    statusAktif: true,
  },
  {
    id: 4,
    nama: 'Tri Haryanto [Data Dummy]',
    jabatan: 'Kepala Urusan Perencanaan & Umum',
    kategoriJabatan: 'Sekretariat',
    foto: '/images/kades.jpg',
    urutan: 4,
    statusAktif: true,
  },
  {
    id: 5,
    nama: 'Drs. Hendro Wibowo [Data Dummy]',
    jabatan: 'Kepala Seksi Pemerintahan',
    kategoriJabatan: 'Teknis',
    foto: '/images/kades.jpg',
    urutan: 5,
    statusAktif: true,
  },
  {
    id: 6,
    nama: 'Rina Maryati, S.Pd [Data Dummy]',
    jabatan: 'Kepala Seksi Kesejahteraan',
    kategoriJabatan: 'Teknis',
    foto: '/images/kades.jpg',
    urutan: 6,
    statusAktif: true,
  },
  {
    id: 7,
    nama: 'Budi Santoso [Data Dummy]',
    jabatan: 'Kepala Seksi Pelayanan',
    kategoriJabatan: 'Teknis',
    foto: '/images/kades.jpg',
    urutan: 7,
    statusAktif: true,
  },
  {
    id: 8,
    nama: 'Sutrisno [Data Dummy]',
    jabatan: 'Kepala Dusun I',
    kategoriJabatan: 'Kewilayahan',
    foto: '/images/kades.jpg',
    urutan: 8,
    statusAktif: true,
  },
  {
    id: 9,
    nama: 'Bambang Irawan [Data Dummy]',
    jabatan: 'Kepala Dusun II',
    kategoriJabatan: 'Kewilayahan',
    foto: '/images/kades.jpg',
    urutan: 9,
    statusAktif: true,
  },
  {
    id: 10,
    nama: 'Wahyu Widodo [Data Dummy]',
    jabatan: 'Kepala Dusun III (Tegalrejo)',
    kategoriJabatan: 'Kewilayahan',
    foto: '/images/kades.jpg',
    urutan: 10,
    statusAktif: true,
  },
  {
    id: 11,
    nama: 'Agus Setiawan [Data Dummy]',
    jabatan: 'Kepala Dusun IV (Karanganyar)',
    kategoriJabatan: 'Kewilayahan',
    foto: '/images/kades.jpg',
    urutan: 11,
    statusAktif: true,
  },
]

export const defaultBpdList: BpdItem[] = [
  {
    id: 1,
    nama: 'Ir. Suhardi, M.M [Data Dummy]',
    jabatan: 'Ketua BPD',
    keterangan: 'Keterwakilan Tokoh Masyarakat',
    foto: '/images/kades.jpg',
    urutan: 1,
  },
  {
    id: 2,
    nama: 'H. Sukirno [Data Dummy]',
    jabatan: 'Wakil Ketua BPD',
    keterangan: 'Keterwakilan Dusun Bolali I',
    foto: '/images/kades.jpg',
    urutan: 2,
  },
  {
    id: 3,
    nama: 'Dra. Endang Purwanti [Data Dummy]',
    jabatan: 'Sekretaris BPD',
    keterangan: 'Keterwakilan Perempuan',
    foto: '/images/kades.jpg',
    urutan: 3,
  },
  {
    id: 4,
    nama: 'Sumarno, S.Pd [Data Dummy]',
    jabatan: 'Anggota BPD',
    keterangan: 'Keterwakilan Dusun Bolali II',
    foto: '/images/kades.jpg',
    urutan: 4,
  },
  {
    id: 5,
    nama: 'Hartono [Data Dummy]',
    jabatan: 'Anggota BPD',
    keterangan: 'Keterwakilan Dusun Tegalrejo',
    foto: '/images/kades.jpg',
    urutan: 5,
  },
  {
    id: 6,
    nama: 'Paryono [Data Dummy]',
    jabatan: 'Anggota BPD',
    keterangan: 'Keterwakilan Dusun Karanganyar',
    foto: '/images/kades.jpg',
    urutan: 6,
  },
]

export const defaultRtRwList: RtRwItem[] = [
  { id: 1, nama: 'Mulyadi [Data Dummy]', jenis: 'RW', nomor: '01', telepon: '08123450001', urutan: 1 },
  { id: 2, nama: 'Suryanto [Data Dummy]', jenis: 'RT', nomor: '01', telepon: '08123450002', urutan: 2 },
  { id: 3, nama: 'Sugiman [Data Dummy]', jenis: 'RT', nomor: '02', telepon: '08123450003', urutan: 3 },
  { id: 4, nama: 'Parman [Data Dummy]', jenis: 'RT', nomor: '03', telepon: '08123450004', urutan: 4 },
  { id: 5, nama: 'Sunardi [Data Dummy]', jenis: 'RW', nomor: '02', telepon: '08123450005', urutan: 5 },
  { id: 6, nama: 'Supriyanto [Data Dummy]', jenis: 'RT', nomor: '01', telepon: '08123450006', urutan: 6 },
  { id: 7, nama: 'Darmono [Data Dummy]', jenis: 'RT', nomor: '02', telepon: '08123450007', urutan: 7 },
  { id: 8, nama: 'Wiyono [Data Dummy]', jenis: 'RW', nomor: '03', telepon: '08123450008', urutan: 8 },
  { id: 9, nama: 'Jumadi [Data Dummy]', jenis: 'RT', nomor: '01', telepon: '08123450009', urutan: 9 },
  { id: 10, nama: 'Kasno [Data Dummy]', jenis: 'RT', nomor: '02', telepon: '08123450010', urutan: 10 },
]

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

export async function getProfilDesa(): Promise<ProfilDesaData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'profil-desa' })
    if (!data) return defaultProfilDesa

    return {
      sejarah: data.sejarah || defaultProfilDesa.sejarah,
      visi: data.visi || defaultProfilDesa.visi,
      misi: data.misi && data.misi.length > 0 ? data.misi : defaultProfilDesa.misi,
      geografis: data.geografis || defaultProfilDesa.geografis,
      batasUtara: data.batasUtara || defaultProfilDesa.batasUtara,
      batasSelatan: data.batasSelatan || defaultProfilDesa.batasSelatan,
      batasTimur: data.batasTimur || defaultProfilDesa.batasTimur,
      batasBarat: data.batasBarat || defaultProfilDesa.batasBarat,
      luasWilayah: data.luasWilayah || defaultProfilDesa.luasWilayah,
      tipologi: data.tipologi || defaultProfilDesa.tipologi,
    }
  } catch (error) {
    return defaultProfilDesa
  }
}

export async function getDataKependudukan(): Promise<DataKependudukanData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'data-kependudukan' })
    if (!data) return defaultDataKependudukan

    return {
      totalPenduduk: data.totalPenduduk || defaultDataKependudukan.totalPenduduk,
      jumlahKepalaKeluarga: data.jumlahKepalaKeluarga || defaultDataKependudukan.jumlahKepalaKeluarga,
      jumlahLakiLaki: data.jumlahLakiLaki || defaultDataKependudukan.jumlahLakiLaki,
      jumlahPerempuan: data.jumlahPerempuan || defaultDataKependudukan.jumlahPerempuan,
      tahunData: data.tahunData || defaultDataKependudukan.tahunData,
      kelompokUmur: data.kelompokUmur || defaultDataKependudukan.kelompokUmur,
      pekerjaan: data.pekerjaan || defaultDataKependudukan.pekerjaan,
      pendidikan: data.pendidikan || defaultDataKependudukan.pendidikan,
    }
  } catch (error) {
    return defaultDataKependudukan
  }
}

export async function getDusunList(): Promise<DusunItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'dusun',
      sort: 'urutan',
      limit: 20,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultDusunList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      nama: doc.nama,
      kepalaDusun: doc.kepalaDusun,
      jumlahRT: doc.jumlahRT || 0,
      jumlahRW: doc.jumlahRW || 0,
      luasWilayah: doc.luasWilayah,
      deskripsi: doc.deskripsi,
      urutan: doc.urutan,
    }))
  } catch (error) {
    return defaultDusunList
  }
}

export async function getPerangkatDesaList(): Promise<PerangkatDesaItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'perangkat-desa',
      sort: 'urutan',
      limit: 50,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultPerangkatDesaList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      nama: doc.nama,
      jabatan: doc.jabatan,
      kategoriJabatan: doc.kategoriJabatan,
      niap: doc.niap,
      foto: doc.foto,
      urutan: doc.urutan,
      statusAktif: doc.statusAktif ?? true,
    }))
  } catch (error) {
    return defaultPerangkatDesaList
  }
}

export async function getBpdList(): Promise<BpdItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'bpd',
      sort: 'urutan',
      limit: 20,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultBpdList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      nama: doc.nama,
      jabatan: doc.jabatan,
      keterangan: doc.keterangan,
      foto: doc.foto,
      urutan: doc.urutan,
    }))
  } catch (error) {
    return defaultBpdList
  }
}

export async function getRtRwList(): Promise<RtRwItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'rt-rw',
      sort: 'urutan',
      limit: 100,
    })

    if (!result.docs || result.docs.length === 0) {
      return defaultRtRwList
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      nama: doc.nama,
      jenis: doc.jenis,
      nomor: doc.nomor,
      dusun: doc.dusun,
      telepon: doc.telepon,
      urutan: doc.urutan,
    }))
  } catch (error) {
    return defaultRtRwList
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
