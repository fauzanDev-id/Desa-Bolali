'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Map } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { ContactData } from '@/lib/cms'

const PetaDigitalLeaflet = dynamic(() => import('./PetaDigitalLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mt-3 animate-pulse">
      <div className="sm:col-span-8 aspect-[4/3] w-full rounded-xl bg-slate-100 flex items-center justify-center border border-desa-border">
        <span className="text-xs text-slate-400 font-medium">Memuat peta digital...</span>
      </div>
      <div className="sm:col-span-4 flex flex-col justify-center space-y-2 p-1 sm:p-0">
        <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
        <div className="h-6 bg-slate-100 rounded w-full"></div>
        <div className="h-6 bg-slate-100 rounded w-full"></div>
        <div className="h-6 bg-slate-100 rounded w-full"></div>
        <div className="h-6 bg-slate-100 rounded w-full"></div>
        <div className="h-6 bg-slate-100 rounded w-full"></div>
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
    <SectionCard className="h-full flex flex-col justify-between rounded-desa-card border border-desa-border shadow-desa-sm bg-white p-5">
      <div>
        <SectionTitle
          title="Peta Digital Desa"
          icon={<Map className="w-4 h-4 text-desa-accentGreen" />}
          linkText="Lihat Peta"
          linkHref={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
        />

        <PetaDigitalLeaflet centerLat={lat} centerLng={lng} />
      </div>
    </SectionCard>
  )
}
