import React from 'react'
import type { Metadata } from 'next'
import { getGaleriList, getGaleriAlbums } from '@/lib/cms'
import { GaleriGrid } from '@/components/galeri/GaleriGrid'
import { PageHeader } from '@/components'
import { Images } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Galeri Foto & Video Kegiatan | Pemerintah Desa Bolali',
  description: 'Dokumentasi album foto dan rekaman video kegiatan warga, pembangunan fisik, festival kebudayaan, dan panorama alam Desa Bolali.',
  openGraph: {
    title: 'Galeri Foto & Video Desa Bolali',
    description: 'Dokumentasi visual kegiatan dan pesona alam Desa Bolali, Kecamatan Wonosari, Klaten.',
    url: '/galeri',
    siteName: 'Desa Bolali',
    locale: 'id_ID',
    type: 'website',
  },
}

export const revalidate = 60

export default async function GaleriPage() {
  const isPerfLog = process.env.PERF_LOG === '1'
  const t0 = isPerfLog ? performance.now() : 0
  const [items, albums] = await Promise.all([
    getGaleriList(),
    getGaleriAlbums(),
  ])
  if (isPerfLog) {
    console.log(`[PERF_LOG] Server Render /galeri data fetching took ${(performance.now() - t0).toFixed(2)}ms`)
  }

  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title="Galeri Dokumentasi Foto & Video"
        subtitle="Dokumentasi visual peristiwa bersejarah, kerja bakti, festival seni, dan panorama alam Desa Bolali"
        badge="Dokumentasi Resmi Desa"
        badgeIcon={<Images className="w-3.5 h-3.5 text-desa-gold" />}
        breadcrumbs={[{ label: 'Galeri Desa', href: '/galeri' }]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <GaleriGrid initialItems={items} albums={albums} />
      </div>
    </div>
  )
}
