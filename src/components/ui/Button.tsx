import React from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'gold' | 'outline' | 'outline-white'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: React.ReactNode
}

/**
 * Komponen Tombol Standar Sesuai Aturan Sistem Desain:
 * - Bentuk: Pil (rounded-full)
 * - Varian: primary (hijau utama), dark (hijau tua desa), gold (kuning emas), outline, outline-white
 * - Ukuran: sm (min 36px) & md (min 44px memenuhi aksesibilitas sentuhan)
 * - Ikon: Lucide dengan stroke 1.75
 */
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
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-desa-primaryGreen hover:bg-desa-greenHover text-white shadow-desa-sm focus:ring-desa-primaryGreen',
    dark:
      'bg-desa-darkGreen hover:bg-desa-greenHover text-white shadow-desa-sm focus:ring-desa-darkGreen',
    gold:
      'bg-desa-gold hover:bg-desa-goldHover text-desa-darkGreen font-bold shadow-desa-sm focus:ring-desa-gold',
    outline:
      'border border-desa-darkGreen text-desa-darkGreen hover:bg-desa-lightGreen focus:ring-desa-darkGreen',
    'outline-white':
      'border border-white/80 text-white hover:bg-white/10 backdrop-blur-xs focus:ring-white',
  }

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 min-h-[36px] gap-1.5',
    md: 'text-sm px-5 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5 font-bold',
  }

  const combinedClasses = twMerge(clsx(baseStyles, variants[variant], sizes[size], className))

  const renderedIcon = icon && React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, {
        className: clsx((icon.props as { className?: string }).className || 'w-4 h-4', 'shrink-0'),
        strokeWidth: 1.75,
      })
    : icon

  const content = (
    <>
      {renderedIcon && iconPosition === 'left' && renderedIcon}
      <span>{children}</span>
      {renderedIcon && iconPosition === 'right' && renderedIcon}
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
