# Spesifikasi Desain Website Resmi Desa Bolali
Acuan Resmi: `docs/desain/beranda.png` (Lebar kanvas 1376px)

Dokumen ini merupakan acuan tunggal implementasi sistem desain, tata letak, komponen global (Header, Top Bar, Footer), dan antarmuka visual Website Desa Bolali (Kec. Wonosari, Kab. Klaten, Jawa Tengah).

---

## 1. Prinsip Desain & Batasan (Anti AI-Slop)
1. **Kesatuan Visual**: Bersih, berwibawa, formal, bergaya institusi pemerintahan desa modern Indonesia.
2. **Tanpa Efek Berlebihan**: Tidak menggunakan gradient ungu/biru neon, efek glassmorphism berlebihan, bayangan tebal melayang, maupun animasi dekoratif yang tidak perlu.
3. **Satu Rumpun Ikonografi**: Seluruh ikon antarmuka menggunakan **Lucide Icons** dengan stroke width seragam (1.75 - 2). Tidak mencampur dengan emoji atau paket ikon lain.
4. **Maksimal Dua Rumpun Huruf (Font)**:
   - Font Utama (Sans-serif): `Plus Jakarta Sans` untuk seluruh teks antarmuka, heading, navigasi, dan konten.
   - Font Script Dekoratif: `Dancing Script` (Google Fonts) **hanya** untuk 2 elemen teks dekoratif di banner hero ("*Selamat Datang di*" dan "*Maju Bersama Untuk Desa Lebih Baik*").
5. **Semua Nilai Warna Melalui CSS Variables & Tailwind Tokens**: Tidak ada warna hardcoded (`#hex` bebas) di dalam markup komponen.

---

## 2. Palet Warna (Color Palette)

Diambil dan diekstrak berdasarkan analisis sampel piksel dari berkas acuan `docs/desain/beranda.png`:

| Token / Variabel | Kode Hex | Penggunaan Utama |
|---|---|---|
| `--color-desa-darkGreen` | `#073c24` | Latar Top Bar, Latar Footer, Header Brand Text, Batang Status |
| `--color-desa-primaryGreen` | `#0b4625` | Tombol aktif navigasi (Pill Beranda), elemen fokus utama |
| `--color-desa-greenHover` | `#0f5930` | Efek hover pada tombol/link hijau |
| `--color-desa-accentGreen` | `#15803d` | Badge IDM Mandiri, progres APBDes, aksen subjudul |
| `--color-desa-lightGreen` | `#eaf4ee` | Latar badge hijau, pill aksen, hover menu submenu |
| `--color-desa-gold` | `#eab308` | Aksen kuning/emas, teks script hero, bintang IDM |
| `--color-desa-goldHover` | `#ca8a04` | Hover tombol emas, border emas tipis |
| `--color-desa-goldLight` | `#fef9c3` | Latar badge emas, highlight dokumen transparansi |
| `--color-desa-pageBg` | `#f2f6f3` | Latar belakang seluruh halaman (abu-hijau lembut) |
| `--color-desa-surface` | `#ffffff` | Permukaan kartu konten, header putih, dropdown menu |
| `--color-desa-textDark` | `#0f172a` | Teks utama, judul berita, heading kartu |
| `--color-desa-textMuted` | `#64748b` | Teks keterangan, sub-instansi, metadata tanggal |
| `--color-desa-border` | `#e2e8f0` | Garis pemisah kartu, pembatas input, border dropdown |

---

## 3. Skala Tipografi (Typography Scale)

Menggunakan basis font `Plus Jakarta Sans`:

