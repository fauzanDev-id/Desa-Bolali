import React from 'react'
import type { Metadata } from 'next'
import { getDusunList } from '@/lib/cms'
import { MapPin, Users, Home, Maximize2, ShieldCheck, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Wilayah & Dusun | Profil Desa Bolali',
  description: 'Daftar wilayah pedukuhan, kepala dusun, jumlah RT/RW, dan cakupan wilayah di Desa Bolali.',
}

export const revalidate = 60

export default async function WilayahDusunPage() {
  const dusunList = await getDusunList()

  const totalRT = dusunList.reduce((acc, curr) => acc + (curr.jumlahRT || 0), 0)
  const totalRW = dusunList.reduce((acc, curr) => acc + (curr.jumlahRW || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4 text-desa-gold-500" />
          <span>Pembagian Administratif</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-3">
          Wilayah Pedukuhan Desa Bolali
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Secara administratif, Pemerintah Desa Bolali terbagi menjadi 4 (empat) wilayah pedukuhan yang masing-masing dipimpin oleh seorang Kepala Dusun (Kadus) untuk membantu pelayanan dan koordinasi kemasyarakatan.
        </p>

        {/* Counter Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Dusun</span>
            <span className="text-xl sm:text-2xl font-extrabold text-desa-green-950">{dusunList.length}</span>
            <span className="text-[11px] text-slate-500 block">Pedukuhan</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rukun Warga</span>
            <span className="text-xl sm:text-2xl font-extrabold text-slate-900">{totalRW}</span>
            <span className="text-[11px] text-slate-500 block">RW Aktif</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Rukun Tetangga</span>
            <span className="text-xl sm:text-2xl font-extrabold text-desa-gold-600">{totalRT}</span>
            <span className="text-[11px] text-slate-500 block">RT Aktif</span>
          </div>
        </div>
      </div>

      {/* Grid of Dusun Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dusunList.map((dusun) => (
          <div
            key={dusun.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex flex-col justify-between hover:border-desa-green-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-desa-green-50 text-desa-green-900 text-xs font-bold border border-desa-green-100">
                  <Building2 className="w-3.5 h-3.5 text-desa-green-800" />
                  <span>Dusun #{dusun.urutan}</span>
                </div>
                {dusun.luasWilayah && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                    {dusun.luasWilayah}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-desa-green-950 mb-2">
                {dusun.nama}
              </h3>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Kepala Dusun (Kadus)
                </span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-desa-green-800 shrink-0" />
                  {dusun.kepalaDusun}
                </span>
              </div>

              {dusun.deskripsi && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {dusun.deskripsi}
                </p>
              )}
            </div>

            {/* RT & RW Badges */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-desa-gold-500" />
                <span>Jumlah RT: <strong className="text-slate-900">{dusun.jumlahRT} RT</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-desa-green-800" />
                <span>Jumlah RW: <strong className="text-slate-900">{dusun.jumlahRW} RW</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
