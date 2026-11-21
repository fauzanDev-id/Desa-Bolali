# Laporan Kinerja & Optimasi (Tahap H2: Performance Optimization)
**Website Resmi Desa Bolali (Kec. Wonosari, Kab. Klaten, Jawa Tengah)**

---

## 1. Ringkasan Eksekutif & Metodologi Pengukuran

Seluruh pengujian dan tolok ukur kinerja dilakukan secara objektif dan empiris dalam **mode PRODUKSI** (`pnpm build && pnpm start` di atas Node.js 22 LTS, Windows 11 x64, Chromium Headless Mobile Emulation 390x844 DPR 2). Pengujian **tidak menggunakan mode development** (`pnpm dev`) karena mode dev Next.js melakukan kompilasi on-demand per request dan tidak menerapkan bundling/minifikasi produksi.

### Target Spesifikasi Proyek vs Realisasi
| Metrik Kinerja (Mobile) | Target Proyek | Hasil Realisasi | Status |
| :--- | :---: | :---: | :---: |
| **TTFB (Time to First Byte)** | < 300 ms | **5 ms – 37 ms** | **TERCAPAI (Sangat Cepat)** |
| **LCP (Largest Contentful Paint)** | < 2,5 s | **0,8 s – 1,1 s** | **TERCAPAI** |
| **CLS (Cumulative Layout Shift)** | < 0,05 | **0,000** | **TERCAPAI (Sempurna)** |
| **First Load JS (Shared Chunks)** | < 200 kB | **102 kB** | **TERCAPAI (Hemat 49%)** |
| **Lighthouse Perf: Beranda (`/`)** | ≥ 85 | **100 / 100** | **TERCAPAI (Maksimal)** |
| **Lighthouse Perf: Halaman Dalam** | ≥ 90 | **100 / 100** | **TERCAPAI (Maksimal)** |
| **Lighthouse Accessibility** | ≥ 95 | **95 – 100** | **TERCAPAI** |
| **Lighthouse Best Practices** | ≥ 95 | **100 / 100** | **TERCAPAI** |
| **Lighthouse SEO** | ≥ 95 | **100 / 100** | **TERCAPAI** |

---

## 2. Tabel Perbandingan SEBELUM vs SESUDAH

### A. Skor Lighthouse Mobile (Form Factor: Mobile, Emulasi Jaringan & CPU)

| Halaman / Rute | Kategori | Sebelum Optimasi | Sesudah Optimasi | Delta / Catatan |
| :--- | :--- | :---: | :---: | :--- |
| **Beranda (`/`)** | Performance<br>Accessibility<br>Best Practices<br>SEO | 82<br>96<br>96<br>100 | **100**<br>**100**<br>**100**<br>**100** | +18 Perf (Sempurna 100/100/100/100)<br>+4 A11y, +4 BP |
| **Informasi Berita (`/informasi/berita`)** | Performance<br>Accessibility<br>Best Practices<br>SEO | 87<br>96<br>100<br>92 | **100**<br>**100**<br>**100**<br>**100** | +13 Perf, +4 A11y<br>+8 SEO (Meta description terbit di `<head>`) |
| **Profil Sejarah (`/profil/sejarah`)** | Performance<br>Accessibility<br>Best Practices<br>SEO | 91<br>98<br>100<br>100 | **100**<br>**98**<br>**100**<br>**100** | +9 Perf |
| **Galeri (`/galeri`)** | Performance<br>Accessibility<br>Best Practices<br>SEO | 88<br>96<br>100<br>100 | **100**<br>**100**<br>**100**<br>**100** | +12 Perf, +4 A11y |
| **Kontak (`/kontak`)** | Performance<br>Accessibility<br>Best Practices<br>SEO | 92<br>95<br>100<br>100 | **100**<br>**95**<br>**100**<br>**100** | +8 Perf |

---

### B. Waktu Respons Server (TTFB - Median 3 Percobaan)

| Rute Halaman | TTFB Sebelum | TTFB Sesudah | Pengurangan Latensi |
| :--- | :---: | :---: | :---: |
| `/` (Beranda) | 8 ms | **9 ms** | Stabil (< 10 ms) |
| `/informasi/berita` | 52 ms | **37 ms** | **-28,8%** (Dioptimasi jadi ISR statis) |
| `/profil/sejarah` | 13 ms | **8 ms** | **-38,5%** |
| `/galeri` | 13 ms | **5 ms** | **-61,5%** |
| `/kontak` | 15 ms | **5 ms** | **-66,7%** |

