'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { GaleriItem } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'
import { Card, SectionHeader, EmptyState } from '@/components'
import { Images, Play, X, CaretLeft, CaretRight, CalendarBlank, ArrowsOut } from '@phosphor-icons/react/dist/ssr'

interface GaleriGridProps {
  initialItems: GaleriItem[]
  albums: string[]
}

export function GaleriGrid({ initialItems, albums }: GaleriGridProps) {
  const [selectedTipe, setSelectedTipe] = useState<'semua' | 'foto' | 'video'>('semua')
  const [selectedAlbum, setSelectedAlbum] = useState<string>('Semua')

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<GaleriItem | null>(null)

  // Filter items
  const filteredItems = initialItems.filter((item) => {
    if (selectedTipe !== 'semua' && item.tipe !== selectedTipe) return false
    if (selectedAlbum !== 'Semua' && item.album?.toLowerCase() !== selectedAlbum.toLowerCase()) return false
    return true
  })

  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null))
  }, [lightboxIndex, filteredItems.length])

  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null))
  }, [lightboxIndex, filteredItems.length])

  // Navigasi Keyboard Lightbox (Escape, Panah Kiri, Panah Kanan) Sesuai Spesifikasi
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null)
        if (e.key === 'ArrowRight') nextLightbox()
        if (e.key === 'ArrowLeft') prevLightbox()
      }
      if (activeVideo && e.key === 'Escape') {
        setActiveVideo(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, activeVideo, nextLightbox, prevLightbox])

  const openItem = (item: GaleriItem) => {
    if (item.tipe === 'video') {
      setActiveVideo(item)
    } else {
      const idx = filteredItems.findIndex((it) => it.id === item.id)
      setLightboxIndex(idx >= 0 ? idx : 0)
    }
  }

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  // Helper untuk mengekstrak YouTube Embed URL
  const getYouTubeEmbedUrl = (url?: string | null) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Kontrol Filter Tipe (Foto/Video) & Album */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-desa-border">
          <SectionHeader
            title="Arsip Dokumentasi & Publikasi Visual"
            subtitle="Pilih kategori media dan album dokumentasi"
            icon={<Images className="w-4 h-4 text-desa-accentGreen" />}
            className="mb-0"
          />

          {/* Tab Tipe: Semua / Foto / Video */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedTipe('semua')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                selectedTipe === 'semua'
                  ? 'bg-desa-darkGreen text-white shadow-2xs'
                  : 'text-slate-700 hover:text-desa-darkGreen'
              }`}
            >
              Semua Media
            </button>
            <button
              type="button"
              onClick={() => setSelectedTipe('foto')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                selectedTipe === 'foto'
                  ? 'bg-desa-darkGreen text-white shadow-2xs'
                  : 'text-slate-700 hover:text-desa-darkGreen'
              }`}
            >
              Foto
            </button>
            <button
              type="button"
              onClick={() => setSelectedTipe('video')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                selectedTipe === 'video'
                  ? 'bg-desa-darkGreen text-white shadow-2xs'
                  : 'text-slate-700 hover:text-desa-darkGreen'
              }`}
            >
              Video
            </button>
          </div>
        </div>

        {/* Tab Album Dokumentasi */}
        {albums.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedAlbum('Semua')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
                selectedAlbum === 'Semua'
                  ? 'bg-desa-darkGreen text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Semua Album
            </button>
            {albums.map((alb) => (
              <button
                key={alb}
                type="button"
                onClick={() => setSelectedAlbum(alb)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
                  selectedAlbum === alb
                    ? 'bg-desa-darkGreen text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {alb}
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* 2. GRID MASONRY / RAPI GALERI Sesuai Spesifikasi */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          {filteredItems.map((item) => {
            const imgUrl = getMediaUrl(item.foto, '/seed/galeri-1.webp')
            const isVideo = item.tipe === 'video'

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => openItem(item)}
                aria-label={`Buka dokumentasi ${isVideo ? 'video' : 'foto'}: ${item.judul}`}
                className="group relative aspect-square rounded-desa-card overflow-hidden bg-slate-100 border border-desa-border shadow-xs cursor-pointer select-none text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-desa-primaryGreen focus-visible:ring-offset-2"
              >
                <Image
                  src={imgUrl}
                  alt={item.judul}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay Gelap Bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

                {/* Ikon Play jika Video */}
                {isVideo ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-desa-gold text-desa-darkGreen flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-xs">
                      <ArrowsOut className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Keterangan di Bawah Foto */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                  {item.album && (
                    <span className="text-[10px] text-desa-gold font-bold uppercase tracking-wider block mb-0.5">
                      {item.album}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1 drop-shadow-xs font-sans">
                    {item.judul}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      ) : (
        <Card className="p-8">
          <EmptyState
            title="Tidak Ada Dokumentasi"
            description="Tidak ada item galeri yang sesuai dengan kategori atau album yang dipilih."
          />
        </Card>
      )}

      {/* 3. LIGHTBOX DENGAN NAVIGASI KEYBOARD Sesuai Spesifikasi */}
      {currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Tombol Tutup */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Tutup Tampilan Penuh (Esc)"
            className="absolute top-4 right-4 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Tombol Navigasi Kiri */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevLightbox()
            }}
            aria-label="Foto Sebelumnya (Panah Kiri)"
            className="absolute left-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <CaretLeft className="w-6 h-6" />
          </button>

          {/* Gambar di Tengah */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getMediaUrl(currentLightboxItem.foto, '/seed/galeri-1.webp')}
              alt={currentLightboxItem.judul}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Tombol Navigasi Kanan */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextLightbox()
            }}
            aria-label="Foto Selanjutnya (Panah Kanan)"
            className="absolute right-4 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <CaretRight className="w-6 h-6" />
          </button>

          {/* Keterangan Bawah */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white px-4">
            <h4 className="text-sm sm:text-base font-bold font-sans">{currentLightboxItem.judul}</h4>
            <p className="text-xs text-white/70 mt-0.5">{currentLightboxItem.album} • Tekan [Esc] untuk menutup</p>
          </div>
        </div>
      )}

      {/* 4. MODAL PEMUTAR VIDEO Sesuai Spesifikasi */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            aria-label="Tutup Video (Esc)"
            className="absolute top-4 right-4 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-4xl aspect-[16/9] rounded-desa-card overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getYouTubeEmbedUrl(activeVideo.videoUrl)}
              title={activeVideo.judul}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
