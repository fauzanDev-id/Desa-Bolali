'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Images, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { GaleriItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface GaleriSectionProps {
  galeriList: GaleriItem[]
}

export function GaleriSection({ galeriList }: GaleriSectionProps) {
  const [startIndex, setStartIndex] = useState(0)
  const items = galeriList && galeriList.length > 0 ? galeriList : []

  // Menampilkan 3 item pada satu waktu
  const visibleCount = 3
  const maxStart = Math.max(0, items.length - visibleCount)

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStart, prev + 1))
  }

  const visibleItems = items.slice(startIndex, startIndex + visibleCount)

  return (
    <SectionCard className="h-full flex flex-col justify-between">
      <div>
        <SectionTitle
          title="Galeri Desa"
          icon={<Images className="w-4 h-4 text-desa-green-800" />}
          linkText="Lihat Semua"
          linkHref="/galeri"
        />

        {/* Carousel Container */}
        <div className="relative mt-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {visibleItems.map((item, idx) => {
              const imgUrl = getMediaUrl(item.foto, `/images/galeri-${idx + 1}.jpg`)

              return (
                <Link
                  key={item.id}
                  href={`/galeri#${item.slug}`}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-sm bg-slate-100 border border-slate-200/80 block"
                >
                  <Image
                    src={imgUrl}
                    alt={item.judul}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center">
                    <span className="text-[11px] font-bold text-white tracking-tight line-clamp-1 drop-shadow">
                      {item.judul}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Left Arrow Button */}
          {startIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:text-desa-green-900 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Right Arrow Button */}
          {startIndex < maxStart && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto Selanjutnya"
              className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:text-desa-green-900 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </SectionCard>
  )
}
