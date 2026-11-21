'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
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
    <Card className="h-full flex flex-col justify-between">
      <div>
        <SectionHeader
          title="Galeri Desa"
          linkText="Lihat Semua"
          linkHref="/galeri"
        />

        {/* 1. Mobile (<768px): Carousel Horizontal Swipe dengan Snap */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-2 mt-1 pb-2 scrollbar-none -mx-1 px-1 touch-pan-x scroll-smooth">
          {items.map((item, idx) => {
            const imgUrl = getMediaUrl(item.foto, `/seed/galeri-${(idx % 6) + 1}.webp`)
            const blur = getBlurDataUrl(imgUrl)

            return (
              <Link
                key={item.id}
                href={`/galeri#${item.slug}`}
                className="group relative w-[150px] shrink-0 snap-center aspect-[4/3] rounded-[10px] overflow-hidden shadow-xs bg-slate-100 border border-slate-200 block"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  placeholder={blur ? 'blur' : 'empty'}
                  blurDataURL={blur}
                  sizes="150px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-2 right-2 text-left">
                  <span className="text-[12px] font-semibold text-white tracking-wide truncate block font-sans">
                    {getShortTitle(item, idx)}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* 2. Desktop (>=768px): 3 Thumbnail Landscape (4:3) Memenuhi Lebar Kartu dengan Tombol Panah Bulat 32px */}
        <div className="hidden md:block relative mt-1 px-0.5">
          <div className="grid grid-cols-3 gap-2">
            {visibleItems.map((item, idx) => {
              const globalIdx = startIndex + idx
              const imgUrl = getMediaUrl(item.foto, `/seed/galeri-${(globalIdx % 6) + 1}.webp`)
              const blur = getBlurDataUrl(imgUrl)

              return (
                <Link
                  key={item.id}
                  href={`/galeri#${item.slug}`}
                  className="group relative aspect-[4/3] rounded-[10px] overflow-hidden shadow-xs bg-slate-100 border border-slate-200 block"
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
                  {/* Scrim Tipis di Bawah Gambar (Tanpa Text-shadow Tebal) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
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

          {/* Tombol Panah Bulat Putih 32px di Tepi Kiri/Kanan Carousel (Tidak Menutupi Gambar/Label) */}
          {items.length > visibleCount && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                disabled={startIndex === 0}
                aria-label="Foto Sebelumnya"
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed z-20 focus:outline-none focus:ring-2 focus:ring-[#1E7F3A]"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={startIndex >= maxStart}
                aria-label="Foto Selanjutnya"
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed z-20 focus:outline-none focus:ring-2 focus:ring-[#1E7F3A]"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
