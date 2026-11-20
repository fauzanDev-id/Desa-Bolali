import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sprout, ArrowRight, Quote } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import type { SambutanKadesData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface SambutanCardProps {
  sambutan: SambutanKadesData
}

export function SambutanCard({ sambutan }: SambutanCardProps) {
  if (!sambutan || !sambutan.namaKepalaDesa) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <SectionHeader
          title="Sambutan Kepala Desa"
          icon={<Sprout className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />
        <EmptyState
          title="Sambutan Belum Tersedia"
          description="Sambutan resmi Kepala Desa Bolali sedang dalam proses penyusunan."
        />
      </Card>
    )
  }

  const photoUrl = getMediaUrl(sambutan.foto, '/seed/kades.jpg')
  // Bersihkan label [Data Dummy] jika ada agar tampilan resmi dan bersih sesuai mockup
  const cleanKadesName = (sambutan.namaKepalaDesa || 'H. Ahmad Santoso').replace(/\s*\[Data Dummy\]/gi, '')

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <SectionHeader
          title="Sambutan Kepala Desa"
          icon={<Sprout className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        {/* Tata Letak Responsif: Mobile Foto di Atas, Tablet/Desktop Foto di Sisi Kiri */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-2">
          {/* Pas Foto Resmi Kepala Desa (Potret PDU Putih dengan Garuda & Latar Merah Putih) */}
          <div className="relative w-32 h-40 sm:w-28 sm:h-36 md:w-32 md:h-40 rounded-desa-card overflow-hidden shadow-xs shrink-0 border border-slate-200 bg-red-600">
            <Image
              src={photoUrl}
              alt={cleanKadesName}
              fill
              sizes="(max-width: 640px) 128px, 140px"
              className="object-cover object-top"
            />
          </div>

          {/* Kutipan Miring & Nama Pejabat */}
          <div className="flex-1 flex flex-col justify-between text-center sm:text-left space-y-2 w-full">
            <div className="relative">
              <Quote className="w-5 h-5 text-emerald-300 rotate-180 mb-1 inline-block sm:block" strokeWidth={1.75} />
              <p className="text-xs sm:text-[13px] font-sans italic text-desa-textDark leading-relaxed">
                {sambutan.kutipanSingkat ||
                  '“Mari kita bersama-sama membangun Desa Bolali menuju desa yang maju, mandiri dan sejahtera.”'}
              </p>
            </div>

            <div className="pt-2">
              <h3 className="text-sm sm:text-base font-bold text-desa-textDark tracking-tight font-sans">
                {cleanKadesName}
              </h3>
              <p className="text-xs text-desa-textMuted font-medium mt-0.5">
                {sambutan.jabatan || 'Kepala Desa Bolali'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Hijau Selengkapnya Sesuai Mockup (Bentuk Pil Hijau Tua) */}
      <div className="mt-4 pt-3 flex justify-end">
        <Link
          href="/profil/sejarah#sambutan-kades"
          className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-full bg-desa-darkGreen hover:bg-desa-greenHover text-white text-xs font-semibold shadow-desa-sm transition-all group focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen min-h-[44px] sm:min-h-[36px]"
        >
          <span>Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </Link>
      </div>
    </Card>
  )
}
