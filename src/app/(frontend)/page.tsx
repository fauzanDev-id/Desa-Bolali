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
    <div className="pb-16 sm:pb-20 space-y-8 sm:space-y-12">
      {/* 1. Hero Banner Slider */}
      <HeroSection settings={settings} statistik={statistik} />

      {/* 2. Floating Statistics Counter Bar */}
      <StatsBar statistik={statistik} />

      {/* Main Content Grid Sections */}
      <div className="max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Row 1: Sambutan Kades, Berita Terbaru, Transparansi APBDes */}
        <section aria-label="Informasi Utama Desa" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Card 1: Sambutan Kepala Desa (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <SambutanCard sambutan={sambutan} />
          </div>

          {/* Card 2: Berita Terbaru (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <BeritaSection beritaList={beritaList} />
          </div>

          {/* Card 3: Transparansi Desa (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <TransparansiCard dokumenList={dokumenList} />
          </div>
        </section>

        {/* Row 2: Potensi Unggulan, Peta Digital Desa, Galeri Desa */}
        <section aria-label="Potensi dan Dokumentasi Desa" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Card 4: Potensi Unggulan (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <PotensiSection potensiList={potensiList} />
          </div>

          {/* Card 5: Peta Digital Desa (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <PetaDigitalSection contact={contact} />
          </div>

          {/* Card 6: Galeri Dokumentasi (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <GaleriSection galeriList={galeriList} />
          </div>
        </section>
      </div>
    </div>
  )
}
