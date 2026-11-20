import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'
import type { BreadcrumbItem } from './Breadcrumb'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  badgeIcon?: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  bgImage?: string
  className?: string
}

/**
 * PageHeader Resmi Website Desa Bolali
 * - Banner pendek tinggi 160-200px
 * - Foto lanskap desa dengan overlay gelap tipis seragam (bukan gradient warna-warni)
 * - Judul halaman putih tebal
 * - Breadcrumb di bawah judul dengan kontras teks terang
 */
export function PageHeader({
  title,
  subtitle,
  badge,
  badgeIcon,
  breadcrumbs = [],
  bgImage = '/seed/hero-desa.jpg',
  className = '',
}: PageHeaderProps) {
  return (
    <section
      aria-label={`Header Halaman: ${title}`}
      className={`relative w-full h-[170px] sm:h-[190px] md:h-[200px] flex items-center bg-desa-darkGreen overflow-hidden select-none ${className}`}
    >
      {/* Background Image Foto Desa */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay Gelap Tipis Seragam untuk Kontras Aksesibilitas WCAG AA */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Konten Judul & Breadcrumb: Container 1344px */}
      <div className="relative z-10 max-w-[1344px] w-full mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center">
        {/* Badge Kategori Opsional */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 text-desa-gold text-xs font-semibold backdrop-blur-xs border border-white/20 w-fit mb-2">
            {badgeIcon && <span className="w-3.5 h-3.5">{badgeIcon}</span>}
            <span>{badge}</span>
          </div>
        )}

        {/* Judul Halaman Putih Sangat Tebal */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm font-sans">
          {title}
        </h1>

        {/* Subjudul Pendek Opsional */}
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-white/90 max-w-2xl font-sans line-clamp-1 drop-shadow-xs">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb Terintegrasi di Bawah Judul */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Navigasi Halaman" className="mt-2.5 sm:mt-3">
            <ol className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-xs text-white/80 font-medium">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-white/80 hover:text-white transition-colors"
                >
                  <Home className="w-3.5 h-3.5 text-desa-gold" strokeWidth={1.75} />
                  <span>Beranda</span>
                </Link>
              </li>

              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1

                return (
                  <li key={idx} className="inline-flex items-center gap-1 sm:gap-1.5">
                    <ChevronRight className="w-3 h-3 text-white/60 shrink-0" strokeWidth={1.75} />
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="text-white/80 hover:text-white transition-colors truncate max-w-[160px] sm:max-w-none"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-desa-gold font-bold truncate max-w-[180px] sm:max-w-none">
                        {item.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  )
}
