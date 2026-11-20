import React from 'react'
import { clsx } from 'clsx'

export interface ProseProps {
  children: React.ReactNode
  className?: string
}

/**
 * Komponen Prose Standar Teks Bacaan Desa Bolali
 * - Lebar maksimal 70ch untuk keterbacaan optimal
 * - Tinggi baris 1.7 (leading-[1.7])
 * - Format rapi untuk heading, paragraf, daftar, tabel, dan kutipan
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={clsx(
        'max-w-[70ch] leading-[1.7] text-slate-700 text-sm sm:text-base font-sans',
        '[&>p]:mb-4 [&>p:last-child]:mb-0',
        '[&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-desa-textDark [&>h2]:tracking-tight [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-slate-100',
        '[&>h3]:text-base sm:[&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-desa-textDark [&>h3]:mt-6 [&>h3]:mb-2',
        '[&>h4]:text-sm sm:[&>h4]:text-base [&>h4]:font-bold [&>h4]:text-desa-textDark [&>h4]:mt-4 [&>h4]:mb-1.5',
        '[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ul]:mb-4',
        '[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>ol]:mb-4',
        '[&>blockquote]:border-l-4 [&>blockquote]:border-desa-accentGreen [&>blockquote]:bg-emerald-50/50 [&>blockquote]:pl-4 [&>blockquote]:py-2.5 [&>blockquote]:pr-3 [&>blockquote]:my-5 [&>blockquote]:rounded-r-desa-sm [&>blockquote]:italic [&>blockquote]:text-slate-800',
        '[&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-desa-border [&>table]:rounded-desa-sm [&>table]:my-5 [&>table]:text-xs sm:[&>table]:text-sm',
        '[&_th]:bg-slate-50 [&_th]:border [&_th]:border-desa-border [&_th]:p-2.5 [&_th]:text-left [&_th]:font-bold [&_th]:text-desa-textDark',
        '[&_td]:border [&_td]:border-desa-border [&_td]:p-2.5 [&_td]:text-slate-700',
        '[&_strong]:font-bold [&_strong]:text-desa-textDark',
        className
      )}
    >
      {children}
    </div>
  )
}