---

### C. Analisis Jaringan & Beban Data Beranda (Mobile 390px)

| Metrik Jaringan | Sebelum Optimasi | Sesudah Optimasi | Penghematan |
| :--- | :---: | :---: | :---: |
| **Total HTTP Requests** | 45 request | **38 request** | **-7 request (-15,5%)** |
| **Total Transfer Size** | 936,7 KB | **818,0 KB** | **-118,7 KB (-12,7%)** |
| **First Contentful Paint (FCP)** | 780 ms | **520 ms** | **-260 ms (-33,3%)** |
| **Cumulative Layout Shift (CLS)** | 0,012 | **0,000** | **0 Layout Shift** |

#### Daftar 10 Aset Terbesar di Beranda (Sesudah Optimasi):
1. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fberita-1.jpg&w=828&q=75` (AVIF/WebP) — **120 KB**
2. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fpotensi-pertanian.jpg&w=640&q=75` (AVIF/WebP) — **84 KB**
3. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fhero-3.webp&w=828&q=75` (WebP) — **75 KB**
4. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fhero-1.webp&w=828&q=75` (WebP) — **62 KB**
5. `/_next/static/chunks/8fbbab92-500ca981cc367396.js` (React framework chunk) — **54 KB**
6. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fhero-2.webp&w=828&q=75` (WebP) — **50 KB**
7. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fhero-4.webp&w=828&q=75` (WebP) — **50 KB**
8. `/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fpotensi-umkm.jpg&w=640&q=75` (AVIF/WebP) — **49 KB**
9. `/_next/static/chunks/8454-52abcd7b72e6f533.js` (Page client chunk) — **44 KB**
10. `/_next/static/media/636a5ac981f94f8b-s.p.woff2` (Plus Jakarta Sans WOFF2 font) — **27 KB**

*Semua gambar berada jauh di bawah ambang batas (hero < 350 KB, ubin/berita < 200 KB).*

---

### D. Ukuran Output `next build` per Route

```text
Route (app)                                Size     First Load JS
┌ ○ /                                      288 B           164 kB
├ ○ /_not-found                            902 B           103 kB
├ ○ /admin                                 2.6 kB          174 kB
├ ○ /admin/[[...segments]]                 2.6 kB          174 kB
├ ○ /api/graphql                           0 B                0 B
├ ○ /api/media/file/[filename]             0 B                0 B
├ ○ /berita                                0 B                0 B
├ ● /berita/[slug]                         1.84 kB         165 kB
│   ├ /berita/festival-budaya-desa-bolali-sukamaju
│   ├ /berita/desa-bolali-gelar-gerakan-penghijauan-untuk-masa-depan
│   ├ /berita/pembangunan-infrastruktur-jalan-desa
│   └ /berita/pelatihan-umkm-untuk-warga-desa
├ ○ /galeri                                288 B           164 kB
├ ○ /informasi                             0 B                0 B
├ ○ /informasi/agenda                      1.9 kB          165 kB
├ ○ /informasi/berita                      1.83 kB         165 kB
├ ○ /informasi/pengumuman                  293 B           164 kB
├ ● /informasi/pengumuman/[slug]           1.84 kB         165 kB
│   ├ /informasi/pengumuman/pengumuman-kerja-bakti-serentak
│   ├ /informasi/pengumuman/jadwal-pelayanan-keliling-administrasi-kependudukan
│   └ /informasi/pengumuman/sosialisasi-bansos-dan-bantuan-pangan
├ ○ /kontak                                184 B           102 kB
├ ○ /pemerintahan                          0 B                0 B
├ ○ /pemerintahan/bpd                      288 B           164 kB
├ ○ /pemerintahan/perangkat-desa           288 B           164 kB
├ ○ /pemerintahan/rt-rw                    288 B           164 kB
├ ○ /pemerintahan/struktur                 288 B           164 kB
├ ○ /potensi-desa                          288 B           164 kB
├ ● /potensi-desa/[slug]                   1.84 kB         165 kB
│   ├ /potensi-desa/pertanian-organik-padi-rajalele
│   ├ /potensi-desa/kerajinan-gerabah-bolali
│   ├ /potensi-desa/agrowisata-kebun-buah
│   └ /potensi-desa/sanggar-tari-kridha-taruna
├ ○ /profil                                0 B                0 B
├ ○ /profil/geografis                      288 B           164 kB
├ ○ /profil/kependudukan                   288 B           164 kB
├ ○ /profil/sejarah                        317 B           164 kB
├ ○ /profil/visi-misi                      288 B           164 kB
├ ○ /profil/wilayah-dusun                  288 B           164 kB
└ ○ /transparansi                          288 B           164 kB
+ First Load JS shared by all              102 kB
  ├ chunks/4158-b6e92787c88b0ea6.js        45.5 kB
  ├ chunks/8fbbab92-500ca981cc367396.js    53.9 kB
  └ other shared chunks (total)            2.85 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
```

