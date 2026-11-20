'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Ambil persentase dari item pertama atau fallback ke 92.3%
  const primaryDoc = dokumenList && dokumenList.length > 0
    ? (dokumenList.find((d) => d.persentaseRealisasi) || dokumenList[0])
    : null

  const percentage = primaryDoc?.persentaseRealisasi ?? 92.3
  const radius = 38
  const circumference = 2 * Math.PI * radius // ~238.76

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
      <Card className="h-full flex flex-col justify-between card-hover-lift">
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

  // Animasi garis menggambar dari 0 ke 92.3% saat terlihat (1 detik)
  const targetOffset = circumference - (percentage / 100) * circumference
  const currentOffset = isVisible ? targetOffset : circumference

  return (
    <Card ref={containerRef} className="h-full flex flex-col justify-between card-hover-lift">
      <div>
        <SectionHeader
          title="Transparansi Desa"
          icon={<BarChart3 className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
          linkText="Lihat Detail"
          linkHref="/transparansi"
        />

        {/* Donut Chart Realisasi APBDes Sesuai Mockup */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-5 py-2 mt-2 text-center sm:text-left">
          {/* Donut Chart SVG Ringan */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
              {/* Segmen Dasar / Kuning-Emas */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#EAB308"
                strokeWidth="11"
                fill="transparent"
              />
              {/* Segmen Hijau Realisasi Utama (Menggambar dari 0 ke 92,3% dalam 1s) */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#10B981"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={currentOffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="motion-reduce:transition-none"
              />
            </svg>
          </div>

          {/* Keterangan & Persen Besar di Kanan */}
          <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              Realisasi APBDes
            </div>
            <div className="text-xs font-bold text-slate-800 leading-tight">
              Tahun {primaryDoc?.tahun || 2026}
            </div>
            <div className="text-3xl font-black text-desa-darkGreen tracking-tight mt-0.5 font-sans">
              {String(percentage).replace('.', ',')}%
            </div>
            <div className="mt-2">
              <Link
                href="/transparansi"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-desa-darkGreen hover:bg-desa-greenHover px-4 py-2 sm:py-1.5 rounded-full transition-colors duration-150 shadow-desa-sm min-h-[44px] sm:min-h-0"
              >
                <span>Lihat Laporan</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        </div>

        {/* Garis Pembatas Tipis Antara Donut dan Daftar Dokumen */}
        <hr className="my-3.5 border-desa-border" />

        {/* 3 Berkas Dokumen APBDes */}
        <div className="space-y-1 sm:space-y-1.5">
          {dokumenList.slice(0, 3).map((dok) => {
            const fileUrl = getMediaUrl(dok.filePdf, '/seed/docs/apbdes-2026.pdf')
            return (
              <div
                key={dok.id}
                className="flex items-center justify-between py-1 px-1 hover:bg-slate-50/80 rounded-desa-sm transition-colors duration-150 gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-4 h-4 rounded-desa-sm bg-emerald-50 text-desa-accentGreen flex items-center justify-center shrink-0">
                    <FileText className="w-3 h-3" strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-medium text-slate-800 truncate" title={dok.judul}>
                    {dok.judul}
                  </span>
                </div>
                <a
                  href={fileUrl}
                  download
                  aria-label={`Unduh berkas ${dok.judul}`}
                  className="flex items-center gap-1 text-[11px] font-semibold text-desa-darkGreen hover:text-desa-greenHover transition-colors duration-150 shrink-0 ml-1 py-1 px-1.5"
                >
                  <span className="hidden sm:inline">Download</span>
                  <Download className="w-3 h-3" strokeWidth={1.75} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
