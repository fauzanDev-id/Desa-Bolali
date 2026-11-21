import React from 'react'
import { clsx } from 'clsx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

/**
 * Kartu Konten Standar Website Desa Bolali Sesuai Mockup
 * - Radius: 14px (rounded-desa-card)
 * - Bayangan: halus (shadow-desa-sm), hover halus (hover:shadow-desa-hover)
 * - Border: 1px border-desa-border
 * - Background: desa-surface (putih bersih)
 * - Padding: p-4 sm:p-4.5 md:p-5 rapat & rapi persis mockup
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, hoverEffect = false, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx(
        'bg-desa-surface rounded-desa-card border border-desa-border shadow-desa-sm p-4 transition-shadow duration-150 flex flex-col',
        hoverEffect && 'hover:shadow-desa-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
