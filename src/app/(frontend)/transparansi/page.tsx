import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getDokumenTransparansiList } from '@/lib/cms'
import { getMediaUrl, formatRupiah } from '@/lib/utils'
import { PageHeader, Card, SectionHeader, EmptyState } from '@/components'
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  BarChart3,
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

  // Data APBDes Ringkasan
  const apbdes = {
    tahun: selectedTahun,
    pendapatan: 1850000000,
    belanja: 1785000000,
    realisasiPersen: 92.3,
    surplus: 65000000,
  }

  // Rincian Pos Anggaran untuk Tabel Ringkasan
  const posAnggaran = [
    { pos: 'Pendapatan Asli Desa (PADes)', anggaran: 180000000, realisasi: 172000000, persen: 95.5 },
    { pos: 'Dana Desa (APBN)', anggaran: 950000000, realisasi: 885000000, persen: 93.1 },
    { pos: 'Alokasi Dana Desa (ADD Kab. Klaten)', anggaran: 580000000, realisasi: 538000000, persen: 92.7 },
    { pos: 'Bagi Hasil Pajak & Retribusi Daerah', anggaran: 90000000, realisasi: 82000000, persen: 91.1 },
    { pos: 'Bantuan Keuangan Provinsi / Khusus', anggaran: 50000000, realisasi: 48000000, persen: 96.0 },
  ]

  const getTahunUrl = (th: number) => {
    const qParams = new URLSearchParams()
    qParams.set('tahun', th.toString())
    if (selectedKategori !== 'Semua') qParams.set('kategori', selectedKategori)
    return `/transparansi?${qParams.toString()}`
  }

  const getKategoriUrl = (kat: string) => {
    const qParams = new URLSearchParams()
    qParams.set('tahun', selectedTahun.toString())
    if (kat !== 'Semua') qParams.set('kategori', kat)
    return `/transparansi?${qParams.toString()}`
  }

  // Donut SVG circumference calculation
  const circumference = 2 * Math.PI * 44
  const strokeDashoffset = circumference - (apbdes.realisasiPersen / 100) * circumference

  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title={`Transparansi APBDes Tahun ${selectedTahun}`}
        subtitle="Akuntabilitas publik pengelolaan Anggaran Pendapatan dan Belanja Desa (APBDes) Bolali"
        badge="Keterbukaan Anggaran"
        badgeIcon={<BarChart3 className="w-3.5 h-3.5 text-desa-gold" strokeWidth={1.75} />}
        breadcrumbs={[{ label: 'Transparansi Desa', href: '/transparansi' }]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 space-y-6 sm:space-y-8">
        {/* Filter Tahun & Kategori Dokumen */}
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-desa-border">
            <SectionHeader
              title="Laporan Pertanggungjawaban Keuangan"
              subtitle="Pilih tahun anggaran dan jenis laporan yang ingin Anda unduh"
              icon={<BarChart3 className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
              className="mb-0"
            />

            {/* Pilihan Tahun Anggaran */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <span className="text-xs font-bold text-desa-textMuted uppercase tracking-wider mr-1">Tahun:</span>
              {daftarTahun.map((th) => (
                <Link
                  key={th}
                  href={getTahunUrl(th)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[36px] flex items-center ${
                    selectedTahun === th
                      ? 'bg-desa-darkGreen text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {th}
                </Link>
              ))}
            </div>
          </div>

          {/* Tab Filter Kategori */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
            {daftarKategori.map((kat) => {
              const isActive = selectedKategori === kat.value

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

        {/* 3. RINGKASAN REALISASI APBDES (DONUT + TABEL) Sesuai Spesifikasi */}
        <Card className="p-6 sm:p-8">
          <SectionHeader
            title={`Ringkasan Realisasi APBDes Tahun Anggaran ${selectedTahun}`}
            icon={<TrendingUp className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-6">
            {/* Donut Chart SVG Bersih Sesuai Gaya Beranda */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-desa-card border border-desa-border text-center">
              <div className="relative w-36 h-36 flex items-center justify-center mb-3">
                <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" stroke="#EAB308" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    stroke="#10B981"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Tengah Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-desa-darkGreen tracking-tight font-sans">
                    {String(apbdes.realisasiPersen).replace('.', ',')}%
                  </span>
                  <span className="text-[10px] font-bold text-desa-textMuted uppercase">Tercapai</span>
                </div>
              </div>

              <span className="text-xs font-bold text-desa-textDark font-sans">
                Tingkat Realisasi Pelaksanaan APBDes
              </span>
              <span className="text-[11px] text-desa-textMuted mt-0.5">
                Target tercapai secara tertib administrasi
              </span>
            </div>

            {/* Tabel Dua Kolom Ringkasan Realisasi Sesuai Spesifikasi */}
            <div className="lg:col-span-8 overflow-x-auto">
              <table className="w-full border-collapse border border-desa-border rounded-desa-sm text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="bg-slate-50 border-b border-desa-border text-desa-textDark">
                    <th className="py-2.5 px-3 text-left font-bold">Pos Pendapatan Desa</th>
                    <th className="py-2.5 px-3 text-right font-bold">Anggaran (Rp)</th>
                    <th className="py-2.5 px-3 text-right font-bold">Realisasi (Rp)</th>
                    <th className="py-2.5 px-3 text-right font-bold">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-desa-border">
                  {posAnggaran.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="py-2.5 px-3 font-medium text-slate-800">{item.pos}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                        {formatRupiah(item.anggaran)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-desa-textDark">
                        {formatRupiah(item.realisasi)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-desa-primaryGreen">
                        {item.persen}%
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-50/70 font-bold border-t-2 border-desa-border">
                    <td className="py-2.5 px-3 text-desa-darkGreen">Total Pendapatan Desa</td>
                    <td className="py-2.5 px-3 text-right font-mono text-desa-darkGreen">
                      {formatRupiah(apbdes.pendapatan)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-desa-darkGreen">
                      {formatRupiah(apbdes.belanja)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-desa-darkGreen">92,3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* 4. TABEL / DAFTAR DOKUMEN PER TAHUN DENGAN TOMBOL DOWNLOAD + UKURAN FILE Sesuai Spesifikasi */}
        <Card className="p-6 sm:p-8">
          <SectionHeader
            title="Daftar Dokumen Resmi yang Dapat Diunduh Warga"
            subtitle="Seluruh berkas tersedia dalam format PDF resmi dengan legalitas Pemerintah Desa Bolali"
            icon={<FileText className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          />

          {dokumenList.length > 0 ? (
            <div className="mt-5 space-y-2.5">
              {dokumenList.map((doc, idx) => {
                const pdfUrl = getMediaUrl(doc.filePdf, '/seed/apbdes-2026.pdf')
                const fileSize = doc.ukuranFile || '2,4 MB'

                return (
                  <div
                    key={doc.id}
                    className="p-3.5 sm:p-4 rounded-desa-sm bg-slate-50 border border-desa-border hover:bg-emerald-50/20 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-h-[44px]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-desa-sm bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-emerald-700" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-desa-textDark truncate font-sans">
                          {doc.judul}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-desa-textMuted mt-0.5">
                          <span>Kategori: {doc.kategori}</span>
                          <span>•</span>
                          <span>Tahun {doc.tahun}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tombol Download dengan Ukuran File Sesuai Spesifikasi */}
                    <div className="shrink-0 self-end sm:self-auto">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-desa-darkGreen hover:bg-desa-greenHover text-white text-xs font-semibold shadow-2xs transition-colors min-h-[44px]"
                        aria-label={`Unduh ${doc.judul} format PDF ukuran ${fileSize}`}
                      >
                        <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Download (PDF • {fileSize})</span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              title="Belum Ada Dokumen"
              description="Dokumen laporan keuangan pada tahun dan kategori yang dipilih belum dipublikasikan."
            />
          )}
        </Card>
      </div>
    </div>
  )
}
