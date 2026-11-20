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
    getPotensiUnggulan(6),
    getGaleriTerbaru(6),
  ])

  return (
    <div className="pb-16 sm:pb-20 space-y-8 md:space-y-12">
      {/* 1. Hero Banner Slider */}
      <HeroSection settings={settings} statistik={statistik} />

      {/* 2. Floating Statistics Counter Bar (Overlap -40px) */}
      <StatsBar statistik={statistik} />

      {/* Main Content Sections: Container 1344px, Konsisten Jarak Vertikal (32px mobile, 48px desktop) */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 space-y-8 md:space-y-12">
        {/* ========================================================
            BARIS 1: SAMBUTAN KADES, BERITA TERBARU, TRANSPARANSI APBDes
            - >=1280 (xl): 3 kolom sejajar (rasio 3 : 5 : 3.4, gap 16px)
            - 1024-1279 (lg): Sambutan + Transparansi berdampingan (col 1 & 2), Berita di bawah lebar penuh (col-span-2)
            - 768-1023 (md): 2 kolom atau 1 kolom penuh
            - <768: 1 kolom penuh vertikal
           ======================================================== */}
        <section
          aria-label="Informasi Utama Desa"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[3fr_5fr_3.4fr] gap-4 items-stretch"
        >
          {/* Card 1: Sambutan Kepala Desa */}
          <div className="order-1 lg:order-1 xl:order-1 md:col-span-1 lg:col-span-1 flex flex-col">
            <SambutanCard sambutan={sambutan} />
          </div>

          {/* Card 2: Berita Terbaru (di 1024-1279 berada di bawah lebar penuh col-span-2) */}
          <div className="order-2 lg:order-3 xl:order-2 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col">
            <BeritaSection beritaList={beritaList} />
          </div>

          {/* Card 3: Transparansi Desa (di 1024-1279 berdampingan dengan Sambutan) */}
          <div className="order-3 lg:order-2 xl:order-3 md:col-span-1 lg:col-span-1 flex flex-col">
            <TransparansiCard dokumenList={dokumenList} />
          </div>
        </section>

        {/* ========================================================
            BARIS 2: POTENSI UNGGULAN, PETA DIGITAL DESA, GALERI DESA
            - >=1280 (xl): 3 kolom sejajar (rasio 3 : 5 : 3.4, gap 16px)
            - 1024-1279 (lg): Potensi + Peta berdampingan (col 1 & 2), Galeri di bawah lebar penuh (col-span-2)
            - 768-1023 (md): 2 kolom atau 1 kolom penuh
            - <768: 1 kolom penuh vertikal
           ======================================================== */}
        <section
          aria-label="Potensi dan Dokumentasi Desa"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[3fr_5fr_3.4fr] gap-4 items-stretch"
        >
          {/* Card 4: Potensi Unggulan */}
          <div className="order-1 lg:order-1 xl:order-1 md:col-span-1 lg:col-span-1 flex flex-col">
            <PotensiSection potensiList={potensiList} />
          </div>

          {/* Card 5: Peta Digital Desa */}
          <div className="order-2 lg:order-2 xl:order-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col">
            <PetaDigitalSection contact={contact} />
          </div>

          {/* Card 6: Galeri Desa (di 1024-1279 berada di bawah lebar penuh col-span-2) */}
          <div className="order-3 lg:order-3 xl:order-3 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col">
            <GaleriSection galeriList={galeriList} />
          </div>
        </section>
      </div>
    </div>
  )
}
