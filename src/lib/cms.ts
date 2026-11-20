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
  penulis?: string | null
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
  urutan?: number | null
  ukuranFile?: string | null
}

export interface PotensiItem {
  id: string | number
  judul: string
  slug: string
  kategori: string
  ringkasan: string
  deskripsi?: any
  gambar?: any
  kontakPengelola?: string | null
  lokasi?: string | null
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
  jumlahKK?: number | null
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
  namaKetua?: string | null
  kontak?: string | null
  jumlahKK?: number | null
  telepon?: string | null
  urutan: number
}

export interface PengumumanItem {
  id: string | number
  judul: string
  slug: string
  ringkasan?: string | null
  isi?: any
  tanggal: string
  lampiran?: any
  prioritas: 'Biasa' | 'Penting' | 'Mendesak'
  status: 'draft' | 'terbit'
  nomorSurat?: string | null
}

export interface AgendaItem {
  id: string | number
  judul: string
  slug: string
  deskripsi?: string | null
  tanggalMulai: string
  tanggalSelesai?: string | null
  lokasi: string
  penyelenggara?: string | null
  kategori?: string | null
  status: 'Akan Datang' | 'Berlangsung' | 'Selesai'
}

export interface PaginatedResult<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: number | null
  nextPage?: number | null
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
      gambar: '/seed/hero-1.webp',
      judul: 'Selamat Datang di Desa Bolali',
      subjudul: '“Desa Maju, Mandiri, Sejahtera”',
      teksTombolUtama: 'Jelajahi Desa',
      tautanTombolUtama: '#potensi',
    },
    {
      gambar: '/seed/hero-2.webp',
      judul: 'Harmoni Alam & Pertanian Bolali',
      subjudul: '“Lumbung Pangan Berkelanjutan”',
      teksTombolUtama: 'Potensi Pertanian',
      tautanTombolUtama: '/potensi-desa',
    },
    {
      gambar: '/seed/hero-3.webp',
      judul: 'Kemandirian & Gotong Royong Warga',
      subjudul: '“Guyub Rukun Membangun Desa”',
      teksTombolUtama: 'Profil Desa',
      tautanTombolUtama: '/profil/sejarah',
    },
    {
      gambar: '/seed/hero-4.webp',
      judul: 'Inovasi Menuju Desa Digital',
      subjudul: '“Transparan, Partisipatif, dan Inovatif”',
      teksTombolUtama: 'Layanan Mandiri',
      tautanTombolUtama: '/kontak',
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
  foto: '/seed/kades-placeholder.webp',
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
    foto: '/seed/kades-placeholder.webp',
    urutan: 1,
    statusAktif: true,
  },
  {
    id: 2,
    nama: 'Joko Susilo, S.Sos [Data Dummy]',
    jabatan: 'Sekretaris Desa',
    kategoriJabatan: 'Sekretariat',
    foto: '/seed/kades-placeholder.webp',
    urutan: 2,
    statusAktif: true,
  },
  {
    id: 3,
    nama: 'Sri Wahyuni, S.E [Data Dummy]',
    jabatan: 'Kepala Urusan Keuangan',
    kategoriJabatan: 'Sekretariat',
    foto: '/seed/kades-placeholder.webp',
    urutan: 3,
    statusAktif: true,
  },
  {
    id: 4,
    nama: 'Tri Haryanto [Data Dummy]',
    jabatan: 'Kepala Urusan Perencanaan & Umum',
    kategoriJabatan: 'Sekretariat',
    foto: '/seed/kades-placeholder.webp',
    urutan: 4,
    statusAktif: true,
  },
  {
    id: 5,
    nama: 'Drs. Hendro Wibowo [Data Dummy]',
    jabatan: 'Kepala Seksi Pemerintahan',
    kategoriJabatan: 'Teknis',
    foto: '/seed/kades-placeholder.webp',
    urutan: 5,
    statusAktif: true,
  },
  {
    id: 6,
    nama: 'Rina Maryati, S.Pd [Data Dummy]',
    jabatan: 'Kepala Seksi Kesejahteraan',
    kategoriJabatan: 'Teknis',
    foto: '/seed/kades-placeholder.webp',
    urutan: 6,
    statusAktif: true,
  },
  {
    id: 7,
    nama: 'Budi Santoso [Data Dummy]',
    jabatan: 'Kepala Seksi Pelayanan',
    kategoriJabatan: 'Teknis',
    foto: '/seed/kades-placeholder.webp',
    urutan: 7,
    statusAktif: true,
  },
  {
    id: 8,
    nama: 'Sutrisno [Data Dummy]',
    jabatan: 'Kepala Dusun I',
    kategoriJabatan: 'Kewilayahan',
    foto: '/seed/kades-placeholder.webp',
    urutan: 8,
    statusAktif: true,
  },
  {
    id: 9,
    nama: 'Bambang Irawan [Data Dummy]',
    jabatan: 'Kepala Dusun II',
    kategoriJabatan: 'Kewilayahan',
    foto: '/seed/kades-placeholder.webp',
    urutan: 9,
    statusAktif: true,
  },
  {
    id: 10,
    nama: 'Wahyu Widodo [Data Dummy]',
    jabatan: 'Kepala Dusun III (Tegalrejo)',
    kategoriJabatan: 'Kewilayahan',
    foto: '/seed/kades-placeholder.webp',
    urutan: 10,
    statusAktif: true,
  },
  {
    id: 11,
    nama: 'Agus Setiawan [Data Dummy]',
    jabatan: 'Kepala Dusun IV (Karanganyar)',
    kategoriJabatan: 'Kewilayahan',
    foto: '/seed/kades-placeholder.webp',
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
    foto: '/seed/kades-placeholder.webp',
    urutan: 1,
  },
  {
    id: 2,
    nama: 'H. Sukirno [Data Dummy]',
    jabatan: 'Wakil Ketua BPD',
    keterangan: 'Keterwakilan Dusun Bolali I',
    foto: '/seed/kades-placeholder.webp',
    urutan: 2,
  },
  {
    id: 3,
    nama: 'Dra. Endang Purwanti [Data Dummy]',
    jabatan: 'Sekretaris BPD',
    keterangan: 'Keterwakilan Perempuan',
    foto: '/seed/kades-placeholder.webp',
    urutan: 3,
  },
  {
    id: 4,
    nama: 'Sumarno, S.Pd [Data Dummy]',
    jabatan: 'Anggota BPD',
    keterangan: 'Keterwakilan Dusun Bolali II',
    foto: '/seed/kades-placeholder.webp',
    urutan: 4,
  },
  {
    id: 5,
    nama: 'Hartono [Data Dummy]',
    jabatan: 'Anggota BPD',
    keterangan: 'Keterwakilan Dusun Tegalrejo',
    foto: '/seed/kades-placeholder.webp',
    urutan: 5,
  },
  {
    id: 6,
    nama: 'Paryono [Data Dummy]',
    jabatan: 'Anggota BPD',
    keterangan: 'Keterwakilan Dusun Karanganyar',
    foto: '/seed/kades-placeholder.webp',
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
    isi: 'Pemerintah Desa Bolali bersama masyarakat dan pemuda Karang Taruna melaksanakan gerakan penghijauan dengan menanam 1.000 bibit pohon produktif di sepanjang bantaran irigasi dan ruang terbuka hijau desa guna menjaga kelestarian mata air dan lingkungan desa [Data Dummy].',
    gambar: '/seed/berita-1.webp',
    kategori: 'Pertanian',
    tanggalTerbit: '2026-11-10T08:00:00.000Z',
    status: 'terbit',
    unggulan: true,
  },
  {
    id: 2,
    judul: 'Pembangunan Infrastruktur Jalan Desa',
    slug: 'pembangunan-infrastruktur-jalan-desa',
    ringkasan: 'Realisasi pengaspalan dan pelebaran jalan poros desa penghubung antar dusun.',
    isi: 'Proyek pengaspalan jalan poros desa penghubung Dusun Bolali I dan Dusun Bolali II telah selesai dikerjakan melalui pembiayaan Dana Desa 2026. Akses transportasi warga kini semakin lancar dan mendukung mobilitas ekonomi tani [Data Dummy].',
    gambar: '/seed/berita-2.webp',
    kategori: 'Pembangunan',
    tanggalTerbit: '2026-11-05T09:00:00.000Z',
    status: 'terbit',
  },
  {
    id: 3,
    judul: 'Pelatihan UMKM untuk Warga Desa',
    slug: 'pelatihan-umkm-untuk-warga-desa',
    ringkasan: 'Pelatihan pengemasan dan pemasaran digital bagi pelaku usaha mikro dan industri rumahan.',
    isi: 'Sebanyak 40 pelaku usaha mikro di Desa Bolali mengikuti pelatihan sertifikasi halal, packaging kreatif, dan pemasaran daring via marketplace demi mendongkrak penjualan produk unggulan desa [Data Dummy].',
    gambar: '/seed/berita-3.webp',
    kategori: 'Kegiatan-Warga',
    tanggalTerbit: '2026-11-01T10:00:00.000Z',
    status: 'terbit',
  },
  {
    id: 4,
    judul: 'Festival Budaya Desa Bolali Sukamaju',
    slug: 'festival-budaya-desa-bolali-sukamaju',
    ringkasan: 'Pentas seni tradisional dan kirab budaya melestarikan warisan leluhur desa.',
    isi: 'Ribuan warga memadati lapangan desa dalam rangka Festival Budaya Desa Bolali 2026 yang menampilkan pagelaran tari karawitan, kirab gunungan hasil bumi, dan pameran kerajinan tradisional warga [Data Dummy].',
    gambar: '/seed/berita-4.webp',
    kategori: 'Seni-Budaya',
    tanggalTerbit: '2026-10-28T13:30:00.000Z',
    status: 'terbit',
  },
  {
    id: 5,
    judul: 'Penyuluhan Pertanian Organik dan Pembagian Pupuk Hayati',
    slug: 'penyuluhan-pertanian-organik-dan-pembagian-pupuk-hayati',
    ringkasan: 'Dinas Pertanian memberikan penyuluhan budidaya padi ramah lingkungan bagi kelompok tani.',
    isi: 'Gabungan Kelompok Tani (Gapoktan) Sumber Makmur Desa Bolali menerima bantuan pupuk hayati cair dan edukasi pengendalian hama terpadu tanpa pestisida kimia berlebih [Data Dummy].',
    gambar: '/seed/potensi-pertanian.webp',
    kategori: 'Pertanian',
    tanggalTerbit: '2026-10-20T08:00:00.000Z',
    status: 'terbit',
  },
  {
    id: 6,
    judul: 'Pelayanan Administrasi Kependudukan Terpadu di Balai Desa',
    slug: 'pelayanan-administrasi-kependudukan-terpadu-di-balai-desa',
    ringkasan: 'Layanan jemput bola perekaman e-KTP dan aktivasi Identitas Kependudukan Digital (IKD).',
    isi: 'Pemerintah Desa Bolali bekerja sama dengan Disdukcapil memfasilitasi pembuatan akta kelahiran, kartu keluarga baru, dan aktivasi IKD bagi warga yang berhalangan ke kantor kecamatan [Data Dummy].',
    gambar: '/seed/hero-1.webp',
    kategori: 'Pemerintahan',
    tanggalTerbit: '2026-10-15T09:30:00.000Z',
    status: 'terbit',
  },
  {
    id: 7,
    judul: 'Pemeriksaan Kesehatan Berkala dan Imunisasi Balita',
    slug: 'pemeriksaan-kesehatan-berkala-dan-imunisasi-balita',
    ringkasan: 'Kader Posyandu Desa Bolali rutin memantau tumbuh kembang anak demi cegah stunting.',
    isi: 'Program pencegahan stunting terus digalakkan dengan pemberian makanan tambahan (PMT) bergizi, penimbangan berat badan, dan konsultasi gizi balita gratis di tiap pos dusun [Data Dummy].',
    gambar: '/seed/galeri-2.webp',
    kategori: 'Pendidikan-Kesehatan',
    tanggalTerbit: '2026-10-10T08:30:00.000Z',
    status: 'terbit',
  },
  {
    id: 8,
    judul: 'BUMDes Bolali Makmur Resmikan Unit Usaha Pengolahan Pangan',
    slug: 'bumdes-bolali-makmur-resmikan-unit-usaha-pengolahan-pangan',
    ringkasan: 'Langkah strategis penyerapan panen petani lokal menjadi produk bernilai tambah tinggi.',
    isi: 'BUMDes Bolali Makmur resmi mengoperasikan rumah produksi pengolahan keripik dan beras kemasan premium lokal sebagai wujud nyata penguatan perekonomian desa mandiri [Data Dummy].',
    gambar: '/seed/potensi-umkm.webp',
    kategori: 'Kemasyarakatan',
    tanggalTerbit: '2026-10-05T14:00:00.000Z',
    status: 'terbit',
  },
]

