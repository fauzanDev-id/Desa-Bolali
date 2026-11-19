import React from 'react'
import { Users, Home, MapPin, Building2, Sprout } from 'lucide-react'
import type { StatistikDesaData } from '@/lib/cms'

interface StatsBarProps {
  statistik: StatistikDesaData
}

export function StatsBar({ statistik }: StatsBarProps) {
  // Format angka ke locale id-ID
  const formatAngka = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val.replace(/\./g, '').replace(/,/g, '.')) : val
    return !isNaN(num) ? num.toLocaleString('id-ID') : val
  }

  return (
    <div className="relative -mt-10 sm:-mt-12 lg:-mt-14 z-30 max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Kartu Putih Berbentuk Pil dengan Sudut Membulat Menimpa Bawah Hero */}
      <div className="bg-white rounded-2xl lg:rounded-full shadow-desa-dropdown border border-desa-border p-2 sm:p-2.5 lg:p-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 overflow-hidden">
        {/* 4 Statistik Counter Grid (Dipisah Garis Vertikal Tipis) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 flex-1 items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100 px-2 sm:px-4 py-1">
          {/* 1. Penduduk */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-desa-lightGreen text-desa-accentGreen flex items-center justify-center shrink-0 border border-emerald-200">
              <Users className="w-5 h-5 text-desa-accentGreen" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {formatAngka(statistik.jumlahPenduduk)}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Penduduk
              </div>
            </div>
          </div>

          {/* 2. Kepala Keluarga */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-desa-lightGreen text-desa-accentGreen flex items-center justify-center shrink-0 border border-emerald-200">
              <Home className="w-5 h-5 text-desa-accentGreen" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {formatAngka(statistik.jumlahKK)}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Kepala Keluarga
              </div>
            </div>
          </div>

          {/* 3. Luas Wilayah */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-desa-lightGreen text-desa-accentGreen flex items-center justify-center shrink-0 border border-emerald-200">
              <MapPin className="w-5 h-5 text-desa-accentGreen" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Luas Wilayah
              </div>
            </div>
          </div>

          {/* 4. Dusun */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-desa-lightGreen text-desa-accentGreen flex items-center justify-center shrink-0 border border-emerald-200">
              <Building2 className="w-5 h-5 text-desa-accentGreen" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {statistik.jumlahDusun || '4'}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Blok Hijau Tua dengan Sudut Melengkung Diagonal (Desa Digital) */}
        <div className="relative bg-desa-darkGreen text-white rounded-xl lg:rounded-full px-5 py-3 sm:py-3.5 flex items-center gap-3.5 shrink-0 shadow-sm border border-emerald-800/80 overflow-hidden">
          {/* Aksen Lengkungan Halus di Latar Belakang */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-emerald-600/15 to-transparent pointer-events-none" />

          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Sprout className="w-5 h-5 text-desa-gold" />
          </div>
          <div className="relative z-10">
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              <span>{statistik.statusDesaDigital || 'Desa Digital'}</span>
            </div>
            <div className="text-[11px] text-emerald-100/90 font-medium mt-0.5">
              {statistik.taglineDesaDigital || 'Transparan, Partisipatif, dan Inovatif'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
