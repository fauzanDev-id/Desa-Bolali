import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getBeritaPaginated } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'
import { Card, SectionHeader, Pagination, EmptyState } from '@/components'
import { Newspaper, Calendar, ArrowRight, Search, Tag } from 'lucide-react'

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
      {/* 1. Filter Kategori & Kotak Pencarian */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-desa-border">
          <div>
            <SectionHeader
              title="Kabar & Publikasi Berita Desa"
              subtitle="Informasi resmi pembangunan, pelayanan publik, dan kegiatan warga"
              icon={<Newspaper className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
              className="mb-0"
            />
          </div>

          {/* Form Pencarian Berita */}
          <form method="GET" action="/informasi/berita" className="relative w-full md:w-72">
            {currentKategori !== 'Semua' && (
              <input type="hidden" name="kategori" value={currentKategori} />
            )}
            <input
              type="text"
              name="q"
              defaultValue={currentSearch}
              placeholder="Cari judul berita..."
              className="w-full pl-3.5 pr-9 py-2 text-xs sm:text-sm rounded-desa-pill bg-slate-50 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen focus:border-transparent transition-all placeholder:text-desa-textMuted"
            />
            <button
              type="submit"
              aria-label="Cari Berita"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen transition-colors"
            >
              <Search className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>

        {/* Tab Filter Kategori Berita */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          {daftarKategori.map((kat) => {
            const isActive = currentKategori === kat.value

            return (
              <Link
                key={kat.value}
                href={getKategoriUrl(kat.value)}
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

      {/* 2. Grid Kartu Berita */}
      {result.docs && result.docs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {result.docs.map((berita) => {
            const imgUrl = getMediaUrl(berita.gambar, '/seed/berita-1.jpg')

            return (
              <Card
                key={berita.id}
                className="overflow-hidden p-0 flex flex-col justify-between hover:border-emerald-300 transition-all group"
              >
                <div>
                  {/* Foto Utama Berita aspect-[16/10] */}
                  <Link
                    href={`/berita/${berita.slug}`}
                    className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-desa-border"
                  >
                    <Image
                      src={imgUrl}
                      alt={berita.judul}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Badge Kategori */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-desa-sm bg-desa-darkGreen/90 text-white text-[10px] font-bold shadow-xs backdrop-blur-xs font-sans">
                        {berita.kategori}
                      </span>
                    </div>
                  </Link>

                  {/* Konten Teks Berita */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-desa-textMuted font-medium font-sans">
                      <Calendar className="w-3.5 h-3.5 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                      <span>{formatDateIndonesia(berita.tanggalTerbit)}</span>
                    </div>

                    <Link
                      href={`/berita/${berita.slug}`}
                      className="text-sm sm:text-base font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors line-clamp-2 leading-snug font-sans block"
                    >
                      {berita.judul}
                    </Link>

                    <p className="text-xs text-desa-textMuted line-clamp-2 leading-relaxed font-sans">
                      {berita.ringkasan}
                    </p>
                  </div>
                </div>

                {/* Tautan Baca Selengkapnya */}
                <div className="px-4 sm:px-5 pb-4 pt-1">
                  <Link
                    href={`/berita/${berita.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-desa-primaryGreen hover:text-desa-darkGreen transition-colors font-sans py-1"
                  >
                    <span>Baca Selengkapnya</span>
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
            title="Tidak Ada Berita Ditemukan"
            description="Tidak ada artikel berita yang cocok dengan kata kunci atau kategori yang Anda pilih."
          />
        </Card>
      )}

      {/* 3. Paginasi Halaman Sesuai Standar Komponen */}
      {result.totalPages > 1 && (
        <div className="pt-2 flex justify-center">
          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            getPageUrl={getPageUrl}
          />
        </div>
      )}
    </div>
  )
}