export const defaultPengumumanList: PengumumanItem[] = [
  {
    id: 1,
    judul: 'Himbauan Waspada Cuaca Ekstrem dan Gotong Royong Saluran Air',
    slug: 'himbauan-waspada-cuaca-ekstrem-dan-gotong-royong-saluran-air',
    ringkasan: 'Seluruh warga dihimbau membersihkan drainase lingkungan dan memangkas pohon rawan tumbang.',
    isi: 'Sehubungan dengan peringatan dini BMKG terkait potensi hujan deras disertai angin kencang di wilayah Klaten, Pemerintah Desa Bolali menghimbau seluruh RT dan warga untuk melaksanakan kerja bakti pembersihan selokan dan saluran pembuangan air secara serentak demi mencegah luapan air dan genangan [Data Dummy].',
    tanggal: '2026-11-18T07:00:00.000Z',
    prioritas: 'Mendesak',
    status: 'terbit',
  },
  {
    id: 2,
    judul: 'Jadwal Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap IV',
    slug: 'jadwal-penyaluran-bantuan-langsung-tunai-blt-dana-desa-tahap-iv',
    ringkasan: 'Penyaluran BLT-DD bagi 65 Keluarga Penerima Manfaat (KPM) di Balai Desa Bolali.',
    isi: 'Diberitahukan kepada seluruh Keluarga Penerima Manfaat (KPM) BLT Dana Desa bahwa pengambilan bantuan tunai tahap IV akan dilaksanakan pada hari Jumat, 27 November 2026 bertempat di Pendopo Balai Desa Bolali dengan membawa undangan resmi dan KTP asli [Data Dummy].',
    tanggal: '2026-11-15T09:00:00.000Z',
    prioritas: 'Penting',
    status: 'terbit',
  },
  {
    id: 3,
    judul: 'Pelaksanaan Posyandu Integrasi Layanan Primer (ILP) Balita & Lansia',
    slug: 'pelaksanaan-posyandu-integrasi-layanan-primer-ilp-balita-dan-lansia',
    ringkasan: 'Pemeriksaan tensi darah, penimbangan berat badan balita, dan pemberian vitamin.',
    isi: 'Layanan Posyandu ILP terpadu bulan November akan dilaksanakan serentak di Poskesdes masing-masing dusun mulai pukul 08.30 WIB. Seluruh ibu hamil, orang tua balita, dan lansia diharapkan hadir tepat waktu [Data Dummy].',
    tanggal: '2026-11-12T08:00:00.000Z',
    prioritas: 'Penting',
    status: 'terbit',
  },
  {
    id: 4,
    judul: 'Informasi Pemeliharaan Jaringan Listrik PLN Sementara',
    slug: 'informasi-pemeliharaan-jaringan-listrik-pln-sementara',
    ringkasan: 'Pemberitahuan pemadaman sementara untuk perabasan dahan pohon dekat kabel tegangan menengah.',
    isi: 'Berdasarkan surat resmi PLN ULP Klaten, akan dilakukan pemeliharaan jaringan listrik terencana pada hari Selasa, 24 November 2026 pukul 09.00 - 13.00 WIB meliputi sebagian wilayah Dusun Karanganyar dan Dusun Tegalrejo [Data Dummy].',
    tanggal: '2026-11-08T10:00:00.000Z',
    prioritas: 'Biasa',
    status: 'terbit',
  },
]

