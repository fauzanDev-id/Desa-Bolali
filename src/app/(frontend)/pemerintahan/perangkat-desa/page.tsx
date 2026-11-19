import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPerangkatDesaList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { Users, User, ShieldCheck, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Perangkat Desa | Pemerintah Desa Bolali',
  description: 'Daftar nama, foto, jabatan, dan profil aparatur Perangkat Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function PerangkatDesaPage() {
  const perangkatList = await getPerangkatDesaList()

  const getKategoriBadge = (kategori: string) => {
    switch (kategori) {
      case 'Kepala-Desa':
        return { label: 'Kepala Desa', cls: 'bg-desa-gold-100 text-desa-green-950 border-desa-gold-300' }
      case 'Sekretariat':
        return { label: 'Sekretariat Desa', cls: 'bg-blue-50 text-blue-800 border-blue-200' }
      case 'Teknis':
        return { label: 'Pelaksana Teknis (Kasi)', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
      case 'Kewilayahan':
        return { label: 'Pelaksana Kewilayahan (Kadus)', cls: 'bg-purple-50 text-purple-800 border-purple-200' }
      default:
        return { label: 'Aparatur', cls: 'bg-slate-100 text-slate-700 border-slate-200' }
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <Users className="w-4 h-4 text-desa-gold-500" />
          <span>Aparatur Pamong Desa</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-3">
          Jajaran Perangkat Desa Bolali
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Aparatur Pemerintah Desa Bolali bertugas menyelenggarakan urusan pemerintahan, pembangunan, pembinaan kemasyarakatan, serta pemberdayaan masyarakat desa secara profesional, transparan, dan berakhlak.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-desa-green-900 text-xs font-semibold border border-emerald-100">
          <CheckCircle2 className="w-3.5 h-3.5 text-desa-green-800" />
          <span>Total {perangkatList.length} Aparatur Aktif Bertugas</span>
        </div>
      </div>

      {/* Grid of Perangkat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {perangkatList.map((perangkat) => {
          const badge = getKategoriBadge(perangkat.kategoriJabatan)

          return (
            <div
              key={perangkat.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden hover:border-desa-green-300 hover:shadow-card-hover transition-all flex flex-col group"
            >
              {/* Photo Area */}
              <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-100 to-slate-200 overflow-hidden">
                {perangkat.foto ? (
                  <Image
                    src={getMediaUrl(perangkat.foto)}
                    alt={perangkat.nama}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <User className="w-16 h-16 stroke-1 text-slate-300" />
                    <span className="text-[11px] text-slate-400 mt-2 font-medium">Foto Resmi</span>
                  </div>
                )}

                {/* Status Indicator */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-desa-green-900 shadow-sm border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Aktif</span>
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-desa-green-900 transition-colors tracking-tight">
                    {perangkat.nama}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-desa-green-800 mt-0.5">
                    {perangkat.jabatan}
                  </p>
                </div>

                {/* NIAP / NIPD Info */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Nomor Induk (NIAP):</span>
                  <span className="font-mono font-medium text-slate-700">
                    {perangkat.niap || '-'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
