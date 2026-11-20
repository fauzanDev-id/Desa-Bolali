'use client'

import React, { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  staggerIndex?: number
  className?: string
}

/**
 * Komponen Ringan Scroll Reveal
 * - Menggunakan native IntersectionObserver tanpa library besar
 * - Fade-in + Naik 16px, durasi 400ms
 * - Berjalan sekali saja (unobserve setelah tampak)
 * - Dukungan stagger 60ms untuk kartu dalam grup
 * - CLS = 0 (hanya opacity dan transform GPU)
 * - Menghormati prefers-reduced-motion
 */
export function ScrollReveal({
  children,
  staggerIndex = 0,
  className,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    // Jika pengguna mengaktifkan prefers-reduced-motion, langsung tampilkan
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsRevealed(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.unobserve(node)
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const delayStyle =
    !isRevealed || staggerIndex <= 0
      ? undefined
      : { transitionDelay: `${staggerIndex * 60}ms` }

  return (
    <div
      ref={ref}
      style={delayStyle}
      className={clsx(
        'scroll-reveal',
        isRevealed && 'is-revealed',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
