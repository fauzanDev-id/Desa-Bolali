import React from 'react'
import { Users, Home, MapPin, Building2, Sparkles } from 'lucide-react'
import type { StatistikDesaData } from '@/lib/cms'

interface StatsBarProps {
  statistik: StatistikDesaData
}

export function StatsBar({ statistik }: StatsBarProps) {
  return (
    <div className="relative -mt-10 sm:-mt-12 lg:-mt-14 z-30 max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-float border border-slate-200/90 p-3 sm:p-4 lg:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Left: 4 Statistics Counters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 flex-1 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* 1. Penduduk */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-desa-green-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-desa-green-800" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {Number(statistik.jumlahPenduduk).toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Penduduk
              </div>
            </div>
          </div>

          {/* 2. Kepala Keluarga */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-desa-green-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-desa-green-800" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {Number(statistik.jumlahKK).toLocaleString('id-ID')}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Kepala Keluarga
              </div>
            </div>
          </div>

          {/* 3. Luas Wilayah */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-desa-green-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-desa-green-800" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {statistik.luasWilayah}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Luas Wilayah
              </div>
            </div>
          </div>

          {/* 4. Dusun */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-desa-green-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-desa-green-800" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                {statistik.jumlahDusun}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Right: Desa Digital Green Banner */}
        <div className="bg-gradient-to-r from-desa-green-800 via-desa-green-850 to-desa-green-950 text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shrink-0 border border-emerald-700/60 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Sparkles className="w-5 h-5 text-desa-gold-400" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>{statistik.statusDesaDigital}</span>
            </div>
            <div className="text-[11px] text-emerald-100/80 font-medium mt-0.5">
              {statistik.taglineDesaDigital}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
