import 'dotenv/config'
import configPromise from '../src/payload.config'
import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'

async function seed() {
  console.log('🌱 Memulai proses seeding data dummy Website Desa Bolali...')

  const payload = await getPayload({ config: configPromise })

  // 1. SEED USERS
  console.log('👤 Memeriksa akun pengguna...')
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 10,
  })

  let superAdminId: string | number = ''

  if (existingUsers.totalDocs === 0) {
    console.log('Creating super-admin user: admin@bolali.desa.id')
    const superAdmin = await payload.create({
      collection: 'users',
      data: {
        name: 'Administrator Utama [Data Dummy]',
        email: 'admin@bolali.desa.id',
        password: 'Password123!',
        role: 'super-admin',
      },
    })
    superAdminId = superAdmin.id

    console.log('Creating admin-desa user: admindesa@bolali.desa.id')
    await payload.create({
      collection: 'users',
      data: {
        name: 'Admin Konten Desa [Data Dummy]',
        email: 'admindesa@bolali.desa.id',
        password: 'Password123!',
        role: 'admin-desa',
      },
    })

    console.log('Creating operator user: operator@bolali.desa.id')
    await payload.create({
      collection: 'users',
      data: {
        name: 'Operator Berita & Galeri [Data Dummy]',
        email: 'operator@bolali.desa.id',
        password: 'Password123!',
        role: 'operator',
      },
    })
  } else {
    superAdminId = existingUsers.docs[0].id
    console.log(`Pengguna sudah ada (${existingUsers.totalDocs} akun).`)
  }

  // 2. HELPER UPLOAD MEDIA
  const mediaMap: Record<string, any> = {}

  async function uploadMediaFile(filename: string, altText: string) {
    const filePath = path.resolve('public', 'images', filename)
    if (!fs.existsSync(filePath)) {
      return null
    }

    try {
      // Cek apakah sudah pernah diunggah
      const existing = await payload.find({
        collection: 'media',
        where: {
          filename: { equals: filename },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        mediaMap[filename] = existing.docs[0]
        return existing.docs[0]
      }

      console.log(`Mengunggah media: ${filename}...`)
      const uploaded = await payload.create({
        collection: 'media',
        data: {
          alt: altText,
          caption: `Dokumentasi resmi ${altText} [Data Dummy]`,
        },
        filePath,
      })

      mediaMap[filename] = uploaded
      return uploaded
    } catch (err) {
      console.warn(`Gagal mengunggah media ${filename}:`, err)
      return null
    }
  }

  async function uploadDocFile(filename: string, altText: string) {
    const filePath = path.resolve('public', 'docs', filename)
    if (!fs.existsSync(filePath)) {
      return null
    }

    try {
      const existing = await payload.find({
        collection: 'media',
        where: {
          filename: { equals: filename },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        mediaMap[filename] = existing.docs[0]
        return existing.docs[0]
      }

      console.log(`Mengunggah dokumen PDF: ${filename}...`)
      const uploaded = await payload.create({
        collection: 'media',
        data: {
          alt: altText,
          caption: `Dokumen resmi ${altText} [Data Dummy]`,
        },
        filePath,
      })

      mediaMap[filename] = uploaded
      return uploaded
    } catch (err) {
      console.warn(`Gagal mengunggah dokumen ${filename}:`, err)
      return null
    }
  }

  console.log('📸 Mengunggah pustaka media awal...')
  const heroMedia = await uploadMediaFile('hero-desa.jpg', 'Pemandangan Alam Desa Bolali')
  const kadesMedia = await uploadMediaFile('kades.jpg', 'Foto Resmi Kepala Desa Bolali')
  const berita1Media = await uploadMediaFile('berita-1.jpg', 'Gerakan Penghijauan Desa')
  const berita2Media = await uploadMediaFile('berita-2.jpg', 'Pembangunan Jalan Desa')
  const berita3Media = await uploadMediaFile('berita-3.jpg', 'Pelatihan UMKM Desa')
  const berita4Media = await uploadMediaFile('berita-4.jpg', 'Festival Budaya Desa')
  const potPertanian = await uploadMediaFile('potensi-pertanian.jpg', 'Potensi Pertanian Padi')
  const potUmkm = await uploadMediaFile('potensi-umkm.jpg', 'Sentra Industri UMKM Gerabah')
  const potWisata = await uploadMediaFile('potensi-wisata.jpg', 'Wisata Alam Desa')
  const potBudaya = await uploadMediaFile('potensi-budaya.jpg', 'Seni Tradisi Budaya')
  const gal1 = await uploadMediaFile('galeri-1.jpg', 'Wisata Embung Desa')
  const gal2 = await uploadMediaFile('galeri-2.jpg', 'Produksi Kerajinan Warga')
  const gal3 = await uploadMediaFile('galeri-3.jpg', 'Kirab Budaya Nusantara')
  const gal4 = await uploadMediaFile('galeri-4.jpg', 'Kerja Bakti Pembangunan')

  const docApbdes = await uploadDocFile('apbdes-2026.pdf', 'Dokumen APBDes Tahun 2026')
  const docRealisasi = await uploadDocFile('laporan-realisasi.pdf', 'Laporan Realisasi APBDes')
  const docRkpdes = await uploadDocFile('rkpdes-2026.pdf', 'Rencana Kerja Pemerintah Desa 2026')

  // 3. SEED BERITA DESA
  console.log('📰 Menyemai Berita Terbaru...')
  const existingBerita = await payload.find({ collection: 'berita', limit: 1 })
  if (existingBerita.totalDocs === 0) {
    await payload.create({
      collection: 'berita',
      data: {
        judul: 'Desa Bolali Gelar Gerakan Penghijauan untuk Masa Depan',
        slug: 'desa-bolali-gelar-gerakan-penghijauan-untuk-masa-depan',
        ringkasan:
          'Pemerintah Desa Bolali bersama masyarakat melaksanakan gerakan penghijauan di seluruh wilayah desa.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Pemerintah Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten melaksanakan aksi penanaman seribu pohon serentak di sepanjang bantaran sungai dan jalan desa sebagai langkah konservasi lingkungan dan mitigasi bencana [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        gambar: berita1Media ? berita1Media.id : undefined,
        kategori: 'Pertanian',
        tanggalTerbit: '2026-11-10T08:00:00.000Z',
        status: 'terbit',
        unggulan: true,
      },
    })

    await payload.create({
      collection: 'berita',
      data: {
        judul: 'Pembangunan Infrastruktur Jalan Desa',
        slug: 'pembangunan-infrastruktur-jalan-desa',
        ringkasan: 'Realisasi pengaspalan dan pelebaran jalan poros desa penghubung antar dusun.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Proyek rabat beton dan pengaspalan jalan poros penghubung Dusun Bolali I dan Dusun Bolali II telah rampung 100% menggunakan alokasi Dana Desa tahun anggaran 2026 [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        gambar: berita2Media ? berita2Media.id : undefined,
        kategori: 'Pembangunan',
        tanggalTerbit: '2026-11-05T09:00:00.000Z',
        status: 'terbit',
      },
    })

    await payload.create({
      collection: 'berita',
      data: {
        judul: 'Pelatihan UMKM untuk Warga Desa',
        slug: 'pelatihan-umkm-untuk-warga-desa',
        ringkasan: 'Pelatihan pengemasan dan pemasaran digital bagi pelaku usaha mikro dan industri rumahan.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Bekerja sama dengan dinas terkait, Pemerintah Desa Bolali memfasilitasi sertifikasi halal dan pelatihan digital marketing untuk 40 pelaku UMKM lokal [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        gambar: berita3Media ? berita3Media.id : undefined,
        kategori: 'Kegiatan-Warga',
        tanggalTerbit: '2026-11-01T10:00:00.000Z',
        status: 'terbit',
      },
    })

    await payload.create({
      collection: 'berita',
      data: {
        judul: 'Festival Budaya Desa Bolali Sukamaju',
        slug: 'festival-budaya-desa-bolali-sukamaju',
        ringkasan: 'Pentas seni tradisional dan kirab budaya melestarikan warisan leluhur desa.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Masyarakat Desa Bolali antusias memeriahkan kirab gunungan hasil bumi dan pentas seni tari karawitan dalam rangka menyongsong musim tanam tahunan [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        gambar: berita4Media ? berita4Media.id : undefined,
        kategori: 'Seni-Budaya',
        tanggalTerbit: '2026-10-28T13:30:00.000Z',
        status: 'terbit',
      },
    })
  }

  // 3b. SEED PENGUMUMAN
  console.log('📢 Menyemai Pengumuman Warga...')
  const existingPengumuman = await payload.find({ collection: 'pengumuman', limit: 1 })
  if (existingPengumuman.totalDocs === 0) {
    await payload.create({
      collection: 'pengumuman',
      data: {
        judul: 'Himbauan Waspada Cuaca Ekstrem dan Gotong Royong Saluran Air',
        slug: 'himbauan-waspada-cuaca-ekstrem-dan-gotong-royong-saluran-air',
        ringkasan: 'Seluruh warga dihimbau membersihkan drainase lingkungan dan memangkas pohon rawan tumbang.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Sehubungan dengan peringatan dini BMKG terkait potensi hujan deras disertai angin kencang di wilayah Klaten, Pemerintah Desa Bolali menghimbau seluruh RT dan warga untuk melaksanakan kerja bakti pembersihan selokan dan saluran pembuangan air secara serentak demi mencegah luapan air dan genangan [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        tanggal: '2026-11-18T07:00:00.000Z',
        prioritas: 'Mendesak',
        status: 'terbit',
      },
    })

    await payload.create({
      collection: 'pengumuman',
      data: {
        judul: 'Jadwal Penyaluran Bantuan Langsung Tunai (BLT) Dana Desa Tahap IV',
        slug: 'jadwal-penyaluran-bantuan-langsung-tunai-blt-dana-desa-tahap-iv',
        ringkasan: 'Penyaluran BLT-DD bagi 65 Keluarga Penerima Manfaat (KPM) di Balai Desa Bolali.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Diberitahukan kepada seluruh Keluarga Penerima Manfaat (KPM) BLT Dana Desa bahwa pengambilan bantuan tunai tahap IV akan dilaksanakan pada hari Jumat, 27 November 2026 bertempat di Pendopo Balai Desa Bolali dengan membawa undangan resmi dan KTP asli [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        tanggal: '2026-11-15T09:00:00.000Z',
        prioritas: 'Penting',
        status: 'terbit',
      },
    })

    await payload.create({
      collection: 'pengumuman',
      data: {
        judul: 'Pelaksanaan Posyandu Integrasi Layanan Primer (ILP) Balita & Lansia',
        slug: 'pelaksanaan-posyandu-integrasi-layanan-primer-ilp-balita-dan-lansia',
        ringkasan: 'Pemeriksaan tensi darah, penimbangan berat badan balita, dan pemberian vitamin.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Layanan Posyandu ILP terpadu bulan November akan dilaksanakan serentak di Poskesdes masing-masing dusun mulai pukul 08.30 WIB. Seluruh ibu hamil, orang tua balita, dan lansia diharapkan hadir tepat waktu [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        tanggal: '2026-11-12T08:00:00.000Z',
        prioritas: 'Penting',
        status: 'terbit',
      },
    })

    await payload.create({
      collection: 'pengumuman',
      data: {
        judul: 'Informasi Pemeliharaan Jaringan Listrik PLN Sementara',
        slug: 'informasi-pemeliharaan-jaringan-listrik-pln-sementara',
        ringkasan: 'Pemberitahuan pemadaman sementara untuk perabasan dahan pohon dekat kabel tegangan menengah.',
        isi: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                version: 1,
                children: [
                  {
                    type: 'text',
                    text: 'Berdasarkan surat resmi PLN ULP Klaten, akan dilakukan pemeliharaan jaringan listrik terencana pada hari Selasa, 24 November 2026 pukul 09.00 - 13.00 WIB meliputi sebagian wilayah Dusun Karanganyar dan Dusun Tegalrejo [Data Dummy].',
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        tanggal: '2026-11-08T10:00:00.000Z',
        prioritas: 'Biasa',
        status: 'terbit',
      },
    })
  }

  // 3c. SEED AGENDA KEGIATAN
  console.log('📅 Menyemai Agenda Kegiatan...')
  const existingAgenda = await payload.find({ collection: 'agenda', limit: 1 })
  if (existingAgenda.totalDocs === 0) {
    await payload.create({
      collection: 'agenda',
      data: {
        judul: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) 2027',
        slug: 'musrenbangdes-bolali-2027',
        deskripsi: 'Musyawarah tahunan penyusunan rencana kerja pemerintah desa (RKPDes) dan penyerapan usulan prioritas pembangunan dari perwakilan RT, RW, tokoh masyarakat, dan BPD [Data Dummy].',
        tanggalMulai: '2026-11-28T09:00:00.000Z',
        tanggalSelesai: '2026-11-28T13:00:00.000Z',
        lokasi: 'Aula Balai Desa Bolali',
        penyelenggara: 'Pemerintah Desa Bolali & BPD',
        status: 'Akan Datang',
      },
    })

    await payload.create({
      collection: 'agenda',
      data: {
        judul: 'Bimbingan Teknis Digital Marketing & Pengemasan Produk UMKM',
        slug: 'bimtek-digital-marketing-umkm-bolali',
        deskripsi: 'Pelatihan praktis foto produk, manajemen media sosial bisnis, dan onboarding toko online bersama praktisi e-commerce bagi 35 pelaku UMKM desa [Data Dummy].',
        tanggalMulai: '2026-12-05T08:30:00.000Z',
        tanggalSelesai: '2026-12-05T15:00:00.000Z',
        lokasi: 'Gedung Pertemuan Dusun Bolali I',
        penyelenggara: 'BUMDes Bolali Makmur & Tim Penggerak PKK',
        status: 'Akan Datang',
      },
    })

    await payload.create({
      collection: 'agenda',
      data: {
        judul: 'Pemeriksaan Kesehatan Gratis & Donor Darah Sukarela Warga',
        slug: 'pemeriksaan-kesehatan-dan-donor-darah-bolali',
        deskripsi: 'Pemeriksaan kolesterol, gula darah, asam urat serta bakti sosial donor darah bekerja sama dengan PMI Cabang Klaten [Data Dummy].',
        tanggalMulai: '2026-11-19T08:00:00.000Z',
        tanggalSelesai: '2026-11-19T12:00:00.000Z',
        lokasi: 'Poliklinik Kesehatan Desa (PKD) Bolali',
        penyelenggara: 'Kader Posyandu & PMI Kabupaten Klaten',
        status: 'Berlangsung',
      },
    })

    await payload.create({
      collection: 'agenda',
      data: {
        judul: 'Kerja Bakti Massal Normalisasi Saluran Irigasi Tersier',
        slug: 'kerja-bakti-saluran-irigasi-tersier',
        deskripsi: 'Pembersihan sedimentasi lumpur dan gulma pada saluran irigasi utama guna memperlancar pasokan air menjelang musim tanam pertama [Data Dummy].',
        tanggalMulai: '2026-11-23T06:30:00.000Z',
        tanggalSelesai: '2026-11-23T10:30:00.000Z',
        lokasi: 'Kawasan Persawahan Dusun Tegalrejo & Bolali II',
        penyelenggara: 'Gapoktan Sumber Makmur & Seluruh Pengurus RT',
        status: 'Akan Datang',
      },
    })

    await payload.create({
      collection: 'agenda',
      data: {
        judul: 'Pentas Seni Wayang Kulit Semalam Suntuk Bersih Desa',
        slug: 'wayang-kulit-bersih-desa-bolali',
        deskripsi: 'Pagelaran wayang kulit dalam rangka tradisi merti desa dengan lakon Makukuhan mendoakan ketenteraman dan kemakmuran seluruh warga desa [Data Dummy].',
        tanggalMulai: '2026-10-25T19:30:00.000Z',
        tanggalSelesai: '2026-10-26T04:00:00.000Z',
        lokasi: 'Halaman Balai Desa Bolali',
        penyelenggara: 'Lembaga Adat & Karang Taruna Desa Bolali',
        status: 'Selesai',
      },
    })
  }

  // 4. SEED DOKUMEN TRANSPARANSI
  console.log('📊 Menyemai Dokumen Transparansi APBDes...')
  const existingTrans = await payload.find({ collection: 'dokumen-transparansi', limit: 10 })
  if (existingTrans.totalDocs < 5) {
    if (existingTrans.totalDocs === 0) {
      await payload.create({
        collection: 'dokumen-transparansi',
        data: {
          judul: 'APBDes 2026',
          kategori: 'APBDes',
          tahun: 2026,
          persentaseRealisasi: 92.3,
          nominalAnggaran: 1850000000,
          filePdf: docApbdes ? docApbdes.id : (heroMedia ? heroMedia.id : 1),
          keterangan: 'Rincian Anggaran Pendapatan dan Belanja Desa Bolali Tahun Anggaran 2026 [Data Dummy]',
          tampilkanDiBeranda: true,
          urutan: 1,
        },
      })

      await payload.create({
        collection: 'dokumen-transparansi',
        data: {
          judul: 'Laporan Realisasi',
          kategori: 'Realisasi',
          tahun: 2026,
          nominalAnggaran: 1707550000,
          filePdf: docRealisasi ? docRealisasi.id : (heroMedia ? heroMedia.id : 1),
          keterangan: 'Laporan Realisasi Pelaksanaan APBDes Semester Berjalan [Data Dummy]',
          tampilkanDiBeranda: true,
          urutan: 2,
        },
      })

      await payload.create({
        collection: 'dokumen-transparansi',
        data: {
          judul: 'Rencana Kerja',
          kategori: 'Rencana Kerja',
          tahun: 2026,
          filePdf: docRkpdes ? docRkpdes.id : (heroMedia ? heroMedia.id : 1),
          keterangan: 'Rencana Kerja Pemerintah Desa (RKPDes) Bolali Tahun 2026 [Data Dummy]',
          tampilkanDiBeranda: true,
          urutan: 3,
        },
      })
    }

    await payload.create({
      collection: 'dokumen-transparansi',
      data: {
        judul: 'Laporan Progres Pembangunan Fisik 2026',
        kategori: 'Laporan Pembangunan',
        tahun: 2026,
        nominalAnggaran: 480000000,
        filePdf: docRealisasi ? docRealisasi.id : (heroMedia ? heroMedia.id : 1),
        keterangan: 'Laporan berkala kemajuan fisik proyek jalan rabat beton dan drainase [Data Dummy]',
        tampilkanDiBeranda: false,
        urutan: 4,
      },
    })

    await payload.create({
      collection: 'dokumen-transparansi',
      data: {
        judul: 'Laporan Pertanggungjawaban (LPJ) Realisasi APBDes 2025',
        kategori: 'Realisasi',
        tahun: 2025,
        persentaseRealisasi: 98.7,
        nominalAnggaran: 1720000000,
        filePdf: docRealisasi ? docRealisasi.id : (heroMedia ? heroMedia.id : 1),
        keterangan: 'Laporan Pertanggungjawaban Realisasi Pelaksanaan APBDes TA 2025 [Data Dummy]',
        tampilkanDiBeranda: false,
        urutan: 5,
      },
    })
  }

  // 5. SEED POTENSI UNGGULAN
  console.log('🌾 Menyemai Potensi Unggulan Desa...')
  const existingPotensi = await payload.find({ collection: 'potensi', limit: 10 })
  if (existingPotensi.totalDocs < 5) {
    await payload.create({
      collection: 'potensi',
      data: {
        judul: 'BUMDes Bolali Makmur Sejahtera',
        slug: 'bumdes-bolali-makmur-sejahtera',
        kategori: 'BUMDes',
        ringkasan: 'Badan usaha desa yang mengelola pengolahan gabah, sewa alsintan, dan unit simpan pinjam produktif.',
        gambar: potUmkm ? potUmkm.id : (heroMedia ? heroMedia.id : 1),
        kontakPengelola: '0812-3456-7891 (Bpk. Mulyono)',
        lokasi: 'Kompleks Balai Desa Bolali',
        unggulan: true,
        urutan: 0,
      },
    })
  }

  // 6. SEED GALERI DESA
  console.log('🖼️ Menyemai Galeri Foto Kegiatan...')
  const existingGaleri = await payload.find({ collection: 'galeri', limit: 10 })
  if (existingGaleri.totalDocs < 6) {
    await payload.create({
      collection: 'galeri',
      data: {
        judul: 'Profil Video Resmi Pemerintah Desa Bolali 2026',
        slug: 'profil-video-resmi-pemerintah-desa-bolali-2026',
        tipe: 'video',
        album: 'Pariwisata',
        foto: heroMedia ? heroMedia.id : 1,
        videoUrl: 'https://www.youtube.com/watch?v=7hR_1b3c9Wk',
        tanggal: '2026-11-01',
        tampilkanDiBeranda: true,
        keterangan: 'Video dokumentasi selayang pandang potensi desa dan keramahan warga Bolali [Data Dummy].',
      },
    })

    await payload.create({
      collection: 'galeri',
      data: {
        judul: 'Liputan Festival Budaya dan Kirab Gunungan Desa',
        slug: 'liputan-festival-budaya-dan-kirab-gunungan-desa',
        tipe: 'video',
        album: 'Kebudayaan',
        foto: potBudaya ? potBudaya.id : (heroMedia ? heroMedia.id : 1),
        videoUrl: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
        tanggal: '2026-10-26',
        tampilkanDiBeranda: false,
        keterangan: 'Dokumentasi video pentas seni jathilan dan tari karawitan semalam suntuk [Data Dummy].',
      },
    })
  }

  // 7. SEED DUSUN & APARATUR DESA
  console.log('🏛️ Menyemai Wilayah Dusun & Aparatur...')
  const existingDusun = await payload.find({ collection: 'dusun', limit: 1 })
  if (existingDusun.totalDocs === 0) {
    const dusun1 = await payload.create({
      collection: 'dusun',
      data: {
        nama: 'Dusun Bolali I',
        kepalaDusun: 'Sutrisno [Data Dummy]',
        jumlahRT: 6,
        jumlahRW: 2,
        luasWilayah: '0,92 km²',
        urutan: 1,
      },
    })
    await payload.create({
      collection: 'dusun',
      data: {
        nama: 'Dusun Bolali II',
        kepalaDusun: 'Bambang Irawan [Data Dummy]',
        jumlahRT: 5,
        jumlahRW: 2,
        luasWilayah: '0,95 km²',
        urutan: 2,
      },
    })
    await payload.create({
      collection: 'dusun',
      data: {
        nama: 'Dusun Tegalrejo',
        kepalaDusun: 'Wahyu Widodo [Data Dummy]',
        jumlahRT: 4,
        jumlahRW: 1,
        luasWilayah: '0,98 km²',
        urutan: 3,
      },
    })
    await payload.create({
      collection: 'dusun',
      data: {
        nama: 'Dusun Karanganyar',
        kepalaDusun: 'Agus Setiawan [Data Dummy]',
        jumlahRT: 5,
        jumlahRW: 2,
        luasWilayah: '0,90 km²',
        urutan: 4,
      },
    })
  }

  // Aparatur Desa
  console.log('🏛️ Menyemai Aparatur Perangkat Desa...')
  const existingPerangkat = await payload.find({ collection: 'perangkat-desa', limit: 20 })
  if (existingPerangkat.totalDocs < 5) {
    for (const doc of existingPerangkat.docs) {
      await payload.delete({ collection: 'perangkat-desa', id: doc.id })
    }

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'H. Ahmad Santoso [Data Dummy]',
        jabatan: 'Kepala Desa',
        kategoriJabatan: 'Kepala-Desa',
        niap: '19750815 200801 1 001',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 1,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Joko Susilo, S.Sos [Data Dummy]',
        jabatan: 'Sekretaris Desa',
        kategoriJabatan: 'Sekretariat',
        niap: '19820312 201202 1 004',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 2,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Siti Rahmawati, S.E. [Data Dummy]',
        jabatan: 'Kepala Urusan Keuangan',
        kategoriJabatan: 'Sekretariat',
        niap: '19870520 201503 2 007',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 3,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Hendro Wibowo, S.T. [Data Dummy]',
        jabatan: 'Kepala Urusan Perencanaan',
        kategoriJabatan: 'Sekretariat',
        niap: '19891114 201604 1 012',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 4,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Tri Wahyuni, A.Md. [Data Dummy]',
        jabatan: 'Kepala Urusan Tata Usaha & Umum',
        kategoriJabatan: 'Sekretariat',
        niap: '19910408 201705 2 015',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 5,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Agus Riyadi, S.AP. [Data Dummy]',
        jabatan: 'Kepala Seksi Pemerintahan',
        kategoriJabatan: 'Teknis',
        niap: '19840228 201402 1 009',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 6,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Danang Prasetyo, S.P. [Data Dummy]',
        jabatan: 'Kepala Seksi Kesejahteraan',
        kategoriJabatan: 'Teknis',
        niap: '19860910 201508 1 011',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 7,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Nurul Hidayati, S.IP. [Data Dummy]',
        jabatan: 'Kepala Seksi Pelayanan',
        kategoriJabatan: 'Teknis',
        niap: '19920716 201801 2 019',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 8,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Sutrisno [Data Dummy]',
        jabatan: 'Kepala Dusun I (Bolali I)',
        kategoriJabatan: 'Kewilayahan',
        niap: '19780105 201001 1 003',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 9,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Bambang Irawan [Data Dummy]',
        jabatan: 'Kepala Dusun II (Bolali II)',
        kategoriJabatan: 'Kewilayahan',
        niap: '19800612 201103 1 006',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 10,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Wahyu Widodo [Data Dummy]',
        jabatan: 'Kepala Dusun III (Tegalrejo)',
        kategoriJabatan: 'Kewilayahan',
        niap: '19831024 201305 1 008',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 11,
        statusAktif: true,
      },
    })

    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'Agus Setiawan [Data Dummy]',
        jabatan: 'Kepala Dusun IV (Karanganyar)',
        kategoriJabatan: 'Kewilayahan',
        niap: '19851203 201407 1 010',
        foto: kadesMedia ? kadesMedia.id : undefined,
        urutan: 12,
        statusAktif: true,
      },
    })
  }

  // 7b. SEED BPD (Badan Permusyawaratan Desa)
  console.log('🏛️ Menyemai Badan Permusyawaratan Desa (BPD)...')
  const existingBpd = await payload.find({ collection: 'bpd', limit: 1 })
  if (existingBpd.totalDocs === 0) {
    const bpdMembers = [
      {
        nama: 'Prof. Dr. Ir. Gunawan Wibisono, M.T. [Data Dummy]',
        jabatan: 'Ketua BPD',
        keterangan: 'Keterwakilan Tokoh Pendidikan & Dusun Bolali I',
        urutan: 1,
      },
      {
        nama: 'Dra. Hj. Sri Lestari, M.Pd. [Data Dummy]',
        jabatan: 'Wakil Ketua BPD',
        keterangan: 'Keterwakilan Perempuan & Tokoh Masyarakat',
        urutan: 2,
      },
      {
        nama: 'Muhammad Ridwan, S.Pd. [Data Dummy]',
        jabatan: 'Sekretaris BPD',
        keterangan: 'Keterwakilan Dusun Bolali II',
        urutan: 3,
      },
      {
        nama: 'Drs. Hartono [Data Dummy]',
        jabatan: 'Anggota BPD',
        keterangan: 'Keterwakilan Dusun Tegalrejo',
        urutan: 4,
      },
      {
        nama: 'Budi Santoso [Data Dummy]',
        jabatan: 'Anggota BPD',
        keterangan: 'Keterwakilan Dusun Karanganyar',
        urutan: 5,
      },
      {
        nama: 'Siti Maryam, S.Ag. [Data Dummy]',
        jabatan: 'Anggota BPD',
        keterangan: 'Keterwakilan Tokoh Agama',
        urutan: 6,
      },
      {
        nama: 'Eko Prasetyo, S.Kom. [Data Dummy]',
        jabatan: 'Anggota BPD',
        keterangan: 'Keterwakilan Pemuda & Karang Taruna',
        urutan: 7,
      },
    ]

    for (const member of bpdMembers) {
      await payload.create({
        collection: 'bpd',
        data: {
          ...member,
          foto: kadesMedia ? kadesMedia.id : undefined,
        },
      })
    }
  }

  // 7c. SEED RT & RW
  console.log('🏘️ Menyemai Lembaga RT & RW...')
  const existingRtRw = await payload.find({ collection: 'rt-rw', limit: 1 })
  if (existingRtRw.totalDocs === 0) {
    const dusunDocs = await payload.find({ collection: 'dusun', limit: 10, sort: 'urutan' })
    const dusun1Id = dusunDocs.docs[0]?.id
    const dusun2Id = dusunDocs.docs[1]?.id
    const dusun3Id = dusunDocs.docs[2]?.id
    const dusun4Id = dusunDocs.docs[3]?.id

    const rtRwData = [
      // Dusun Bolali I (RW 01 & RW 02)
      { nama: 'H. Sudirman [Data Dummy]', jenis: 'RW', nomor: '01', dusun: dusun1Id, telepon: '081234560001', urutan: 1 },
      { nama: 'Supriyanto [Data Dummy]', jenis: 'RT', nomor: '01', dusun: dusun1Id, telepon: '081234560002', urutan: 2 },
      { nama: 'Triyono [Data Dummy]', jenis: 'RT', nomor: '02', dusun: dusun1Id, telepon: '081234560003', urutan: 3 },
      { nama: 'Wahyudi [Data Dummy]', jenis: 'RT', nomor: '03', dusun: dusun1Id, telepon: '081234560004', urutan: 4 },
      { nama: 'Darto [Data Dummy]', jenis: 'RW', nomor: '02', dusun: dusun1Id, telepon: '081234560005', urutan: 5 },
      { nama: 'Mulyadi [Data Dummy]', jenis: 'RT', nomor: '04', dusun: dusun1Id, telepon: '081234560006', urutan: 6 },
      { nama: 'Slamet Widodo [Data Dummy]', jenis: 'RT', nomor: '05', dusun: dusun1Id, telepon: '081234560007', urutan: 7 },
      { nama: 'Sunardi [Data Dummy]', jenis: 'RT', nomor: '06', dusun: dusun1Id, telepon: '081234560008', urutan: 8 },

      // Dusun Bolali II (RW 03 & RW 04)
      { nama: 'Sukirno [Data Dummy]', jenis: 'RW', nomor: '03', dusun: dusun2Id, telepon: '081234560009', urutan: 9 },
      { nama: 'Kuswanto [Data Dummy]', jenis: 'RT', nomor: '01', dusun: dusun2Id, telepon: '081234560010', urutan: 10 },
      { nama: 'Priyadi [Data Dummy]', jenis: 'RT', nomor: '02', dusun: dusun2Id, telepon: '081234560011', urutan: 11 },
      { nama: 'Maryanto [Data Dummy]', jenis: 'RW', nomor: '04', dusun: dusun2Id, telepon: '081234560012', urutan: 12 },
      { nama: 'Handoko [Data Dummy]', jenis: 'RT', nomor: '03', dusun: dusun2Id, telepon: '081234560013', urutan: 13 },
      { nama: 'Sugeng [Data Dummy]', jenis: 'RT', nomor: '04', dusun: dusun2Id, telepon: '081234560014', urutan: 14 },
      { nama: 'Suratno [Data Dummy]', jenis: 'RT', nomor: '05', dusun: dusun2Id, telepon: '081234560015', urutan: 15 },

      // Dusun Tegalrejo (RW 05)
      { nama: 'Yulianto [Data Dummy]', jenis: 'RW', nomor: '05', dusun: dusun3Id, telepon: '081234560016', urutan: 16 },
      { nama: 'Kurniawan [Data Dummy]', jenis: 'RT', nomor: '01', dusun: dusun3Id, telepon: '081234560017', urutan: 17 },
      { nama: 'Santiko [Data Dummy]', jenis: 'RT', nomor: '02', dusun: dusun3Id, telepon: '081234560018', urutan: 18 },
      { nama: 'Edi Santoso [Data Dummy]', jenis: 'RT', nomor: '03', dusun: dusun3Id, telepon: '081234560019', urutan: 19 },
      { nama: 'Widodo [Data Dummy]', jenis: 'RT', nomor: '04', dusun: dusun3Id, telepon: '081234560020', urutan: 20 },

      // Dusun Karanganyar (RW 06 & RW 07)
      { nama: 'Heri Prasetyo [Data Dummy]', jenis: 'RW', nomor: '06', dusun: dusun4Id, telepon: '081234560021', urutan: 21 },
      { nama: 'Anto [Data Dummy]', jenis: 'RT', nomor: '01', dusun: dusun4Id, telepon: '081234560022', urutan: 22 },
      { nama: 'Wawan [Data Dummy]', jenis: 'RT', nomor: '02', dusun: dusun4Id, telepon: '081234560023', urutan: 23 },
      { nama: 'Rahmat [Data Dummy]', jenis: 'RW', nomor: '07', dusun: dusun4Id, telepon: '081234560024', urutan: 24 },
      { nama: 'Budi Utomo [Data Dummy]', jenis: 'RT', nomor: '03', dusun: dusun4Id, telepon: '081234560025', urutan: 25 },
      { nama: 'Suryanto [Data Dummy]', jenis: 'RT', nomor: '04', dusun: dusun4Id, telepon: '081234560026', urutan: 26 },
      { nama: 'Gunawan [Data Dummy]', jenis: 'RT', nomor: '05', dusun: dusun4Id, telepon: '081234560027', urutan: 27 },
    ]

    for (const item of rtRwData) {
      await payload.create({
        collection: 'rt-rw',
        data: item as any,
      })
    }
  }

  // 8. UPDATE GLOBALS (Pengaturan Website, Statistik, Sambutan, Kontak)
  console.log('⚙️ Memperbarui data Globals...')

  // Pengaturan Website
  await payload.updateGlobal({
    slug: 'pengaturan-website',
    data: {
      namaWebsite: 'Desa Bolali',
      namaInstansi: 'Pemerintah Desa Bolali',
      subInstansi: 'Kecamatan Wonosari - Kabupaten Klaten - Jawa Tengah',
      tagline: 'Desa Maju, Mandiri, Sejahtera',
      deskripsiHero:
        'Bersama membangun desa dengan pelayanan terbaik, informasi yang transparan dan inovasi untuk masa depan.',
      bannerSlider: [
        {
          gambar: heroMedia ? heroMedia.id : undefined,
          judul: 'Selamat Datang di Desa Bolali',
          subjudul: '“Desa Maju, Mandiri, Sejahtera”',
          teksTombolUtama: 'Jelajahi Desa',
          tautanTombolUtama: '#potensi',
        },
      ],
      mediaSosial: {
        youtube: 'https://youtube.com',
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        tiktok: 'https://tiktok.com',
      },
      teksFooter: '“Bersama Membangun Desa yang Lebih Baik”',
      copyright: '© 2026 Desa Bolali. All Rights Reserved',
    },
  })

  // Statistik Desa
  await payload.updateGlobal({
    slug: 'statistik-desa',
    data: {
      jumlahPenduduk: 5248,
      jumlahKK: 1642,
      luasWilayah: '3,75 km²',
      jumlahDusun: 4,
      indeksDesaMembangun: 'Mandiri',
      taglineIDM: 'Maju Bersama Untuk Desa Lebih Baik',
      statusDesaDigital: 'Desa Digital',
      taglineDesaDigital: 'Transparan, Partisipatif, dan Inovatif',
    },
  })

  // Sambutan Kepala Desa
  await payload.updateGlobal({
    slug: 'sambutan-kepala-desa',
    data: {
      namaKepalaDesa: 'H. Ahmad Santoso [Data Dummy]',
      jabatan: 'Kepala Desa Bolali',
      foto: kadesMedia ? kadesMedia.id : undefined,
      kutipanSingkat:
        '“Mari kita bersama-sama membangun Desa Bolali menuju desa yang maju, mandiri dan sejahtera.”',
    },
  })

  // Kontak
  await payload.updateGlobal({
    slug: 'kontak',
    data: {
      alamat: 'Jl. Mawar No. 10, Desa Bolali, Kec. Wonosari, Kab. Klaten, Jawa Tengah',
      kodePos: '57473',
      telepon: '(0271) 1234567',
      whatsapp: '08123456789',
      email: 'desa@bolali.desa.id',
      jamOperasional: 'Senin - Jumat: 08.00 - 15.30 WIB',
      latitude: -7.6321,
      longitude: 110.7432,
    },
  })

  // Profil Desa
  await payload.updateGlobal({
    slug: 'profil-desa',
    data: {
      visi: 'Mewujudkan Desa Bolali yang Maju, Mandiri, dan Sejahtera Berbasis Pertanian dan Gotong Royong.',
      misi: [
        { poin: 'Meningkatkan kualitas tata kelola pemerintahan desa yang bersih, transparan, dan akuntabel.' },
        { poin: 'Mengembangkan potensi sektor pertanian terpadu dan pemberdayaan ekonomi masyarakat.' },
        { poin: 'Meningkatkan kualitas sarana dan prasarana infrastruktur permukiman desa.' },
        { poin: 'Melestarikan nilai-nilai seni, budaya, kearifan lokal, dan kerukunan warga.' },
      ],
      sejarah: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Desa Bolali merupakan salah satu desa agraris bersejarah yang terletak di Kecamatan Wonosari, Kabupaten Klaten, Provinsi Jawa Tengah. Terletak di hamparan dataran rendah yang subur diapit jalur irigasi alami, desa ini memiliki riwayat panjang peradaban pedesaan agraris Jawa yang sarat kearifan lokal [Data Dummy].',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h3',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Asal-Usul Nama Desa Bolali',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Menurut cerita tutur turun-temurun dari para sesepuh desa, nama "Bolali" berakar dari filosofi kekerabatan masyarakat Jawa, di mana setiap pendatang maupun warga yang tinggal merasa begitu disambut hangat, damai, dan tentram bagaikan di rumah sendiri [Data Dummy].',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Pada masa lampau, wilayah ini dirintis oleh para sesepuh desa yang gigih membuka lahan pertanian produktif dan mengelola sumber air irigasi secara mufakat. Semangat gotong royong inilah yang kemudian merekatkan kebersamaan warga hingga terbentuknya empat wilayah pedukuhan: Dusun Bolali I, Dusun Bolali II, Dusun Tegalrejo, dan Dusun Karanganyar.',
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h3',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Transformasi Menuju Era Modern & Desa Digital',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Memasuki era reformasi hingga era digital saat ini, Desa Bolali terus bertransformasi secara dinamis. Dari desa agraris tradisional menjadi Desa Mandiri yang mengedepankan keterbukaan informasi publik, akuntabilitas APBDes, modernisasi pelayanan administrasi warga secara digital, serta penguatan BUMDes dan sentra UMKM lokal demi kesejahteraan bersama [Data Dummy].',
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      batasUtara: 'Desa Boto, Kec. Wonosari',
      batasSelatan: 'Desa Teloyo, Kec. Wonosari',
      batasTimur: 'Desa Bentakan, Kec. Wonosari',
      batasBarat: 'Desa Wadunggetas, Kec. Wonosari',
      luasWilayah: '3,75 km²',
      tipologi: 'Dataran Rendah / Pertanian',
    },
  })

  // Data Kependudukan
  await payload.updateGlobal({
    slug: 'data-kependudukan',
    data: {
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
      ],
      pendidikan: [
        { jenjang: 'Tamat SD / Sederajat', jumlah: 910 },
        { jenjang: 'Tamat SMP / Sederajat', jumlah: 1140 },
        { jenjang: 'Tamat SMA / SMK / Sederajat', jumlah: 1890 },
        { jenjang: 'Diploma / Sarjana (D3/S1/S2)', jumlah: 520 },
      ],
    },
  })

  console.log('✅ Seeding data dummy selesai dengan sukses!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Gagal menjalankan seeding:', err)
  process.exit(1)
})