export const defaultAgendaList: AgendaItem[] = [
  {
    id: 1,
    judul: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) 2027',
    slug: 'musrenbangdes-bolali-2027',
    deskripsi: 'Musyawarah tahunan penyusunan rencana kerja pemerintah desa (RKPDes) dan penyerapan usulan prioritas pembangunan dari perwakilan RT, RW, tokoh masyarakat, dan BPD [Data Dummy].',
    tanggalMulai: '2026-11-28T09:00:00.000Z',
    tanggalSelesai: '2026-11-28T13:00:00.000Z',
    lokasi: 'Aula Balai Desa Bolali',
    penyelenggara: 'Pemerintah Desa Bolali & BPD',
    status: 'Akan Datang',
  },
  {
    id: 2,
    judul: 'Bimbingan Teknis Digital Marketing & Pengemasan Produk UMKM',
    slug: 'bimtek-digital-marketing-umkm-bolali',
    deskripsi: 'Pelatihan praktis foto produk, manajemen media sosial bisnis, dan onboarding toko online bersama praktisi e-commerce bagi 35 pelaku UMKM desa [Data Dummy].',
    tanggalMulai: '2026-12-05T08:30:00.000Z',
    tanggalSelesai: '2026-12-05T15:00:00.000Z',
    lokasi: 'Gedung Pertemuan Dusun Bolali I',
    penyelenggara: 'BUMDes Bolali Makmur & Tim Penggerak PKK',
    status: 'Akan Datang',
  },
  {
    id: 3,
    judul: 'Pemeriksaan Kesehatan Gratis & Donor Darah Sukarela Warga',
    slug: 'pemeriksaan-kesehatan-dan-donor-darah-bolali',
    deskripsi: 'Pemeriksaan kolesterol, gula darah, asam urat serta bakti sosial donor darah bekerja sama dengan PMI Cabang Klaten [Data Dummy].',
    tanggalMulai: '2026-11-19T08:00:00.000Z',
    tanggalSelesai: '2026-11-19T12:00:00.000Z',
    lokasi: 'Poliklinik Kesehatan Desa (PKD) Bolali',
    penyelenggara: 'Kader Posyandu & PMI Kabupaten Klaten',
    status: 'Berlangsung',
  },
  {
    id: 4,
    judul: 'Kerja Bakti Massal Normalisasi Saluran Irigasi Tersier',
    slug: 'kerja-bakti-saluran-irigasi-tersier',
    deskripsi: 'Pembersihan sedimentasi lumpur dan gulma pada saluran irigasi utama guna memperlancar pasokan air menjelang musim tanam pertama [Data Dummy].',
    tanggalMulai: '2026-11-23T06:30:00.000Z',
    tanggalSelesai: '2026-11-23T10:30:00.000Z',
    lokasi: 'Kawasan Persawahan Dusun Tegalrejo & Bolali II',
    penyelenggara: 'Gapoktan Sumber Makmur & Seluruh Pengurus RT',
    status: 'Akan Datang',
  },
  {
    id: 5,
    judul: 'Pentas Seni Wayang Kulit Semalam Suntuk Bersih Desa',
    slug: 'wayang-kulit-bersih-desa-bolali',
    deskripsi: 'Pagelaran wayang kulit dalam rangka tradisi merti desa dengan lakon Makukuhan mendoakan ketenteraman dan kemakmuran seluruh warga desa [Data Dummy].',
    tanggalMulai: '2026-10-25T19:30:00.000Z',
    tanggalSelesai: '2026-10-26T04:00:00.000Z',
    lokasi: 'Halaman Balai Desa Bolali',
    penyelenggara: 'Lembaga Adat & Karang Taruna Desa Bolali',
    status: 'Selesai',
  },
]