| Level | Ukuran | Berat (Weight) | Leading | Penerapan |
|---|---|---|---|---|
| **Display / Hero H1** | 48px - 56px (3rem - 3.5rem) | Black (900) | 1.1 | Judul utama "Desa Bolali" di hero |
| **Hero Script** | 28px - 34px (1.75rem - 2.125rem) | SemiBold (600) | 1.2 | Teks script dekoratif (`font-script`) |
| **Hero Subtitle** | 22px - 24px (1.375rem - 1.5rem) | Bold (700) | 1.3 | Slogan desa di hero |
| **Site Brand Title** | 22px - 24px (1.375rem - 1.5rem) | Black (900) | 1.0 | "Desa Bolali" pada Header |
| **Site Brand Subtitle** | 11px - 12px (0.6875rem - 0.75rem) | Medium (500) | 1.2 | "Kecamatan Wonosari • Kabupaten Klaten • Jawa Tengah" |
| **Nav Menu Item** | 13px - 14px (0.8125rem - 0.875rem) | SemiBold (600) | 1.0 | Menu navigasi header |
| **Section Title** | 16px - 18px (1rem - 1.125rem) | Bold (700) | 1.25 | Judul tiap seksi kartu ("Berita Terbaru", dll) |
| **Body Primary** | 14px (0.875rem) | Regular (400) | 1.6 | Teks konten, ringkasan berita, sambutan |
| **Small / Meta** | 11px - 12px (0.6875rem - 0.75rem) | Medium (500) | 1.4 | Top bar info, tanggal rilis, footer address |
| **Micro / Subtext** | 10px (0.625rem) | Medium (500) | 1.2 | Label detail statistik, subteks IDM |

---

## 4. Skala Spacing & Geometri (Grid & Sizing)

- **Kelipatan Spacing**: 4px (`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`).
- **Lebar Kontainer Maksimum**: `1376px` (`max-w-[1376px]`) persis sesuai kanvas rancangan `beranda.png`.
- **Gutter Horizontal**: `16px` (`px-4`) pada mobile, `24px` (`px-6`) pada tablet, `32px` (`px-8`) pada desktop.
- **Tinggi Bar:**
  - **Top Bar**: `38px` fixed height.
  - **Header / Navbar**: `76px` fixed height (total baris atas = 114px).
- **Radius (Border Radius):**
  - Kartu & Section: `12px` - `14px` (`rounded-xl` / `rounded-[14px]`).
  - Tombol & Menu Aktif: `9999px` (`rounded-full` / Pill button).
  - Kontrol Font & Tag: `6px` (`rounded-md`).
- **Bayangan (Soft Elevation):**
  - Kartu & Navbar: `0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)`.
  - Dropdown Menu: `0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.03)`.
  - Hover Effect: Transformasi halus tanpa bayangan hitam pekat.

---

## 5. Pemetaan Ikon (Lucide Icons)

| Fungsi / Lokasi | Komponen Ikon Lucide |
|---|---|
| Alamat Kantor Desa (Top Bar & Footer) | `MapPin` |
| Nomor Telepon Resmi (Top Bar & Footer) | `Phone` |
| Alamat Surel Resmi (Top Bar & Footer) | `Mail` |
| Aksesibilitas Disabilitas (Top Bar) | `Accessibility` |
| Tombol Beranda Aktif (Navbar) | `Home` |
| Panah Dropdown Submenu (Navbar) | `ChevronDown` |
| Kolom Pencarian Website (Navbar) | `Search` |
| Hamburger Menu Mobile (Navbar) | `Menu` |
| Tutup Menu Mobile (Navbar) | `X` |
| Panah Navigasi / Tautan Lebih Lanjut | `ChevronRight` / `ArrowRight` |
| Media Sosial (YouTube, Facebook, Instagram, TikTok) | SVG Monokrom seragam (stroke/fill konsisten 16x16 pada grid Lucide) |

---

## 6. Struktur Komponen Global

