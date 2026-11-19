import React from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:
      'bg-desa-green-900 hover:bg-desa-green-800 text-white shadow-sm hover:shadow focus:ring-desa-green-700 active:bg-desa-green-950',
    gold:
      'bg-desa-gold-500 hover:bg-desa-gold-600 text-slate-900 font-semibold shadow-sm hover:shadow focus:ring-desa-gold-400 active:bg-desa-gold-700',
    outline:
      'border border-desa-green-900 text-desa-green-900 hover:bg-desa-green-50 focus:ring-desa-green-700 active:bg-desa-green-100',
    ghost:
      'text-slate-700 hover:bg-slate-100 focus:ring-slate-400 active:bg-slate-200',
    white:
      'bg-white text-desa-green-900 hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow focus:ring-desa-green-700',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold',
  }

  const combinedClasses = twMerge(clsx(baseStyles, variants[variant], sizes[size], className))

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  )
}
