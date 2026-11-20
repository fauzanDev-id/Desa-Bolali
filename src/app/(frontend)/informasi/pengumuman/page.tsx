import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPengumumanList } from '@/lib/cms'
import { formatDateIndonesia } from '@/lib/utils'
import { Card, SectionHeader, EmptyState } from '@/components'
import { Bell, AlertTriangle, AlertCircle, Info, Calendar, ArrowRight, Search, FileText } from 'lucide-react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams
  const prioritas = typeof params.prioritas === 'string' ? params.prioritas : undefined

  const titlePrefix = prioritas && prioritas !== 'Semua' ? `Pengumuman ${prioritas}` : 'Pengumuman Resmi Warga'

  return {
    title: `${titlePrefix} | Pemerintah Desa Bolali`,
    description: 'Pusat pengumuman dan surat edaran resmi Pemerintah Desa Bolali untuk seluruh masyarakat desa.',
    openGraph: {
      title: `${titlePrefix} | Desa Bolali`,
      description: 'Pengumuman penting, jadwal pelayanan, dan surat edaran resmi Desa Bolali, Klaten.',
      url: '/informasi/pengumuman',
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export const revalidate = 60

const prioritasOptions = [
  { label: 'Semua Status', value: 'Semua' },
  { label: 'Mendesak / Darurat', value: 'Mendesak' },
  { label: 'Penting', value: 'Penting' },
  { label: 'Biasa / Umum', value: 'Biasa' },
]

export default async function PengumumanListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentPrioritas = typeof params.prioritas === 'string' ? params.prioritas : 'Semua'
  const currentSearch = typeof params.q === 'string' ? params.q : ''

  const pengumumanList = await getPengumumanList({
    prioritas: currentPrioritas !== 'Semua' ? currentPrioritas : undefined,
    search: currentSearch || undefined,
  })

  const getPrioritasBadge = (prioritas: string) => {
    switch (prioritas) {
      case 'Mendesak':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" strokeWidth={1.75} />,
          label: 'Mendesak',
          badgeCls: 'bg-rose-50 text-rose-700 border-rose-200',
          borderCls: 'border-l-4 border-l-rose-500',
        }
      case 'Penting':
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.75} />,
          label: 'Penting',
          badgeCls: 'bg-amber-50 text-amber-800 border-amber-200',
          borderCls: 'border-l-4 border-l-amber-500',
        }
      default:
        return {
          icon: <Info className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.75} />,
          label: 'Umum',
          badgeCls: 'bg-blue-50 text-blue-800 border-blue-200',
          borderCls: 'border-l-4 border-l-desa-primaryGreen',
        }
    }
  }

  const getFilterUrl = (pri: string) => {
    const qParams = new URLSearchParams()
    if (pri !== 'Semua') qParams.set('prioritas', pri)
    if (currentSearch) qParams.set('q', currentSearch)
    const str = qParams.toString()
    return `/informasi/pengumuman${str ? `?${str}` : ''}`
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header Filter & Pencarian */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-desa-border">
          <SectionHeader
            title="Papan Pengumuman Resmi Warga"
            subtitle="Surat edaran, jadwal pelayanan, dan maklumat Pemerintah Desa Bolali"
            icon={<Bell className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
            className="mb-0"
          />

          {/* Form Pencarian */}
          <form method="GET" action="/informasi/pengumuman" className="relative w-full md:w-72">
            {currentPrioritas !== 'Semua' && (
              <input type="hidden" name="prioritas" value={currentPrioritas} />
            )}
            <input
              type="text"
              name="q"
              defaultValue={currentSearch}
              placeholder="Cari pengumuman..."
              className="w-full pl-3.5 pr-9 py-2 text-xs sm:text-sm rounded-desa-pill bg-slate-50 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen transition-all placeholder:text-desa-textMuted"
            />
            <button
              type="submit"
              aria-label="Cari Pengumuman"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen transition-colors"
            >
              <Search className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </form>
        </div>

        {/* Tab Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          {prioritasOptions.map((opt) => {
            const isActive = currentPrioritas === opt.value

            return (
              <Link
                key={opt.value}
                href={getFilterUrl(opt.value)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all min-h-[36px] ${
                  isActive
                    ? 'bg-desa-darkGreen text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                <span>{opt.label}</span>
              </Link>
            )
          })}
        </div>
      </Card>

      {/* 2. DAFTAR BERFORMAT LIST DENGAN TANGGAL & BADGE STATUS Sesuai Spesifikasi */}
      {pengumumanList && pengumumanList.length > 0 ? (
        <div className="space-y-3.5">
          {pengumumanList.map((item) => {
            const badge = getPrioritasBadge(item.prioritas)

            return (
              <Card
                key={item.id}
                className={`p-4 sm:p-5 hover:border-emerald-300 transition-all ${badge.borderCls}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badge.badgeCls}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                      <span className="text-[11px] text-desa-textMuted font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" strokeWidth={1.75} />
                        <span>{formatDateIndonesia(item.tanggal)}</span>
                      </span>
                    </div>

                    <Link
                      href={`/informasi/pengumuman/${item.slug}`}
                      className="text-sm sm:text-base font-bold text-desa-textDark hover:text-desa-primaryGreen transition-colors block font-sans"
                    >
                      {item.judul}
                    </Link>

                    {item.ringkasan && (
                      <p className="text-xs text-desa-textMuted line-clamp-2 leading-relaxed font-sans">
                        {item.ringkasan}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    <Link
                      href={`/informasi/pengumuman/${item.slug}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-desa-lightGreen hover:bg-desa-greenHover hover:text-white text-desa-darkGreen text-xs font-bold transition-all min-h-[36px]"
                    >
                      <span>Lihat Rincian</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-8">
          <EmptyState
            title="Belum Ada Pengumuman"
            description="Tidak ada pengumuman yang sesuai dengan filter atau kata kunci pencarian Anda."
          />
        </Card>
      )}
    </div>
  )
}
