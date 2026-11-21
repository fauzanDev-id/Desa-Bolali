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
import { ScrollReveal } from '@/components/ui/ScrollReveal'
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
  const isPerfLog = process.env.PERF_LOG === '1'
  const t0 = isPerfLog ? performance.now() : 0

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

  if (isPerfLog) {
    console.log(`[PERF_LOG] Server Render / (HomePage) data fetching took ${(performance.now() - t0).toFixed(2)}ms`)
  }

  return (
    <div className="pb-10">
      {/* 1. Hero Banner Slider */}
      <HeroSection settings={settings} statistik={statistik} />

      {/* 2. Floating Statistics Counter Bar (Overlap menimpa hero) */}
      <StatsBar statistik={statistik} />

      {/* Main Content Sections: Container 1440px, Jarak Antar Baris Kartu 16px Rapat Sesuai Mockup */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6 mt-4 space-y-4">
        {/* ========================================================
            BARIS 1: SAMBUTAN KADES, BERITA TERBARU, TRANSPARANSI APBDes
            - >=1280 (xl): 3 kolom sejajar (rasio 3 : 5 : 3.4, gap 16px)
            - 1024-1279 (lg): Sambutan + Transparansi berdampingan, Berita di bawah
            - 768-1023 (md): 2 kolom / 1 kolom
            - <768: 1 kolom bertumpuk
           ======================================================== */}
        <section
          aria-label="Informasi Utama Desa"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[3fr_5fr_3.4fr] gap-4 items-stretch"
        >
          {/* Card 1: Sambutan Kepala Desa */}
          <ScrollReveal
            staggerIndex={1}
            className="order-1 lg:order-1 xl:order-1 md:col-span-1 lg:col-span-1 flex flex-col h-full"
          >
            <SambutanCard sambutan={sambutan} />
          </ScrollReveal>

          {/* Card 2: Berita Terbaru */}
          <ScrollReveal
            staggerIndex={2}
            className="order-2 lg:order-3 xl:order-2 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col h-full"
          >
            <BeritaSection beritaList={beritaList} />
          </ScrollReveal>

          {/* Card 3: Transparansi Desa */}
          <ScrollReveal
            staggerIndex={3}
            className="order-3 lg:order-2 xl:order-3 md:col-span-1 lg:col-span-1 flex flex-col h-full"
          >
            <TransparansiCard dokumenList={dokumenList} />
          </ScrollReveal>
        </section>

        {/* ========================================================
            BARIS 2: POTENSI UNGGULAN, PETA DIGITAL DESA, GALERI DESA
            - >=1280 (xl): 3 kolom sejajar (rasio 4.4 : 5.2 : 3.6, gap 16px) agar 4 ubin Potensi muat 1 baris
            - 1024-1279 (lg): Potensi + Peta berdampingan, Galeri di bawah
            - 768-1023 (md): 2 kolom / 1 kolom
            - <768: 1 kolom bertumpuk
           ======================================================== */}
        <section
          aria-label="Potensi dan Dokumentasi Desa"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[4.4fr_5.2fr_3.6fr] gap-4 items-stretch"
        >
          {/* Card 4: Potensi Unggulan */}
          <ScrollReveal
            staggerIndex={1}
            className="order-1 lg:order-1 xl:order-1 md:col-span-1 lg:col-span-1 flex flex-col h-full"
          >
            <PotensiSection potensiList={potensiList} />
          </ScrollReveal>

          {/* Card 5: Peta Digital Desa */}
          <ScrollReveal
            staggerIndex={2}
            className="order-2 lg:order-2 xl:order-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col h-full"
          >
            <PetaDigitalSection contact={contact} />
          </ScrollReveal>

          {/* Card 6: Galeri Desa */}
          <ScrollReveal
            staggerIndex={3}
            className="order-3 lg:order-3 xl:order-3 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col h-full"
          >
            <GaleriSection galeriList={galeriList} />
          </ScrollReveal>
        </section>
      </div>
    </div>
  )
}
