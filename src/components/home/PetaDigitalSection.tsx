'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Map } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ContactData } from '@/lib/cms'

const CATEGORIES_FALLBACK = [
  { key: 'fasilitas', label: 'Fasilitas Umum', bgClass: 'bg-blue-500' },
  { key: 'sekolah', label: 'Sekolah', bgClass: 'bg-emerald-500' },
  { key: 'ibadah', label: 'Tempat Ibadah', bgClass: 'bg-amber-500' },
  { key: 'umkm', label: 'UMKM', bgClass: 'bg-yellow-500' },
  { key: 'publik', label: 'Area Publik', bgClass: 'bg-cyan-500' },
]

const PetaDigitalLeaflet = dynamic(() => import('./PetaDigitalLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mt-3">
      {/* Pratinjau Citra Satelit Realistis Menyerupai Mockup Saat Memuat Leaflet */}
      <div className="md:col-span-8 relative h-[280px] md:h-auto md:aspect-[4/3] w-full rounded-desa-card overflow-hidden border border-desa-border shadow-xs bg-[#1a2d1d] flex items-center justify-center">
        {/* Pola Satelit Halus & Kontur */}
        <div className="absolute inset-0 bg-[radial-gradient(#2d4a2d_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        
        {/* Pin Pusat Desa Bolali */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white text-desa-darkGreen font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-md border border-slate-300 mb-1 whitespace-nowrap">
            Desa Bolali
          </div>
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse" />
        </div>

        {/* Titik-Titik POI Terserak Sesuai Mockup */}
        <div className="absolute top-1/4 left-1/4 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
        <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-yellow-500 rounded-full border border-white" />
      </div>

      {/* Legenda Kategori Sesuai Mockup */}
      <div className="md:col-span-4 flex flex-col justify-center space-y-1.5 text-xs p-1 md:p-0">
        <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider mb-1 hidden md:block">
          Legenda Titik Lokasi:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-1.5">
          {CATEGORIES_FALLBACK.map((cat) => (
            <div
              key={cat.key}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-desa-sm bg-slate-50 border border-slate-100 text-desa-textDark font-semibold"
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cat.bgClass}`} />
              <span className="truncate text-xs font-sans">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
})

interface PetaDigitalSectionProps {
  contact: ContactData
}

export function PetaDigitalSection({ contact }: PetaDigitalSectionProps) {
  const lat = contact.latitude ?? -7.6321
  const lng = contact.longitude ?? 110.7432

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <SectionHeader
          title="Peta Digital Desa"
          icon={<Map className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Peta"
          linkHref={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
        />

        <PetaDigitalLeaflet centerLat={lat} centerLng={lng} />
      </div>
    </Card>
  )
}
