# Spesifikasi Teknis: Website Resmi Desa Bolali
**Kecamatan Wonosari, Kabupaten Klaten, Provinsi Jawa Tengah**

---

## 1. Ikhtisar & Arsitektur Sistem

Website Resmi Desa Bolali dirancang sebagai portal terpadu pelayanan informasi publik, transparansi keuangan desa, publikasi potensi unggulan warga, dan profil pemerintahan desa berbasis Next.js 15 dan Payload CMS 3.

### Stack Teknologi
- **Frontend Framework**: Next.js 15 (App Router, Server Components, TypeScript)
- **Content Management System**: Payload CMS 3 (Native App Router integration)
- **Database**: PostgreSQL 16 (Dijalankan via Docker container dengan volume persisten)
- **Styling**: Tailwind CSS (Warna utama: Hijau Tua `#0B4619` & Aksen Emas/Kuning `#EAB308`)
- **Package Manager**: `pnpm`
- **Peta Interaktif**: Leaflet / OpenStreetMap
- **Target Deployment**: Docker di VPS Ubuntu 24.04, Caddy (Reverse Proxy + Auto HTTPS Let's Encrypt), Cloudflare

---

## 2. Struktur Menu & Modul Publik

1. **Beranda**:
   - Top Bar (Kontak, Tombol Aksesibilitas A-/A/A+, Tautan Media Sosial)
   - Header & Navbar Navigasi + Kotak Pencarian
   - Hero Slider (Sambutan, Quote "Desa Maju, Mandiri, Sejahtera", Badge IDM Mandiri & Desa Digital)
   - Strip Statistik Counter Kependudukan (Penduduk, KK, Luas Wilayah, Dusun)
   - Sambutan Kepala Desa
   - Berita Terbaru (Berita Utama + Daftar Berita Terkini)
   - Transparansi Desa (Donut Chart Realisasi APBDes & Tombol Unduh Berkas)
   - Potensi Unggulan Desa (Pertanian, UMKM, Wisata Alam, Budaya)
   - Peta Digital Fasilitas Desa
   - Galeri Dokumentasi Desa
   - Footer Resmi Desa Bolali
2. **Profil Desa**: Sejarah, Visi & Misi, Geografis, Data Kependudukan, Wilayah & Dusun.
3. **Pemerintahan**: Struktur Organisasi, Profil Kepala Desa, Perangkat Desa, BPD, RT/RW.
4. **Informasi**: Berita Desa, Pengumuman Resmi Warga, Agenda/Kalender Kegiatan.
5. **Potensi Desa**: BUMDes, Pertanian, UMKM Warga, Wisata Desa, Seni & Budaya.
6. **Transparansi**: APBDes, Realisasi Belanja & Pendapatan APBDes, Laporan Pembangunan Desa.
7. **Galeri**: Dokumentasi Foto & Video Kegiatan Desa.
8. **Kontak**: Alamat Kantor, Telepon/WhatsApp, Email Resmi, Formulir Pesan Warga, Peta Lokasi.

---

## 3. Peran Pengguna & Hak Akses (RBAC)

- **`super-admin`**: Akses penuh ke seluruh sistem, manajemen akun pengguna, pengaturan umum website (logo, banner, footer, menu navigasi).
- **`admin-desa`**: Akses penuh ke seluruh konten desa (Profil Desa, Pemerintahan, Potensi Desa, Transparansi APBDes, Berita, Pengumuman, Agenda, Galeri, Kontak).
- **`operator`**: Akses operasional terbatas untuk pembaruan harian (Berita, Pengumuman, Agenda, Galeri).

---

## 4. Aturan Desain & Pengisian Data

- Seluruh teks antarmuka publik dan label panel admin wajib berbahasa Indonesia.
- Semua data diambil secara dinamis dari CMS (tidak ada data hardcoded).
- Menggunakan data dummy yang jelas ditandai (contoh: `[Data Dummy] H. Ahmad Santoso`).
- Desain merujuk pada `docs/desain/beranda.png`.
- Ramah perangkat seluler (mobile-first), aksesibel, dan cepat menggunakan `next/image`.
- File kredensial `.env` dilarang di-commit ke Git.
