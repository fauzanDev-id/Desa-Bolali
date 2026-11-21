'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Newspaper } from '@phosphor-icons/react/dist/ssr'
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
      className={clsx('shrink-0 w-6 h-6', className)}
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
 * - Judul: 17px/600 (font-semibold, letter-spacing 0, whitespace-nowrap)
 * - Emblem daun tunggal 24px untuk SEMUA section, KECUALI Berita (koran solid hijau)
 * - Tautan aksi "Lihat Semua →" / "Lihat Detail →" dengan panah bold 13px/600 hijau di kanan
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
      <div className="flex items-center gap-2 min-w-0">
        <div className="shrink-0 flex items-center justify-center">
          {isBeritaSection ? (
            <Newspaper size={24} weight="fill" className="text-[#1E7F3A]" />
          ) : (
            <SectionEmblem className="w-6 h-6" />
          )}
        </div>
        <h2 className="text-[17px] font-semibold text-slate-900 leading-snug font-sans whitespace-nowrap">
          {title}
        </h2>
        {subtitle && (
          <span className="text-xs text-slate-500 font-normal truncate hidden sm:inline">
            — {subtitle}
          </span>
        )}
      </div>

      {/* Tautan "Lihat Semua →" / "Lihat Detail →" / "Lihat Peta →" */}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex items-center gap-1 text-[13px] font-semibold text-[#1E7F3A] hover:text-[#17632e] transition-colors shrink-0 py-0.5"
        >
          <span className="whitespace-nowrap">{linkText}</span>
          <ArrowRight
            size={13}
            weight="bold"
            className="transition-transform duration-150 group-hover:translate-x-0.5 text-[#1E7F3A]"
          />
        </Link>
      )}
    </div>
  )
}
