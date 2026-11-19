import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function SectionCard({
  children,
  className,
  hoverEffect = false,
  ...props
}: SectionCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-card-lg border border-slate-200/90 shadow-card p-4 sm:p-6',
          hoverEffect && 'transition-all duration-300 hover:shadow-card-hover hover:border-desa-green-300',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  )
}
