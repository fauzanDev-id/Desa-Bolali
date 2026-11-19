import React from 'react'
import {
  HeroSection,
  StatsBar,
  SambutanCard,
  BeritaSection,
  TransparansiCard,
  PotensiSection,
  PetaDigitalSection,
  GaleriSection,
} from '@/components'
import {
  getWebsiteSettings,
  getContactData,
  getStatistikDesa,
  getSambutanKades,
  getBeritaTerbaru,
  getDokumenTransparansi,
  getPotensiUnggulan,
  getGaleriTerbaru,
} from '@/lib/cms'

export default async function HomePage() {
  const [
    settings,
    contact,
    statistik,
    sambutan,
    beritaList,
    dokumenList,
    potensiList,
    galeriList,
  ] = await Promise.all([
    getWebsiteSettings(),
    getContactData(),
    getStatistikDesa(),
    getSambutanKades(),
    getBeritaTerbaru(4),
    getDokumenTransparansi(3),
    getPotensiUnggulan(4),
    getGaleriTerbaru(6),
  ])

  return (
    <div className="pb-16 sm:pb-20 space-y-6 sm:space-y-10">
      {/* 1. Hero Banner Slider */}
      <HeroSection settings={settings} statistik={statistik} />

      {/* 2. Floating Statistics Counter Bar Menimpa Tepi Bawah Hero */}
      <StatsBar statistik={statistik} />

      {/* Main Content Grid Sections Sesuai Mockup */}
      <div className="max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Baris 1: Sambutan Kades, Berita Terbaru, Transparansi APBDes */}
        {/* Responsif: >=1280px (xl) 3 kolom (4:5:3), 768-1279px (md) 2 kolom, <768px 1 kolom */}
        <section
          aria-label="Informasi Utama Desa"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch"
        >
          {/* Card 1: Sambutan Kepala Desa (Rasio ±3 -> xl: 4 Kolom, md: 1 Kolom) */}
          <div className="xl:col-span-4 md:col-span-1 flex flex-col">
            <SambutanCard sambutan={sambutan} />
          </div>

          {/* Card 2: Berita Terbaru (Rasio ±5 -> xl: 5 Kolom, md: 2 Kolom) */}
          <div className="xl:col-span-5 md:col-span-2 md:order-last xl:order-none flex flex-col">
            <BeritaSection beritaList={beritaList} />
          </div>

          {/* Card 3: Transparansi Desa (Rasio ±3.4 -> xl: 3 Kolom, md: 1 Kolom) */}
          <div className="xl:col-span-3 md:col-span-1 flex flex-col">
            <TransparansiCard dokumenList={dokumenList} />
          </div>
        </section>

        {/* Baris 2: Potensi Unggulan, Peta Digital Desa, Galeri Desa */}
        {/* Responsif: >=1280px (xl) 3 kolom (4:5:3), 768-1279px (md) 2 kolom, <768px 1 kolom */}
        <section
          aria-label="Potensi dan Dokumentasi Desa"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 sm:gap-5 items-stretch"
        >
          {/* Card 4: Potensi Unggulan (xl: 4 Kolom, md: 1 Kolom) */}
          <div className="xl:col-span-4 md:col-span-1 flex flex-col">
            <PotensiSection potensiList={potensiList} />
          </div>

          {/* Card 5: Peta Digital Desa (xl: 5 Kolom, md: 2 Kolom) */}
          <div className="xl:col-span-5 md:col-span-2 md:order-last xl:order-none flex flex-col">
            <PetaDigitalSection contact={contact} />
          </div>

          {/* Card 6: Galeri Desa (xl: 3 Kolom, md: 1 Kolom) */}
          <div className="xl:col-span-3 md:col-span-1 flex flex-col">
            <GaleriSection galeriList={galeriList} />
          </div>
        </section>
      </div>
    </div>
  )
}
