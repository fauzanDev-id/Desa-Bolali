# Matriks Hak Akses & Keamanan Sistem (Tahap H3: RBAC Enforcement)
**Website Resmi Desa Bolali (Kec. Wonosari, Kab. Klaten, Jawa Tengah)**

---

## 1. Ringkasan Arsitektur Hak Akses (Role-Based Access Control)

Sistem otorisasi Website Desa Bolali menerapkan pengamanan berlapis (**defense-in-depth**). Pembatasan tidak hanya dilakukan dengan menyembunyikan navigasi di antarmuka admin panel (*UI-level hiding*), melainkan ditegakkan secara ketat pada **API Payload Local API, REST API (`/api/*`), dan GraphQL API** melalui fungsi kendali akses di `src/access/roles.ts` dan hook validasi skema.

### Peran Pengguna (User Roles):
1. **Super Admin (`super-admin`)**:
   - Memegang kendali penuh atas seluruh aspek website dan konfigurasi sistem.
   - Satu-satunya peran yang berhak mengelola akun pengguna (`users`) dan `pengaturan-website`.
   - **Perlindungan Integritas Sistem**: Super Admin terakhir di sistem dilindungi secara permanen oleh sistem hook database agar tidak dapat dihapus atau diturunkan perannya (*anti-lockout protection*).
2. **Admin Desa (`admin-desa`)**:
   - Berwenang penuh mengelola seluruh data dan informasi desa (*Profil Desa, Pemerintahan, Dusun, RT/RW, BPD, Potensi Desa, Dokumen Transparansi APBDes, Sambutan Kades, Data Kependudukan, Statistik, Kontak, Berita, Pengumuman, Agenda, Galeri, dan Pustaka Media*).
   - **DITOLAK KERAS** mengelola atau mengakses akun pengguna (`users`) dan tidak dapat memodifikasi `pengaturan-website` (identitas desa, logo, dsb.).
3. **Operator (`operator`)**:
   - Petugas operasional harian yang **HANYA** memiliki akses CRUD pada 4 modul informasi publik: **Berita Desa, Pengumuman Warga, Agenda Kegiatan, dan Galeri Foto/Video**.
   - Pada pustaka berkas (**Media**), Operator hanya berhak mengedit atau menghapus berkas yang diunggah oleh dirinya sendiri (`uploadedBy === user.id`).
   - **DITOLAK TOTAL (403 Forbidden)** dari seluruh modul pemerintahan, profil, transparansi APBDes, potensi, pengaturan website, maupun manajemen pengguna.
4. **Pengunjung Publik (Anonim / Tanpa Login)**:
   - Hanya memiliki izin baca (**read-only**) untuk konten yang telah berstatus publikasi **'terbit'**. Konten berstatus **'draft'** difilter secara otomatis oleh database engine dan tidak dapat diakses publik.
   - **DITOLAK TOTAL (403 Forbidden)** untuk endpoint daftar pengguna (`/api/users`). Tidak ada kebocoran data sensitif (email, hash kata sandi, peran) ke publik.

---

## 2. Matriks Otorisasi Koleksi & Global

### A. Matriks Koleksi (Collections)

