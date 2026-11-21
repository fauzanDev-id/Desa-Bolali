'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CaretLeft, CaretRight, Play, CaretRight as ArrowIcon } from '@phosphor-icons/react'
import type { WebsiteSettingsData, StatistikDesaData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { getBlurDataUrl } from '@/lib/blur'
import { allura, kaushan } from '@/lib/fonts'

interface HeroSectionProps {
  settings: WebsiteSettingsData
  statistik: StatistikDesaData
}

/**
 * 3 Batang Grafik Naik Solid Hijau (SVG) Sesuai Mockup
 */
function RisingBarsIcon({ className = 'w-7 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="18" width="6.5" height="14" rx="2" fill="#1E7F3A" />
      <rect x="10.5" y="10" width="6.5" height="22" rx="2" fill="#1E7F3A" />
      <rect x="19" y="2" width="6.5" height="30" rx="2" fill="#1E7F3A" />
    </svg>
  )
}

/**
 * Segel Bintang Emas dengan Karangan Daun Laurel Melingkar (SVG) Sesuai Mockup
 */
function GoldStarWreathSeal({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Karangan Daun Kiri Melingkar */}
      <g fill="#EAB308">
        <path d="M11 16C12 12 16 10 17 14C15 17 12 17 11 16Z" />
        <path d="M9 22C9 18 13 17 15 20C14 23 11 24 9 22Z" />
        <path d="M9 28C8 24 12 23 15 26C14 29 11 30 9 28Z" />
        <path d="M11 34C10 30 14 29 17 32C16 35 13 36 11 34Z" />
        <path d="M15 39C13 36 17 34 20 37C19 40 16 41 15 39Z" />
        <path d="M21 42C19 40 22 37 25 39C24 42 22 43 21 42Z" />

        {/* Karangan Daun Kanan Melingkar */}
        <path d="M37 16C36 12 32 10 31 14C33 17 36 17 37 16Z" />
        <path d="M39 22C39 18 35 17 33 20C34 23 37 24 39 22Z" />
        <path d="M39 28C40 24 36 23 33 26C34 29 37 30 39 28Z" />
        <path d="M37 34C38 30 34 29 31 32C32 35 35 36 37 34Z" />
        <path d="M33 39C35 36 31 34 28 37C29 40 32 41 33 39Z" />
        <path d="M27 42C29 40 26 37 23 39C24 42 26 43 27 42Z" />
      </g>
      {/* Garis Batang Lengkung Laurel */}
      <path d="M14 14C8 24 10 38 24 43C38 38 40 24 34 14" stroke="#EAB308" strokeWidth="1.75" strokeLinecap="round" fill="none" />
      {/* Bintang Emas Pusat */}
      <polygon
        points="24,14 26.8,21.5 35,21.5 28.5,26.2 31,34 24,29.5 17,34 19.5,26.2 13,21.5 21.2,21.5"
        fill="#EAB308"
      />
    </svg>
  )
}

/**
 * Garis Lengkung Emas (SVG Swoosh) di bawah Maju Bersama
 */
function GoldSwoosh({ className = 'w-56 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M2 14C70 18 160 16 238 2C170 8 80 10 2 14Z"
        fill="#EAB308"
      />
      <path
        d="M20 18C80 20 150 17 210 7C160 12 90 14 20 18Z"
        fill="#F59E0B"
        opacity="0.8"
      />
    </svg>
  )
}

