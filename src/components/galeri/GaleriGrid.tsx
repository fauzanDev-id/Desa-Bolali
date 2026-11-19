'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import type { GaleriItem } from '@/lib/cms'
import { getMediaUrl, formatDateIndonesia } from '@/lib/utils'
import {
  Image as ImageIcon,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  Maximize2,
  Tag,
} from 'lucide-react'

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

  // Keyboard navigation for lightbox
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
  }, [lightboxIndex, activeVideo, filteredItems.length])

  const openItem = (item: GaleriItem) => {
    if (item.tipe === 'video') {
      setActiveVideo(item)
    } else {
      const idx = filteredItems.findIndex((it) => it.id === item.id)
      setLightboxIndex(idx >= 0 ? idx : 0)
    }
  }

  const nextLightbox = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length)
  }

  const prevLightbox = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length)
  }

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  // Helper untuk mengekstrak YouTube Embed URL
  const getYouTubeEmbedUrl = (url?: string | null) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1`
      : url
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filter and Tab Controller */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-1">
              <ImageIcon className="w-4 h-4 text-desa-gold-500" />
              <span>Dokumentasi Visual</span>
              <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950">
              Galeri Kegiatan & Potensi Desa
            </h2>
          </div>

          {/* Type Switcher Pills */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 self-start md:self-auto border border-slate-200/60">
            <button
              type="button"
              onClick={() => setSelectedTipe('semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTipe === 'semua'
                  ? 'bg-white text-desa-green-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Media ({initialItems.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTipe('foto')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTipe === 'foto'
                  ? 'bg-white text-desa-green-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Foto</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedTipe('video')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedTipe === 'video'
                  ? 'bg-white text-desa-green-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Video</span>
            </button>
          </div>
        </div>

        {/* Album Filter Pills */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Album:</span>
          </span>
          {['Semua', ...albums].map((alb) => {
            const isActive = selectedAlbum === alb
            return (
              <button
                key={alb}
                type="button"
                onClick={() => setSelectedAlbum(alb)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-desa-green-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {alb === 'Semua' ? 'Semua Album' : alb}
              </button>
            )
          })}
        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const imgUrl = getMediaUrl(item.foto, '/images/hero-desa.jpg')
            const isVideo = item.tipe === 'video'

            return (
              <div
                key={item.id}
                onClick={() => openItem(item)}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden cursor-pointer group hover:border-desa-green-300 hover:shadow-card-hover transition-all flex flex-col"
              >
                {/* Thumbnail Area */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt={item.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Album Badge */}
                  {item.album && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold shadow-sm border border-white/10">
                        {item.album}
                      </span>
                    </div>
                  )}

                  {/* Play Button Overlay (For Video) or Zoom Overlay (For Photo) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideo ? (
                      <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-600 transition-all border-2 border-white">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium backdrop-blur-sm">
                    <Calendar className="w-3 h-3 text-desa-gold-400" />
                    <span>{formatDateIndonesia(item.tanggal)}</span>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-desa-green-800 transition-colors line-clamp-2 leading-snug">
                    {item.judul}
                  </h3>
                  {item.keterangan && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.keterangan}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-12 text-center">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada dokumentasi ditemukan</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Silakan pilih filter tipe media lain atau pilih semua album.
          </p>
        </div>
      )}

      {/* LIGHTBOX MODAL (FOR PHOTOS) */}
      {currentLightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Tutup (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev/Next */}
          <button
            type="button"
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Box */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full max-h-[75vh] aspect-[16/10] rounded-xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={getMediaUrl(currentLightboxItem.foto, '/images/hero-desa.jpg')}
                alt={currentLightboxItem.judul}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>

            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <div className="flex items-center justify-center gap-3 text-xs text-desa-gold-400 font-bold mb-1">
                {currentLightboxItem.album && <span>Album: {currentLightboxItem.album}</span>}
                <span>•</span>
                <span>{formatDateIndonesia(currentLightboxItem.tanggal)}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold">{currentLightboxItem.judul}</h4>
              {currentLightboxItem.keterangan && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {currentLightboxItem.keterangan}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIDEO MODAL (FOR YOUTUBE VIDEOS) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Tutup Video (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.judul}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="p-4 sm:p-5 text-white">
              <div className="flex items-center gap-2 text-xs text-rose-400 font-bold mb-1">
                <Play className="w-3.5 h-3.5 fill-rose-400" />
                <span>Dokumentasi Video Desa</span>
                <span>•</span>
                <span>{formatDateIndonesia(activeVideo.tanggal)}</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg">{activeVideo.judul}</h3>
              {activeVideo.keterangan && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {activeVideo.keterangan}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
