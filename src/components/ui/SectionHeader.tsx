import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  linkText?: string
  linkHref?: string
  className?: string
}

/**
 * Header Seksi Konten Standar Sesuai Pola Mockup
 * - Judul tebal bernuansa institusi desa
 * - Ikon Lucide 16px/18px ber-stroke 1.75 langsung di samping judul (tanpa box kotak berlebih)
 * - Aksi teks "Lihat Semua →" dengan panah 14px
 */
export function SectionHeader({
  title,
  subtitle,
  icon,
  linkText,
  linkHref,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 mb-3.5 select-none',
        className
      )}
    >
      {/* Judul & Ikon (Sesuai Mockup: Ikon langsung berdampingan dengan Judul) */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {icon && (
          <div className="shrink-0 flex items-center justify-center text-desa-accentGreen">
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, {
                  className: clsx(
                    (icon.props as { className?: string }).className || 'w-4 h-4',
                    'text-desa-accentGreen'
                  ),
                  strokeWidth: 1.75,
                })
              : icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-desa-textDark tracking-tight leading-snug font-sans">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-desa-textMuted mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Tautan "Lihat Semua →" / "Lihat Detail →" Sesuai Mockup */}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-desa-primaryGreen hover:text-desa-darkGreen transition-colors shrink-0 py-1"
        >
          <span>{linkText}</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
      )}
    </div>
  )
}
