'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { FileText, DownloadSimple, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { DokumenTransparansiItem } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface TransparansiCardProps {
  dokumenList: DokumenTransparansiItem[]
}

export function TransparansiCard({ dokumenList }: TransparansiCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Ambil persentase realisasi APBDes (default 92.3%)
  const primaryDoc =
    dokumenList && dokumenList.length > 0
      ? dokumenList.find((d) => d.persentaseRealisasi) || dokumenList[0]
      : null

  const percentage = primaryDoc?.persentaseRealisasi ?? 92.3
  const radius = 40
  const circumference = 2 * Math.PI * radius // ~251.32

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true)
      return
    }

    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (!dokumenList || dokumenList.length === 0) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader
          title="Transparansi Desa"
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

  // Animasi menggambar cincin hijau dari 0 ke 92.3%
  const targetOffset = circumference - (percentage / 100) * circumference
  const currentOffset = isVisible ? targetOffset : circumference

  return (
    <Card ref={containerRef} className="h-full flex flex-col justify-between">
      <div className="flex flex-col h-full justify-between">
        <SectionHeader
          title="Transparansi Desa"
          linkText="Lihat Detail"
          linkHref="/transparansi"
        />

        {/* Donut Chart Cincin Tebal (±18% diameter, ~105px, hijau #1E7F3A 92,3%, sisa kuning #F2C230) */}
        <div className="flex items-center gap-3.5 mt-1">
          {/* Donut Chart SVG */}
          <div className="relative w-[105px] h-[105px] shrink-0 flex items-center justify-center">
            <svg className="w-[105px] h-[105px] -rotate-90 transform" viewBox="0 0 105 105">
              {/* Segmen Dasar / Kuning-Emas #F2C230 untuk sisa 7,7% */}
              <circle
                cx="52.5"
                cy="52.5"
                r={radius}
                stroke="#F2C230"
                strokeWidth="19"
                fill="transparent"
              />
              {/* Segmen Realisasi Utama Hijau Tua #1E7F3A 92,3% */}
              <circle
                cx="52.5"
                cy="52.5"
                r={radius}
                stroke="#1E7F3A"
                strokeWidth="19"
                strokeDasharray={circumference}
                strokeDashoffset={currentOffset}
                strokeLinecap="butt"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="motion-reduce:transition-none"
              />
            </svg>
          </div>

          {/* Teks Keterangan di Kanan Donut */}
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-slate-800 leading-tight">
              Realisasi APBDes
            </div>
            <div className="text-[14px] font-semibold text-slate-800 leading-tight">
              Tahun {primaryDoc?.tahun || 2026}
            </div>
            <div className="text-[28px] sm:text-[30px] font-extrabold text-[#1E7F3A] leading-tight my-0.5 tracking-tight font-sans">
              {String(percentage).replace('.', ',')}%
            </div>
            <div className="mt-1">
              <Link
                href="/transparansi"
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E7F3A] hover:bg-[#17632e] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Lihat Laporan</span>
                <ArrowRight
                  size={12}
                  weight="bold"
                  className="text-white transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Garis Pembatas Tipis Antara Donut dan Dokumen */}
        <hr className="my-2.5 border-slate-100" />

        {/* 3 Baris Dokumen dengan Ikon Dokumen SOLID Hijau, Nama 14px/500, Download ⤓ 13px/600 */}
        <div className="space-y-1">
          {dokumenList.slice(0, 3).map((dok) => {
            const fileUrl = getMediaUrl(dok.filePdf, '/seed/docs/apbdes-2026.pdf')
            return (
              <div
                key={dok.id}
                className="flex items-center justify-between py-1.5 px-1.5 rounded hover:bg-slate-50 transition-colors gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText size={18} weight="fill" className="text-[#1E7F3A] shrink-0" />
                  <span className="text-[13.5px] font-medium text-slate-800 truncate" title={dok.judul}>
                    {dok.judul}
                  </span>
                </div>
                <a
                  href={fileUrl}
                  download
                  aria-label={`Unduh berkas ${dok.judul}`}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1E7F3A] hover:text-[#17632e] transition-colors shrink-0 ml-1 py-0.5 px-1"
                >
                  <span>Download</span>
                  <DownloadSimple size={13} weight="bold" />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
