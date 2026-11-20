'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowRight,
  BarChart3,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { WebsiteSettingsData, StatistikDesaData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { getBlurDataUrl } from '@/lib/blur'

interface HeroSectionProps {
  settings: WebsiteSettingsData
  statistik: StatistikDesaData
}

export function HeroSection({ settings, statistik }: HeroSectionProps) {
  const defaultSlides = [
    {
      gambar: '/seed/hero-1.webp',
      judul: 'Selamat Datang di Desa Bolali',
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Slider otomatis 6 detik, jeda saat hover maupun fokus
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length, isPaused, nextSlide])

  // Touch gesture handler untuk swipe di mobile
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
      className="relative w-full min-h-[460px] md:min-h-[380px] lg:min-h-[340px] xl:min-h-[320px] flex items-center bg-desa-darkGreen overflow-hidden select-none"
    >
      {/* 1. Background Layers: Crossfade 700ms + Slow Zoom Scale 1 ke 1.06 selama 8s */}
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
              <div
                className={`relative w-full h-full transform ${
                  isActive && !prefersReducedMotion
                    ? 'scale-[1.06] transition-transform duration-[8000ms] ease-out'
                    : 'scale-100 duration-0'
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
              </div>
              {/* Overlay Gelap Tipis Seragam Kontras WCAG AA */}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )
        })}
      </div>

      {/* 2. Main Content Overlay: Container 1344px */}
      <div className="relative z-20 max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-9 sm:py-11 md:py-12 xl:py-9 pb-16 sm:pb-16 xl:pb-16 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 lg:gap-10">
        {/* Sisi Kiri: Teks Masuk Bertahap (Fade + Naik 12px, Jeda 80ms) */}
        <div className="max-w-2xl text-white space-y-2.5 sm:space-y-3.5 text-left">
          {/* Baris 1: Script Emas (delay 0ms) */}
          <div
            key={`hero-t1-${currentIndex}`}
            className="transition-all duration-500 ease-out translate-y-0 opacity-100 motion-reduce:transition-none"
          >
            <span className="block text-2xl sm:text-3xl lg:text-3xl font-script text-desa-gold drop-shadow-sm select-none">
              Selamat Datang di
            </span>
          </div>

          {/* Baris 2: Judul Utama Sangat Tebal (delay 80ms) */}
          <div
            key={`hero-t2-${currentIndex}`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '80ms' }}
            className="transition-all duration-500 ease-out translate-y-0 opacity-100 motion-reduce:transition-none"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md mt-0.5 font-sans">
              {settings.namaWebsite || 'Desa Bolali'}
            </h1>
          </div>

          {/* Baris 3: Tagline Berkutip (delay 160ms) */}
          <div
            key={`hero-t3-${currentIndex}`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '160ms' }}
            className="transition-all duration-500 ease-out translate-y-0 opacity-100 motion-reduce:transition-none"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white/95 tracking-tight mt-1 font-sans italic">
              {currentSlide.subjudul || settings.tagline || '“Desa Maju, Mandiri, Sejahtera”'}
            </p>
          </div>

          {/* Baris 4: Paragraf Deskripsi Singkat (delay 240ms) */}
          <div
            key={`hero-t4-${currentIndex}`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '240ms' }}
            className="transition-all duration-500 ease-out translate-y-0 opacity-100 motion-reduce:transition-none"
          >
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl drop-shadow-sm font-sans">
              {settings.deskripsiHero ||
                'Bersama membangun desa dengan pelayanan terbaik, informasi yang transparan dan inovasi untuk masa depan.'}
            </p>
          </div>

          {/* Baris 5: Dua Tombol Aksi (delay 320ms) */}
          <div
            key={`hero-t5-${currentIndex}`}
            style={{ transitionDelay: prefersReducedMotion ? '0ms' : '320ms' }}
            className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 w-full sm:w-auto transition-all duration-500 ease-out translate-y-0 opacity-100 motion-reduce:transition-none"
          >
            <Button
              href={currentSlide.tautanTombolUtama || '#potensi'}
              variant="gold"
              size="md"
              icon={<ArrowRight className="w-5 h-5" strokeWidth={1.75} />}
              iconPosition="right"
              className="w-full sm:w-auto justify-center min-h-[44px] transition-colors duration-150"
            >
              {currentSlide.teksTombolUtama || 'Jelajahi Desa'}
            </Button>

            <Link
              href="/profil/sejarah"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/80 text-white font-semibold text-sm hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-150 backdrop-blur-xs w-full sm:w-auto min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-white" strokeWidth={1.75} />
              <span>Profil Desa</span>
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Script Putih & Kartu IDM Mandiri */}
        <div className="w-full lg:w-auto flex flex-col items-start lg:items-end justify-center mt-2 lg:mt-0">
          <p className="hidden sm:block text-2xl lg:text-[28px] font-script text-white drop-shadow-md mb-3 text-left lg:text-right leading-tight -rotate-3 max-w-xs select-none">
            Maju Bersama<br />
            Untuk Desa Lebih Baik
          </p>

          {/* Kartu IDM Mandiri: Card hover lift */}
          <div className="card-hover-lift bg-white rounded-desa-card p-2.5 sm:p-4 shadow-desa-dropdown border border-white/80 flex items-center gap-2.5 sm:gap-4 max-w-sm w-full">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-desa-sm bg-desa-lightGreen flex items-center justify-center text-desa-accentGreen shrink-0 border border-emerald-200">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-desa-accentGreen" strokeWidth={1.75} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-desa-textMuted uppercase tracking-wider truncate">
                Indeks Desa Membangun
              </div>
              <div className="text-lg sm:text-2xl font-black text-desa-textDark tracking-tight leading-tight truncate">
                {statistik.indeksDesaMembangun || 'Mandiri'}
              </div>
            </div>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-desa-goldLight flex items-center justify-center text-desa-gold shrink-0 border border-desa-gold/40">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 fill-desa-gold text-desa-gold" strokeWidth={1.75} />
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
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-white/60 bg-black/25 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors duration-150 z-30 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft className="w-6 h-6" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide Banner Selanjutnya"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-white/60 bg-black/25 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors duration-150 z-30 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight className="w-6 h-6" strokeWidth={1.75} />
          </button>

          {/* Dot Pagination di Bawah (Aktif Berbentuk Pil Kuning) */}
          <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Pindah ke banner ${dotIdx + 1}`}
                className="min-w-[32px] min-h-[32px] flex items-center justify-center p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-desa-gold"
              >
                <span
                  className={`h-2.5 rounded-full transition-all duration-300 block ${
                    currentIndex === dotIdx
                      ? 'w-7 bg-desa-gold shadow-xs'
                      : 'w-2.5 bg-white/50 hover:bg-white'
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
