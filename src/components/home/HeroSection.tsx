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

interface HeroSectionProps {
  settings: WebsiteSettingsData
  statistik: StatistikDesaData
}

export function HeroSection({ settings, statistik }: HeroSectionProps) {
  const slides = settings.bannerSlider && settings.bannerSlider.length > 0
    ? settings.bannerSlider
    : [
        {
          gambar: '/seed/hero-desa.jpg',
          judul: 'Selamat Datang di Desa Bolali',
          subjudul: '“Desa Maju, Mandiri, Sejahtera”',
          teksTombolUtama: 'Jelajahi Desa',
          tautanTombolUtama: '#potensi',
        },
      ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const touchEndXRef = useRef<number | null>(null)

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  // Otomatis berganti slide setiap 6 detik, berhenti saat di-hover kursor
  useEffect(() => {
    if (slides.length <= 1 || isHovered) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length, isHovered, nextSlide])

  // Touch gesture handler untuk swipe di perangkat mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current
      // Minimal swipe distance 50px
      if (diff > 50) {
        nextSlide()
      } else if (diff < -50) {
        prevSlide()
      }
    }
    touchStartXRef.current = null
    touchEndXRef.current = null
  }

  const currentSlide = slides[currentIndex]
  const imageUrl = getMediaUrl(currentSlide?.gambar, '/seed/hero-desa.jpg')

  return (
    <section
      aria-label="Hero Banner Desa Bolali"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center bg-desa-darkGreen overflow-hidden select-none"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={currentSlide?.judul || settings.namaWebsite || 'Desa Bolali'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform transition-transform duration-1000 ease-out"
        />
        {/* Overlay Tipis Netral agar Keindahan Alam Desa Terlihat Terang Seperti Mockup */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Sisi Kiri: Teks & Tombol Aksi */}
        <div className="max-w-2xl text-white space-y-4 sm:space-y-6 text-center lg:text-left">
          <div>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-script text-desa-gold drop-shadow-sm">
              Selamat Datang di
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md mt-1 font-sans">
              {settings.namaWebsite || 'Desa Bolali'}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-white/95 tracking-tight mt-2 font-sans italic">
              {currentSlide?.subjudul || settings.tagline || '“Desa Maju, Mandiri, Sejahtera”'}
            </p>
          </div>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl drop-shadow-sm font-sans mx-auto lg:mx-0">
            {settings.deskripsiHero ||
              'Bersama membangun desa dengan pelayanan terbaik, keterbukaan informasi yang transparan dan inovasi untuk masa depan.'}
          </p>

          {/* Dua Tombol Sesuai Gambar: Kuning Solid & Outline Putih */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <Button
              href={currentSlide?.tautanTombolUtama || '#potensi'}
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="bg-desa-gold hover:bg-desa-goldHover text-desa-darkGreen font-bold rounded-full px-6 shadow-md"
            >
              {currentSlide?.teksTombolUtama || 'Jelajahi Desa'}
            </Button>

            <Link
              href="/profil/sejarah"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/90 text-white font-semibold text-base hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white transition-all backdrop-blur-xs"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Profil Desa</span>
            </Link>
          </div>
        </div>

        {/* Sisi Kanan: Script Putih Dua Baris & Kartu IDM Mandiri */}
        <div className="w-full lg:w-auto flex flex-col items-center lg:items-end justify-center">
          {/* Script Putih Miring Dua Baris Sesuai Mockup */}
          <p className="text-2xl sm:text-3xl lg:text-[32px] font-script text-white drop-shadow-md mb-4 text-center lg:text-right leading-tight -rotate-3 max-w-xs select-none">
            Maju Bersama<br />
            Untuk Desa Lebih Baik
          </p>

          {/* Kartu Putih Rounded: Indeks Desa Membangun / Mandiri */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-desa-dropdown border border-white/80 flex items-center gap-4 sm:gap-5 max-w-sm w-full">
            {/* Bar Hijau Icon */}
            <div className="w-12 h-12 rounded-xl bg-desa-lightGreen flex items-center justify-center text-desa-accentGreen shrink-0 border border-emerald-200">
              <BarChart3 className="w-6 h-6 text-desa-accentGreen" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold text-desa-textMuted uppercase tracking-wider">
                Indeks Desa Membangun
              </div>
              <div className="text-xl sm:text-2xl font-black text-desa-textDark tracking-tight leading-tight">
                {statistik.indeksDesaMembangun || 'Mandiri'}
              </div>
            </div>

            {/* Lencana Bintang Emas */}
            <div className="w-10 h-10 rounded-full bg-desa-goldLight flex items-center justify-center text-desa-gold shrink-0 border border-desa-gold/40">
              <Award className="w-6 h-6 fill-desa-gold text-desa-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigasi Panah Lingkaran Outline Sesuai Mockup */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Slide Banner Sebelumnya"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/60 bg-black/25 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Slide Banner Selanjutnya"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/60 bg-black/25 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Pagination di Bawah (Aktif Berbentuk Pil Kuning) */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Pindah ke banner ${dotIdx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  currentIndex === dotIdx
                    ? 'w-8 bg-desa-gold shadow-sm'
                    : 'w-2.5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
