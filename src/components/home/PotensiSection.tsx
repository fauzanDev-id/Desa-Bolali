import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
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
      <Card className="h-full flex flex-col justify-between card-hover-lift">
        <SectionHeader
          title="Potensi Unggulan Desa"
          icon={<Sparkles className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
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
    BUMDes: 10,
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
    if (item.kategori === 'Seni-Budaya' || item.kategori === 'Seni & Budaya' || item.kategori === 'Budaya') return 'Budaya'
    return item.judul
  }

  return (
    <Card className="h-full flex flex-col justify-between card-hover-lift">
      <div>
        <SectionHeader
          title="Potensi Unggulan Desa"
          icon={<Sparkles className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Semua"
          linkHref="/potensi-desa"
        />

        {/* 4 Ubin Foto Rounded (Grid 2x2) Sesuai Mockup */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-3">
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
                className="group relative aspect-[4/3] rounded-desa-card zoom-img-container shadow-xs bg-slate-100 border border-desa-border block"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  placeholder={blur ? 'blur' : 'empty'}
                  blurDataURL={blur}
                  sizes="(max-width: 768px) 50vw, 220px"
                  className="object-cover zoom-img-target"
                />
                {/* Gradient Overlay Gelap Bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Label di Sudut Kiri Bawah */}
                <div className="absolute bottom-2 left-2.5 right-2.5">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-sans drop-shadow-sm group-hover:text-desa-gold transition-colors duration-150 truncate block">
                    {getCleanLabel(item)}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
