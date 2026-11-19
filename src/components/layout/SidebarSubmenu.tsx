'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

export interface SubmenuItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface SidebarSubmenuProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  items: SubmenuItem[]
  className?: string
}

export function SidebarSubmenu({
  title,
  subtitle,
  icon,
  items,
  className,
}: SidebarSubmenuProps) {
  const pathname = usePathname()

  return (
    <aside className={clsx('w-full', className)}>
      {/* Mobile Horizontal Scrollable Pills */}
      <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-none flex items-center gap-2 pb-2">
        {items.map((item, idx) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={idx}
              href={item.href}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-desa-green-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.icon && <span className="w-3.5 h-3.5">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Desktop Sticky Vertical Card */}
      <div className="hidden lg:block sticky top-28 bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
        {/* Header Widget */}
        <div className="bg-gradient-to-r from-desa-green-900 to-desa-green-950 p-4 text-white flex items-center gap-3">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-bold text-sm tracking-tight">{title}</h3>
            {subtitle && (
              <p className="text-[11px] text-emerald-200/80">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="p-2 space-y-1">
          {items.map((item, idx) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={idx}
                href={item.href}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-desa-green-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-desa-green-900 hover:bg-desa-green-50/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon && (
                    <span
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-desa-gold-400' : 'text-slate-400 group-hover:text-desa-green-800'
                      }`}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </div>

                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isActive
                      ? 'text-desa-gold-400 translate-x-0.5'
                      : 'text-slate-300 group-hover:text-desa-green-800 group-hover:translate-x-0.5'
                  }`}
                />
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
