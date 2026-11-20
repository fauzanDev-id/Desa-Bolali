import React from 'react'
import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Komponen Breadcrumb Sesuai Aturan:
 * - Ikon Lucide 16px dengan stroke 1.75
 * - Ukuran teks konsisten, semantic nav & ol
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex items-center text-xs text-desa-textMuted py-3 select-none', className)}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {/* Beranda */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-desa-textMuted hover:text-desa-darkGreen transition-colors"
          >
            <Home className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />
            <span>Beranda</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.75} />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-desa-textMuted hover:text-desa-darkGreen transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast ? 'font-bold text-desa-textDark' : 'text-desa-textMuted'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