| Nama Koleksi | Aksi | Super Admin | Admin Desa | Operator | Publik (Anonim) | Catatan Kebijakan |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Berita Desa** (`berita`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅ (Terbit)<br>❌ (403)<br>❌ (403)<br>❌ (403) | Publik hanya menerima berita berstatus `terbit`. Draf hanya terlihat oleh staf terautentikasi. |
| **Pengumuman Warga** (`pengumuman`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅ (Terbit)<br>❌ (403)<br>❌ (403)<br>❌ (403) | Konten operasional harian desa. |
| **Agenda Kegiatan** (`agenda`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Konten operasional harian desa. |
| **Galeri Foto/Video** (`galeri`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Dokumentasi kegiatan desa. |
| **Pustaka Media** (`media`) | Baca<br>Unggah<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅ (Milik Sendiri)<br>✅ (Milik Sendiri) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Operator hanya bisa mengubah/menghapus berkas yang diunggah oleh dirinya sendiri. |
| **Dokumen Transparansi** (`dokumen-transparansi`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ❌ (Menu Sembunyi)<br>❌ (403)<br>❌ (403)<br>❌ (403) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Dokumen APBDes & Realisasi. Dikelola oleh Admin Desa & Super Admin. |
| **Potensi Unggulan** (`potensi`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ❌ (Menu Sembunyi)<br>❌ (403)<br>❌ (403)<br>❌ (403) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Potensi pertanian, UMKM, wisata desa. |
| **Perangkat Desa** (`perangkat-desa`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ❌ (Menu Sembunyi)<br>❌ (403)<br>❌ (403)<br>❌ (403) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Struktur aparatur pemerintah desa. |
| **Badan Permusyawaratan Desa** (`bpd`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ❌ (Menu Sembunyi)<br>❌ (403)<br>❌ (403)<br>❌ (403) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Anggota dan pimpinan BPD. |
| **Data RT & RW** (`rt-rw`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ❌ (Menu Sembunyi)<br>❌ (403)<br>❌ (403)<br>❌ (403) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Pengurus kelembagaan RT dan RW. |
| **Wilayah & Dusun** (`dusun`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅<br>✅<br>✅<br>✅ | ✅<br>✅<br>✅<br>✅ | ❌ (Menu Sembunyi)<br>❌ (403)<br>❌ (403)<br>❌ (403) | ✅<br>❌ (403)<br>❌ (403)<br>❌ (403) | Wilayah kewilayahan dusun. |
| **Daftar Pengguna** (`users`) | Baca<br>Buat<br>Ubah<br>Hapus | ✅ (Semua)<br>✅<br>✅<br>✅ (Kecuali Terakhir) | ✅ (Profil Sendiri)<br>❌ (403)<br>✅ (Profil Sendiri)<br>❌ (403) | ✅ (Profil Sendiri)<br>❌ (403)<br>✅ (Profil Sendiri)<br>❌ (403) | ❌ (403)<br>❌ (403)<br>❌ (403)<br>❌ (403) | Non-Super Admin hanya bisa baca/edit profil sendiri. Field `role` terkunci khusus Super Admin. |

---

### B. Matriks Halaman Global (Globals)

| Slug Global | Nama Modul | Super Admin | Admin Desa | Operator | Publik |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `pengaturan-website` | Pengaturan Website (Identitas, Logo, Sosmed) | **Baca / Ubah** | Baca (Ubah ❌ 403) | Baca (Ubah ❌ 403) | **Baca** |
| `profil-desa` | Profil Desa (Sejarah, Visi & Misi, Geografis) | **Baca / Ubah** | **Baca / Ubah** | Baca (Ubah ❌ 403) | **Baca** |
| `data-kependudukan` | Data Statistik Kependudukan | **Baca / Ubah** | **Baca / Ubah** | Baca (Ubah ❌ 403) | **Baca** |
| `sambutan-kepala-desa` | Sambutan Kepala Desa | **Baca / Ubah** | **Baca / Ubah** | Baca (Ubah ❌ 403) | **Baca** |
| `statistik-desa` | Statistik & Indeks Desa Membangun (IDM) | **Baca / Ubah** | **Baca / Ubah** | Baca (Ubah ❌ 403) | **Baca** |
| `kontak` | Kontak & Alamat Kantor Desa | **Baca / Ubah** | **Baca / Ubah** | Baca (Ubah ❌ 403) | **Baca** |

---

## 3. Fitur Keamanan Khusus

1. **Perlindungan Super Admin Terakhir (*Anti-Lockout Protection*)**:
   - Sistem memeriksa total akun `super-admin` di database saat operasi `delete` atau `update`.
   - Jika akun `super-admin` tersisa 1, permintaan penghapusan akun atau penurunan peran (`role`) akan ditolak otomatis dengan `APIError: 403 Forbidden`.
2. **Field-Level Access Control**:
   - Kolom `role` pada koleksi `users` dilindungi oleh `isSuperAdminField`. Pengguna non-Super Admin tidak dapat mengubah peran mereka sendiri (mencegah ekskalasi hak akses / *privilege escalation*).
   - Kolom `email` dan data kredensial dilindungi oleh `canReadSensitiveUserField`.
3. **Keamanan Unggahan Berkas (Media Security)**:
   - **Tipe Berkas Dibatasi (*MIME type restriction*)**: Hanya berkas bertipe `image/jpeg`, `image/png`, `image/webp`, `application/pdf`, dan `video/mp4` yang diterima.
   - **Batas Ukuran Berkas**:
     - Gambar: Maksimal **5 MB**
     - Dokumen PDF: Maksimal **20 MB**
     - Video MP4: Maksimal **50 MB**
   - **Sanitasi Nama Berkas**: Seluruh nama berkas otomatis dikonversi ke huruf kecil, karakter khusus diganti menjadi garis bawah (`_`), dan karakter ganda dibersihkan sebelum disimpan ke disk.
   - **Pelacakan Pemilik (*Ownership Tracking*)**: Berkas media secara otomatis menyimpan relasi `uploadedBy` yang terhubung ke ID pengguna saat diunggah.
4. **Proteksi Serangan Brute-Force Login**:
   - Konfigurasi autentikasi `maxLoginAttempts: 5`: Akun otomatis terkunci jika terjadi 5 kali kegagalan kata sandi berturut-turut.
   - `lockTime: 600000` (10 menit): Akun yang terkunci dinonaktifkan sementara selama 10 menit sebelum dapat mencoba login kembali.
   - `tokenExpiration: 7200` (2 jam): Sesi JWT login kedaluwarsa setelah 2 jam tidak aktif.

---

## 4. Akun Uji Coba Lokal & Kredensial

> [!IMPORTANT]
> Akun di bawah ini **HANYA disemai pada lingkungan lokal / pengujian** (`NODE_ENV !== 'production'`) melalui skrip `pnpm seed`. Pada lingkungan produksi (`NODE_ENV === 'production'`), pembuatan akun uji ini **diblokir total secara otomatis**.

| Peran (Role) | Alamat Email Uji | Kata Sandi Uji | Hak Akses Utama |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `super@desa.test` | `DesaBolali2026!` | Kelola seluruh sistem, Users, dan Pengaturan Website |
| **Admin Desa** | `admin@desa.test` | `DesaBolali2026!` | Kelola seluruh konten desa, dilarang kelola Users & Pengaturan |
| **Operator** | `operator@desa.test` | `DesaBolali2026!` | Hanya Berita, Pengumuman, Agenda, Galeri, dan Media miliknya |

---

## 5. Hasil Pengujian Otomatis (Test Suite Results)

Pengujian otomatis dijalankan menggunakan **Vitest** (Unit, Payload Local API dengan `overrideAccess: false`, dan HTTP REST API `/api/*`) serta **Playwright** (Antarmuka Admin Panel di browser nyata).

```bash
# Jalankan seluruh unit & integration test
pnpm test

# Jalankan uji E2E browser admin panel
pnpm test:e2e
```

### Tabel Hasil Pengujian per Kategori & Peran:

| Kategori Pengujian | Deskripsi Skenario Uji | Jumlah Kasus | Status |
| :--- | :--- | :---: | :---: |
| **Unit RBAC Roles** (`tests/access.test.ts`) | Evaluasi fungsi logika otorisasi untuk Super Admin, Admin Desa, Operator, dan Publik. | 22 | **LULUS (100%)** |
| **Payload Local API** (`tests/rbac.test.ts`) | Uji CRUD dengan `overrideAccess: false` & konteks user: draf berita tidak bocor, Operator ditolak mutasi non-operasional & globals, Admin Desa ditolak ubah users & settings, proteksi Super Admin terakhir, sanitasi media. | 19 | **LULUS (100%)** |
| **HTTP REST Endpoints** (`tests/rbac-http.test.ts`) | Uji panggilan HTTP nyata via `fetch()` ke endpoint `/api/*`: GET `/api/berita` (hanya terbit), GET `/api/users` (403), POST `/api/dokumen-transparansi` (Operator 403, Admin Desa 201), POST `/api/users` (Admin Desa 403, Super Admin 201), POST `/api/globals/pengaturan-website` (Admin Desa 403, Super Admin 200). | 13 | **LULUS (100%)** |
| **Playwright UI E2E** (`tests/e2e-roles.spec.ts`) | Login nyata di browser untuk Operator, Admin Desa, dan Super Admin: verifikasi menu navigasi sidebar, penolakan URL terlarang (*Nothing Found / Unauthorized*), dan aksesibilitas form kelola konten. | 3 | **LULUS (100%)** |
| **TOTAL KESELURUHAN** | **Seluruh skenario hak akses terverifikasi tanpa satupun kegagalan** | **57 Uji** | **100% LULUS** |

---

## 6. Panduan Uji Coba Manual Singkat (5 Menit di Browser)

Anda dapat menguji dan membuktikan integritas hak akses secara mandiri di browser Anda dalam waktu kurang dari 5 menit:

### Langkah 1: Uji Peran Operator (±1.5 Menit)
1. Buka browser dan kunjungi `http://localhost:3000/admin`.
2. Masuk dengan akun Operator:
   - **Email:** `operator@desa.test`
   - **Password:** `DesaBolali2026!`
3. **Periksa Sidebar**: Perhatikan bahwa menu yang muncul **HANYA**: *Berita Desa, Pengumuman Warga, Agenda Kegiatan, Galeri Foto & Video, dan Pustaka Media*. Menu *Daftar Pengguna, Pengaturan Website, Profil Desa, Transparansi, Potensi, dan Pemerintahan* **TIDAK ADA**.
4. **Coba Tembus URL Terlarang**:
   - Ketik langsung di address bar browser: `http://localhost:3000/admin/collections/users`
   - **Hasil:** Halaman langsung menampilkan pesan **"Nothing found / Not Found"** dan ditolak.
   - Ketik langsung: `http://localhost:3000/admin/globals/pengaturan-website`
   - **Hasil:** Halaman langsung menampilkan pesan **"Nothing found / Not Found"** dan ditolak.
5. Klik menu akun di pojok bawah lalu klik **Log out**.

---

### Langkah 2: Uji Peran Admin Desa (±1.5 Menit)
1. Masuk dengan akun Admin Desa:
   - **Email:** `admin@desa.test`
   - **Password:** `DesaBolali2026!`
2. **Periksa Sidebar**: Perhatikan bahwa seluruh menu konten desa muncul (*Profil Desa, Pemerintahan, Dusun, BPD, RT/RW, Potensi Desa, Transparansi APBDes, Berita, Pengumuman, Agenda, Galeri*).
3. Namun menu *Daftar Pengguna* dan *Pengaturan Website* **TETAP TIDAK ADA**.
4. **Coba Tembus URL Terlarang**:
   - Ketik langsung: `http://localhost:3000/admin/collections/users`
   - **Hasil:** Ditampilkan pesan **"Nothing found"** (akses ditolak).
5. Klik **Log out**.

---

### Langkah 3: Uji Peran Super Admin (±1 Menit)
1. Masuk dengan akun Super Admin:
   - **Email:** `super@desa.test`
   - **Password:** `DesaBolali2026!`
2. **Periksa Sidebar**: Seluruh modul sistem kini tampil lengkap, termasuk kelompok **Manajemen Sistem -> Daftar Pengguna** dan **Pengaturan Website**.
3. Buka menu **Daftar Pengguna**: Anda dapat melihat seluruh daftar akun (Super Admin, Admin Desa, Operator) dan dapat mengelola perannya.
4. Klik **Log out**.

---

### Langkah 4: Uji Pengunjung Publik / Tanpa Login (±1 Menit)
1. Buka tab baru di browser Anda (tanpa login admin).
2. Kunjungi `http://localhost:3000/api/users`.
   - **Hasil:** Browser menampilkan respons status **`403 Forbidden`** (`"Anda tidak diizinkan melakukan tindakan ini"`). Data pengguna tidak dapat dibaca oleh publik.
3. Kunjungi `http://localhost:3000/api/berita`.
   - **Hasil:** Browser mengembalikan dokumen berstatus **`terbit`**. Tidak ada satupun dokumen draf rahasia yang bocor ke publik.
