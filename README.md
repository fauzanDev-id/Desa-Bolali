# Website Resmi Desa Bolali

Website resmi Pemerintah Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten, Provinsi Jawa Tengah.

## 🚀 Teknologi yang Digunakan
- **Framework**: Next.js 15 (App Router, Server Components, TypeScript)
- **CMS**: Payload CMS 3 (PostgreSQL Adapter, Lexical RichText, Bahasa Indonesia)
- **Database**: PostgreSQL 16 (via Docker)
- **Styling**: Tailwind CSS, Lucide Icons, Google Fonts (Plus Jakarta Sans & Dancing Script)
- **Peta Digital**: Leaflet & OpenStreetMap

---

## 📸 Panduan Penggantian Berkas Gambar Dummy
Seluruh aset gambar awal untuk keperluan demonstrasi ditaruh pada direktori:
```
public/seed/
```
> [!IMPORTANT]
> Seluruh gambar dummy pada direktori `public/seed/` (banner hero, pas foto Kepala Desa, foto potensi desa, thumbnail berita, dan dokumentasi galeri) **wajib diganti dengan foto asli Desa Bolali** sebelum website diluncurkan secara resmi (*go-live*) ke masyarakat. Penggantian dapat dilakukan melalui panel CMS admin di `/admin` atau langsung mengganti berkas terkait di direktori penyimpanan media.

---

## 🛠️ Cara Menjalankan Proyek Secara Lokal

### 1. Kebutuhan Sistem
- Node.js versi 20+
- pnpm versi 9+
- Docker & Docker Compose (untuk database PostgreSQL)

### 2. Menjalankan Database PostgreSQL
```bash
docker compose up -d
```
Database akan berjalan di port `5433` (atau sesuai konfigurasi `.env`).

### 3. Instalasi Dependensi
```bash
pnpm install
```

### 4. Menjalankan Seeding Data Awal
```bash
pnpm seed
```
Skrip ini akan mengisi akun pengguna administratif, data global (profil, kontak, statistik, navigasi), serta konten awal berita, agenda, pengumuman, transparansi, potensi, dan galeri yang ditandai dengan `[Data Dummy]`.

### 5. Menjalankan Server Pengembangan
```bash
pnpm dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000) untuk antarmuka publik dan [http://localhost:3000/admin](http://localhost:3000/admin) untuk panel admin Payload CMS.

### 6. Akun Pengguna Bawaan (Hasil Seeding)
- **Super Admin**: `admin@bolali.desa.id` / `Password123!` (Akses penuh seluruh modul)
- **Admin Desa**: `admindesa@bolali.desa.id` / `Password123!` (Semua konten desa)
- **Operator**: `operator@bolali.desa.id` / `Password123!` (Hanya berita, pengumuman, agenda, galeri)

---

## 🧪 Pengujian & Build
- Menjalankan linter:
  ```bash
  pnpm lint
  ```
- Menjalankan unit test hak akses (RBAC):
  ```bash
  pnpm test
  ```
- Membangun build produksi:
  ```bash
  pnpm build
  ```
