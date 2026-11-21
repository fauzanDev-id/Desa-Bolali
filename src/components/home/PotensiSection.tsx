'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { PotensiItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { getBlurDataUrl } from '@/lib/blur'

interface PotensiSectionProps {
  potensiList: PotensiItem[]
}

export function PotensiSection({ potensiList }: PotensiSectionProps) {
  if (!potensiList || potensiList.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader
          title="Potensi Unggulan Desa"
          linkText="Lihat Semua"
          linkHref="/potensi-desa"
        />
        <EmptyState
          title="Belum Ada Potensi"
          description="Daftar potensi unggulan desa akan segera dipublikasikan di sini."
        />
      </Card>
    )
  }

  // Urutan 4 kategori unggulan persis sesuai mockup: 1. Pertanian, 2. UMKM, 3. Wisata Alam, 4. Budaya
  const categoryOrder: Record<string, number> = {
    Pertanian: 1,
    UMKM: 2,
    'Wisata Alam': 3,
    Wisata: 3,
    'Seni-Budaya': 4,
    'Seni & Budaya': 4,
    Budaya: 4,
  }

  const sortedItems = [...potensiList]
    .sort((a, b) => {
      const orderA = categoryOrder[a.kategori || ''] || 99
      const orderB = categoryOrder[b.kategori || ''] || 99
      return orderA - orderB
    })
    .slice(0, 4)

  const getCleanLabel = (item: PotensiItem) => {
    if (item.kategori === 'Pertanian') return 'Pertanian'
    if (item.kategori === 'UMKM') return 'UMKM'
    if (item.kategori === 'Wisata Alam' || item.kategori === 'Wisata') return 'Wisata Alam'
    if (
      item.kategori === 'Seni-Budaya' ||
      item.kategori === 'Seni & Budaya' ||
      item.kategori === 'Budaya'
    )
      return 'Budaya'
    return item.judul
  }

  return (
    <Card className="flex flex-col">
      <SectionHeader
        title="Potensi Unggulan Desa"
        linkText="Lihat Semua"
        linkHref="/potensi-desa"
      />

      {/* 4 Ubin Foto: 1 Baris pada Desktop (grid-cols-4) setinggi token --row2-body-h, Grid 2x2 (h-[110px]) pada Mobile */}
      <div className="mt-3 row2-potensi-body flex-1 min-h-0">
        {sortedItems.map((item, idx) => {
          const defaultImg =
            idx === 0
              ? '/seed/potensi-pertanian.webp'
              : idx === 1
              ? '/seed/potensi-umkm.webp'
              : idx === 2
              ? '/seed/potensi-wisata.webp'
              : '/seed/potensi-budaya.webp'
          const imgUrl = getMediaUrl(item.gambar, defaultImg)
          const blur = getBlurDataUrl(imgUrl)

          return (
            <Link
              key={item.id}
              href={`/potensi-desa#${item.slug}`}
              className="group relative w-full h-[110px] md:h-full rounded-[10px] overflow-hidden shadow-xs bg-slate-100 border border-slate-200 block"
            >
              <Image
                src={imgUrl}
                alt={item.judul}
                fill
                placeholder={blur ? 'blur' : 'empty'}
                blurDataURL={blur}
                sizes="(max-width: 768px) 50vw, 150px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Scrim Gelap Tipis di Bawah Gambar */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Label Putih 13px/600 di Kiri Bawah */}
              <div className="absolute bottom-1.5 left-2 right-2">
                <span className="text-[13px] font-semibold text-white tracking-wide font-sans truncate block">
                  {getCleanLabel(item)}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
