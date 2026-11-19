import React from 'react'
import Link from 'next/link'
import { FileText, Download, ArrowRight, BarChart3 } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { DokumenTransparansiItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface TransparansiCardProps {
  dokumenList: DokumenTransparansiItem[]
}

export function TransparansiCard({ dokumenList }: TransparansiCardProps) {
  // Ambil persentase dari item pertama atau fallback ke 92.3%
  const primaryDoc = dokumenList.find((d) => d.persentaseRealisasi) || dokumenList[0]
  const percentage = primaryDoc?.persentaseRealisasi ?? 92.3
  const circumference = 2 * Math.PI * 38 // Radius 38
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <SectionCard className="h-full flex flex-col justify-between rounded-desa-card border border-desa-border shadow-desa-sm bg-white p-5">
      <div>
        <SectionTitle
          title="Transparansi Desa"
          icon={<BarChart3 className="w-4 h-4 text-desa-accentGreen" />}
          linkText="Lihat Detail"
          linkHref="/transparansi"
        />

        {/* Donut Chart Realisasi APBDes Sesuai Mockup */}
        <div className="flex items-center gap-4 p-3 bg-desa-lightGreen/50 rounded-xl border border-emerald-100/80 mt-3">
          {/* Donut Chart Ringan SVG (Hijau Tua + Segmen Kuning) */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Lingkaran Dasar / Sisa (Aksen Kuning Emas) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#EAB308"
                strokeWidth="10"
                fill="transparent"
                opacity="0.35"
              />
              {/* Segmen Hijau Tua Realisasi */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#0B4625"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[11px] font-black text-desa-darkGreen">
                {String(percentage).replace('.', ',')}%
              </span>
            </div>
          </div>

          {/* Keterangan & Persen Besar di Kanan */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-700 leading-tight">
              Realisasi APBDes
            </div>
            <div className="text-xs font-bold text-desa-textDark">
              Tahun {primaryDoc?.tahun || 2026}
            </div>
            <div className="text-xl sm:text-2xl font-black text-desa-primaryGreen tracking-tight mt-0.5">
              {String(percentage).replace('.', ',')}%
            </div>
            <div className="mt-1.5">
              <Link
                href="/transparansi"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-desa-primaryGreen hover:bg-desa-greenHover px-3 py-1 rounded-full transition-colors shadow-xs"
              >
                <span>Lihat Laporan</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Baris Dokumen Unduhan (Ikon, Nama, "Download ↓") */}
        <div className="mt-3.5 space-y-2">
          {dokumenList.slice(0, 3).map((item) => {
            const pdfUrl = getMediaUrl(item.filePdf, '/docs/apbdes-2026.pdf')

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 hover:bg-desa-lightGreen/60 border border-desa-border transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <FileText className="w-4 h-4 text-desa-accentGreen shrink-0" />
                  <span className="text-xs font-semibold text-desa-textDark truncate group-hover:text-desa-darkGreen font-sans">
                    {item.judul}
                  </span>
                </div>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-desa-accentGreen hover:text-desa-darkGreen px-2 py-0.5 rounded transition-colors shrink-0"
                >
                  <span>Download</span>
                  <Download className="w-3 h-3" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </SectionCard>
  )
}