export const defaultTransparansiList: DokumenTransparansiItem[] = [
  {
    id: 1,
    judul: 'APBDes Tahun Anggaran 2026',
    kategori: 'APBDes',
    tahun: 2026,
    persentaseRealisasi: 92.3,
    nominalAnggaran: 1850000000,
    filePdf: '/docs/apbdes-2026.pdf',
    keterangan: 'Rincian Anggaran Pendapatan dan Belanja Desa Bolali Tahun 2026 [Data Dummy]',
    tampilkanDiBeranda: true,
    urutan: 1,
  },
  {
    id: 2,
    judul: 'Laporan Realisasi APBDes 2026 (Semester I)',
    kategori: 'Realisasi',
    tahun: 2026,
    persentaseRealisasi: 92.3,
    nominalAnggaran: 1707550000,
    filePdf: '/docs/laporan-realisasi.pdf',
    keterangan: 'Laporan Realisasi Pelaksanaan APBDes Semester Berjalan [Data Dummy]',
    tampilkanDiBeranda: true,
    urutan: 2,
  },
  {
    id: 3,
    judul: 'Rencana Kerja Pemerintah Desa (RKPDes) 2026',
    kategori: 'Rencana Kerja',
    tahun: 2026,
    filePdf: '/docs/rkpdes-2026.pdf',
    keterangan: 'Rencana Kerja Pemerintah Desa Bolali Tahun 2026 [Data Dummy]',
    tampilkanDiBeranda: true,
    urutan: 3,
  },
  {
    id: 4,
    judul: 'Laporan Progres Pembangunan Infrastruktur Fisik 2026',
    kategori: 'Laporan Pembangunan',
    tahun: 2026,
    nominalAnggaran: 480000000,
    filePdf: '/docs/laporan-realisasi.pdf',
    keterangan: 'Laporan berkala kemajuan fisik proyek jalan rabat beton dan drainase [Data Dummy]',
    tampilkanDiBeranda: false,
    urutan: 4,
  },
  {
    id: 5,
    judul: 'Laporan Pertanggungjawaban (LPJ) Realisasi APBDes 2025',
    kategori: 'Realisasi',
    tahun: 2025,
    persentaseRealisasi: 98.7,
    nominalAnggaran: 1720000000,
    filePdf: '/docs/laporan-realisasi.pdf',
    keterangan: 'Laporan Pertanggungjawaban Realisasi Pelaksanaan APBDes TA 2025 [Data Dummy]',
    tampilkanDiBeranda: false,
    urutan: 5,
  },
  {
    id: 6,
    judul: 'APBDes Murni Tahun Anggaran 2025',
    kategori: 'APBDes',
    tahun: 2025,
    nominalAnggaran: 1750000000,
    filePdf: '/docs/apbdes-2026.pdf',
    keterangan: 'Dokumen Perdes APBDes Tahun Anggaran 2025 [Data Dummy]',
    tampilkanDiBeranda: false,
    urutan: 6,
  },
]

