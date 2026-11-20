import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPotensiList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { PageHeader, Card, SectionHeader, EmptyState } from '@/components'
import {
  Sparkles,
  MapPin,
  ArrowRight,
  Search,
  Building,
  Wheat,
  ShoppingBag,
  Palmtree,
  Music,
} from 'lucide-react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams
  const kategori = typeof params.kategori === 'string' ? params.kategori : undefined

  const titlePrefix = kategori && kategori !== 'Semua' ? `Potensi ${kategori}` : 'Potensi Unggulan Desa'

  return {
    title: `${titlePrefix} | Pemerintah Desa Bolali`,
    description: 'Eksplorasi komoditas pertanian unggulan, produk UMKM lokal, unit usaha BUMDes, destinasi wisata alam, dan kekayaan seni budaya Desa Bolali.',
    openGraph: {
      title: `${titlePrefix} Desa Bolali`,
      description: 'Potensi pertanian, kerajinan gerabah, wisata embung, dan seni budaya Desa Bolali, Klaten.',
      url: '/potensi-desa',
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export const revalidate = 60

const kategoriList = [
  { label: 'Semua Kategori', value: 'Semua' },
  { label: 'Pertanian', value: 'Pertanian' },
  { label: 'UMKM', value: 'UMKM' },
  { label: 'Wisata Alam', value: 'Wisata' },
  { label: 'Seni & Budaya', value: 'Seni-Budaya' },
  { label: 'BUMDes', value: 'BUMDes' },
]

export default async function PotensiDesaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentKategori = typeof params.kategori === 'string' ? params.kategori : 'Semua'
  const currentSearch = typeof params.q === 'string' ? params.q : ''

  const allItems = await getPotensiList({
    kategori: currentKategori !== 'Semua' ? currentKategori : undefined,
  })

  const filteredItems = allItems.filter((item) => {
    if (!currentSearch) return true
    const q = currentSearch.toLowerCase()
    return (
      item.judul.toLowerCase().includes(q) ||
      (item.ringkasan && item.ringkasan.toLowerCase().includes(q))
    )
  })

  const getFilterUrl = (kat: string) => {
    const qParams = new URLSearchParams()
    if (kat !== 'Semua') qParams.set('kategori', kat)
    if (currentSearch) qParams.set('q', currentSearch)
    const str = qParams.toString()
    return `/potensi-desa${str ? `?${str}` : ''}`
  }

  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title="Potensi Unggulan Desa Bolali"
        subtitle="Kekayaan agraris, sentra kerajinan gerabah UMKM, pesona embung wisata alam, dan tradisi budaya"
        badge="Potensi & Kemandirian"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-desa-gold" strokeWidth={1.75} />}
        breadcrumbs={[{ label: 'Potensi Desa', href: '/potensi-desa' }]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 space-y-6 sm:space-y-8">
        {/* Filter Kategori & Form Pencarian */}
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-desa-border">
            <SectionHeader
              title="Eksplorasi Sektor Unggulan Desa"
              subtitle="Pilar penggerak ekonomi, ketahanan pangan, dan kemakmuran warga"
              icon={<Sparkles className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
              className="mb-0"
            />

            {/* Pencarian */}
            <form method="GET" action="/potensi-desa" className="relative w-full md:w-72">
              {currentKategori !== 'Semua' && (
                <input type="hidden" name="kategori" value={currentKategori} />
              )}
              <input
                type="text"
                name="q"
                defaultValue={currentSearch}
                placeholder="Cari potensi desa..."
                className="w-full pl-3.5 pr-9 py-2 text-xs sm:text-sm rounded-desa-pill bg-slate-50 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen transition-all placeholder:text-desa-textMuted"
              />
              <button
                type="submit"
                aria-label="Cari Potensi"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen transition-colors"
              >
                <Search className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </form>
          </div>

          {/* Tab Filter Kategori */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
            {kategoriList.map((kat) => {
              const isActive = currentKategori === kat.value

              return (
                <Link
                  key={kat.value}
                  href={getFilterUrl(kat.value)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all min-h-[36px] ${
                    isActive
                      ? 'bg-desa-darkGreen text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <span>{kat.label}</span>
                </Link>
              )
            })}
          </div>
        </Card>

        {/* 3. GRID KARTU FOTO POTENSI Sesuai Spesifikasi */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item) => {
              const defaultImg =
                item.kategori === 'Pertanian'
                  ? '/seed/potensi-pertanian.jpg'
                  : item.kategori === 'UMKM'
                  ? '/seed/potensi-umkm.jpg'
                  : item.kategori === 'Wisata' || item.kategori === 'Wisata Alam'
                  ? '/seed/potensi-wisata.jpg'
                  : item.kategori === 'Seni-Budaya' || item.kategori === 'Budaya'
                  ? '/seed/potensi-budaya.jpg'
                  : '/seed/potensi-umkm.jpg'
              const imgUrl = getMediaUrl(item.gambar, defaultImg)

              return (
                <Card
                  key={item.id}
                  className="overflow-hidden p-0 flex flex-col justify-between hover:border-emerald-300 transition-all group"
                >
                  <div>
                    {/* Foto Rasio 4:3 dengan Overlay Gelap di Bawah */}
                    <Link
                      href={`/potensi-desa/${item.slug}`}
                      className="block relative aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-desa-border"
                    >
                      <Image
                        src={imgUrl}
                        alt={item.judul}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient Overlay Gelap Bawah */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Badge Kategori */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-desa-sm bg-desa-darkGreen/90 text-white text-[10px] font-bold shadow-xs backdrop-blur-xs font-sans">
                          {item.kategori}
                        </span>
                      </div>

                      {/* Label Judul di Bawah Foto Sesuai Gaya Beranda */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-left">
                        <span className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-sm font-sans line-clamp-1 group-hover:text-desa-gold transition-colors">
                          {item.judul}
                        </span>
                      </div>
                    </Link>

                    {/* Ringkasan & Lokasi */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <p className="text-xs text-desa-textMuted line-clamp-2 leading-relaxed font-sans">
                        {item.ringkasan}
                      </p>

                      {item.lokasi && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-sans pt-1">
                          <MapPin className="w-3.5 h-3.5 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                          <span className="truncate">{item.lokasi}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Aksi Lihat Detail */}
                  <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/potensi-desa/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-desa-primaryGreen hover:text-desa-darkGreen transition-colors font-sans py-1"
                    >
                      <span>Lihat Rincian & Galeri</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="p-8">
            <EmptyState
              title="Potensi Desa Belum Ditemukan"
              description="Tidak ada komoditas atau potensi desa yang sesuai dengan filter atau kata kunci pencarian Anda."
            />
          </Card>
        )}
      </div>
    </div>
  )
}
