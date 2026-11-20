import React from 'react'
import { clsx } from 'clsx'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'main' | 'header' | 'footer'
}

/**
 * Komponen Container Standar Seluruh Halaman Desa Bolali
 * - Lebar maksimal: 1344px (max-w-[1344px])
 * - Padding horizontal: 16px (mobile), 24px (tablet), 32px (desktop)
 */
export function Container({
  children,
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        'max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 w-full',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