export const defaultPotensiList: PotensiItem[] = [
  {
    id: 1,
    judul: 'BUMDes Bolali Makmur Sejahtera',
    slug: 'bumdes-bolali-makmur-sejahtera',
    kategori: 'BUMDes',
    ringkasan: 'Badan usaha desa yang mengelola pengolahan gabah, sewa alsintan, dan unit simpan pinjam produktif.',
    deskripsi: 'BUMDes Bolali Makmur Sejahtera merupakan pilar ekonomi desa yang didirikan untuk mendayagunakan potensi ekonomi masyarakat. Mengelola unit usaha penggilingan gabah modern, penyewaan alat mesin pertanian (alsintan), toko saprotan, serta kemitraan simpan pinjam modal usaha bagi UMKM mikro [Data Dummy].',
    gambar: '/seed/potensi-umkm.webp',
    kontakPengelola: '0812-3456-7891 (Bpk. Mulyono - Direktur BUMDes)',
    lokasi: 'Kompleks Balai Desa Bolali, Jl. Mawar No. 10',
    unggulan: true,
    urutan: 1,
  },
  {
    id: 2,
    judul: 'Pertanian Padi Organik & Hortikultura',
    slug: 'pertanian-padi-organik-dan-hortikultura',
    kategori: 'Pertanian',
    ringkasan: 'Lahan persawahan subur irigasi teknis penghasil beras organik premium berkualitas unggul.',
    deskripsi: 'Hamparan persawahan seluas lebih dari 240 hektar di Desa Bolali didukung sistem irigasi teknis mandiri. Gabungan Kelompok Tani memproduksi padi varietas unggul ramah lingkungan tanpa pestisida kimia berlebih, serta sayuran hortikultura musiman yang menyuplai pasar kabupaten [Data Dummy].',
    gambar: '/seed/potensi-pertanian.webp',
    kontakPengelola: '0813-9876-5432 (Ketua Gapoktan Sumber Makmur)',
    lokasi: 'Dusun Bolali I & Dusun Tegalrejo',
    unggulan: true,
    urutan: 2,
  },
  {
    id: 3,
    judul: 'Sentra Kerajinan Gerabah & Olahan Pangan UMKM',
    slug: 'sentra-kerajinan-gerabah-dan-olahan-pangan-umkm',
    kategori: 'UMKM',
    ringkasan: 'Produk kreatif gerabah tanah liat tradisional serta industri rumahan olahan keripik dan kue basah.',
    deskripsi: 'Keahlian membuat gerabah tanah liat secara turun-temurun menjadi mata pencaharian kebanggaan sebagian warga. Di samping itu, tumbuh subur industri rumahan olahan keripik singkong, rempeyek, dan aneka jajanan tradisional yang dipasarkan secara offline maupun digital [Data Dummy].',
    gambar: '/seed/potensi-umkm.webp',
    kontakPengelola: '0815-6789-0123 (Ibu Siti - Paguyuban UMKM)',
    lokasi: 'Sentra Dusun Bolali II, Desa Bolali',
    unggulan: true,
    urutan: 3,
  },
  {
    id: 4,
    judul: 'Agrowisata Embung & Wisata Alam Pedesaan',
    slug: 'agrowisata-embung-dan-wisata-alam-pedesaan',
    kategori: 'Wisata',
    ringkasan: 'Pesona embung penampung air desa berlatar panorama alam asri, spot pemancingan, dan jogging track.',
    deskripsi: 'Kawasan Embung Desa Bolali tidak hanya berfungsi sebagai tandon air cadangan pertanian, tetapi telah ditata menjadi ruang publik wisata alam ramah keluarga. Dilengkapi spot foto estetik, gazebo istirahat, wahana pemancingan ikan, dan deretan kuliner khas pedesaan [Data Dummy].',
    gambar: '/seed/potensi-wisata.webp',
    kontakPengelola: '0857-1234-5678 (Pokdarwis Desa Bolali)',
    lokasi: 'Kawasan Embung Desa, Dusun Karanganyar',
    unggulan: true,
    urutan: 4,
  },
  {
    id: 5,
    judul: 'Pelestarian Seni Jathilan & Karawitan Tradisional',
    slug: 'pelestarian-seni-jathilan-dan-karawitan-tradisional',
    kategori: 'Seni-Budaya',
    ringkasan: 'Kesenian jathilan, grup karawitan gamelan laras madya, dan tradisi merti dusun yang lestari.',
    deskripsi: 'Warisan seni dan kebudayaan Jawa dijaga kelestariannya melalui sanggar tari tradisional dan paguyuban karawitan yang aktif berlatih. Setiap tahun diselenggarakan tradisi kirab gunungan hasil bumi dan bersih dusun sebagai wujud rasa syukur bersama [Data Dummy].',
    gambar: '/seed/potensi-budaya.webp',
    kontakPengelola: '0821-3456-7890 (Ki Harsono - Tokoh Budaya)',
    lokasi: 'Sanggar Budaya Dusun Bolali I',
    unggulan: true,
    urutan: 5,
  },
]

