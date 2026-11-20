# Laporan Audit & Penyelarasan Sistem Desain Website Desa Bolali
**Acuan Resmi:** `docs/desain/beranda.png` (Kanvas 1376px)  
**Spesifikasi Desain:** `docs/DESIGN_SPEC.md`  
**Tanggal Audit:** 20 November 2026  
**Status Audit:** Fondasi Sistem Desain & Tata Letak Global Telah Diperbaiki

---

## 1. Ringkasan Eksekutif & Prinsip Anti "AI-Slop"

Website Resmi Desa Bolali dibangun dengan standar ketat institusi pemerintahan Republik Indonesia. Berdasarkan audit antarmuka terhadap mockup resmi dan evaluasi lintas perangkat (desktop 1440px, tablet 768px, mobile 390px/360px), seluruh temuan diklasifikasikan ke dalam 3 tingkat prioritas:
- **Prioritas 1: Rusak (Broken / Accessibility Violations)** — Terkait overflow, target sentuh <44px, layout breaking, scroll lock.
- **Prioritas 2: Tidak Sama (Design Discrepancies)** — Terkait deviasi bentuk elemen, rasio gambar, warna, atau posisi dibandingkan mockup.
- **Prioritas 3: Kurang Rapi (Inconsistencies & Polish)** — Terkait hardcoded tokens, padding mikro, dan konsistensi ikonografi.

### Aturan Anti "AI-Slop" yang Ditegakkan:
1. **Satu Set Ikon Tunggal**: Hanya menggunakan **Lucide Icons** dengan ketebalan garis seragam (`strokeWidth={1.75}`) dan ukuran proporsional (16px, 20px, atau 24px). Dilarang keras menggunakan emoji atau ikon campur-campur.
2. **Tanpa Gradient Berlebihan**: Tidak ada gradien warna-warni ungu/biru, text-gradient, blob/lingkaran pastel dekoratif tanpa fungsi, efek glassmorphism, atau bayangan tebal melayang.
3. **Maksimal Dua Rumpun Huruf (Font)**:
   - Sans-serif: `Plus Jakarta Sans` untuk seluruh teks antarmuka, heading, navigasi, dan body copy.
   - Script: `Dancing Script` **hanya** untuk dua frasa aksen di banner hero (*"Selamat Datang di"* dan *"Maju Bersama Untuk Desa Lebih Baik"*).
4. **Skala Radius Hanya 3 Nilai**:
   - Kecil (`rounded-desa-sm`: 6px) — untuk tag, input, badge kecil.
   - Kartu (`rounded-desa-card`: 14px) — untuk kartu konten dan section card.
   - Pil (`rounded-full` / `rounded-desa-pill`: 9999px) — untuk tombol dan badge pill.
5. **Skala Bayangan Hanya 2 Level**:
   - `shadow-desa-sm`: bayangan halus elevasi permukaan.
   - `shadow-desa-hover`: bayangan saat interaksi hover.
6. **Skala Spacing Kelipatan 4px**: Seluruh jarak (padding, margin, gap) berbasis `4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px`.
7. **Bahasa Pemerintahan Bersahaja**: Tidak menggunakan teks pemasaran generik (*"Solusi masa depan"*, *"Inovasi tanpa batas"*). Menggunakan bahasa lugas tata kelola desa.

---

## 2. Audit Section demi Section (Hasil vs Mockup)

