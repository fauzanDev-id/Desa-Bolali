'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { SambutanKadesData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { getBlurDataUrl } from '@/lib/blur'

interface SambutanCardProps {
  sambutan: SambutanKadesData
}

export function SambutanCard({ sambutan }: SambutanCardProps) {
  if (!sambutan || !sambutan.namaKepalaDesa) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader title="Sambutan Kepala Desa" />
        <EmptyState
          title="Sambutan Belum Tersedia"
          description="Sambutan resmi Kepala Desa Bolali sedang dalam proses penyusunan."
        />
      </Card>
    )
  }

  // Gunakan kades-placeholder.webp (siluet abu netral, latar bendera merah putih, tanda GANTI FOTO ASLI)
  const photoUrl = getMediaUrl(sambutan.foto, '/seed/kades-placeholder.webp')
  const blurUrl = getBlurDataUrl(photoUrl)
  const cleanKadesName = (sambutan.namaKepalaDesa || 'H. Ahmad Santoso').replace(/\s*\[Data Dummy\]/gi, '')

  const rawQuote =
    sambutan.kutipanSingkat ||
    'Mari kita bersama-sama membangun Desa Bolali menuju desa yang maju, mandiri dan sejahtera.'
  const cleanQuote =
    rawQuote.startsWith('“') || rawQuote.startsWith('"') ? rawQuote : `“${rawQuote}”`

  return (
    <Card className="h-full flex flex-col justify-between">
      <div className="flex flex-col h-full justify-between">
        <SectionHeader title="Sambutan Kepala Desa" />

        {/* Layout Berdampingan: Foto Potret di Kiri (±40% lebar, rasio 3:4, radius 10px), Teks di Kanan */}
        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3.5 sm:gap-4 mt-1 flex-1">
          {/* Foto Potret Resmi Kepala Desa */}
          <div className="relative w-36 sm:w-[40%] aspect-[3/4] rounded-[10px] overflow-hidden shadow-xs shrink-0 border border-slate-200 bg-slate-100">
            <Image
              src={photoUrl}
              alt={cleanKadesName}
              fill
              placeholder={blurUrl ? 'blur' : 'empty'}
              blurDataURL={blurUrl}
              sizes="(max-width: 640px) 144px, 160px"
              className="object-cover object-top"
            />
          </div>

          {/* Kutipan Miring 15px & Identitas Pejabat */}
          <div className="flex-1 flex flex-col justify-between text-left min-w-0 pl-0.5">
            {/* Kutipan Tipografis Biasa Miring 14-15px Tanpa Ikon Kutip Besar */}
            <p className="text-[13.5px] sm:text-[14.5px] font-sans italic text-slate-700 leading-relaxed">
              {cleanQuote}
            </p>

            <div className="mt-2.5 pt-1">
              <h3 className="text-[14px] font-bold text-slate-900 leading-snug font-sans">
                {cleanKadesName}
              </h3>
              <p className="text-[13px] text-slate-500 font-normal mt-0.5">
                {sambutan.jabatan || 'Kepala Desa Bolali'}
              </p>

              {/* Tombol Hijau Selengkapnya di Kanan Bawah Sesuai Mockup */}
              <div className="mt-2 flex justify-end">
                <Link
                  href="/profil/sejarah#sambutan-kades"
                  className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1E7F3A] hover:bg-[#17632e] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight
                    size={12}
                    weight="bold"
                    className="text-white transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
