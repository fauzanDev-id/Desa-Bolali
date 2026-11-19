'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { WebsiteSettingsData, StatistikDesaData } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'

interface HeroSectionProps {
  settings: WebsiteSettingsData
  statistik: StatistikDesaData
}

export function HeroSection({ settings, statistik }: HeroSectionProps) {
  const slides = settings.bannerSlider && settings.bannerSlider.length > 0
    ? settings.bannerSlider
    : [
        {
          gambar: '/images/hero-desa.jpg',
          judul: 'Selamat Datang di Desa Bolali',
          subjudul: '“Desa Maju, Mandiri, Sejahtera”',
          teksTombolUtama: 'Jelajahi Desa',
          tautanTombolUtama: '#potensi',
        },
      ]

  const [currentIndex, setCurrentIndex] = useState(0)

  // Otomatis berganti slide setiap 7 detik jika lebih dari 1 slide
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [slides.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const currentSlide = slides[currentIndex]
  const imageUrl = getMediaUrl(currentSlide?.gambar, '/images/hero-desa.jpg')

  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center bg-desa-green-950 overflow-hidden">
      {/* Background Image / Slider with Smooth Fade */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={currentSlide?.judul || settings.namaWebsite}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-all duration-1000 ease-out brightness-[0.82]"
        />
        {/* Gradient Overlay for Optimal Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-desa-green-950/90 via-desa-green-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-desa-green-950/80 via-transparent to-black/30" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Column: Heading, Slogan & CTA Buttons */}
        <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
          <div>
            <span className="block text-xl sm:text-2xl lg:text-3xl font-serif italic text-desa-gold-400 drop-shadow">
              Selamat Datang di
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md mt-1">
              {settings.namaWebsite}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-white/95 tracking-tight mt-2 font-sans italic">
              {currentSlide?.subjudul || settings.tagline}
            </p>
          </div>

          <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-xl drop-shadow">
            {settings.deskripsiHero}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              href={currentSlide?.tautanTombolUtama || '#potensi'}
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="shadow-lg"
            >
              {currentSlide?.teksTombolUtama || 'Jelajahi Desa'}
            </Button>

            <Button
              href="/profil"
              variant="white"
              size="lg"
              icon={<Play className="w-4 h-4 fill-desa-green-900" />}
              className="bg-white/90 hover:bg-white text-desa-green-950 shadow-md backdrop-blur-sm"
            >
              Profil Desa
            </Button>
          </div>
        </div>

        {/* Right Column: Floating Badge (Indeks Desa Membangun: Mandiri) */}
        <div className="w-full lg:w-auto flex flex-col items-center lg:items-end justify-center">
          {/* Script Slogan Above Badge */}
          <p className="text-base sm:text-lg font-serif italic text-white/90 drop-shadow mb-2 text-center lg:text-right">
            {statistik.taglineIDM}
          </p>

          {/* White Card: IDM Mandiri */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-float border border-white/50 flex items-center gap-4 sm:gap-5 max-w-sm w-full">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-desa-green-800 shrink-0 border border-emerald-200">
              <TrendingUp className="w-6 h-6 text-desa-green-800" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <span>Indeks Desa Membangun</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight flex items-center gap-2">
                <span>{statistik.indeksDesaMembangun}</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-desa-gold-100 flex items-center justify-center text-desa-gold-600 shrink-0 border border-desa-gold-300">
              <Award className="w-6 h-6 fill-desa-gold-500 text-desa-gold-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows for Slider (If more than 1 slide) */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide Sebelumnya"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide Selanjutnya"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors border border-white/20 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Pindah ke slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === dotIdx
                    ? 'w-7 bg-desa-gold-400'
                    : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
