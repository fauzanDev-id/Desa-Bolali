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
    <SectionCard className="h-full flex flex-col justify-between">
      <div>
        <SectionTitle
          title="Potensi Unggulan Desa"
          icon={<Sparkles className="w-4 h-4 text-desa-green-800" />}
          linkText="Lihat Semua"
          linkHref="/potensi-desa"
        />

        {/* 4 Cards Grid (2x2) */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {displayItems.map((item, idx) => {
            const imgUrl = getMediaUrl(item.gambar, `/images/potensi-${idx + 1}.jpg`)

            return (
              <Link
                key={item.id}
                href={`/potensi-desa#${item.slug}`}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200/80 block"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover transition-transform duration-300 group-hover:scale-108"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Label Text */}
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow group-hover:text-desa-gold-300 transition-colors">
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
