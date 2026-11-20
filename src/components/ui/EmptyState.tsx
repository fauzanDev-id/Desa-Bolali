import React from 'react'
import { Inbox } from 'lucide-react'
import { clsx } from 'clsx'
import { Button, type ButtonProps } from './Button'

export interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    href?: string
    onClick?: () => void
    variant?: ButtonProps['variant']
  }
  className?: string
}

/**
 * Tampilan Status Data Kosong Standar:
 * - Bahasa pemerintahan desa yang lugas tanpa hiperbola marketing
 * - Ikon Lucide 24px ber-stroke 1.75
 * - Tombol aksi opsional bentuk pil
 */
export function EmptyState({
  title = 'Belum Ada Data Tersedia',
  description = 'Informasi untuk bagian ini belum dipublikasikan oleh pengelola desa.',
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-desa-card border border-desa-border shadow-desa-sm select-none',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-slate-100 text-desa-textMuted flex items-center justify-center mb-4">
        {icon && React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, {
              className: clsx(
                (icon.props as { className?: string }).className || 'w-6 h-6',
                'text-desa-textMuted'
              ),
              strokeWidth: 1.75,
            })
          : <Inbox className="w-6 h-6 text-desa-textMuted" strokeWidth={1.75} />}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-desa-textDark tracking-tight font-sans">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-desa-textMuted mt-1.5 max-w-md leading-relaxed">
        {description}
      </p>

      {action && (
        <div className="mt-5">
          <Button
            href={action.href}
            onClick={action.onClick}
            variant={action.variant || 'primary'}
            size="sm"
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}
