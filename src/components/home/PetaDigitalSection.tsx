import React from 'react'
import { Map, MapPin } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { ContactData } from '@/lib/cms'

interface PetaDigitalSectionProps {
  contact: ContactData
}

export function PetaDigitalSection({ contact }: PetaDigitalSectionProps) {
  const lat = contact.latitude ?? -7.6321
  const lng = contact.longitude ?? 110.7432

  // OpenStreetMap embed URL dengan marker di pusat Desa Bolali, Wonosari, Klaten
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.015}%2C${lng + 0.02}%2C${lat + 0.015}&layer=mapnik&marker=${lat}%2C${lng}`

  return (
    <SectionCard className="h-full flex flex-col justify-between">
      <div>
        <SectionTitle
          title="Peta Digital Desa"
          icon={<Map className="w-4 h-4 text-desa-green-800" />}
          linkText="Lihat Peta"
          linkHref={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 mt-3">
          {/* Map Embed (Left 8 Cols) */}
          <div className="sm:col-span-8 relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <iframe
              title="Peta Wilayah Desa Bolali"
              src={osmEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
            {/* Custom Marker Badge */}
            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 text-desa-green-950 text-xs font-bold shadow-md border border-slate-200 backdrop-blur-sm pointer-events-none">
              <MapPin className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>Desa Bolali</span>
            </div>
          </div>

          {/* Legenda Fasilitas (Right 4 Cols) */}
          <div className="sm:col-span-4 flex flex-col justify-center space-y-2.5 text-xs text-slate-700 p-2 sm:p-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <span className="font-medium">Fasilitas Umum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-medium">Sekolah</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="font-medium">Tempat Ibadah</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0" />
              <span className="font-medium">Sentra UMKM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
              <span className="font-medium">Area Publik</span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
