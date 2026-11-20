import React from 'react'
import { clsx } from 'clsx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

/**
 * Kartu Konten Standar Website Desa Bolali
 * - Radius: 14px (rounded-desa-card)
 * - Bayangan: halus (shadow-desa-sm), hover halus (hover:shadow-desa-hover)
 * - Border: 1px border-desa-border
 * - Background: desa-surface (putih bersih)
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, hoverEffect = false, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'bg-desa-surface rounded-desa-card border border-desa-border shadow-desa-sm p-4 sm:p-5 md:p-6 transition-shadow duration-150',
        hoverEffect && 'hover:shadow-desa-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