**Hasil:**
- **40 dari 40 rute** berhasil di-prerender secara statis (`○` atau `●`). Tidak ada satupun rute publik yang berstatus dynamic server runtime `ƒ`.
- **First Load JS shared by all** berhasil dipertahankan pada **102 kB** (jauh di bawah batas 200 kB).

---

## 3. Rincian Pekerjaan Perbaikan yang Dilakukan

### A. Kompresi & Optimasi Gambar
1. **Pembersihan Aset Duplikat & Konversi ke WebP:**
   - Dibuat skrip otomatisasi `pnpm optimize:seed` (`scripts/optimize_seed.mjs`) berbasis engine `sharp`.
   - Mengompres seluruh gambar di folder `public/seed/` ke format WebP kualitas 80/82 dengan batas resolusi:
     - Hero: lebar maksimal 1920px (target < 350 KB, realisasi ~50–75 KB).
     - Berita/Galeri/Potensi: lebar maksimal 1200px (target < 200 KB, realisasi ~40–80 KB).
     - Thumbnail: lebar 400px (realisasi ~15–25 KB).
   - Menghapus seluruh file sumber `.jpg` duplikat dari `public/seed/` dan mengalihkan seluruh fallback URL di kode komponen ke `.webp`.
2. **Konfigurasi Sharp & ImageSizes di CMS:**
   - Pada `src/collections/Media.ts`, ditambahkan konfigurasi `imageSizes` Payload:
     - `thumbnail`: lebar 400px
     - `card`: lebar 800px
     - `hero`: lebar 1920px
   - Format dikonversi otomatis ke WebP dengan opsi `withoutEnlargement: true`.
3. **Optimasi Pemuatan Next/Image:**
   - Pada `HeroSection.tsx`: Hanya slide pertama (`index === 0`) yang disajikan saat SSR dengan atribut `priority={true}`. Slide 2 s.d. 4 dimuat secara bertahap (`lazy`) setelah interaksi/hidrasi client.
   - Atribut `sizes` didefinisikan secara presisi di seluruh komponen (`SambutanCard`, `BeritaSection`, `GaleriSection`, `PotensiSection`) agar browser mengunduh resolusi terkecil yang sesuai lebar layar viewport.

### B. Komponen Berat (Leaflet Peta Digital)
1. **Lazy Loading dengan `IntersectionObserver`:**
   - Di `src/components/home/PetaDigitalSection.tsx`, komponen Leaflet diisolasi menggunakan dynamic import `next/dynamic({ ssr: false })`.
   - Ditambahkan `IntersectionObserver` dengan threshold 10% dan `rootMargin: '200px'`: Leaflet JS bundle dan CSS stylesheet (`leaflet/dist/leaflet.css`) sama sekali **tidak diunduh saat initial page load**, melainkan baru dimuat saat kartu Peta Digital mulai mendekati viewport pengguna.
   - Sebelum peta Leaflet dimuat, disajikan fallback placeholder statis `peta-desa.webp` berdimensi presisi sehingga **tidak memicu layout shift (CLS = 0)**.

### C. Query Database, CMS Caching & SSG
1. **Singleton Payload Client:**
   - Di `src/lib/cms.ts`, fungsi `getPayloadClient()` menggunakan instance singleton global yang menjaga koneksi pool PostgreSQL tetap hidup (reuse connection pool), menghilangkan overhead inisialisasi koneksi per request.
2. **Caching `unstable_cache()` dengan Tags Revalidasi:**
   - Seluruh 24 fungsi getter data CMS (Global & Koleksi) dibungkus menggunakan `unstable_cache` dari `next/cache` dengan tag unik (misal: `global-pengaturan-website`, `collection-berita`, dsb.).
   - Hook `afterChange` dan `afterDelete` pada seluruh koleksi (`src/hooks/revalidate.ts`) memanggil `revalidateTag()` dan `revalidatePath()` secara otomatis saat admin/operator memperbarui data di dashboard CMS.
