'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Users, Home, MapPin, Building2, Sprout } from 'lucide-react'
import type { StatistikDesaData } from '@/lib/cms'

interface StatsBarProps {
  statistik: StatistikDesaData
}

/**
 * Helper AnimatedCounter:
 * Angka menghitung naik dari 0 sekali saat terlihat (1,2 detik, ease-out), format id-ID
 * Menghormati prefers-reduced-motion
 */
function AnimatedCounter({
  value,
  duration = 1200,
}: {
  value: string | number
  duration?: number
}) {
  const numericString = typeof value === 'string' ? value.replace(/\./g, '').replace(/,/g, '.') : String(value)
  const target = parseFloat(numericString)
  const isNumeric = !isNaN(target)

  const [current, setCurrent] = useState<number>(isNumeric ? target : 0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isNumeric) return

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setCurrent(target)
      setHasStarted(true)
      return
    }

    const node = ref.current
    if (!node || hasStarted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          observer.unobserve(node)

          // Mulai animasi hitung naik dari 0 saat elemen terlihat
          setCurrent(0)
          const startTime = performance.now()
          const frame = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out cubic: 1 - (1 - t)^3
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const val = Math.round(target * easeOut)
            setCurrent(val)

            if (progress < 1) {
              requestAnimationFrame(frame)
            } else {
              setCurrent(target)
            }
          }
          requestAnimationFrame(frame)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration, hasStarted, isNumeric])

  if (!isNumeric) {
    return <span>{value}</span>
  }

  return (
    <span ref={ref}>
      {current.toLocaleString('id-ID')}
    </span>
  )
}

export function StatsBar({ statistik }: StatsBarProps) {
  return (
    <div className="relative -mt-10 z-30 max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8">
      {/* ========================================================
          1. TAMPILAN DESKTOP (>=1024px / lg & xl)
          Satu wadah pil terpadu: kiri putih, kanan hijau tua dengan aksen emas
         ======================================================== */}
      <div className="card-hover-lift hidden lg:flex bg-white rounded-desa-pill shadow-desa-dropdown border border-slate-100 flex-row items-center justify-between overflow-hidden">
        {/* 4 Statistik Counter Grid (Dipisah Garis Vertikal Tipis) */}
        <div className="grid grid-cols-4 gap-4 flex-1 items-center divide-x divide-slate-100 px-6 xl:px-8 py-3.5">
          {/* 1. Penduduk */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-xl font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahPenduduk} />
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
                <AnimatedCounter value={statistik.jumlahKK} />
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
                <AnimatedCounter value={statistik.jumlahDusun || 4} />
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
         ======================================================== */}
      <div className="hidden md:flex lg:hidden flex-col gap-3">
        <div className="card-hover-lift bg-white rounded-desa-pill shadow-desa-dropdown border border-slate-100 grid grid-cols-4 divide-x divide-slate-100 px-4 py-3 items-center">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahPenduduk} />
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Penduduk
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahKK} />
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Kepala Keluarga
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Luas Wilayah
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahDusun || 4} />
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Blok Desa Digital di Bawah Bar */}
        <div className="card-hover-lift bg-desa-darkGreen text-white px-5 py-2.5 rounded-desa-pill flex items-center justify-between shadow-desa-sm border border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Sprout className="w-4 h-4 text-desa-gold" strokeWidth={1.75} />
            </div>
            <div className="text-xs font-bold tracking-tight text-white font-sans">
              {statistik.statusDesaDigital || 'Desa Digital'}
            </div>
          </div>
          <div className="text-[11px] text-emerald-100/90 font-medium">
            {statistik.taglineDesaDigital || 'Transparan, Partisipatif, dan Inovatif'}
          </div>
        </div>
      </div>

      {/* ========================================================
          3. TAMPILAN MOBILE (<768px)
          Grid 2x2 tanpa pil panjang, blok Desa Digital di bawahnya
         ======================================================== */}
      <div className="flex md:hidden flex-col gap-2.5">
        <div className="bg-white rounded-desa-card shadow-desa-dropdown border border-slate-100 p-3.5 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 p-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahPenduduk} />
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Penduduk
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahKK} />
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Kepala Keluarga
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Luas Wilayah
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
            </div>
            <div>
              <div className="text-base font-black text-desa-textDark tracking-tight leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahDusun || 4} />
              </div>
              <div className="text-[10px] text-desa-textMuted font-medium mt-0.5">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Blok Desa Digital Mobile */}
        <div className="bg-desa-darkGreen text-white p-3 rounded-desa-card flex items-center justify-between shadow-desa-sm border border-emerald-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Sprout className="w-3.5 h-3.5 text-desa-gold" strokeWidth={1.75} />
            </div>
            <div className="text-xs font-bold tracking-tight text-white font-sans">
              {statistik.statusDesaDigital || 'Desa Digital'}
            </div>
          </div>
          <div className="text-[10px] text-emerald-100/90 font-medium">
            {statistik.taglineDesaDigital || 'Transparan & Inovatif'}
          </div>
        </div>
      </div>
    </div>
  )
}
