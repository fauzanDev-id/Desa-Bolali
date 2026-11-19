import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'

export interface SectionTitleProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  linkText?: string
  linkHref?: string
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  icon,
  linkText,
  linkHref,
  className,
}: SectionTitleProps) {
  return (
    <div className={clsx('flex items-center justify-between gap-3 mb-4 sm:mb-5', className)}>
      {/* Title & Icon */}
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-desa-green-100 text-desa-green-800 flex items-center justify-center shrink-0 border border-desa-green-200">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Action / "Lihat Semua" Link */}
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-desa-green-800 hover:text-desa-green-950 transition-colors"
        >
          <span>{linkText}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
