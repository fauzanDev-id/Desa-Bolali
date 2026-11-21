'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarBlank } from '@phosphor-icons/react/dist/ssr'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { BeritaItem } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'
import { getBlurDataUrl } from '@/lib/blur'

interface BeritaSectionProps {
  beritaList: BeritaItem[]
}

export function BeritaSection({ beritaList }: BeritaSectionProps) {
  if (!beritaList || beritaList.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader
          title="Berita Terbaru"
          linkText="Lihat Semua"
          linkHref="/informasi/berita"
          isNews
        />
        <EmptyState
          title="Belum Ada Berita"
          description="Publikasi berita terbaru desa akan segera ditampilkan di sini."
        />
      </Card>
    )
  }

  const featured = beritaList[0]
  const sideList = beritaList.slice(1, 4)
  const featuredImgUrl = getMediaUrl(featured?.gambar, '/seed/berita-1.webp')
  const featuredBlur = getBlurDataUrl(featuredImgUrl)

  return (
    <Card className="h-full flex flex-col justify-between">
      <div className="flex flex-col h-full justify-between">
        <SectionHeader
          title="Berita Terbaru"
          linkText="Lihat Semua"
          linkHref="/informasi/berita"
          isNews
        />

        {/* Tata Letak Berita: Dua Kolom Seimbang dengan Pemisah Vertikal Tipis */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mt-1 flex-1">
          {/* Berita Utama Sisi Kiri (6 Kolom) */}
          {featured && (
            <div className="md:col-span-6 flex flex-col justify-between pr-0 md:pr-3.5 md:border-r md:border-slate-100 group">
              <div>
                <Link
                  href={`/berita/${featured.slug}`}
                  className="block relative aspect-[16/9] w-full rounded-[8px] overflow-hidden shadow-xs bg-slate-100 border border-slate-200"
                >
                  <Image
                    src={featuredImgUrl}
                    alt={featured.judul}
                    fill
                    placeholder={featuredBlur ? 'blur' : 'empty'}
                    blurDataURL={featuredBlur}
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="object-cover"
                  />
                  {/* Badge Tanggal Putih di Kiri Bawah Gambar */}
                  <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/95 text-slate-800 text-[11px] font-semibold shadow-xs border border-slate-200/80">
                    <CalendarBlank size={12} weight="fill" className="text-[#1E7F3A]" />
                    <span>{formatDateIndonesia(featured.tanggalTerbit)}</span>
                  </div>
                </Link>

                <div className="mt-2 space-y-1">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-slate-900 group-hover:text-[#1E7F3A] transition-colors duration-150 line-clamp-2 leading-snug font-sans">
                    <Link href={`/berita/${featured.slug}`} className="block">
                      {featured.judul}
                    </Link>
                  </h3>
                  <p className="text-[12.5px] text-slate-500 line-clamp-2 leading-relaxed">
                    {featured.ringkasan}
                  </p>
                </div>
              </div>

              {/* Dot Carousel di Bawah Sesuai Mockup */}
              <div className="flex items-center gap-1.5 mt-2 pt-1">
                <span className="w-5 h-1.5 rounded-full bg-[#1E7F3A] transition-all duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          )}

          {/* 3 Berita di Kanan (6 Kolom): Thumbnail 80x56, Judul 14px/600, Tanggal 12px Abu */}
          <div className="md:col-span-6 flex flex-col justify-between divide-y divide-slate-100 pl-0 md:pl-1">
            {sideList.map((item, idx) => {
              const imgUrl = getMediaUrl(item.gambar, `/seed/berita-${idx + 2}-thumb.webp`)
              const blur = getBlurDataUrl(imgUrl)

              return (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0 group"
                >
                  <div className="relative w-[80px] h-[56px] rounded-[6px] shrink-0 overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                    <Image
                      src={imgUrl}
                      alt={item.judul}
                      fill
                      placeholder={blur ? 'blur' : 'empty'}
                      blurDataURL={blur}
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13.5px] font-semibold text-slate-900 group-hover:text-[#1E7F3A] transition-colors duration-150 line-clamp-2 leading-snug font-sans">
                      {item.judul}
                    </h3>
                    <div className="flex items-center gap-1 text-[11.5px] text-slate-400 mt-0.5">
                      <CalendarBlank size={12} weight="fill" className="text-slate-400" />
                      <span>{formatDateIndonesia(item.tanggalTerbit)}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}
