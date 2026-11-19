import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPengumumanList } from '@/lib/cms'
import { formatDateFullIndonesia, formatDateIndonesia } from '@/lib/utils'
import { Bell, AlertTriangle, AlertCircle, Info, Calendar, ArrowRight, Search, FileText, Download } from 'lucide-react'

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
  { label: 'Semua Prioritas', value: 'Semua' },
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
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
          label: 'Mendesak / Darurat',
          badgeCls: 'bg-rose-50 text-rose-700 border-rose-200',
          borderCls: 'border-l-4 border-l-rose-500',
        }
      case 'Penting':
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600" />,
          label: 'Penting',
          badgeCls: 'bg-amber-50 text-amber-800 border-amber-200',
          borderCls: 'border-l-4 border-l-amber-500',
        }
      default:
        return {
          icon: <Info className="w-3.5 h-3.5 text-blue-600" />,
          label: 'Biasa / Umum',
          badgeCls: 'bg-blue-50 text-blue-800 border-blue-200',
          borderCls: 'border-l-4 border-l-desa-green-800',
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
      {/* Header Info & Search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 text-desa-gold-500" />
              <span>Papan Informasi Resmi</span>
              <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950">
              Pengumuman Warga Desa Bolali
            </h2>
          </div>

          {/* Search Form */}
          <form method="GET" action="/informasi/pengumuman" className="flex items-center gap-2 max-w-sm w-full">
            {currentPrioritas !== 'Semua' && (
              <input type="hidden" name="prioritas" value={currentPrioritas} />
            )}
            <div className="relative flex-1">
              <input
                type="text"
                name="q"
                defaultValue={currentSearch}
                placeholder="Cari pengumuman..."
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

        {/* Priority Filter Pills */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1">Prioritas:</span>
          {prioritasOptions.map((opt) => {
            const isActive = currentPrioritas === opt.value
            return (
              <Link
                key={opt.value}
                href={getFilterUrl(opt.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-desa-green-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {opt.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Announcements List */}
      {pengumumanList.length > 0 ? (
        <div className="space-y-4">
          {pengumumanList.map((item) => {
            const badge = getPrioritasBadge(item.prioritas)

            return (
              <article
                key={item.id}
                className={`bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-6 hover:shadow-card-hover transition-all ${badge.borderCls}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.badgeCls}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">Pemerintah Desa Bolali</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-desa-gold-500" />
                    <span>{formatDateFullIndonesia(item.tanggal)}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-desa-green-800 transition-colors">
                  <Link href={`/informasi/pengumuman/${item.slug}`}>
                    {item.judul}
                  </Link>
                </h3>

                {item.ringkasan && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.ringkasan}
                  </p>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Surat Edaran Resmi</span>
                  </div>

                  <Link
                    href={`/informasi/pengumuman/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-desa-green-800 hover:text-desa-green-950 transition-colors"
                  >
                    <span>Baca Rincian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-12 text-center">
          <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada pengumuman yang ditemukan</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {currentSearch
              ? `Tidak ditemukan pengumuman dengan kata kunci "${currentSearch}".`
              : 'Belum ada pengumuman untuk kriteria yang dipilih.'}
          </p>
          <Link
            href="/informasi/pengumuman"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-desa-green-900 text-white text-xs font-semibold hover:bg-desa-green-950 transition-colors"
          >
            Lihat Semua Pengumuman
          </Link>
        </div>
      )}
    </div>
  )
}
