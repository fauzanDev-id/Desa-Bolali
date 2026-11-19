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

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex items-center text-xs sm:text-sm text-slate-500 py-3', className)}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {/* Home */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-desa-green-900 transition-colors"
          >
            <Home className="w-4 h-4 text-desa-green-800" />
            <span>Beranda</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-desa-green-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={clsx(
                    isLast ? 'font-semibold text-desa-green-950' : 'text-slate-600'
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
