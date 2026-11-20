'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Images, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { GaleriItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface GaleriSectionProps {
  galeriList: GaleriItem[]
}

export function GaleriSection({ galeriList }: GaleriSectionProps) {
  const [startIndex, setStartIndex] = useState(0)
  const items = galeriList && galeriList.length > 0 ? galeriList : []

  if (items.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader
          title="Galeri Desa"
          icon={<Images className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Semua"
          linkHref="/galeri"
        />
        <EmptyState
          title="Belum Ada Foto"
          description="Dokumentasi kegiatan dan galeri desa akan segera dimuat di sini."
        />
      </Card>
    )
  }

  // Menampilkan 3 item pada satu waktu di desktop
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
    <Card className="h-full flex flex-col justify-between">
      <div>
        <SectionHeader
          title="Galeri Desa"
          icon={<Images className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Semua"
          linkHref="/galeri"
        />

        {/* 1. Tampilan Mobile (<768px): Carousel Horizontal Swipe Sesuai Spesifikasi */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-3 mt-3 pb-2 scrollbar-none -mx-1 px-1">
          {items.map((item, idx) => {
            const imgUrl = getMediaUrl(item.foto, `/seed/galeri-${(idx % 4) + 1}.jpg`)

            return (
              <Link
                key={item.id}
                href={`/galeri#${item.slug}`}
                className="group relative w-[170px] shrink-0 snap-center aspect-square rounded-desa-card overflow-hidden shadow-xs bg-slate-100 border border-desa-border block"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  sizes="170px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="text-xs font-bold text-white tracking-tight line-clamp-1 drop-shadow-sm font-sans">
                    {item.judul}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 2. Tampilan Desktop (>=768px): Grid 3 Kolom dengan Tombol Carousel Kiri/Kanan Sesuai Mockup */}
        <div className="hidden md:block relative mt-3">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {visibleItems.map((item, idx) => {
              const imgUrl = getMediaUrl(item.foto, `/seed/galeri-${((startIndex + idx) % 4) + 1}.jpg`)

              return (
                <Link
                  key={item.id}
                  href={`/galeri#${item.slug}`}
                  className="group relative aspect-square rounded-desa-card overflow-hidden shadow-xs bg-slate-100 border border-desa-border block"
                >
                  <Image
                    src={imgUrl}
                    alt={item.judul}
                    fill
                    sizes="120px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Gradient Overlay Gelap Bawah */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

                  {/* Label di Bawah Foto Sesuai Mockup */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center">
                    <span className="text-[11px] font-bold text-white tracking-tight line-clamp-1 drop-shadow-sm font-sans">
                      {item.judul}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Panah Carousel Kiri */}
          {startIndex > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto Galeri Sebelumnya"
              className="absolute -left-3.5 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] w-8 h-8 rounded-full bg-white shadow-desa-sm border border-desa-border text-desa-textDark hover:text-desa-primaryGreen flex items-center justify-center transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
            </button>
          )}

          {/* Panah Carousel Kanan */}
          {startIndex < maxStart && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto Galeri Selanjutnya"
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] w-8 h-8 rounded-full bg-white shadow-desa-sm border border-desa-border text-desa-textDark hover:text-desa-primaryGreen flex items-center justify-center transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>
    </Card>
  )
}
