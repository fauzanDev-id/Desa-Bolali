import React from 'react'
import { clsx } from 'clsx'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: 'text' | 'circular' | 'card'
}

/**
 * Komponen Skeleton Loading Ringan
 * - Warna abu lembut netral tanpa efek berlebihan
 * - Radius mengikuti aturan 3 nilai
 */
export function Skeleton({
  className,
  variant = 'text',
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-desa-sm',
    circular: 'rounded-full',
    card: 'h-32 w-full rounded-desa-card',
  }

  return (
    <div
      className={clsx(
        'animate-pulse bg-slate-200/80',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
