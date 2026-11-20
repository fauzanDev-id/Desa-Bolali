import React from 'react'
import Link from 'next/link'
import { FileText, Download, ArrowRight, BarChart3 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { DokumenTransparansiItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface TransparansiCardProps {
  dokumenList: DokumenTransparansiItem[]
}

export function TransparansiCard({ dokumenList }: TransparansiCardProps) {
  if (!dokumenList || dokumenList.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader
          title="Transparansi Desa"
          icon={<BarChart3 className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Detail"
          linkHref="/transparansi"
        />
        <EmptyState
          title="Belum Ada Dokumen"
          description="Publikasi laporan APBDes dan transparansi desa akan segera dimuat."
        />
      </Card>
    )
  }

  // Ambil persentase dari item pertama atau fallback ke 92.3%
  const primaryDoc = dokumenList.find((d) => d.persentaseRealisasi) || dokumenList[0]
  const percentage = primaryDoc?.persentaseRealisasi ?? 92.3
  const circumference = 2 * Math.PI * 38 // Radius 38
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <SectionHeader
          title="Transparansi Desa"
          icon={<BarChart3 className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Detail"
          linkHref="/transparansi"
        />

        {/* Donut Chart Realisasi APBDes Sesuai Mockup
            - Desktop (>=768px): Donut di kiri, keterangan & tombol di kanan
            - Mobile (<768px): Donut di atas terpusat, keterangan & tombol di bawahnya */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-5 py-2 mt-2 text-center sm:text-left">
          {/* Donut Chart SVG Ringan (Tengah Kosong Bersih Sesuai Mockup) */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Segmen Dasar / Kuning-Emas */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#EAB308"
                strokeWidth="11"
                fill="transparent"
              />
              {/* Segmen Hijau Realisasi Utama */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#10B981"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>

          {/* Keterangan & Persen Besar di Kanan (di Mobile di Bawah Donut) */}
          <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              Realisasi APBDes
            </div>
            <div className="text-xs font-bold text-slate-800 leading-tight">
              Tahun {primaryDoc?.tahun || 2026}
            </div>
            <div className="text-3xl font-black text-desa-darkGreen tracking-tight mt-0.5">
              {String(percentage).replace('.', ',')}%
            </div>
            <div className="mt-2">
              <Link
                href="/transparansi"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-desa-darkGreen hover:bg-desa-greenHover px-4 py-2 sm:py-1.5 rounded-full transition-colors shadow-desa-sm min-h-[44px] sm:min-h-0"
              >
                <span>Lihat Laporan</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Baris Dokumen Unduhan (Ikon, Nama Dokumen, "Download ↓") */}
        <div className="mt-4 space-y-1">
          {dokumenList.slice(0, 3).map((item) => {
            const pdfUrl = getMediaUrl(item.filePdf, '/docs/apbdes-2026.pdf')

            return (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 px-2 rounded-desa-sm hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 group min-h-[44px] gap-2"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
                  <span className="text-xs font-semibold text-desa-textDark truncate group-hover:text-desa-darkGreen font-sans">
                    {item.judul}
                  </span>
                </div>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors shrink-0 p-1"
                  aria-label={`Unduh ${item.judul}`}
                >
                  <span>Download</span>
                  <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
