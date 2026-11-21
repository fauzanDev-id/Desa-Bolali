'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Newspaper } from '@phosphor-icons/react'
import { clsx } from 'clsx'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  linkText?: string
  linkHref?: string
  className?: string
  isNews?: boolean
}

/**
 * Emblem Daun Seragam Resmi Website Desa Bolali:
 * Perisai/Heksagon hijau dengan siluet daun putih 24px sesuai mockup resmi
 */
export function SectionEmblem({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('shrink-0', className)}
      aria-hidden="true"
    >
      {/* Heksagon / Perisai Hijau Solid */}
      <polygon
        points="12,1.5 21,6.5 21,17.5 12,22.5 3,17.5 3,6.5"
        fill="#1E7F3A"
      />
      {/* Siluet Daun Putih */}
      <path
        d="M12 5.5C12 5.5 16.5 8 16.5 13C16.5 15.5 14.5 17.5 12 17.5C9.5 17.5 7.5 15.5 7.5 13C7.5 8 12 5.5 12 5.5Z"
        fill="#FFFFFF"
      />
      {/* Tulang Daun Hijau */}
      <path
        d="M12 7.5V17"
        stroke="#1E7F3A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12 11.5L14.5 9.5M12 13.5L9.5 11.5"
        stroke="#1E7F3A"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Header Seksi Konten Standar Sesuai Mockup
 * - Judul: 17px/600 (font-semibold, letter-spacing 0)
 * - Emblem daun tunggal 24px untuk SEMUA section, KECUALI Berita (koran solid hijau)
 * - Tautan aksi "Lihat Semua / Lihat Detail" dengan panah bold 14px
 */
export function SectionHeader({
  title,
  subtitle,
  linkText,
  linkHref,
  className,
  isNews,
}: SectionHeaderProps) {
  const isBeritaSection = isNews || title.toLowerCase().includes('berita')

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 mb-3 select-none',
        className
      )}
    >
      {/* Judul & Ikon Emblem */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="shrink-0 flex items-center justify-center">
          {isBeritaSection ? (
            <Newspaper size={24} weight="fill" className="text-[#1E7F3A]" />
          ) : (
            <SectionEmblem className="w-6 h-6" />
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-[17px] font-semibold text-desa-textDark leading-snug font-sans">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-desa-textMuted mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Tautan "Lihat Semua →" / "Lihat Detail →" */}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-desa-primaryGreen hover:text-desa-darkGreen transition-colors shrink-0 py-1"
        >
          <span>{linkText}</span>
          <ArrowRight
            size={14}
            weight="bold"
            className="transition-transform duration-150 group-hover:translate-x-0.5 text-desa-primaryGreen"
          />
        </Link>
      )}
    </div>
  )
}
