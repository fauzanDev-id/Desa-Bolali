import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPerangkatDesaList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { Card, SectionHeader } from '@/components'
import { Users, User, CheckCircle } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Perangkat Desa | Pemerintah Desa Bolali',
  description: 'Daftar nama, foto, jabatan, dan profil aparatur Perangkat Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function PerangkatDesaPage() {
  const perangkatList = await getPerangkatDesaList()

  const cleanName = (name: string) => name.replace(/\s*\[Data Dummy\]/gi, '')

  const getKategoriBadge = (kategori: string) => {
    switch (kategori) {
      case 'Kepala-Desa':
        return { label: 'Kepala Desa', cls: 'bg-desa-goldLight text-desa-goldHover border-desa-gold/40' }
      case 'Sekretariat':
        return { label: 'Sekretariat Desa', cls: 'bg-blue-50 text-blue-800 border-blue-200' }
      case 'Teknis':
        return { label: 'Pelaksana Teknis (Kasi)', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
      case 'Kewilayahan':
        return { label: 'Pelaksana Kewilayahan (Kadus)', cls: 'bg-amber-50 text-amber-800 border-amber-200' }
      default:
        return { label: 'Aparatur', cls: 'bg-slate-100 text-slate-700 border-slate-200' }
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Info Banner */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Jajaran Aparatur Pamong Desa Bolali"
          subtitle="Aparatur pelaksana urusan pemerintahan, pembangunan, dan kemasyarakatan"
          icon={<Users className="w-4 h-4 text-desa-accentGreen" />}
        />

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
          Aparatur Pemerintah Desa Bolali bertugas menyelenggarakan tata kelola pemerintahan desa, pelaksanaan pembangunan fisik, pembinaan kemasyarakatan, serta pemberdayaan masyarakat secara profesional, transparan, dan berakhlak.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desa-lightGreen text-desa-darkGreen text-xs font-semibold border border-emerald-200">
          <CheckCircle className="w-3.5 h-3.5 text-desa-accentGreen" />
          <span>Total {perangkatList.length} Aparatur Aktif Bertugas</span>
        </div>
      </Card>

      {/* GRID KARTU APARATUR: 4 Kolom Desktop, 2 Kolom Mobile, Foto Rasio 4:5 Sesuai Spesifikasi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
        {perangkatList.map((perangkat) => {
          const badge = getKategoriBadge(perangkat.kategoriJabatan)
          const namaBersih = cleanName(perangkat.nama)

          return (
            <Card
              key={perangkat.id}
              className="overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-all p-0 group"
            >
              {/* Foto Rasio 4:5 Sesuai Spesifikasi (Siluet Netral jika Kosong) */}
              <div className="relative w-full aspect-[4/5] bg-slate-100 border-b border-desa-border overflow-hidden">
                {perangkat.foto ? (
                  <Image
                    src={getMediaUrl(perangkat.foto)}
                    alt={namaBersih}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                    <User className="w-14 h-14 text-slate-300" />
                    <span className="text-[10px] text-slate-400 mt-1 font-medium font-sans">Foto Resmi</span>
                  </div>
                )}

                {/* Badge Status Aktif */}
                <div className="absolute top-2 right-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-desa-darkGreen shadow-2xs border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Aktif</span>
                  </span>
                </div>
              </div>

              {/* Rincian Nama & Jabatan */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded-desa-sm text-[9px] sm:text-[10px] font-bold border uppercase tracking-wider mb-1.5 ${badge.cls}`}>
                    {badge.label}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-desa-textDark tracking-tight line-clamp-2 leading-snug font-sans group-hover:text-desa-primaryGreen transition-colors">
                    {namaBersih}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-desa-textMuted font-medium mt-0.5 line-clamp-1 font-sans">
                    {perangkat.jabatan}
                  </p>
                </div>

                {perangkat.niap && (
                  <div className="pt-2 mt-2 border-t border-slate-100 text-[10px] text-desa-textMuted font-sans">
                    NIAP: {perangkat.niap}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
