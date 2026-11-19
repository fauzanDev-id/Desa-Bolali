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

  // 4. SEED DOKUMEN TRANSPARANSI
  console.log('📊 Menyemai Dokumen Transparansi APBDes...')
  const existingTrans = await payload.find({ collection: 'dokumen-transparansi', limit: 1 })
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

  // 5. SEED POTENSI UNGGULAN
  console.log('🌾 Menyemai Potensi Unggulan Desa...')
  const existingPotensi = await payload.find({ collection: 'potensi', limit: 1 })
  if (existingPotensi.totalDocs === 0) {
    await payload.create({
      collection: 'potensi',
      data: {
        judul: 'Pertanian',
        slug: 'pertanian',
        kategori: 'Pertanian',
        ringkasan: 'Lahan persawahan subur penghasil padi organik berkualitas unggul.',
        gambar: potPertanian ? potPertanian.id : (heroMedia ? heroMedia.id : 1),
        unggulan: true,
        urutan: 1,
      },
    })

    await payload.create({
      collection: 'potensi',
      data: {
        judul: 'UMKM',
        slug: 'umkm',
        kategori: 'UMKM',
        ringkasan: 'Kerajinan gerabah, olahan pangan lokal, dan produk kreatif rumahan.',
        gambar: potUmkm ? potUmkm.id : (heroMedia ? heroMedia.id : 1),
        unggulan: true,
        urutan: 2,
      },
    })

    await payload.create({
      collection: 'potensi',
      data: {
        judul: 'Wisata Alam',
        slug: 'wisata-alam',
        kategori: 'Wisata',
        ringkasan: 'Pesona embung desa, aliran sungai jernih, dan agrowisata pedesaan.',
        gambar: potWisata ? potWisata.id : (heroMedia ? heroMedia.id : 1),
        unggulan: true,
        urutan: 3,
      },
    })

    await payload.create({
      collection: 'potensi',
      data: {
        judul: 'Budaya',
        slug: 'budaya',
        kategori: 'Seni-Budaya',
        ringkasan: 'Kesenian jathilan, karawitan, dan tradisi gotong royong yang lestari.',
        gambar: potBudaya ? potBudaya.id : (heroMedia ? heroMedia.id : 1),
        unggulan: true,
        urutan: 4,
      },
    })
  }

  // 6. SEED GALERI DESA
  console.log('🖼️ Menyemai Galeri Foto Kegiatan...')
  const existingGaleri = await payload.find({ collection: 'galeri', limit: 1 })
  if (existingGaleri.totalDocs === 0) {
    await payload.create({
      collection: 'galeri',
      data: {
        judul: 'Wisata Embung',
        slug: 'wisata-embung',
        tipe: 'foto',
        album: 'Pariwisata',
        foto: gal1 ? gal1.id : (heroMedia ? heroMedia.id : 1),
        tanggal: '2026-11-08',
        tampilkanDiBeranda: true,
      },
    })

    await payload.create({
      collection: 'galeri',
      data: {
        judul: 'Sentra UMKM',
        slug: 'sentra-umkm',
        tipe: 'foto',
        album: 'Perekonomian',
        foto: gal2 ? gal2.id : (heroMedia ? heroMedia.id : 1),
        tanggal: '2026-11-04',
        tampilkanDiBeranda: true,
      },
    })

    await payload.create({
      collection: 'galeri',
      data: {
        judul: 'Tradisi Budaya',
        slug: 'tradisi-budaya',
        tipe: 'foto',
        album: 'Kebudayaan',
        foto: gal3 ? gal3.id : (heroMedia ? heroMedia.id : 1),
        tanggal: '2026-10-25',
        tampilkanDiBeranda: true,
      },
    })

    await payload.create({
      collection: 'galeri',
      data: {
        judul: 'Pembangunan Fisik',
        slug: 'pembangunan-fisik',
        tipe: 'foto',
        album: 'Pembangunan',
        foto: gal4 ? gal4.id : (heroMedia ? heroMedia.id : 1),
        tanggal: '2026-10-18',
        tampilkanDiBeranda: true,
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

    // Aparatur
    await payload.create({
      collection: 'perangkat-desa',
      data: {
        nama: 'H. Ahmad Santoso [Data Dummy]',
        jabatan: 'Kepala Desa',
        kategoriJabatan: 'Kepala-Desa',
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
        urutan: 2,
        statusAktif: true,
      },
    })
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
                  text: 'Desa Bolali adalah sebuah desa yang terletak di Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah. Dikenal dengan hamparan persawahan yang subur serta tradisi gotong royong warga yang mengakar kuat [Data Dummy].',
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
