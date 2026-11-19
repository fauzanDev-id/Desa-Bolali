import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { PotensiItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface PotensiSectionProps {
  potensiList: PotensiItem[]
}

export function PotensiSection({ potensiList }: PotensiSectionProps) {
  const displayItems = potensiList.slice(0, 4)

  return (
    <SectionCard className="h-full flex flex-col justify-between rounded-desa-card border border-desa-border shadow-desa-sm bg-white p-5">
      <div>
        <SectionTitle
          title="Potensi Unggulan Desa"
          icon={<Sparkles className="w-4 h-4 text-desa-accentGreen" />}
          linkText="Lihat Semua"
          linkHref="/potensi-desa"
        />

        {/* 4 Ubin Foto Rounded (Grid 2x2) Sesuai Mockup */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {displayItems.map((item, idx) => {
            const defaultImg =
              idx === 0
                ? '/seed/potensi-pertanian.jpg'
                : idx === 1
                ? '/seed/potensi-umkm.jpg'
                : idx === 2
                ? '/seed/potensi-wisata.jpg'
                : '/seed/potensi-budaya.jpg'
            const imgUrl = getMediaUrl(item.gambar, defaultImg)

            return (
              <Link
                key={item.id}
                href={`/potensi-desa#${item.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-xs bg-slate-100 border border-desa-border block"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient Overlay Gelap di Bawah agar Teks Label Kontras */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Label di Sudut Kiri Bawah Sesuai Mockup */}
                <div className="absolute bottom-2 left-2.5 right-2 text-left">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow-sm group-hover:text-desa-gold transition-colors font-sans">
                    {item.judul}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </SectionCard>
  )
}
