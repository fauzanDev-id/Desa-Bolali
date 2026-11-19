import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getDokumenTransparansiList } from '@/lib/cms'
import { getMediaUrl, formatRupiah } from '@/lib/utils'
import { Breadcrumb } from '@/components'
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Filter,
} from 'lucide-react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams
  const tahun = typeof params.tahun === 'string' ? params.tahun : '2026'

  return {
    title: `Transparansi APBDes Tahun ${tahun} | Pemerintah Desa Bolali`,
    description: `Transparansi publik Anggaran Pendapatan dan Belanja Desa (APBDes) serta dokumen laporan pembangunan Desa Bolali tahun anggaran ${tahun}.`,
    openGraph: {
      title: `Transparansi Keuangan Desa Bolali Tahun ${tahun}`,
      description: 'Laporan realisasi APBDes dan berkas pertanggungjawaban keuangan desa terbuka untuk masyarakat.',
      url: '/transparansi',
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export const revalidate = 60

const daftarTahun = [2026, 2025]
const daftarKategori = [
  { label: 'Semua Kategori', value: 'Semua' },
  { label: 'APBDes Murni', value: 'APBDes' },
  { label: 'Laporan Realisasi', value: 'Realisasi' },
  { label: 'Laporan Pembangunan', value: 'Laporan Pembangunan' },
  { label: 'Rencana Kerja (RKPDes)', value: 'Rencana Kerja' },
]

export default async function TransparansiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const selectedTahun = typeof params.tahun === 'string' ? parseInt(params.tahun, 10) || 2026 : 2026
  const selectedKategori = typeof params.kategori === 'string' ? params.kategori : 'Semua'

  const dokumenList = await getDokumenTransparansiList({
    tahun: selectedTahun,
    kategori: selectedKategori !== 'Semua' ? selectedKategori : undefined,
  })

  const getFilterUrl = (tahunVal: number, katVal: string) => {
    const q = new URLSearchParams()
    if (tahunVal !== 2026) q.set('tahun', tahunVal.toString())
    if (katVal !== 'Semua') q.set('kategori', katVal)
    const str = q.toString()
    return `/transparansi${str ? `?${str}` : ''}`
  }

  // Cari dokumen utama untuk ringkasan progres
  const apbdesUtama = dokumenList.find((d) => d.persentaseRealisasi !== undefined && d.persentaseRealisasi !== null) || dokumenList[0]
  const persentase = apbdesUtama?.persentaseRealisasi || 92.3

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white overflow-hidden py-10 sm:py-14 border-b border-desa-gold-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-desa-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold-300 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-desa-gold-400" />
              <span>Keterbukaan Informasi Publik</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Transparansi APBDes & Akuntabilitas Desa
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Pemerintah Desa Bolali berkomitmen menjalankan tata kelola anggaran yang transparan, partisipatif, dan akuntabel demi kemakmuran seluruh masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          items={[{ label: 'Transparansi', href: '/transparansi' }]}
          className="mb-6"
        />

        {/* Realisasi Progress Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Donut & Realisasi */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-desa-green-800 uppercase tracking-wider">
                  Realisasi Anggaran TA {selectedTahun}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">[Data Dummy]</span>
              </div>

              <div className="flex items-center gap-5">
                {/* Visual Ring */}
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500"
                      strokeDasharray={`${persentase}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-900">{persentase}%</span>
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-desa-green-950">
                    {persentase}%
                  </div>
                  <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                    Penyerapan APBDes Semester Berjalan
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sesuai target rencana kerja tahunan</span>
            </div>
          </div>

          {/* Estimasi Pendapatan & Belanja */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                Estimasi Pendapatan Desa
              </span>
              <div className="text-2xl font-extrabold text-slate-900">
                {formatRupiah(1850000000)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Bersumber dari Dana Desa (DD), Alokasi Dana Desa (ADD), Pendapatan Asli Desa (PADes), dan Bagi Hasil Pajak.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-700 font-semibold">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Optimalisasi PADes & BUMDes</span>
            </div>
          </div>

          {/* Alokasi Belanja & Infrastruktur */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                Alokasi Belanja & Pembangunan
              </span>
              <div className="text-2xl font-extrabold text-slate-900">
                {formatRupiah(1707550000)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Diprioritaskan untuk pembangunan jalan tani, saluran irigasi, posyandu terpadu, dan pemberdayaan ekonomi warga.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
              <PieChart className="w-4 h-4 text-amber-600" />
              <span>Prioritas 4 Dusun Desa Bolali</span>
            </div>
          </div>
        </div>

        {/* Filter Bar (Tahun & Kategori) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Year Selector */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-desa-green-800" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1">
                Tahun Anggaran:
              </span>
              {daftarTahun.map((thn) => {
                const isActive = selectedTahun === thn
                return (
                  <Link
                    key={thn}
                    href={getFilterUrl(thn, selectedKategori)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-desa-green-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Tahun {thn}
                  </Link>
                )
              })}
            </div>

            {/* Category Selector */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {daftarKategori.map((kat) => {
                const isActive = selectedKategori === kat.value
                return (
                  <Link
                    key={kat.value}
                    href={getFilterUrl(selectedTahun, kat.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-desa-gold-500 text-desa-green-950 font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {kat.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Daftar Dokumen Transparansi Publik TA {selectedTahun}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Seluruh dokumen resmi dapat diunduh secara bebas dalam format PDF oleh masyarakat.
              </p>
            </div>
            <span className="text-xs font-semibold text-desa-green-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
              {dokumenList.length} Dokumen
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Nama Dokumen</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Tahun</th>
                  <th className="py-3.5 px-4 text-right">Nominal Anggaran</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dokumenList.length > 0 ? (
                  dokumenList.map((doc) => {
                    const fileUrl = getMediaUrl(doc.filePdf, '/docs/apbdes-2026.pdf')

                    return (
                      <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-desa-green-50 text-desa-green-900 flex items-center justify-center shrink-0 mt-0.5 border border-desa-green-100">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-slate-900">
                                {doc.judul}
                              </h3>
                              {doc.keterangan && (
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                  {doc.keterangan}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {doc.kategori}
                          </span>
                        </td>

                        <td className="py-4 px-4 font-mono font-semibold text-slate-700">
                          {doc.tahun}
                        </td>

                        <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                          {doc.nominalAnggaran ? formatRupiah(doc.nominalAnggaran) : '-'}
                        </td>

                        <td className="py-4 px-5 text-right">
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-desa-green-900 text-white text-xs font-semibold hover:bg-desa-green-950 transition-colors shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Unduh PDF</span>
                          </a>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 italic">
                      Tidak ada dokumen transparansi yang ditemukan untuk kriteria ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
