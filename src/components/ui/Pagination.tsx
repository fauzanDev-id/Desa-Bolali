import React from 'react'
import Link from 'next/link'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
  getPageUrl?: (page: number) => string
  className?: string
}

/**
 * Kontrol Paginasi Halaman Bersih:
 * - Ukuran target sentuh minimal 44x44px (memenuhi WCAG)
 * - Ikon Lucide 16px stroke 1.75
 * - Radius pil untuk active state
 */
export function Pagination({
  currentPage,
  totalPages,
  baseUrl = '',
  getPageUrl,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const resolveUrl = (page: number) => {
    if (getPageUrl) {
      return getPageUrl(page)
    }
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`
  }

  // Tampilkan rentang halaman cerdas
  const pages: number[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i)
    }
  }

  return (
    <nav
      aria-label="Paginasi Halaman"
      className={clsx('flex items-center justify-center gap-1.5 sm:gap-2 py-6 select-none', className)}
    >
      {/* Tombol Sebelumnya */}
      {currentPage > 1 ? (
        <Link
          href={resolveUrl(currentPage - 1)}
          aria-label="Halaman Sebelumnya"
          className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-desa-border bg-white text-desa-textDark hover:bg-desa-lightGreen hover:text-desa-darkGreen flex items-center justify-center text-xs font-semibold transition-colors shadow-desa-sm"
        >
          <CaretLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Link>
      ) : (
        <span
          className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-desa-border/50 bg-slate-50 text-slate-300 flex items-center justify-center text-xs font-semibold cursor-not-allowed"
          aria-disabled="true"
        >
          <CaretLeft className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </span>
      )}

      {/* Nomor Halaman */}
      {pages.map((p, idx) => {
        const isCurrent = p === currentPage
        const prevPage = pages[idx - 1]
        const hasGap = prevPage && p - prevPage > 1

        return (
          <React.Fragment key={p}>
            {hasGap && (
              <span className="w-8 text-center text-slate-400 text-xs">...</span>
            )}
            <Link
              href={resolveUrl(p)}
              aria-label={`Halaman ${p}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={clsx(
                'min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-xs font-bold transition-colors shadow-desa-sm',
                isCurrent
                  ? 'bg-desa-darkGreen text-white'
                  : 'bg-white border border-desa-border text-desa-textDark hover:bg-desa-lightGreen hover:text-desa-darkGreen'
              )}
            >
              {p}
            </Link>
          </React.Fragment>
        )
      })}

      {/* Tombol Selanjutnya */}
      {currentPage < totalPages ? (
        <Link
          href={resolveUrl(currentPage + 1)}
          aria-label="Halaman Selanjutnya"
          className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-desa-border bg-white text-desa-textDark hover:bg-desa-lightGreen hover:text-desa-darkGreen flex items-center justify-center text-xs font-semibold transition-colors shadow-desa-sm"
        >
          <span className="hidden sm:inline">Selanjutnya</span>
          <CaretRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <span
          className="min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-desa-border/50 bg-slate-50 text-slate-300 flex items-center justify-center text-xs font-semibold cursor-not-allowed"
          aria-disabled="true"
        >
          <span className="hidden sm:inline">Selanjutnya</span>
          <CaretRight className="w-4 h-4 ml-1" />
        </span>
      )}
    </nav>
  )
}
