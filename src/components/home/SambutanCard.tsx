import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, ArrowRight, Quote } from 'lucide-react'
import { SectionCard } from '@/components/ui/SectionCard'
import { SectionTitle } from '@/components/ui/SectionTitle'
import type { SambutanKadesData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface SambutanCardProps {
  sambutan: SambutanKadesData
}

export function SambutanCard({ sambutan }: SambutanCardProps) {
  const photoUrl = getMediaUrl(sambutan.foto, '/images/kades.jpg')

  return (
    <SectionCard className="h-full flex flex-col justify-between">
      <div>
        <SectionTitle
          title="Sambutan Kepala Desa"
          icon={<Shield className="w-4 h-4 text-desa-green-800" />}
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-4">
          {/* Pas Foto Resmi Kepala Desa (Seragam PDU Putih, Latar Merah) */}
          <div className="relative w-32 h-44 sm:w-36 sm:h-48 rounded-xl overflow-hidden shadow-md shrink-0 border-2 border-slate-200 bg-red-600">
            <Image
              src={photoUrl}
              alt={sambutan.namaKepalaDesa}
              fill
              sizes="144px"
              className="object-cover object-top"
            />
          </div>

          {/* Quote & Nama Pejabat */}
          <div className="flex-1 flex flex-col justify-between text-center sm:text-left space-y-3">
            <div className="relative">
              <Quote className="w-6 h-6 text-emerald-200 rotate-180 mb-1 inline-block sm:block" />
              <p className="text-sm sm:text-base font-serif italic text-slate-800 leading-relaxed">
                {sambutan.kutipanSingkat}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                {sambutan.namaKepalaDesa}
              </h3>
              <p className="text-xs text-desa-green-800 font-semibold mt-0.5">
                {sambutan.jabatan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
        <Link
          href="/profil#sambutan-kades"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-desa-green-900 hover:bg-desa-green-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all group"
        >
          <span>Selengkapnya</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </SectionCard>
  )
}
