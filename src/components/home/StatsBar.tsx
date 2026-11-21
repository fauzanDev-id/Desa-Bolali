'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  UsersThree,
  House,
  MapPin,
  HouseLine,
} from '@phosphor-icons/react/dist/ssr'
import type { StatistikDesaData } from '@/lib/cms'

interface StatsBarProps {
  statistik: StatistikDesaData
}

/**
 * AnimatedCounter:
 * Angka bertambah halus saat terlihat, pre-rendered SSR untuk mencegah layout shift
 */
function AnimatedCounter({
  value,
  duration = 1000,
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

          setCurrent(0)
          const startTime = performance.now()
          const frame = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
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

/**
 * Ikon Tunas Daun 3 Cabang Solid Hijau Muda Sesuai Mockup
 */
function DigitalVillageSprout({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Daun Tengah */}
      <path d="M18 4C18 4 22 11 22 18C22 21 20 23 18 23C16 23 14 21 14 18C14 11 18 4 18 4Z" fill="#4ADE80" />
      {/* Daun Kiri */}
      <path d="M18 16C18 16 12 12 6 15C5 18 7 22 10 22C13.5 22 16.5 19 18 16Z" fill="#4ADE80" />
      {/* Daun Kanan */}
      <path d="M18 16C18 16 24 12 30 15C31 18 29 22 26 22C22.5 22 19.5 19 18 16Z" fill="#4ADE80" />
      {/* Tangkai */}
      <path d="M18 18V31" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function StatsBar({ statistik }: StatsBarProps) {
  return (
    <div className="relative -mt-10 sm:-mt-11 lg:-mt-10 z-30 max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6 select-none">
      {/* ========================================================
          1. TAMPILAN DESKTOP (>=1024px / lg & xl)
          Satu wadah pil terpadu: kiri 4 statistik putih, kanan hijau tua melengkung
         ======================================================== */}
      <div className="hidden lg:flex bg-white rounded-full shadow-md border border-slate-100 flex-row items-stretch justify-between overflow-hidden h-[74px]">
        {/* 4 Statistik Counter Grid (Dipisah Garis Vertikal Tipis) */}
        <div className="grid grid-cols-4 flex-1 items-center divide-x divide-slate-100 px-6 xl:px-8 py-2">
          {/* 1. Penduduk */}
          <div className="flex items-center gap-3.5 px-3">
            <UsersThree size={36} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[20px] font-bold text-slate-900 leading-tight font-sans">
                <AnimatedCounter value={statistik.jumlahPenduduk} />
              </div>
              <div className="text-[13px] text-slate-500 font-normal leading-tight mt-0.5">
                Penduduk
              </div>
            </div>
          </div>

          {/* 2. Kepala Keluarga */}
          <div className="flex items-center gap-3.5 px-3">
            <House size={36} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[20px] font-bold text-slate-900 leading-tight font-sans">
                <AnimatedCounter value={statistik.jumlahKK} />
              </div>
              <div className="text-[13px] text-slate-500 font-normal leading-tight mt-0.5">
                Kepala Keluarga
              </div>
            </div>
          </div>

          {/* 3. Luas Wilayah */}
          <div className="flex items-center gap-3.5 px-3">
            <MapPin size={36} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[20px] font-bold text-slate-900 leading-tight font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[13px] text-slate-500 font-normal leading-tight mt-0.5">
                Luas Wilayah
              </div>
            </div>
          </div>

          {/* 4. Dusun */}
          <div className="flex items-center gap-3.5 px-3">
            <HouseLine size={36} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[20px] font-bold text-slate-900 leading-tight font-sans">
                <AnimatedCounter value={statistik.jumlahDusun || 4} />
              </div>
              <div className="text-[13px] text-slate-500 font-normal leading-tight mt-0.5">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Blok Hijau Tua dengan Tepi Kiri Melengkung & Garis Emas Sesuai Mockup */}
        <div className="relative flex items-stretch shrink-0">
          {/* SVG Pembatas Lengkung Halus dengan Aksen Emas */}
          <div className="relative w-12 h-full shrink-0 -mr-[1px]">
            <svg
              viewBox="0 0 48 74"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
              aria-hidden="true"
            >
              {/* Latar Hijau Tua Melengkung Halus */}
              <path
                d="M 48 0 H 6 C 24 8, 36 36, 48 74 V 0 Z"
                fill="#073C24"
              />
              {/* Garis Emas Melengkung Mengikuti Tepi */}
              <path
                d="M 6 0 C 24 8, 36 36, 48 74"
                stroke="#EAB308"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Isi Konten Blok Hijau Tua "Desa Digital" */}
          <div className="bg-desa-darkGreen text-white px-7 xl:px-9 flex items-center gap-3.5 shrink-0">
            <DigitalVillageSprout className="w-8 h-8 shrink-0" />
            <div>
              <div className="text-[16px] font-bold text-white font-sans leading-tight">
                {statistik.statusDesaDigital || 'Desa Digital'}
              </div>
              <div className="text-[12px] text-emerald-100 font-normal leading-tight mt-0.5">
                {statistik.taglineDesaDigital || 'Transparan, Partisipatif, dan Inovatif'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. TAMPILAN TABLET (768px - 1023px / md)
         ======================================================== */}
      <div className="hidden md:flex lg:hidden flex-col gap-2.5">
        <div className="bg-white rounded-full shadow-md border border-slate-100 grid grid-cols-4 divide-x divide-slate-100 px-4 py-3 items-center">
          <div className="flex items-center gap-2.5 px-2">
            <UsersThree size={30} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[17px] font-bold text-slate-900 leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahPenduduk} />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Penduduk
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <House size={30} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[17px] font-bold text-slate-900 leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahKK} />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Kepala Keluarga
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <MapPin size={30} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[17px] font-bold text-slate-900 leading-none font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Luas Wilayah
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <HouseLine size={30} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-[17px] font-bold text-slate-900 leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahDusun || 4} />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Blok Desa Digital Tablet */}
        <div className="bg-desa-darkGreen text-white px-5 py-2.5 rounded-full flex items-center justify-between shadow-xs border border-emerald-900">
          <div className="flex items-center gap-3">
            <DigitalVillageSprout className="w-6 h-6 shrink-0" />
            <div className="text-[13px] font-bold text-white font-sans">
              {statistik.statusDesaDigital || 'Desa Digital'}
            </div>
          </div>
          <div className="text-[11px] text-emerald-100 font-normal">
            {statistik.taglineDesaDigital || 'Transparan, Partisipatif, dan Inovatif'}
          </div>
        </div>
      </div>

      {/* ========================================================
          3. TAMPILAN MOBILE (<768px)
          Grid 2x2 tanpa pil panjang, blok Desa Digital di bawahnya
         ======================================================== */}
      <div className="flex md:hidden flex-col gap-2.5">
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-3.5 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5 p-1">
            <UsersThree size={28} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-base font-bold text-slate-900 leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahPenduduk} />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Penduduk
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <House size={28} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-base font-bold text-slate-900 leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahKK} />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Kepala Keluarga
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <MapPin size={28} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-base font-bold text-slate-900 leading-none font-sans">
                {statistik.luasWilayah || '3,75 km²'}
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Luas Wilayah
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-1">
            <HouseLine size={28} weight="fill" className="text-[#1E7F3A] shrink-0" />
            <div>
              <div className="text-base font-bold text-slate-900 leading-none font-sans">
                <AnimatedCounter value={statistik.jumlahDusun || 4} />
              </div>
              <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                Dusun
              </div>
            </div>
          </div>
        </div>

        {/* Blok Desa Digital Mobile */}
        <div className="bg-desa-darkGreen text-white p-3 rounded-xl flex items-center justify-between shadow-xs border border-emerald-900">
          <div className="flex items-center gap-2.5">
            <DigitalVillageSprout className="w-5 h-5 shrink-0" />
            <div className="text-xs font-bold text-white font-sans">
              {statistik.statusDesaDigital || 'Desa Digital'}
            </div>
          </div>
          <div className="text-[11px] text-emerald-100 font-normal">
            {statistik.taglineDesaDigital || 'Transparan & Inovatif'}
          </div>
        </div>
      </div>
    </div>
  )
}