export function HeroSection({ settings, statistik }: HeroSectionProps) {
  const defaultSlides = [
    {
      gambar: '/seed/hero-1.webp',
      judul: 'Desa Bolali',
      subjudul: '“Desa Maju, Mandiri, Sejahtera”',
      teksTombolUtama: 'Jelajahi Desa',
      tautanTombolUtama: '#potensi',
    },
    {
      gambar: '/seed/hero-2.webp',
      judul: 'Harmoni Alam & Pertanian Bolali',
      subjudul: '“Lumbung Pangan Berkelanjutan”',
      teksTombolUtama: 'Potensi Pertanian',
      tautanTombolUtama: '/potensi-desa',
    },
    {
      gambar: '/seed/hero-3.webp',
      judul: 'Kemandirian & Gotong Royong Warga',
      subjudul: '“Guyub Rukun Membangun Desa”',
      teksTombolUtama: 'Profil Desa',
      tautanTombolUtama: '/profil/sejarah',
    },
    {
      gambar: '/seed/hero-4.webp',
      judul: 'Inovasi Menuju Desa Digital',
      subjudul: '“Transparan, Partisipatif, dan Inovatif”',
      teksTombolUtama: 'Layanan Mandiri',
      tautanTombolUtama: '/kontak',
    },
  ]

  const slides = settings.bannerSlider && settings.bannerSlider.length > 0
    ? settings.bannerSlider
    : defaultSlides

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length, isPaused, nextSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current
      if (diff > 45) {
        nextSlide()
      } else if (diff < -45) {
        prevSlide()
      }
    }
    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  const currentSlide = slides[currentIndex] || slides[0]

  return (
    <section
      aria-label="Hero Banner Desa Bolali"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full -mt-16 pt-16 min-h-[460px] md:min-h-[380px] lg:h-[clamp(310px,24vw,370px)] flex items-center bg-desa-darkGreen overflow-hidden select-none"
    >
      {/* 1. Background Layers: Foto Lanskap Asri & Overlay Tipis 15% */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex
          const imgUrl = getMediaUrl(slide.gambar, `/seed/hero-${(idx % 4) + 1}.webp`)
          const blurUrl = getBlurDataUrl(imgUrl)

          return (
            <div
              key={idx}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <Image
                src={imgUrl}
                alt={slide.judul || 'Lanskap Desa Bolali'}
                fill
                priority={idx === 0}
                placeholder={blurUrl ? 'blur' : 'empty'}
                blurDataURL={blurUrl}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Overlay Gelap Tipis Seragam ±15% (Foto Tetap Terang & Hidup Sesuai Mockup) */}
              <div className="absolute inset-0 bg-black/15" />
            </div>
          )
        })}
      </div>

      {/* 2. Main Content Overlay: Container 1440px */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6 py-4 sm:py-6 md:py-6 pb-12 sm:pb-14 lg:pb-12 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
        {/* Sisi Kiri: Teks Hero Sesuai Mockup */}
        <div className="max-w-2xl text-white space-y-1 sm:space-y-1.5 text-left">
          {/* Baris 1: Script Emas "Selamat Datang di" (Allura) */}
          <div>
            <span
              className={`${allura.className} text-[44px] sm:text-[50px] leading-tight block select-none`}
              style={{
                backgroundImage: 'linear-gradient(180deg, #F7DC6F 0%, #E0A81B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))',
              }}
            >
              Selamat Datang di
            </span>
          </div>

          {/* Baris 2: Judul Utama "Desa Bolali" (H1, 800) */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black text-white drop-shadow-md font-sans leading-none tracking-normal">
              {settings.namaWebsite || 'Desa Bolali'}
            </h1>
          </div>

          {/* Baris 3: Tagline Berkutip */}
          <div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white tracking-normal font-sans italic drop-shadow-sm">
              {currentSlide.subjudul || settings.tagline || '“Desa Maju, Mandiri, Sejahtera”'}
            </p>
          </div>

          {/* Baris 4: Paragraf Deskripsi Singkat */}
          <div>
            <p className="text-xs sm:text-[14px] text-white/95 leading-relaxed max-w-xl drop-shadow-sm font-sans font-normal">
              {settings.deskripsiHero ||
                'Bersama membangun desa dengan pelayanan terbaik, informasi yang transparan dan inovasi untuk masa depan.'}
            </p>
          </div>

          {/* Baris 5: Dua Tombol Aksi */}
          <div className="pt-2 flex flex-row items-center justify-start gap-3 w-full sm:w-auto">
            <Link
              href={currentSlide.tautanTombolUtama || '#potensi'}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#EAB308] hover:bg-[#CA8A04] text-slate-950 font-bold text-xs sm:text-[13px] shadow-sm transition-colors cursor-pointer"
            >
              <ArrowIcon size={14} weight="bold" />
              <span>{currentSlide.teksTombolUtama || 'Jelajahi Desa'}</span>
            </Link>

            <Link
              href="/profil/sejarah"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/85 text-white font-bold text-xs sm:text-[13px] hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white transition-colors backdrop-blur-xs cursor-pointer"
            >
              <Play size={12} weight="fill" className="text-white" />
              <span>Profil Desa</span>
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Script Putih & Kartu IDM Mandiri Sesuai Mockup */}
        <div className="w-full lg:w-auto flex flex-col items-start lg:items-end justify-center mt-3 lg:mt-0">
          <div className="flex flex-col items-end">
            <div className={`${kaushan.className} text-[28px] sm:text-[34px] text-white -rotate-[4deg] text-right leading-tight select-none drop-shadow-md pr-2`}>
              <div>Maju Bersama</div>
              <div>Untuk Desa Lebih Baik</div>
            </div>
            {/* Garis Lengkung Emas (SVG Swoosh) */}
            <div className="-mt-1 mb-2 pr-1">
              <GoldSwoosh className="w-52 sm:w-60 h-4" />
            </div>
          </div>

          {/* Kartu IDM Mandiri: Ikon 3 Batang Naik Hijau + Segel Bintang Emas Daun */}
          <div className="bg-white rounded-2xl px-5 py-3 shadow-md border border-white/90 flex items-center gap-4 max-w-sm w-full sm:w-auto select-none">
            {/* Ikon 3 Batang Grafik Solid Hijau */}
            <div className="shrink-0 flex items-center justify-center">
              <RisingBarsIcon className="w-7 h-8" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <div className="text-[12px] font-semibold text-slate-600 leading-tight">
                Indeks Desa Membangun
              </div>
              <div className="text-[26px] font-bold text-[#1E7F3A] leading-tight font-sans">
                {statistik.indeksDesaMembangun || 'Mandiri'}
              </div>
            </div>

            {/* Segel Bintang Emas dengan Karangan Daun Laurel */}
            <div className="shrink-0 flex items-center justify-center">
              <GoldStarWreathSeal className="w-11 h-11" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigasi Panah Lingkaran Outline */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide Banner Sebelumnya"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] w-10 h-10 rounded-full border border-white/70 bg-black/20 hover:bg-black/45 text-white flex items-center justify-center backdrop-blur-xs transition-colors duration-150 z-30 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide Banner Selanjutnya"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] w-10 h-10 rounded-full border border-white/70 bg-black/20 hover:bg-black/45 text-white flex items-center justify-center backdrop-blur-xs transition-colors duration-150 z-30 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            <CaretRight size={18} weight="bold" />
          </button>

          {/* Dot Pagination di Bawah (Aktif Berbentuk Pil Kuning) */}
          <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Pindah ke banner ${dotIdx + 1}`}
                className="min-w-[28px] min-h-[28px] flex items-center justify-center p-1 rounded-full focus:outline-none cursor-pointer"
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${
                    currentIndex === dotIdx
                      ? 'w-6 bg-[#EAB308] shadow-xs'
                      : 'w-2 bg-white/70 hover:bg-white'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
