import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sprout, ArrowRight, Quote } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { SambutanKadesData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface SambutanCardProps {
  sambutan: SambutanKadesData
}

export function SambutanCard({ sambutan }: SambutanCardProps) {
  const photoUrl = getMediaUrl(sambutan.foto, '/seed/kades.jpg')

  return (
    <SectionCard className="h-full flex flex-col justify-between rounded-desa-card border border-desa-border shadow-desa-sm bg-white p-5">
      <div>
        <SectionTitle
          title="Sambutan Kepala Desa"
          icon={<Sprout className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-3">
          {/* Pas Foto Resmi Kepala Desa (Potret, Sudut Membulat, Latar Merah/Bendera) */}
          <div className="relative w-28 h-40 sm:w-32 sm:h-44 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-red-600">
            <Image
              src={photoUrl}
              alt={sambutan.namaKepalaDesa || 'Kepala Desa Bolali'}
              fill
              sizes="128px"
              className="object-cover object-top"
            />
          </div>

          {/* Kutipan Miring & Nama Pejabat */}
          <div className="flex-1 flex flex-col justify-between text-center sm:text-left space-y-2.5">
            <div className="relative">
              <Quote className="w-5 h-5 text-emerald-200 rotate-180 mb-1 inline-block sm:block" />
              <p className="text-xs sm:text-sm font-sans italic text-desa-textDark leading-relaxed">
                {sambutan.kutipanSingkat ||
                  '“Mari kita bersama-sama membangun Desa Bolali menuju desa yang maju, mandiri dan sejahtera.”'}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-sm sm:text-base font-bold text-desa-textDark tracking-tight font-sans">
                {sambutan.namaKepalaDesa || 'H. Ahmad Santoso'}
              </h3>
              <p className="text-xs text-desa-accentGreen font-semibold mt-0.5">
                {sambutan.jabatan || 'Kepala Desa Bolali'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Hijau Selengkapnya */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
        <Link
          href="/profil/sejarah#sambutan-kades"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-desa-primaryGreen hover:bg-desa-greenHover text-white text-xs font-semibold shadow-sm transition-all group focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
        >
          <span>Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </SectionCard>
  )
}
