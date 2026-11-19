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

  const featuredImgUrl = getMediaUrl(featured?.gambar, '/seed/berita-1.jpg')

  return (
    <SectionCard className="h-full flex flex-col justify-between rounded-desa-card border border-desa-border shadow-desa-sm bg-white p-5">
      <div>
        <SectionTitle
          title="Berita Terbaru"
          icon={<Newspaper className="w-4 h-4 text-desa-accentGreen" />}
          linkText="Lihat Semua"
          linkHref="/informasi/berita"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-3">
          {/* Berita Utama (Sisi Kiri, 7 Kolom) */}
          {featured && (
            <div className="lg:col-span-7 flex flex-col justify-between group">
              <div>
                <Link
                  href={`/berita/${featured.slug}`}
                  className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm bg-slate-100"
                >
                  <Image
                    src={featuredImgUrl}
                    alt={featured.judul}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Badge Tanggal Putih di Atas Gambar Sesuai Mockup */}
                  <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 text-slate-800 text-[11px] font-bold shadow-md border border-slate-100 backdrop-blur-xs">
                    <Calendar className="w-3.5 h-3.5 text-desa-accentGreen" />
                    <span>{formatDateIndonesia(featured.tanggalTerbit)}</span>
                  </div>
                </Link>

                <div className="mt-3 space-y-1.5">
                  <Link
                    href={`/berita/${featured.slug}`}
                    className="text-sm sm:text-base font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors line-clamp-2 leading-snug font-sans"
                  >
                    {featured.judul}
                  </Link>
                  <p className="text-xs text-desa-textMuted line-clamp-2 leading-relaxed">
                    {featured.ringkasan}
                  </p>
                </div>
              </div>

              {/* Dot Carousel di Bawah Sesuai Mockup */}
              <div className="flex items-center gap-1.5 pt-3 mt-2">
                <span className="w-6 h-1.5 rounded-full bg-desa-primaryGreen" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            </div>
          )}

          {/* 3 Berita Lebih Kecil (Sisi Kanan, 5 Kolom Dipisah Garis Tipis) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-slate-100">
            {sideList.map((item, idx) => {
              const imgUrl = getMediaUrl(item.gambar, `/seed/berita-${idx + 2}.jpg`)

              return (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
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
                    <h4 className="text-xs font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors line-clamp-2 leading-snug font-sans">
                      {item.judul}
                    </h4>
                    <span className="text-[11px] text-desa-textMuted font-medium mt-1 inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDateIndonesia(item.tanggalTerbit)}</span>
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
