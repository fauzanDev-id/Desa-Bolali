import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPotensiList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { Breadcrumb } from '@/components'
import {
  Sparkles,
  MapPin,
  Phone,
  ArrowRight,
  Search,
  Tag,
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
      images: [
        {
          url: '/images/potensi-pertanian.jpg',
          width: 1200,
          height: 630,
          alt: 'Potensi Unggulan Desa Bolali',
        },
      ],
    },
  }
}

export const revalidate = 60

const kategoriList = [
  { label: 'Semua Kategori', value: 'Semua', icon: Sparkles },
  { label: 'BUMDes', value: 'BUMDes', icon: Building },
  { label: 'Pertanian', value: 'Pertanian', icon: Wheat },
  { label: 'UMKM', value: 'UMKM', icon: ShoppingBag },
  { label: 'Wisata Alam', value: 'Wisata', icon: Palmtree },
  { label: 'Seni & Budaya', value: 'Seni-Budaya', icon: Music },
]

export default async function PotensiDesaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentKategori = typeof params.kategori === 'string' ? params.kategori : 'Semua'
  const currentSearch = typeof params.q === 'string' ? params.q : ''

  const potensiItems = await getPotensiList({
    kategori: currentKategori !== 'Semua' ? currentKategori : undefined,
    search: currentSearch || undefined,
  })

  const getKategoriBadge = (kategori: string) => {
    switch (kategori) {
      case 'BUMDes':
        return { label: 'BUMDes', cls: 'bg-blue-50 text-blue-800 border-blue-200' }
      case 'Pertanian':
        return { label: 'Pertanian', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
      case 'UMKM':
        return { label: 'UMKM Kreatif', cls: 'bg-amber-50 text-amber-800 border-amber-200' }
      case 'Wisata':
        return { label: 'Wisata Alam', cls: 'bg-teal-50 text-teal-800 border-teal-200' }
      case 'Seni-Budaya':
        return { label: 'Seni & Budaya', cls: 'bg-purple-50 text-purple-800 border-purple-200' }
      default:
        return { label: kategori, cls: 'bg-slate-100 text-slate-700 border-slate-200' }
    }
  }

  const getFilterUrl = (kat: string) => {
    const qParams = new URLSearchParams()
    if (kat !== 'Semua') qParams.set('kategori', kat)
    if (currentSearch) qParams.set('q', currentSearch)
    const str = qParams.toString()
    return `/potensi-desa${str ? `?${str}` : ''}`
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white overflow-hidden py-10 sm:py-14 border-b border-desa-gold-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-desa-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold-300 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-desa-gold-400" />
              <span>Komoditas & Potensi Lokal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Potensi Unggulan Desa Bolali
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Mendorong kemandirian ekonomi desa melalui sektor pertanian organik, pemberdayaan UMKM gerabah dan olahan pangan, unit usaha BUMDes, wisata alam, serta kelestarian tradisi budaya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          items={[{ label: 'Potensi Desa', href: '/potensi-desa' }]}
          className="mb-6"
        />

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-desa-green-800 uppercase tracking-wider block mb-1">
                Kategori Potensi Warga
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Pilih Sektor Unggulan Desa
              </h2>
            </div>

            {/* Search Input */}
            <form method="GET" action="/potensi-desa" className="flex items-center gap-2 max-w-sm w-full">
              {currentKategori !== 'Semua' && (
                <input type="hidden" name="kategori" value={currentKategori} />
              )}
              <div className="relative flex-1">
                <input
                  type="text"
                  name="q"
                  defaultValue={currentSearch}
                  placeholder="Cari potensi atau produk..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-desa-green-800 focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-desa-green-900 text-white text-xs sm:text-sm font-semibold hover:bg-desa-green-950 transition-colors shrink-0 shadow-sm"
              >
                Cari
              </button>
            </form>
          </div>

          {/* Category Tabs */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {kategoriList.map((kat) => {
              const isActive = currentKategori === kat.value
              const Icon = kat.icon

              return (
                <Link
                  key={kat.value}
                  href={getFilterUrl(kat.value)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-desa-green-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{kat.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Potensi Grid */}
        {potensiItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {potensiItems.map((item) => {
              const badge = getKategoriBadge(item.kategori)
              const imgUrl = getMediaUrl(item.gambar, '/images/hero-desa.jpg')

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden hover:border-desa-green-300 hover:shadow-card-hover transition-all flex flex-col group"
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={`/potensi-desa/${item.slug}`}
                    className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden block"
                  >
                    <Image
                      src={imgUrl}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-sm shadow-sm ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </div>
                  </Link>

                  {/* Body Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-desa-green-800 transition-colors leading-snug">
                        <Link href={`/potensi-desa/${item.slug}`}>
                          {item.judul}
                        </Link>
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.ringkasan}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      {item.lokasi && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-desa-gold-600 shrink-0" />
                          <span className="truncate">{item.lokasi}</span>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">[Data Dummy]</span>
                        <Link
                          href={`/potensi-desa/${item.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-desa-green-800 hover:text-desa-green-950 group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Rincian Lengkap</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-12 text-center">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Tidak ada potensi desa yang ditemukan</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Silakan gunakan kata kunci lain atau pilih kategori semua potensi.
            </p>
            <Link
              href="/potensi-desa"
              className="inline-block mt-4 px-4 py-2 rounded-xl bg-desa-green-900 text-white text-xs font-semibold hover:bg-desa-green-950 transition-colors"
            >
              Lihat Semua Potensi
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
