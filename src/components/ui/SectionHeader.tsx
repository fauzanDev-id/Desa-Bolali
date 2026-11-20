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
 * - Ikon Lucide 16px atau 20px ber-stroke 1.75
 * - Aksi teks "Lihat Semua →" dengan panah 16px
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
        'flex items-center justify-between gap-3 mb-3.5 select-none',
        className
      )}
    >
      {/* Judul & Ikon */}
      <div className="flex items-center gap-2.5 min-w-0">
        {icon && (
          <div className="w-7 h-7 rounded-desa-sm bg-desa-lightGreen text-desa-accentGreen flex items-center justify-center shrink-0 border border-emerald-200/80">
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
          <h2 className="text-base sm:text-lg font-bold text-desa-textDark tracking-tight leading-snug font-sans truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-desa-textMuted mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Aksi "Lihat Semua" / "Lihat Detail" */}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-desa-darkGreen hover:text-desa-greenHover transition-colors shrink-0 py-1"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </Link>
      )}
    </div>
  )
}
