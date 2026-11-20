import React from 'react'
import type { Metadata } from 'next'
import { getDusunList } from '@/lib/cms'
import { Card, SectionHeader } from '@/components'
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
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header Ringkasan Kelembagaan Dusun */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Wilayah Pedukuhan Desa Bolali"
          subtitle="Pembagian administratif 4 dusun di bawah Pemerintah Desa Bolali"
          icon={<MapPin className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
          Secara administratif, Pemerintah Desa Bolali terbagi menjadi 4 (empat) wilayah pedukuhan yang masing-masing dipimpin oleh seorang Kepala Dusun (Kadus) untuk membantu kelancaran pelayanan dan koordinasi kemasyarakatan.
        </p>

        {/* Counter Ringkas 3 Kolom */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-desa-border">
          <div className="p-3 sm:p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-center">
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">Dusun</span>
            <span className="text-xl sm:text-2xl font-black text-desa-darkGreen font-sans">{dusunList.length}</span>
            <span className="text-[11px] text-desa-textMuted block font-medium">Pedukuhan</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-center">
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">Rukun Warga</span>
            <span className="text-xl sm:text-2xl font-black text-desa-textDark font-sans">{totalRW}</span>
            <span className="text-[11px] text-desa-textMuted block font-medium">RW Aktif</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-center">
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">Rukun Tetangga</span>
            <span className="text-xl sm:text-2xl font-black text-desa-primaryGreen font-sans">{totalRT}</span>
            <span className="text-[11px] text-desa-textMuted block font-medium">RT Aktif</span>
          </div>
        </div>
      </Card>

      {/* 2. KARTU PER DUSUN: Nama, Kepala Dusun, Jumlah KK/RT/RW Sesuai Spesifikasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {dusunList.map((dusun) => (
          <Card
            key={dusun.id}
            className="p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-desa-lightGreen text-desa-darkGreen text-xs font-bold border border-emerald-200">
                  <Building2 className="w-3.5 h-3.5 text-desa-accentGreen" strokeWidth={1.75} />
                  <span>Dusun #{dusun.urutan}</span>
                </div>
                {dusun.luasWilayah && (
                  <span className="text-xs font-semibold text-desa-textMuted flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.75} />
                    {dusun.luasWilayah}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-desa-textDark mb-2 font-sans">
                {dusun.nama}
              </h3>

              {/* Data Kepala Dusun */}
              <div className="p-3 rounded-desa-sm bg-slate-50 border border-desa-border mb-3.5">
                <span className="text-[10px] font-bold text-desa-textMuted uppercase tracking-wider block">
                  Kepala Dusun (Kadus)
                </span>
                <span className="text-xs sm:text-sm font-bold text-desa-darkGreen flex items-center gap-1.5 mt-0.5 font-sans">
                  <ShieldCheck className="w-4 h-4 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                  {dusun.kepalaDusun}
                </span>
              </div>

              {dusun.deskripsi && (
                <p className="text-xs sm:text-sm text-desa-textMuted leading-relaxed mb-4 font-sans">
                  {dusun.deskripsi}
                </p>
              )}
            </div>

            {/* Statistik KK / RT / RW per Dusun */}
            <div className="pt-3.5 border-t border-desa-border flex items-center justify-between text-xs font-semibold text-slate-700 font-sans">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-desa-sm bg-slate-100 border border-slate-200">
                  {dusun.jumlahRW} RW
                </span>
                <span className="px-2 py-0.5 rounded-desa-sm bg-slate-100 border border-slate-200">
                  {dusun.jumlahRT} RT
                </span>
              </div>
              <div className="flex items-center gap-1 text-desa-darkGreen font-bold">
                <Home className="w-3.5 h-3.5 text-desa-accentGreen" strokeWidth={1.75} />
                <span>{dusun.jumlahKK || 400} KK</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 3. Peta Wilayah Dusun Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Peta Sebaran Wilayah Dusun"
          subtitle="Peta skematis letak 4 pedukuhan di wilayah Desa Bolali"
          icon={<MapPin className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <div className="relative aspect-[16/9] w-full rounded-desa-card overflow-hidden border border-desa-border shadow-2xs bg-[#1a2d1d] flex items-center justify-center mt-4">
          <div className="absolute inset-0 bg-[radial-gradient(#2d4a2d_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* 4 Titik Dusun */}
          <div className="relative z-10 grid grid-cols-2 gap-8 sm:gap-14 p-6">
            <div className="flex flex-col items-center bg-white/95 px-3 py-1.5 rounded-desa-card shadow-xs border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mb-1" />
              <span className="text-xs font-bold text-desa-darkGreen font-sans">Dusun Bolali I</span>
              <span className="text-[10px] text-desa-textMuted">Bagian Utara</span>
            </div>

            <div className="flex flex-col items-center bg-white/95 px-3 py-1.5 rounded-desa-card shadow-xs border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mb-1" />
              <span className="text-xs font-bold text-desa-darkGreen font-sans">Dusun Bolali II</span>
              <span className="text-[10px] text-desa-textMuted">Bagian Timur</span>
            </div>

            <div className="flex flex-col items-center bg-white/95 px-3 py-1.5 rounded-desa-card shadow-xs border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mb-1" />
              <span className="text-xs font-bold text-desa-darkGreen font-sans">Dusun Tegalrejo</span>
              <span className="text-[10px] text-desa-textMuted">Bagian Selatan</span>
            </div>

            <div className="flex flex-col items-center bg-white/95 px-3 py-1.5 rounded-desa-card shadow-xs border border-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mb-1" />
              <span className="text-xs font-bold text-desa-darkGreen font-sans">Dusun Karanganyar</span>
              <span className="text-[10px] text-desa-textMuted">Bagian Barat</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