export const defaultGaleriList: GaleriItem[] = [
  {
    id: 1,
    judul: 'Pesona Keindahan Alam Embung Desa Bolali',
    slug: 'pesona-keindahan-alam-embung-desa-bolali',
    tipe: 'foto',
    album: 'Pariwisata',
    foto: '/seed/galeri-1.webp',
    tanggal: '2026-11-08',
    keterangan: 'Pemandangan asri embung desa di waktu pagi hari menjadi sarana rekreasi warga [Data Dummy].',
    tampilkanDiBeranda: true,
  },
  {
    id: 2,
    judul: 'Aktivitas Pengrajin Sentra UMKM Gerabah',
    slug: 'aktivitas-pengrajin-sentra-umkm-gerabah',
    tipe: 'foto',
    album: 'Perekonomian',
    foto: '/seed/galeri-2.webp',
    tanggal: '2026-11-04',
    keterangan: 'Proses pembentukan dan pembakaran gerabah tanah liat tradisional berkualitas [Data Dummy].',
    tampilkanDiBeranda: true,
  },
  {
    id: 3,
    judul: 'Karnaval & Kirab Budaya Tradisi Bersih Dusun',
    slug: 'karnaval-dan-kirab-budaya-tradisi-bersih-dusun',
    tipe: 'foto',
    album: 'Kebudayaan',
    foto: '/seed/galeri-3.webp',
    tanggal: '2026-10-25',
    keterangan: 'Warga mengenakan pakaian adat Jawa dalam kirab gunungan hasil bumi desa [Data Dummy].',
    tampilkanDiBeranda: true,
  },
  {
    id: 4,
    judul: 'Pengerjaan Rabat Beton Jalan Poros Antar Dusun',
    slug: 'pengerjaan-rabat-beton-jalan-poros-antar-dusun',
    tipe: 'foto',
    album: 'Pembangunan',
    foto: '/seed/galeri-4.webp',
    tanggal: '2026-10-18',
    keterangan: 'Gotong royong warga dan tim pelaksana pembangunan mempercepat perbaikan jalan tani [Data Dummy].',
    tampilkanDiBeranda: true,
  },
  {
    id: 5,
    judul: 'Hamparan Sawah Hijau dan Musim Tanam Padi',
    slug: 'hamparan-sawah-hijau-dan-musim-tanam-padi',
    tipe: 'foto',
    album: 'Pariwisata',
    foto: '/seed/potensi-pertanian.webp',
    tanggal: '2026-10-12',
    keterangan: 'Suasana fajar di persawahan Dusun Tegalrejo dengan udara segar menyejukkan [Data Dummy].',
    tampilkanDiBeranda: false,
  },
  {
    id: 6,
    judul: 'Profil Video Resmi Pemerintah Desa Bolali 2026',
    slug: 'profil-video-resmi-pemerintah-desa-bolali-2026',
    tipe: 'video',
    album: 'Pariwisata',
    foto: '/seed/hero-1.webp',
    videoUrl: 'https://www.youtube.com/watch?v=7hR_1b3c9Wk',
    tanggal: '2026-11-01',
    keterangan: 'Video dokumentasi selayang pandang potensi desa, inovasi pelayanan, dan keramahan warga Bolali [Data Dummy].',
    tampilkanDiBeranda: true,
  },
  {
    id: 7,
    judul: 'Liputan Festival Budaya dan Kirab Gunungan Desa',
    slug: 'liputan-festival-budaya-dan-kirab-gunungan-desa',
    tipe: 'video',
    album: 'Kebudayaan',
    foto: '/seed/potensi-budaya.webp',
    videoUrl: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
    tanggal: '2026-10-26',
    keterangan: 'Dokumentasi video pentas seni jathilan dan tari karawitan semalam suntuk [Data Dummy].',
    tampilkanDiBeranda: false,
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
      return defaultBeritaList.slice(0, limit)
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
    return defaultBeritaList.slice(0, limit)
  }
}

function getFallbackBeritaPaginated(
  page: number,
  limit: number,
  kategori?: string,
  search?: string
): PaginatedResult<BeritaItem> {
  let list = defaultBeritaList.filter((b) => b.status === 'terbit')

  if (kategori && kategori !== 'Semua') {
    list = list.filter((b) => b.kategori.toLowerCase() === kategori.toLowerCase())
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase()
    list = list.filter((b) => b.judul.toLowerCase().includes(q) || b.ringkasan.toLowerCase().includes(q))
  }

  const totalDocs = list.length
  const totalPages = Math.ceil(totalDocs / limit) || 1
  const startIndex = (page - 1) * limit
  const docs = list.slice(startIndex, startIndex + limit)

  return {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  }
}