### A. Top Bar (Bilah Informasi Teratas)
- Warna latar `--color-desa-darkGreen` (`#073c24`).
- **Kiri**: Alamat kantor, nomor telepon, alamat email (dipisah garis vertikal tipis `border-white/20`).
- **Kanan**:
  - Teks dan ikon `Aksesibilitas`.
  - Kontrol ukuran teks interaktif: `A-`, `A`, `A+` yang mengubah variabel CSS font-size di tag `<html>` secara real-time dan tersimpan di `localStorage`.
  - Pemisah vertikal tipis.
  - Tautan ikon 4 media sosial resmi: YouTube, Facebook, Instagram, TikTok.

### B. Header / Navbar Utama
- Warna latar `--color-desa-surface` (`#ffffff`) dengan border bawah tipis dan bayangan lembut.
- **Kiri**: Logo resmi Pemkab Klaten / Desa Bolali + Judul "Desa Bolali" (tebal hitam) + Subjudul "Kecamatan Wonosari • Kabupaten Klaten • Jawa Tengah".
- **Tengah**: Menu navigasi:
  1. `Beranda` (Tampilan aktif: tombol bentuk pill hijau tua dengan ikon `Home` dan teks putih).
  2. `Profil Desa` (dengan chevron dropdown: Sejarah, Visi & Misi, Geografis, Data Kependudukan, Wilayah & Dusun).
  3. `Pemerintahan` (dengan chevron dropdown: Struktur Organisasi, Perangkat Desa, BPD, RT/RW).
  4. `Informasi` (dengan chevron dropdown: Berita, Pengumuman, Agenda).
  5. `Potensi Desa` (dengan chevron dropdown: BUMDes, Pertanian, UMKM, Wisata Alam, Seni & Budaya).
  6. `Transparansi` (dengan chevron dropdown: Realisasi APBDes, Laporan Pembangunan, Dokumen Perencanaan).
  7. `Galeri` (dengan chevron dropdown: Foto Kegiatan, Video Dokumenter).
  8. `Kontak` (tautan langsung).
- **Kanan**: Kolom pencarian bentuk pill (`rounded-full`) dengan teks placeholder "Cari informasi..." dan ikon kaca pembesar `Search` di sisi kanan.
- **Mobile**: Tombol hamburger dengan drawer sisi kanan / overlay responsif.

### C. Footer Resmi
- Warna latar `--color-desa-darkGreen` (`#073c24`) dengan hiasan ornamen garis lengkung halus bernuansa daun/pegunungan (SVG opasitas 10-15%) di sudut kanan bawah.
- **Kolom Kiri**: Logo desa + "Pemerintah Desa Bolali" (tebal putih) + slogan italic "Bersama Membangun Desa yang Lebih Baik".
- **Kolom Tengah**: Informasi kontak resmi:
  - Alamat: Jl. Mawar No. 10, Desa Bolali, Kec. Wonosari, Kab. Klaten, Jawa Tengah
  - Telepon: (0272) 1234567 *(sumber data konsisten dari CMS kontak)*
  - Email: desa@bolali.desa.id *(sumber data konsisten dari CMS kontak)*
- **Kolom Kanan**: Teks "Ikuti Kami:" dengan 4 ikon media sosial dalam lingkaran tombol monokrom.
- **Bilah Navigasi Bawah**: Tautan teks kecil menu navigasi utama.
- **Baris Hak Cipta**: `© {tahun_berjalan} Pemerintah Desa Bolali. Hak Cipta Dilindungi.`

---

## 7. Catatan Koreksi Mockup (Data Integritas)
1. Typo "Dess" di footer mockup diperbaiki menjadi **"Desa"** ("Bersama Membangun Desa yang Lebih Baik").
2. Typo "bolalimali.desa.id" di footer mockup diperbaiki menjadi **"desa@bolali.desa.id"**.
3. Inkonsistensi kode area telepon header (0311) vs footer (0277) disatukan menggunakan data resmi CMS Klaten (0272 / sesuai global `kontak`).
4. Tahun copyright ganda 2025/2026 disatukan menjadi tahun berjalan dinamis secara otomatis.
