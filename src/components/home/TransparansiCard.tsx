import React from 'react'
import Link from 'next/link'
import { FileText, Download, ArrowRight, CheckCircle2 } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { DokumenTransparansiItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface TransparansiCardProps {
  dokumenList: DokumenTransparansiItem[]
}

export function TransparansiCard({ dokumenList }: TransparansiCardProps) {
  // Ambil persentase dari item pertama atau fallback ke 92.3
  const primaryDoc = dokumenList.find((d) => d.persentaseRealisasi) || dokumenList[0]
  const percentage = primaryDoc?.persentaseRealisasi ?? 92.3
  const circumference = 2 * Math.PI * 40 // Radius 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <SectionCard className="h-full flex flex-col justify-between">
      <div>
        <SectionTitle
          title="Transparansi Desa"
          icon={<CheckCircle2 className="w-4 h-4 text-desa-green-800" />}
          linkText="Lihat Detail"
          linkHref="/transparansi"
        />

        {/* Circular Donut Progress Chart & Summary */}
        <div className="flex items-center gap-4 p-3.5 bg-desa-green-50/60 rounded-xl border border-desa-green-100 mt-3">
          {/* Circular SVG Donut */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#E2E8F0"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress ring in Emerald Green */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#15803D"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-black text-slate-800">{percentage}%</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-900 leading-snug">
              Realisasi APBDes <br />
              <span className="text-desa-green-800 font-extrabold text-sm">
                Tahun {primaryDoc?.tahun || 2026}
              </span>
            </h4>
            <div className="text-base font-black text-desa-green-800 tracking-tight">
              {percentage}%
            </div>
            <div>
              <Link
                href="/transparansi"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-desa-green-900 hover:bg-desa-green-800 px-3 py-1 rounded-md transition-colors shadow-sm"
              >
                <span>Lihat Laporan</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* List of 3 Downloadable Documents */}
        <div className="mt-4 space-y-2">
          {dokumenList.slice(0, 3).map((item) => {
            const pdfUrl = getMediaUrl(item.filePdf, '/docs/dokumen-apbdes.pdf')

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-desa-green-50/70 border border-slate-200/80 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <FileText className="w-4 h-4 text-desa-green-800 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-desa-green-950">
                    {item.judul}
                  </span>
                </div>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-desa-green-800 hover:text-desa-green-950 px-2 py-0.5 rounded hover:bg-desa-green-100 transition-colors shrink-0"
                >
                  <span>Download</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </SectionCard>
  )
}
