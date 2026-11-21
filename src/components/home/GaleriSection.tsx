'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { GaleriItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { getBlurDataUrl } from '@/lib/blur'

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

  // 3 foto ditampilkan bersamaan di desktop
  const visibleCount = 3
  const maxStart = Math.max(0, items.length - visibleCount)

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStart, prev + 1))
  }

  const visibleItems = items.slice(startIndex, startIndex + visibleCount)

  // Label foto pendek rapi persis sesuai mockup: "Wisata", "UMKM", "Panen Raya" dsb.
  const getShortTitle = (item: GaleriItem, idx: number) => {
    const titles = ['Wisata', 'UMKM', 'Panen Raya', 'Balai Desa', 'Kerja Bakti', 'Seni Budaya']
    return titles[idx % titles.length]
  }

  return (
    <Card className="flex flex-col">
      <SectionHeader
        title="Galeri Desa"
        linkText="Lihat Semua"
        linkHref="/galeri"
      />

      {/* 1. Mobile (<768px): Carousel Horizontal Swipe dengan Snap */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-2 mt-3 pb-1 scrollbar-none touch-pan-x scroll-smooth">
        {items.map((item, idx) => {
          const imgUrl = getMediaUrl(item.foto, `/seed/galeri-${(idx % 6) + 1}.webp`)
          const blur = getBlurDataUrl(imgUrl)

          return (
            <Link
              key={item.id}
              href={`/galeri#${item.slug}`}
              className="group relative w-[140px] h-[110px] shrink-0 snap-center rounded-[10px] overflow-hidden shadow-xs bg-slate-100 border border-slate-200 block"
            >
              <Image
                src={imgUrl}
                alt={item.judul}
                fill
                placeholder={blur ? 'blur' : 'empty'}
                blurDataURL={blur}
                sizes="140px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1.5 left-2 right-2 text-left">
                <span className="text-[12px] font-semibold text-white tracking-wide truncate block font-sans">
                  {getShortTitle(item, idx)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 2. Desktop (>=768px): 3 Thumbnail Memenuhi Lebar Kartu dengan Token --row2-body-h */}
      <div className="hidden md:block relative mt-3 row2-card-body flex-1 min-h-0">
        <div className="row2-galeri-grid w-full h-full">
          {visibleItems.map((item, idx) => {
            const globalIdx = startIndex + idx
            const imgUrl = getMediaUrl(item.foto, `/seed/galeri-${(globalIdx % 6) + 1}.webp`)
            const blur = getBlurDataUrl(imgUrl)

            return (
              <Link
                key={item.id}
                href={`/galeri#${item.slug}`}
                className="group relative w-full h-full rounded-[10px] overflow-hidden shadow-xs bg-slate-100 border border-slate-200 block"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  placeholder={blur ? 'blur' : 'empty'}
                  blurDataURL={blur}
                  sizes="(max-width: 1024px) 33vw, 150px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Scrim Tipis di Bawah Gambar */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                {/* Label 12px/600 di Kiri Bawah */}
                <div className="absolute bottom-1.5 left-2 right-2 text-left">
                  <span className="text-[12px] font-semibold text-white tracking-wide truncate block font-sans">
                    {getShortTitle(item, globalIdx)}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Tombol Panah Bulat 28px di Tepi Kiri/Kanan Area Gambar, Berbayang Halus, Tidak Menutupi Label */}
        {items.length > visibleCount && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Foto Sebelumnya"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 hover:bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-20 focus:outline-none focus:ring-2 focus:ring-[#1E7F3A]"
            >
              <CaretLeft size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={startIndex >= maxStart}
              aria-label="Foto Selanjutnya"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 hover:bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-20 focus:outline-none focus:ring-2 focus:ring-[#1E7F3A]"
            >
              <CaretRight size={14} weight="bold" />
            </button>
          </>
        )}
      </div>
    </Card>
  )
}
