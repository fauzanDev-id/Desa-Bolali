import React from 'react'
import { clsx } from 'clsx'
import { Container } from './Container'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  withContainer?: boolean
  spacing?: 'sm' | 'md' | 'lg'
}

/**
 * Pembungkus Section Halaman Berjarak Vertikal Konsisten Kelipatan 4px
 * - sm: py-6 md:py-8 (24px - 32px)
 * - md: py-8 md:py-12 (32px - 48px)
 * - lg: py-12 md:py-16 (48px - 64px)
 */
export function Section({
  children,
  className,
  containerClassName,
  withContainer = true,
  spacing = 'md',
  ...props
}: SectionProps) {
  const spacingClasses = {
    sm: 'py-6 md:py-8',
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16',
  }

  return (
    <section className={clsx(spacingClasses[spacing], className)} {...props}>
      {withContainer ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  )
}
