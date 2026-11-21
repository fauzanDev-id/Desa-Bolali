'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { ContactData } from '@/lib/cms'
import { getBlurDataUrl } from '@/lib/blur'
import { PETA_CATEGORIES } from './petaConstants'

const mapBlur = getBlurDataUrl('/seed/peta-desa.webp')

const PetaDigitalLeaflet = dynamic(() => import('./PetaDigitalLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3 mt-3 row2-card-body flex-1 min-h-0">
      {/* Fallback Citra Satelit Aerial */}
      <div className="w-full md:w-[60%] h-[240px] md:h-full relative rounded-[10px] overflow-hidden border border-slate-200 shadow-xs bg-slate-900 shrink-0">
        <Image
          src="/seed/peta-desa.webp"
          alt="Peta Satelit Wilayah Desa Bolali"
          fill
          placeholder={mapBlur ? 'blur' : 'empty'}
          blurDataURL={mapBlur}
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
        />

        {/* Pin Pusat Desa Bolali */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            <div className="bg-white text-desa-darkGreen font-bold text-[11px] px-2 py-0.5 rounded-full shadow-md border border-slate-300 mb-1 whitespace-nowrap">
              Desa Bolali
            </div>
            <div className="w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white shadow-md animate-pulse" />
          </div>
        </div>
      </div>

      {/* Legenda Kategori: DAFTAR POLOS (justify-between sejajar penuh) */}
      <div className="w-full md:w-[40%] h-auto md:h-full flex flex-col justify-between py-0.5 shrink-0">
        {PETA_CATEGORIES.map((cat) => (
          <div key={cat.key} className="flex items-center gap-2 py-0.5 px-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{
                border: `2px solid ${cat.color}`,
                backgroundColor: 'transparent',
              }}
            />
            <span className="text-[12px] sm:text-[12.5px] font-normal text-slate-600 font-sans truncate">
              {cat.label}
            </span>
          </div>
        ))}
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
    <Card className="flex flex-col">
      <SectionHeader
        title="Peta Digital Desa"
        linkText="Lihat Peta"
        linkHref={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
      />

      <PetaDigitalLeaflet centerLat={lat} centerLng={lng} />
    </Card>
  )
}