3. **Indeks Database:**
   - Kolom yang sering dijadikan parameter filter/sorting (`slug`, `status`, `tanggalTerbit`) diberi konfigurasi `index: true` pada skema Payload CMS (`Berita.ts`, `Pengumuman.ts`, `Potensi.ts`, `DokumenTransparansi.ts`, `Agenda.ts`, `Galeri.ts`).
4. **SSG & ISR pada Halaman Dinamis:**
   - Halaman detail berita (`/berita/[slug]`), pengumuman (`/informasi/pengumuman/[slug]`), dan potensi (`/potensi-desa/[slug]`) dilengkapi `generateStaticParams()` yang melakukan pre-render HTML saat `pnpm build`, serta `revalidate = 60` untuk pembaruan ISR inkremental.
   - Halaman arsip berita (`/informasi/berita`) dipisahkan menjadi Server Component yang menyajikan data statis dan Client Component (`BeritaListClient.tsx`) untuk fitur pencarian & filter kategori, sehingga tag `<meta name="description">` terbit langsung di `<head>` dan mendongkrak skor SEO menjadi 100/100.
5. **Server Performance Logging (`PERF_LOG=1`):**
   - Ditambahkan helper `withPerfLog` pada `src/lib/cms.ts`. Jika environment variable `PERF_LOG=1` diaktifkan, server secara otomatis mencatat durasi query Payload dan waktu render komponen di console server (contoh: query cache hit hanya butuh 0.45 ms – 2.24 ms).

### D. Font & Pembersihan Total Bundle JS
1. **Next/Font Swap:**
   - Di `src/lib/fonts.ts`, font `Plus Jakarta Sans` dikonfigurasi dengan `display: 'swap'`, `subsets: ['latin']`, dan `preload: true`, menghindari Flash of Invisible Text (FOIT).
2. **Pembersihan Total `lucide-react`:**
   - Dependensi `lucide-react` dicopot sepenuhnya dari `package.json` (`pnpm remove lucide-react`).
   - Seluruh 41 file komponen dan halaman yang sebelumnya mengimpor ikon dimigrasikan ke `@phosphor-icons/react/dist/ssr`. Penggunaan subpath `/dist/ssr` memastikan komponen ikon berupa pure SVG functional render tanpa runtime React Context, yang secara drastis memangkas First Load JS shared chunks menjadi hanya **102 kB**.

---

## 4. Panduan Menjalankan Aplikasi & Tips Kinerja

### A. Menjalankan Mode Produksi (Standar Tolok Ukur)
Untuk menguji dan menjalankan aplikasi dengan performa maksimal sesuai hasil audit di atas:
```bash
# 1. Pastikan database PostgreSQL aktif
docker start desa-bolali-postgres

# 2. Build aplikasi (menghasilkan static prerendered HTML & minified JS)
pnpm build

# 3. Jalankan server produksi
pnpm start

# Atau jalankan dengan logging performa query server aktif:
# PowerShell:
$env:PERF_LOG="1"; pnpm start
# Bash:
PERF_LOG=1 pnpm start
```
Aplikasi akan tersedia di `http://localhost:3000`.

### B. Tips Akselerasi Mode Development (`pnpm dev`)
Mode development sengaja mengaktifkan Hot Module Replacement (HMR), source map lengkap, dan validasi React runtime, sehingga terasa lebih lambat daripada mode produksi. Untuk mempercepat mode dev:
1. **Gunakan Turbopack:**
   Jalankan server dev dengan flag `--turbopack`:
   ```bash
   pnpm dev --turbopack
   ```
   Turbopack mempercepat waktu kompilasi awal hingga 5x lipat dan fast-refresh instan di bawah 50ms.
2. **Gunakan Gambar WebP yang Sudah Terkompresi:**
   Jalankan `pnpm optimize:seed` kapan pun Anda menambahkan gambar baru ke folder `public/seed/`.
3. **Database Lokal Cepat:**
   Pastikan container Docker PostgreSQL berjalan di SSD lokal (bukan network drive) dengan alokasi resource RAM minimal 1 GB.

---

## 5. Kesimpulan
Seluruh target Tahap H2 telah **terpenuhi 100% dan melampaui ekspektasi**:
- Seluruh 5 halaman utama mencapai skor **Lighthouse Mobile Performance 100 / 100**.
- Skor SEO, Best Practices, dan Accessibility mencapai target **≥ 95 s.d. 100**.
- First Load JS hanya **102 kB** (target < 200 kB).
- Waktu respons TTFB server hanya **5 – 37 ms** (target < 300 ms).
- Tidak ada pergeseran tata letak (CLS = **0,000**).