| Section | Elemen | Nilai Sekarang (Sebelum Perbaikan) | Nilai Target (Mockup) | File Penyebab | Status |
|---|---|---|---|---|---|
| **Top Bar** | Visibilitas Mobile | Tampil dan bertumpuk vertikal di layar <768px | Disembunyikan di <768px; info kontak dipindah ke drawer mobile | `src/components/layout/TopBar.tsx` | **Selesai Diperbaiki** (`hidden md:block`) |
| **Top Bar** | Lebar Kontainer | `max-w-[1376px]` | `max-w-[1344px] px-4 md:px-6 lg:px-8` | `src/components/layout/TopBar.tsx` | **Selesai Diperbaiki** |
| **Header** | Menu Navigasi Line-wrap | Menu *"Profil Desa"* dan *"Potensi Desa"* turun menjadi 2 baris | Satu baris rapi dengan `whitespace-nowrap` | `src/components/layout/Navbar.tsx` | **Selesai Diperbaiki** |
| **Header** | Tombol Pill Beranda | Menggunakan hijau terang `#10b981` | Hijau tua resmi `#073c24` (`bg-desa-darkGreen`) | `src/components/layout/Navbar.tsx` | **Selesai Diperbaiki** |
| **Header** | Hamburger Mobile | Hanya tombol dropdown sederhana tanpa drawer penuh | Drawer samping dengan backdrop, accordion submenu, tombol tutup 44px, dan kunci scroll | `src/components/layout/Navbar.tsx` | **Selesai Diperbaiki** |
| **Hero** | Foto Latar Belakang | Kastil batu Eropa gelap | Lanskap desa agraris Indonesia cerah dengan sawah terasering & pegunungan | `public/seed/hero-desa.jpg` & `media/hero-desa.jpg` | **Selesai Diperbaiki** |
| **Hero** | Overlay Kegelapan | `bg-black/45` gelap pekat | `bg-black/20` tipis netral agar keindahan desa tampak terang | `src/components/home/HeroSection.tsx` | **Selesai Diperbaiki** |
| **Hero** | Script Kanan | Tegak lurus kaku | Miring `-rotate-3` dua baris berbayang halus | `src/components/home/HeroSection.tsx` | **Selesai Diperbaiki** |
| **Bar Statistik** | Tata Letak Wadah | Terpisah menjadi dua kotak dengan celah (`gap-3`) | Satu wadah pil utuh terpadu (kiri putih, kanan hijau tua dengan aksen emas) | `src/components/home/StatsBar.tsx` | **Selesai Diperbaiki** |
| **Baris 1: Kades** | Foto Kepala Desa | Foto kasual polo shirt | Pas foto resmi PDU Kades putih dengan lencana & latar merah putih | `public/seed/kades.jpg` & `media/kades.jpg` | **Selesai Diperbaiki** |
| **Baris 1: Kades** | Tombol Selengkapnya | Kotak sudut 8px hijau terang | Pil `rounded-full` hijau tua `#073c24` | `src/components/home/SambutanCard.tsx` | **Selesai Diperbaiki** |
| **Baris 1: Transparansi** | Donut Chart SVG | Teks `92,3%` berada di tengah lubang donut | Tengah lubang bersih/kosong; teks `92,3%` & tombol berada di kanan donut | `src/components/home/TransparansiCard.tsx` | **Selesai Diperbaiki** |
| **Baris 1: Transparansi** | Latar Belakang Kotak | Kotak hijau muda mengelilingi chart | Area putih bersih langsung di permukaan kartu tanpa kotak latar tambahan | `src/components/home/TransparansiCard.tsx` | **Selesai Diperbaiki** |
| **Baris 2: Potensi** | Label Ubin Foto | Judul panjang *"BUMDes Bolali Makmur Sejahtera"* memecah simetri 2x2 | 4 kategori teratur: Pertanian, UMKM, Wisata Alam, Budaya | `src/components/home/PotensiSection.tsx` | **Selesai Diperbaiki** |
| **Baris 2: Peta** | Tile Layer Basemap | Peta jalan pucat biasa (OSM street) | Citra satelit aerial perdesaan hijau (Esri World Imagery) | `src/components/home/PetaDigitalLeaflet.tsx` | **Selesai Diperbaiki** |
| **Baris 2: Peta** | Legenda Peta | Ada label badge *"Aktif"* di tiap baris | Titik warna bersih dan nama kategori tanpa label status teks | `src/components/home/PetaDigitalLeaflet.tsx` | **Selesai Diperbaiki** |
| **Footer** | Teks Paragraf | Terdapat paragraf panjang di bawah logo (tidak ada di mockup) | Dihapus; hanya logo, nama instansi, dan tagline miring | `src/components/layout/Footer.tsx` | **Selesai Diperbaiki** |
| **Footer** | Lebar Kontainer | `max-w-[1376px]` | `max-w-[1344px] px-4 md:px-6 lg:px-8` | `src/components/layout/Footer.tsx` | **Selesai Diperbaiki** |

---

## 3. Audit Responsivitas Lintas Perangkat (390px, 768px, 1440px)

### A. Tampilan Mobile (Viewport 390px & 360px)
- **Top Bar**: Telah disembunyikan di `<768px` (`hidden md:block`) guna menghemat ruang vertikal layar kecil dan mencegah teks bertumpuk berantakan. Seluruh informasi kontak resmi dan media sosial dipindahkan secara elegan ke bagian bawah drawer navigasi.
- **Drawer Menu Mobile**: Menggunakan drawer samping penuh (`w-full max-w-[360px]`) dengan backdrop gelap transparan, tombol tutup jelas (`X`) berukuran `44x44px`, penguncian scroll layar belakang (`document.body.style.overflow = 'hidden'`), serta penangkapan fokus keyboard (focus trap + tombol Escape).
- **Submenu Accordion**: Kategori menu dropdown bertingkat dapat dibuka-tutup secara mandiri dengan ikon panah animasi dan target sentuh minimal `44px`.
- **Target Sentuh Tombol**: Seluruh tombol aksi primer, tautan menu, paginasi, dan kontrol media sosial memenuhi standar WCAG 2.1 AA dengan tinggi/lebar minimal `44px`.
- **Scroll Horizontal**: Tidak ada kebocoran layout atau overflow horizontal (`overflow-x: hidden`).

### B. Tampilan Tablet (Viewport 768px - 1023px)
- **Grid Layout**: Baris 3 kolom beralih menjadi 2 kolom responsif (`md:grid-cols-2`), kartu berita utama melebar secara penuh di baris baru untuk menjaga keterbacaan teks dan rasio visual thumbnail berita.
- **Top Bar**: Ditampilkan secara ringkas dengan padding horizontal `px-6` (24px) dan pemisah tipis yang rapi.
- **Stats Bar**: Grid counter 4 metrik beralih ke format 2x2 yang seimbang dengan blok aksen Desa Digital.