export async function getBeritaPaginated(options?: {
  page?: number
  limit?: number
  kategori?: string
  search?: string
}): Promise<PaginatedResult<BeritaItem>> {
  const page = options?.page || 1
  const limit = options?.limit || 6
  const kategori = options?.kategori
  const search = options?.search

  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {
      status: { equals: 'terbit' },
    }

    if (kategori && kategori !== 'Semua') {
      where.kategori = { equals: kategori }
    }

    if (search && search.trim() !== '') {
      where.or = [
        { judul: { contains: search.trim() } },
        { ringkasan: { contains: search.trim() } },
      ]
    }

    const result = await payload.find({
      collection: 'berita',
      where,
      sort: '-tanggalTerbit',
      page,
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      return getFallbackBeritaPaginated(page, limit, kategori, search)
    }

    return {
      docs: result.docs.map((doc: any) => ({
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
      })),
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      page: result.page || 1,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    }
  } catch (error) {
    return getFallbackBeritaPaginated(page, limit, kategori, search)
  }
}

export async function getBeritaBySlug(slug: string): Promise<BeritaItem | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'berita',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0]
      return {
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
      }
    }
  } catch (error) {}

  const match = defaultBeritaList.find((b) => b.slug === slug)
  return match || null
}

export async function getBeritaTerkait(currentSlug: string, kategori?: string, limit = 3): Promise<BeritaItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {
      status: { equals: 'terbit' },
      slug: { not_equals: currentSlug },
    }

    if (kategori) {
      where.kategori = { equals: kategori }
    }

    const result = await payload.find({
      collection: 'berita',
      where,
      sort: '-tanggalTerbit',
      limit,
    })

    if (result.docs && result.docs.length > 0) {
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
    }
  } catch (error) {}

  return defaultBeritaList
    .filter((b) => b.slug !== currentSlug)
    .slice(0, limit)
}

export async function getPengumumanList(options?: {
  prioritas?: string
  search?: string
  limit?: number
}): Promise<PengumumanItem[]> {
  const limit = options?.limit || 20
  const prioritas = options?.prioritas
  const search = options?.search

  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {
      status: { equals: 'terbit' },
    }

    if (prioritas && prioritas !== 'Semua') {
      where.prioritas = { equals: prioritas }
    }

    if (search && search.trim() !== '') {
      where.or = [
        { judul: { contains: search.trim() } },
        { ringkasan: { contains: search.trim() } },
      ]
    }

    const result = await payload.find({
      collection: 'pengumuman',
      where,
      sort: '-tanggal',
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      let list = defaultPengumumanList.filter((p) => p.status === 'terbit')
      if (prioritas && prioritas !== 'Semua') {
        list = list.filter((p) => p.prioritas.toLowerCase() === prioritas.toLowerCase())
      }
      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase()
        list = list.filter((p) => p.judul.toLowerCase().includes(q) || (p.ringkasan && p.ringkasan.toLowerCase().includes(q)))
      }
      return list.slice(0, limit)
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      slug: doc.slug,
      ringkasan: doc.ringkasan,
      isi: doc.isi,
      tanggal: doc.tanggal,
      lampiran: doc.lampiran,
      prioritas: doc.prioritas,
      status: doc.status,
    }))
  } catch (error) {
    let list = defaultPengumumanList.filter((p) => p.status === 'terbit')
    if (prioritas && prioritas !== 'Semua') {
      list = list.filter((p) => p.prioritas.toLowerCase() === prioritas.toLowerCase())
    }
    return list.slice(0, limit)
  }
}

export async function getPengumumanBySlug(slug: string): Promise<PengumumanItem | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pengumuman',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0]
      return {
        id: doc.id,
        judul: doc.judul,
        slug: doc.slug,
        ringkasan: doc.ringkasan,
        isi: doc.isi,
        tanggal: doc.tanggal,
        lampiran: doc.lampiran,
        prioritas: doc.prioritas,
        status: doc.status,
      }
    }
  } catch (error) {}

  const match = defaultPengumumanList.find((p) => p.slug === slug)
  return match || null
}

export async function getAgendaList(options?: {
  status?: string
  limit?: number
}): Promise<AgendaItem[]> {
  const limit = options?.limit || 50
  const status = options?.status

  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {}

    if (status && status !== 'Semua') {
      where.status = { equals: status }
    }

    const result = await payload.find({
      collection: 'agenda',
      where,
      sort: 'tanggalMulai',
      limit,
    })

    if (!result.docs || result.docs.length === 0) {
      let list = defaultAgendaList
      if (status && status !== 'Semua') {
        list = list.filter((a) => a.status.toLowerCase() === status.toLowerCase())
      }
      return list.slice(0, limit)
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      slug: doc.slug,
      deskripsi: doc.deskripsi,
      tanggalMulai: doc.tanggalMulai,
      tanggalSelesai: doc.tanggalSelesai,
      lokasi: doc.lokasi,
      penyelenggara: doc.penyelenggara,
      status: doc.status,
    }))
  } catch (error) {
    let list = defaultAgendaList
    if (status && status !== 'Semua') {
      list = list.filter((a) => a.status.toLowerCase() === status.toLowerCase())
    }
    return list.slice(0, limit)
  }
}

export async function getAgendaBySlug(slug: string): Promise<AgendaItem | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'agenda',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0]
      return {
        id: doc.id,
        judul: doc.judul,
        slug: doc.slug,
        deskripsi: doc.deskripsi,
        tanggalMulai: doc.tanggalMulai,
        tanggalSelesai: doc.tanggalSelesai,
        lokasi: doc.lokasi,
        penyelenggara: doc.penyelenggara,
        status: doc.status,
      }
    }
  } catch (error) {}

  const match = defaultAgendaList.find((a) => a.slug === slug)
  return match || null
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

