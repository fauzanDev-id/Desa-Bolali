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
    <div className="relative -mt-10 z-30 max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8">
      {/* ========================================================
          1. TAMPILAN DESKTOP (>=1024px / lg & xl)
          Satu wadah pil terpadu: kiri putih, kanan hijau tua dengan aksen emas
         ======================================================== */}
      <div className="hidden lg:flex bg-white rounded-desa-pill shadow-desa-dropdown border border-slate-100 flex-row items-center justify-between overflow-hidden">
        {/* 4 Statistik Counter Grid (Dipisah Garis Vertikal Tipis) */}
        <div className="grid grid-cols-4 gap-4 flex-1 items-center divide-x divide-slate-100 px-6 xl:px-8 py-3.5">
          {/* 1. Penduduk */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {formatAngka(statistik.jumlahPenduduk)}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Penduduk
              </div>
            </div>
          </div>

          {/* 2. Kepala Keluarga */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {formatAngka(statistik.jumlahKK)}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Kepala Keluarga
              </div>
            </div>
          </div>

          {/* 3. Luas Wilayah */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Luas Wilayah
              </div>
            </div>
          </div>

          {/* 4. Dusun */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                {statistik.jumlahDusun || '4'}
              </div>
              <div className="text-[11px] text-desa-textMuted font-medium mt-1">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Blok Hijau Tua dengan Aksen Lengkung Emas (Desa Digital) */}
        <div className="relative bg-desa-darkGreen text-white px-7 py-3.5 xl:py-4 flex items-center gap-3.5 shrink-0 overflow-hidden pl-10">
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-desa-gold -skew-x-12 -translate-x-3 pointer-events-none" />
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <Sprout className="w-5 h-5 text-desa-gold" strokeWidth={1.75} />
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

      {/* ========================================================
          2. TAMPILAN TABLET (768px - 1023px / md)
          Bar 4 kolom lebih rapat, blok Desa Digital di bawah bar
         ======================================================== */}
      <div className="hidden md:flex lg:hidden flex-col gap-2.5">
        <div className="bg-white rounded-desa-pill shadow-desa-sm border border-slate-100 grid grid-cols-4 divide-x divide-slate-100 px-4 py-3 items-center">
          <div className="flex items-center gap-2 px-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark leading-none">
                {formatAngka(statistik.jumlahPenduduk)}
              </div>
              <div className="text-[10px] text-desa-textMuted mt-0.5">Penduduk</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark leading-none">
                {formatAngka(statistik.jumlahKK)}
              </div>
              <div className="text-[10px] text-desa-textMuted mt-0.5">KK</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark leading-none">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[10px] text-desa-textMuted mt-0.5">Luas</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark leading-none">
                {statistik.jumlahDusun || '4'}
              </div>
              <div className="text-[10px] text-desa-textMuted mt-0.5">Dusun</div>
            </div>
          </div>
        </div>

        {/* Blok Desa Digital Tablet */}
        <div className="bg-desa-darkGreen text-white rounded-desa-pill px-6 py-2.5 flex items-center justify-center gap-3 shadow-desa-sm">
          <Sprout className="w-4 h-4 text-desa-gold" strokeWidth={1.75} />
          <span className="text-xs font-bold">{statistik.statusDesaDigital || 'Desa Digital'}</span>
          <span className="text-emerald-300/40 text-xs">•</span>
          <span className="text-[11px] text-emerald-100/90">{statistik.taglineDesaDigital || 'Transparan, Partisipatif, dan Inovatif'}</span>
        </div>
      </div>

      {/* ========================================================
          3. TAMPILAN MOBILE (<768px)
          Grid 2x2 tanpa pil panjang, blok Desa Digital di bawahnya
         ======================================================== */}
      <div className="flex md:hidden flex-col gap-2.5">
        <div className="bg-white rounded-desa-card shadow-desa-sm border border-slate-100 grid grid-cols-2 gap-3 p-4">
          <div className="flex items-center gap-3 p-1">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-lg font-black text-desa-textDark leading-none">
                {formatAngka(statistik.jumlahPenduduk)}
              </div>
              <div className="text-xs text-desa-textMuted mt-1">Penduduk</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-lg font-black text-desa-textDark leading-none">
                {formatAngka(statistik.jumlahKK)}
              </div>
              <div className="text-xs text-desa-textMuted mt-1">Kepala Keluarga</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-lg font-black text-desa-textDark leading-none">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-xs text-desa-textMuted mt-1">Luas Wilayah</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-lg font-black text-desa-textDark leading-none">
                {statistik.jumlahDusun || '4'}
              </div>
              <div className="text-xs text-desa-textMuted mt-1">Dusun</div>
            </div>
          </div>
        </div>

        {/* Blok Desa Digital Mobile */}
        <div className="bg-desa-darkGreen text-white rounded-desa-card p-3.5 flex items-center gap-3 shadow-desa-sm">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Sprout className="w-4 h-4 text-desa-gold" strokeWidth={1.75} />
          </div>
          <div>
            <div className="text-xs font-bold">{statistik.statusDesaDigital || 'Desa Digital'}</div>
            <div className="text-[11px] text-emerald-100/80">{statistik.taglineDesaDigital || 'Transparan, Partisipatif, dan Inovatif'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
