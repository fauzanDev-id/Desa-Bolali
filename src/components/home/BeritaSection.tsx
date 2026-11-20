import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Newspaper, Calendar } from 'lucide-react'
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
      <Card className="h-full flex flex-col justify-between card-hover-lift">
        <SectionHeader
          title="Berita Terbaru"
          icon={<Newspaper className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Semua"
          linkHref="/informasi/berita"
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
    <Card className="h-full flex flex-col justify-between card-hover-lift">
      <div>
        <SectionHeader
          title="Berita Terbaru"
          icon={<Newspaper className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Semua"
          linkHref="/informasi/berita"
        />

        {/* Tata Letak Berita: Desktop 7:5, Mobile bertumpuk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mt-3">
          {/* Berita Utama (Sisi Kiri, 7 Kolom) */}
          {featured && (
            <div className="lg:col-span-7 flex flex-col justify-between group">
              <div>
                <Link
                  href={`/berita/${featured.slug}`}
                  className="block relative aspect-[16/10] w-full rounded-desa-card zoom-img-container shadow-xs bg-slate-100 border border-desa-border"
                >
                  <Image
                    src={featuredImgUrl}
                    alt={featured.judul}
                    fill
                    placeholder={featuredBlur ? 'blur' : 'empty'}
                    blurDataURL={featuredBlur}
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover zoom-img-target"
                  />
                  {/* Badge Tanggal Putih di Atas Gambar */}
                  <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-desa-sm bg-white/95 text-slate-800 text-[11px] font-bold shadow-xs border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-desa-accentGreen" strokeWidth={1.75} />
                    <span>{formatDateIndonesia(featured.tanggalTerbit)}</span>
                  </div>
                </Link>

                <div className="mt-2.5 sm:mt-3 space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors duration-150 line-clamp-2 leading-snug font-sans">
                    <Link
                      href={`/berita/${featured.slug}`}
                      className="block"
                    >
                      {featured.judul}
                    </Link>
                  </h3>
                  <p className="text-xs text-desa-textMuted line-clamp-2 leading-relaxed">
                    {featured.ringkasan}
                  </p>
                </div>
              </div>

              {/* Dot Carousel di Bawah */}
              <div className="flex items-center gap-1.5 pt-3 mt-1 sm:mt-2">
                <span className="w-5 sm:w-6 h-1.5 rounded-full bg-desa-primaryGreen transition-all duration-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          )}

          {/* 3 Berita Kecil di Kanan (5 Kolom) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-slate-100 pt-2 lg:pt-0">
            {sideList.map((item, idx) => {
              const imgUrl = getMediaUrl(item.gambar, `/seed/berita-${idx + 2}-thumb.webp`)
              const blur = getBlurDataUrl(imgUrl)

              return (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 group"
                >
                  <div className="relative w-20 h-16 sm:w-24 sm:h-16 rounded-desa-sm zoom-img-container shrink-0 bg-slate-100 border border-desa-border shadow-xs">
                    <Image
                      src={imgUrl}
                      alt={item.judul}
                      fill
                      placeholder={blur ? 'blur' : 'empty'}
                      blurDataURL={blur}
                      sizes="96px"
                      className="object-cover zoom-img-target"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors duration-150 line-clamp-2 leading-snug font-sans">
                      {item.judul}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-desa-textMuted mt-1">
                      <Calendar className="w-3 h-3 text-slate-400" strokeWidth={1.75} />
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