export async function getPotensiList(options?: {
  kategori?: string
  search?: string
}): Promise<PotensiItem[]> {
  const kategori = options?.kategori
  const search = options?.search

  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {}

    if (kategori && kategori !== 'Semua') {
      where.kategori = { equals: kategori }
    }

    if (search && search.trim() !== '') {
      where.or = [
        { judul: { contains: search.trim() } },
        { ringkasan: { contains: search.trim() } },
      ]
    }

    const result = await payload.find({
      collection: 'potensi',
      where,
      sort: 'urutan',
      limit: 50,
    })

    if (!result.docs || result.docs.length === 0) {
      let list = defaultPotensiList
      if (kategori && kategori !== 'Semua') {
        list = list.filter((p) => p.kategori.toLowerCase() === kategori.toLowerCase())
      }
      if (search && search.trim() !== '') {
        const q = search.trim().toLowerCase()
        list = list.filter((p) => p.judul.toLowerCase().includes(q) || p.ringkasan.toLowerCase().includes(q))
      }
      return list
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      judul: doc.judul,
      slug: doc.slug,
      kategori: doc.kategori,
      ringkasan: doc.ringkasan,
      deskripsi: doc.deskripsi,
      gambar: doc.gambar,
      kontakPengelola: doc.kontakPengelola,
      lokasi: doc.lokasi,
      unggulan: doc.unggulan,
      urutan: doc.urutan,
    }))
  } catch (error) {
    let list = defaultPotensiList
    if (kategori && kategori !== 'Semua') {
      list = list.filter((p) => p.kategori.toLowerCase() === kategori.toLowerCase())
    }
    return list
  }
}

export async function getPotensiBySlug(slug: string): Promise<PotensiItem | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'potensi',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      const doc = result.docs[0]
      return {
        id: doc.id,
        judul: doc.judul,
        slug: doc.slug,
        kategori: doc.kategori,
        ringkasan: doc.ringkasan,
        deskripsi: doc.deskripsi,
        gambar: doc.gambar,
        kontakPengelola: doc.kontakPengelola,
        lokasi: doc.lokasi,
        unggulan: doc.unggulan,
        urutan: doc.urutan,
      }
    }
  } catch (error) {}

  const match = defaultPotensiList.find((p) => p.slug === slug)
  return match || null
}

export async function getDokumenTransparansiList(options?: {
  tahun?: number
  kategori?: string
}): Promise<DokumenTransparansiItem[]> {
  const tahun = options?.tahun
  const kategori = options?.kategori

  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {}

    if (tahun) {
      where.tahun = { equals: tahun }
    }

    if (kategori && kategori !== 'Semua') {
      where.kategori = { equals: kategori }
    }

    const result = await payload.find({
      collection: 'dokumen-transparansi',
      where,
      sort: 'urutan',
      limit: 100,
    })

    if (!result.docs || result.docs.length === 0) {
      let list = defaultTransparansiList
      if (tahun) {
        list = list.filter((d) => d.tahun === tahun)
      }
      if (kategori && kategori !== 'Semua') {
        list = list.filter((d) => d.kategori.toLowerCase() === kategori.toLowerCase())
      }
      return list
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
      urutan: doc.urutan,
    }))
  } catch (error) {
    let list = defaultTransparansiList
    if (tahun) {
      list = list.filter((d) => d.tahun === tahun)
    }
    if (kategori && kategori !== 'Semua') {
      list = list.filter((d) => d.kategori.toLowerCase() === kategori.toLowerCase())
    }
    return list
  }
}

export async function getGaleriList(options?: {
  tipe?: 'foto' | 'video' | 'semua'
  album?: string
}): Promise<GaleriItem[]> {
  const tipe = options?.tipe
  const album = options?.album

  try {
    const payload = await getPayload({ config: configPromise })
    const where: any = {}

    if (tipe && tipe !== 'semua') {
      where.tipe = { equals: tipe }
    }

    if (album && album !== 'Semua') {
      where.album = { equals: album }
    }

    const result = await payload.find({
      collection: 'galeri',
      where,
      sort: '-tanggal',
      limit: 100,
    })

    if (!result.docs || result.docs.length === 0) {
      let list = defaultGaleriList
      if (tipe && tipe !== 'semua') {
        list = list.filter((g) => g.tipe === tipe)
      }
      if (album && album !== 'Semua') {
        list = list.filter((g) => g.album?.toLowerCase() === album.toLowerCase())
      }
      return list
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
    let list = defaultGaleriList
    if (tipe && tipe !== 'semua') {
      list = list.filter((g) => g.tipe === tipe)
    }
    if (album && album !== 'Semua') {
      list = list.filter((g) => g.album?.toLowerCase() === album.toLowerCase())
    }
    return list
  }
}

export async function getGaleriAlbums(): Promise<string[]> {
  try {
    const items = await getGaleriList()
    const albumSet = new Set<string>()
    for (const item of items) {
      if (item.album && item.album.trim() !== '') {
        albumSet.add(item.album.trim())
      }
    }
    return Array.from(albumSet)
  } catch (error) {
    return ['Pariwisata', 'Perekonomian', 'Kebudayaan', 'Pembangunan']
  }
}

export async function getGaleriTerbaru(limit = 6): Promise<GaleriItem[]> {
  const items = await getGaleriList()
  return items.slice(0, limit)
}
