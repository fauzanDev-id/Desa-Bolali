'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, SectionHeader, EmptyState, Pagination } from '@/components'
import { Newspaper, CalendarBlank, ArrowRight, MagnifyingGlass, Tag } from '@phosphor-icons/react/dist/ssr'
import type { BeritaItem } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'

interface BeritaListClientProps {
  initialDocs: BeritaItem[]
}

const daftarKategori = [
  { label: 'Semua Kategori', value: 'Semua' },
  { label: 'Pemerintahan', value: 'Pemerintahan' },
  { label: 'Pembangunan', value: 'Pembangunan' },
  { label: 'Pertanian', value: 'Pertanian' },
  { label: 'Kemasyarakatan', value: 'Kemasyarakatan' },
  { label: 'Pendidikan & Kesehatan', value: 'Pendidikan-Kesehatan' },
  { label: 'Seni & Budaya', value: 'Seni-Budaya' },
]

const ITEMS_PER_PAGE = 6

export function BeritaListClient({ initialDocs }: BeritaListClientProps) {
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Filter client-side secara instan
  const filteredDocs = useMemo(() => {
    return initialDocs.filter((item) => {
      // Filter kategori
      if (selectedKategori !== 'Semua') {
        if (item.kategori.toLowerCase() !== selectedKategori.toLowerCase()) {
          return false
        }
      }
      // Filter pencarian
      if (searchQuery.trim() !== '') {
        const q = searchQuery.trim().toLowerCase()
        const matchJudul = item.judul.toLowerCase().includes(q)
        const matchRingkasan = item.ringkasan?.toLowerCase().includes(q)
        if (!matchJudul && !matchRingkasan) {
          return false
        }
      }
      return true
    })
  }, [initialDocs, selectedKategori, searchQuery])

  // Paginasi
  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE) || 1
  const paginatedDocs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredDocs.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredDocs, currentPage])

  const handleKategoriChange = (kat: string) => {
    setSelectedKategori(kat)
    setCurrentPage(1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
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
              icon={<Newspaper className="w-4 h-4 text-desa-accentGreen" />}
            />
          </div>

          {/* Form Pencarian Berita */}
          <div className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Cari judul berita..."
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-desa-pill border border-desa-border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20 transition-all font-sans"
              />
              <MagnifyingGlass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-desa-pill transition-colors shrink-0 font-sans"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Filter Pill Kategori */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-desa-textMuted font-medium flex items-center gap-1 font-sans">
            <Tag className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </span>
          {daftarKategori.map((kat) => {
            const isActive = selectedKategori === kat.value

            return (
              <button
                key={kat.value}
                type="button"
                onClick={() => handleKategoriChange(kat.value)}
                className={`px-3 py-1 rounded-desa-pill text-xs font-semibold transition-all font-sans ${
                  isActive
                    ? 'bg-desa-primaryGreen text-white shadow-xs'
                    : 'bg-slate-100 text-desa-textDark hover:bg-emerald-50 hover:text-desa-primaryGreen cursor-pointer'
                }`}
              >
                {kat.label}
              </button>
            )
          })}
        </div>
      </Card>

      {/* 2. Grid Daftar Berita */}
      {paginatedDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedDocs.map((berita) => {
            const imgUrl = getMediaUrl(berita.gambar, '/seed/berita-1.webp')

            return (
              <Card
                key={berita.id}
                hoverEffect
                className="overflow-hidden p-0 flex flex-col justify-between group"
              >
                <div>
                  {/* Foto Berita */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={imgUrl}
                      alt={berita.judul}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-desa-pill bg-white/95 backdrop-blur-xs text-desa-darkGreen text-[11px] font-bold shadow-xs border border-emerald-100 font-sans">
                        {berita.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Konten Text Berita */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-desa-textMuted text-xs mb-2">
                      <CalendarBlank className="w-3.5 h-3.5 text-desa-accentGreen" />
                      <span>{formatDateIndonesia(berita.tanggalTerbit)}</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors line-clamp-2 leading-snug font-sans">
                      <Link href={`/berita/${berita.slug}`}>{berita.judul}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-desa-textMuted mt-2 line-clamp-3 leading-relaxed">
                      {berita.ringkasan}
                    </p>
                  </div>
                </div>

                {/* Tombol Baca */}
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    href={`/berita/${berita.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-desa-primaryGreen hover:text-desa-darkGreen group-hover:translate-x-0.5 transition-all font-sans"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState
          title="Tidak Ada Berita Ditemukan"
          description={
            searchQuery
              ? `Tidak ditemukan berita dengan kata kunci "${searchQuery}". Coba gunakan kata kunci lain.`
              : 'Belum ada berita yang diterbitkan untuk kategori ini.'
          }
          action={{
            label: 'Tampilkan Semua Berita',
            onClick: () => {
              setSelectedKategori('Semua')
              setSearchQuery('')
            },
            variant: 'outline',
          }}
        />
      )}

      {/* 3. Paginasi Halaman */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            getPageUrl={(p) => '#'}
          />
        </div>
      )}
    </div>
  )
}