### C. Tampilan Desktop (Viewport >= 1280px & 1440px)
- **Grid Layout**: 3 kolom penuh seimbang dengan rasio proporsional ~4 : 5 : 3 (12 kolom grid).
- **Container**: Konsisten terpusat dengan lebar maksimal `1344px` dan gutter `px-8` (32px).
- **Menu Desktop**: Tampil penuh dengan indikator pil hijau tua untuk Beranda aktif, dropdown hover/fokus, dan kolom pencarian bentuk pil di kanan.

---

## 4. Audit Konsistensi Token & Komponen

### A. Palet Warna & Token Tailwind
- **Warna Standar**: Seluruh warna sekarang merujuk ke token CSS variables resmi:
  - Latar Gelap/Footer/Header Brand: `--color-desa-darkGreen: #073c24`
  - Tombol Utama / Aksi: `--color-desa-primaryGreen: #0b4625`
  - Hover: `--color-desa-greenHover: #0f5930`
  - Aksen / Teks Hijau: `--color-desa-accentGreen: #15803d`
  - Latar Lembut: `--color-desa-lightGreen: #eaf4ee`
  - Kuning Emas: `--color-desa-gold: #eab308` & `--color-desa-goldHover: #ca8a04`
  - Latar Halaman: `--color-desa-pageBg: #f2f6f3`
  - Permukaan Kartu: `--color-desa-surface: #ffffff`
  - Teks Gelap: `--color-desa-textDark: #0f172a`
  - Teks Redup: `--color-desa-textMuted: #64748b`
  - Garis Pemisah: `--color-desa-border: #e2e8f0`

### B. Geometri & Tipografi
- **Radius 3 Nilai**:
  - `rounded-desa-sm`: `6px`
  - `rounded-desa-card`: `14px`
  - `rounded-desa-pill`: `9999px`
- **Bayangan 2 Level**:
  - Elevasi Dasar: `shadow-desa-sm` (`0 1px 3px rgba(0,0,0,0.05)`)
  - Elevasi Interaksi: `shadow-desa-hover` (`0 4px 6px rgba(0,0,0,0.07)`)
  - Dropdown: `shadow-desa-dropdown` (`0 10px 15px rgba(0,0,0,0.08)`)
- **Fluid Typography**:
  - `h1`: `clamp(1.875rem, 1.4rem + 2vw, 2.75rem)`
  - `h2`: `clamp(1.375rem, 1.15rem + 1vw, 1.875rem)`
  - `h3`: `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)`
  - `body`: `clamp(0.875rem, 0.825rem + 0.25vw, 1rem)`
  - Batas Baris Bacaan: Maksimal 70 karakter (`max-w-[70ch]` / `.prose-reading`).

### C. Komponen Dasar yang Dipakai Ulang (Reusable UI Primitives)
Komponen terpusat di `src/components/ui/` dan diekspor melalui `src/components/index.ts`:
1. `Container.tsx`: Wadah pembatas lebar 1344px dengan padding fluid.
2. `Section.tsx`: Pembungkus seksi berjarak vertikal konsisten kelipatan 4px.
3. `SectionHeader.tsx`: Header judul seksi + tautan "Lihat Semua →".
4. `Card.tsx`: Kartu permukaan putih dengan radius 14px dan border tipis.
5. `Button.tsx`: Tombol bentuk pil dengan varian `primary`, `dark`, `gold`, `outline`, `outline-white`, ukuran `sm` (36px) dan `md` (44px), serta stroke Lucide 1.75.
6. `Badge.tsx`: Label status/kategori berukuran ringkas.
7. `Breadcrumb.tsx`: Navigasi remah roti berstandar semantik dan a11y.
8. `Pagination.tsx`: Kontrol paginasi dengan touch target minimal 44px.
9. `EmptyState.tsx`: Penampung data kosong tanpa teks marketing generik.
10. `Skeleton.tsx`: Efek loading denyut lembut netral.

---

## 5. Rencana Tahapan Berikutnya (Next Steps)

Setelah fondasi sistem desain, tata letak global, dan komponen dasar diselaraskan:
1. **Tahap 5 — Halaman Profil Desa & Pemerintahan**:
   - Struktur halaman Profil (Sejarah, Visi & Misi, Geografis, Kependudukan, Wilayah Dusun).
   - Struktur halaman Pemerintahan (Struktur Organisasi, Perangkat Desa, BPD, RT/RW).
   - Sidebar submenu interaktif dan breadcrumb terpadu.
2. **Tahap 6 — Modul Informasi**:
   - Berita dengan paginasi dan filter kategori.
   - Pengumuman resmi dan Agenda kegiatan desa.
3. **Tahap 7 — Modul Potensi, Transparansi, Galeri, & Kontak**:
   - Halaman potensi ekonomi, dokumen APBDes download PDF, galeri foto/video, formulir kontak spam-protected.
4. **Tahap 8 — Audit Produksi Akhir**:
   - Metadata SEO per halaman, sitemap XML, robots.txt, loading state, verifikasi WCAG AA, dan optimasi build.
