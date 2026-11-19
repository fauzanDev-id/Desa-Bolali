import React from 'react'
import type { Metadata } from 'next'
import { getGaleriList, getGaleriAlbums } from '@/lib/cms'
import { GaleriGrid } from '@/components/galeri/GaleriGrid'
import { Breadcrumb } from '@/components'
import { Image as ImageIcon } from 'lucide-react'

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
    images: [
      {
        url: '/images/galeri-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Galeri Desa Bolali',
      },
    ],
  },
}

export const revalidate = 60

export default async function GaleriPage() {
  const [items, albums] = await Promise.all([
    getGaleriList(),
    getGaleriAlbums(),
  ])

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white overflow-hidden py-10 sm:py-14 border-b border-desa-gold-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-desa-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold-300 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
              <ImageIcon className="w-3.5 h-3.5 text-desa-gold-400" />
              <span>Dokumentasi Resmi Desa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Galeri Dokumentasi Foto & Video
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Koleksi rekaman visual peristiwa bersejarah, kerja bakti, pentas kebudayaan, serta perkembangan pembangunan di seluruh pelosok Desa Bolali.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          items={[{ label: 'Galeri Desa', href: '/galeri' }]}
          className="mb-6"
        />

        <GaleriGrid initialItems={items} albums={albums} />
      </div>
    </div>
  )
}
