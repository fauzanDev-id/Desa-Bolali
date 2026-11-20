import React from 'react'
import { clsx } from 'clsx'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  variant?: 'primary' | 'dark' | 'gold' | 'accent' | 'muted' | 'outline'
  size?: 'sm' | 'md'
  shape?: 'pill' | 'sm'
  className?: string
}

/**
 * Komponen Badge Kategori & Status
 * - Varian warna formal pemerintahan
 * - Radius: pill (rounded-full) atau sm (rounded-desa-sm)
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  shape = 'pill',
  className,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-desa-lightGreen text-desa-darkGreen border border-emerald-200/80',
    dark: 'bg-desa-darkGreen text-white',
    gold: 'bg-desa-goldLight text-desa-goldHover border border-desa-gold/30',
    accent: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    muted: 'bg-slate-100 text-desa-textMuted border border-slate-200',
    outline: 'border border-desa-border text-desa-textDark bg-white',
  }

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 font-semibold',
    md: 'text-xs px-3 py-1 font-semibold',
  }

  const shapes = {
    pill: 'rounded-full',
    sm: 'rounded-desa-sm',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 select-none font-sans',
        variants[variant],
        sizes[size],
        shapes[shape],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
