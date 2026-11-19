import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Newspaper, Calendar } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { BeritaItem } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'

interface BeritaSectionProps {
  beritaList: BeritaItem[]
}

export function BeritaSection({ beritaList }: BeritaSectionProps) {
  const featured = beritaList[0]
  const sideList = beritaList.slice(1, 4)

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr)
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return dateStr
    }
  }

  const featuredImgUrl = getMediaUrl(featured?.gambar, '/images/berita-1.jpg')

  return (
    <SectionCard className="h-full flex flex-col justify-between">
      <div>
        <SectionTitle
          title="Berita Terbaru"
          icon={<Newspaper className="w-4 h-4 text-desa-green-800" />}
          linkText="Lihat Semua"
          linkHref="/informasi/berita"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
          {/* Main Featured Article (Left 7 Cols) */}
          {featured && (
            <div className="lg:col-span-7 flex flex-col justify-between group">
              <Link
                href={`/informasi/berita/${featured.slug}`}
                className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm bg-slate-100"
              >
                <Image
                  src={featuredImgUrl}
                  alt={featured.judul}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Date Badge Overlay */}
                <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] font-semibold backdrop-blur-sm">
                  <Calendar className="w-3 h-3 text-desa-gold-400" />
                  <span>{formatDate(featured.tanggalTerbit)}</span>
                </div>
              </Link>

              <div className="mt-3 space-y-1.5">
                <Link
                  href={`/informasi/berita/${featured.slug}`}
                  className="text-base font-bold text-slate-900 group-hover:text-desa-green-800 transition-colors line-clamp-2 leading-snug"
                >
                  {featured.judul}
                </Link>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {featured.ringkasan}
                </p>
              </div>

              {/* Decorative Pagination Dots Matching Mockup */}
              <div className="flex items-center gap-1.5 pt-3">
                <span className="w-5 h-1.5 rounded-full bg-desa-green-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          )}

          {/* Side Articles List (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-slate-100">
            {sideList.map((item, idx) => {
              const imgUrl = getMediaUrl(item.gambar, `/images/berita-${idx + 2}.jpg`)

              return (
                <Link
                  key={item.id}
                  href={`/informasi/berita/${item.slug}`}
                  className="group flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 shadow-sm border border-slate-100">
                    <Image
                      src={imgUrl}
                      alt={item.judul}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-desa-green-800 transition-colors line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium mt-1 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDate(item.tanggalTerbit)}</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
