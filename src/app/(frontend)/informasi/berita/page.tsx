import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBeritaPaginated } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'
import { Newspaper, Calendar, ArrowRight, Search, ChevronLeft, ChevronRight, Tag, Sparkles } from 'lucide-react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams
  const kategori = typeof params.kategori === 'string' ? params.kategori : undefined
  const page = typeof params.page === 'string' ? params.page : '1'

  const titleKategori = kategori && kategori !== 'Semua' ? `Kategori ${kategori}` : 'Kabar & Berita Terkini'

  return {
    title: `${titleKategori} (Halaman ${page}) | Desa Bolali`,
    description: `Daftar berita, kabar pembangunan, serta liputan kegiatan masyarakat Desa Bolali, Kecamatan Wonosari, Klaten.`,
    openGraph: {
      title: `${titleKategori} | Website Resmi Desa Bolali`,
      description: `Kabar terkini dan artikel resmi kegiatan Pemerintah dan Masyarakat Desa Bolali.`,
      url: `/informasi/berita`,
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: '/images/hero-desa.jpg',
          width: 1200,
          height: 630,
          alt: 'Berita Desa Bolali',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleKategori} | Desa Bolali`,
      description: `Kabar terkini dan liputan pembangunan Desa Bolali, Klaten.`,
      images: ['/images/hero-desa.jpg'],
    },
  }
}

export const revalidate = 60

const daftarKategori = [
  { label: 'Semua Kategori', value: 'Semua' },
  { label: 'Pemerintahan', value: 'Pemerintahan' },
  { label: 'Pembangunan', value: 'Pembangunan' },
  { label: 'Pertanian', value: 'Pertanian' },
  { label: 'Kemasyarakatan', value: 'Kemasyarakatan' },
  { label: 'Pendidikan & Kesehatan', value: 'Pendidikan-Kesehatan' },
  { label: 'Seni & Budaya', value: 'Seni-Budaya' },
  { label: 'Kegiatan Warga', value: 'Kegiatan-Warga' },
]

export default async function BeritaListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentPage = typeof params.page === 'string' ? parseInt(params.page, 10) || 1 : 1
  const currentKategori = typeof params.kategori === 'string' ? params.kategori : 'Semua'
  const currentSearch = typeof params.q === 'string' ? params.q : ''

  const result = await getBeritaPaginated({
    page: currentPage,
    limit: 6,
    kategori: currentKategori !== 'Semua' ? currentKategori : undefined,
    search: currentSearch || undefined,
  })

  const getPageUrl = (targetPage: number) => {
    const qParams = new URLSearchParams()
    if (targetPage > 1) qParams.set('page', targetPage.toString())
    if (currentKategori && currentKategori !== 'Semua') qParams.set('kategori', currentKategori)
    if (currentSearch) qParams.set('q', currentSearch)
    const str = qParams.toString()
    return `/informasi/berita${str ? `?${str}` : ''}`
  }

  const getKategoriUrl = (kat: string) => {
    const qParams = new URLSearchParams()
    if (kat !== 'Semua') qParams.set('kategori', kat)
    if (currentSearch) qParams.set('q', currentSearch)
    const str = qParams.toString()
    return `/informasi/berita${str ? `?${str}` : ''}`
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Info Bar & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4 text-desa-gold-500" />
              <span>Publikasi & Kabar Desa</span>
              <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950">
              Daftar Berita Desa Bolali
            </h2>
          </div>

          {/* Search Input Form */}
          <form method="GET" action="/informasi/berita" className="flex items-center gap-2 max-w-sm w-full">
            {currentKategori !== 'Semua' && (
              <input type="hidden" name="kategori" value={currentKategori} />
            )}
            <div className="relative flex-1">
              <input
                type="text"
                name="q"
                defaultValue={currentSearch}
                placeholder="Cari judul berita..."
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

        {/* Category Pills Filter */}
        <div className="pt-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Tag className="w-3.5 h-3.5" />
              <span>Kategori:</span>
            </span>
            {daftarKategori.map((kat) => {
              const isActive = currentKategori === kat.value

              return (
                <Link
                  key={kat.value}
                  href={getKategoriUrl(kat.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-desa-green-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  {kat.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* News Grid */}
      {result.docs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result.docs.map((berita) => {
            const imgUrl = getMediaUrl(berita.gambar, '/images/berita-1.jpg')

            return (
              <article
                key={berita.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden hover:border-desa-green-300 hover:shadow-card-hover transition-all flex flex-col group"
              >
                {/* Thumbnail Image */}
                <Link
                  href={`/berita/${berita.slug}`}
                  className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden block"
                >
                  <Image
                    src={imgUrl}
                    alt={berita.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  {/* Category & Date Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-desa-green-900/90 text-white text-[11px] font-bold backdrop-blur-sm shadow-sm border border-white/10">
                      {berita.kategori}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] font-medium backdrop-blur-sm">
                    <Calendar className="w-3 h-3 text-desa-gold-400" />
                    <span>{formatDateIndonesia(berita.tanggalTerbit)}</span>
                  </div>
                </Link>

                {/* Article Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-desa-green-800 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/berita/${berita.slug}`}>
                        {berita.judul}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {berita.ringkasan}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Pemerintah Desa Bolali</span>
                    <Link
                      href={`/berita/${berita.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-desa-green-800 hover:text-desa-green-950 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Baca Lengkap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-12 text-center">
          <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada berita yang ditemukan</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {currentSearch
              ? `Tidak ditemukan berita dengan kata kunci "${currentSearch}".`
              : 'Belum ada berita yang diterbitkan untuk kategori yang dipilih.'}
          </p>
          <Link
            href="/informasi/berita"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-desa-green-900 text-white text-xs font-semibold hover:bg-desa-green-950 transition-colors"
          >
            Lihat Semua Berita
          </Link>
        </div>
      )}

      {/* Pagination Controls */}
      {result.totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Halaman <strong className="text-slate-800">{result.page}</strong> dari <strong className="text-slate-800">{result.totalPages}</strong> (Total {result.totalDocs} berita)
          </div>

          <div className="flex items-center gap-2">
            {result.hasPrevPage && result.prevPage ? (
              <Link
                href={getPageUrl(result.prevPage)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-semibold text-slate-300 cursor-not-allowed">
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </span>
            )}

            {/* Page Number Pills */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === result.page
                return (
                  <Link
                    key={p}
                    href={getPageUrl(p)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-desa-green-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </Link>
                )
              })}
            </div>

            {result.hasNextPage && result.nextPage ? (
              <Link
                href={getPageUrl(result.nextPage)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-semibold text-slate-300 cursor-not-allowed">
                <span>Selanjutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
