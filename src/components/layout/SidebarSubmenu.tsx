'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CaretDown, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { clsx } from 'clsx'

export interface SubmenuItem {
  label: string
  href: string
  icon?: React.ReactNode
}

export interface SidebarSubmenuProps {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  items: SubmenuItem[]
  className?: string
}

/**
 * Sidebar Submenu Standar Halaman Dalam:
 * - >=1024 (lg): sidebar submenu lebar tetap 280px di kiri
 *   - Menu grup yang sedang dibuka
 *   - Item aktif ditandai garis hijau tebal di kiri (border-l-4 border-desa-primaryGreen)
 * - <1024: sidebar menjadi dropdown interaktif "Pilih halaman" di atas konten
 */
export function SidebarSubmenu({
  title,
  subtitle,
  icon,
  items,
  className,
}: SidebarSubmenuProps) {
  const pathname = usePathname()
  const router = useRouter()

  // Cari item aktif atau item pertama
  const activeItem = items.find((item) => pathname === item.href) || items[0]

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetHref = e.target.value
    if (targetHref && targetHref !== pathname) {
      router.push(targetHref)
    }
  }

  return (
    <aside className={clsx('w-full', className)}>
      {/* 1. TAMPILAN TABLET & MOBILE (<1024px): Dropdown "Pilih Halaman" di Atas Konten */}
      <div className="lg:hidden mb-6 bg-white rounded-desa-card border border-desa-border shadow-desa-sm p-3.5">
        <label
          htmlFor="mobile-submenu-select"
          className="flex items-center gap-2 text-xs font-bold text-desa-darkGreen uppercase tracking-wider mb-2 font-sans"
        >
          {icon && <span className="text-desa-accentGreen shrink-0">{icon}</span>}
          <span>Pilih Halaman {title}:</span>
        </label>

        <div className="relative">
          <select
            id="mobile-submenu-select"
            value={activeItem?.href || items[0]?.href}
            onChange={handleDropdownChange}
            aria-label={`Pilih Halaman ${title}`}
            className="w-full appearance-none bg-slate-50 border border-desa-border rounded-desa-sm px-3.5 py-2.5 pr-10 text-xs sm:text-sm font-semibold text-desa-textDark shadow-2xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen focus:border-transparent transition-all min-h-[44px]"
          >
            {items.map((item, idx) => (
              <option key={idx} value={item.href}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-desa-textMuted">
            <CaretDown className="w-4 h-4 text-desa-darkGreen" />
          </div>
        </div>
      </div>

      {/* 2. TAMPILAN DESKTOP (>=1024px): Sidebar 280px di Kiri dengan Garis Hijau di Kiri untuk Item Aktif */}
      <div className="hidden lg:block sticky top-24 w-[280px] bg-white rounded-desa-card border border-desa-border shadow-desa-sm overflow-hidden select-none">
        {/* Header Widget Sidebar */}
        <div className="bg-desa-darkGreen px-4 py-3.5 text-white flex items-center gap-2.5">
          {icon && (
            <div className="w-8 h-8 rounded-desa-sm bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-desa-gold">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-bold text-sm tracking-tight text-white font-sans truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-emerald-100/80 font-medium truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Daftar Navigasi Submenu */}
        <nav aria-label={`Submenu ${title}`} className="py-2">
          {items.map((item, idx) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={idx}
                href={item.href}
                className={clsx(
                  'group flex items-center justify-between px-4 py-3 text-xs sm:text-[13px] transition-all border-l-4 min-h-[44px]',
                  isActive
                    ? 'border-desa-primaryGreen bg-desa-lightGreen text-desa-darkGreen font-bold shadow-2xs'
                    : 'border-transparent text-desa-textDark hover:bg-slate-50 hover:text-desa-primaryGreen font-medium'
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.icon && (
                    <span
                      className={clsx(
                        'shrink-0',
                        isActive ? 'text-desa-primaryGreen' : 'text-slate-400 group-hover:text-desa-primaryGreen'
                      )}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="truncate">{item.label}</span>
                </div>

                <CaretRight
                  className={clsx(
                    'w-3.5 h-3.5 shrink-0 transition-transform duration-150',
                    isActive
                      ? 'text-desa-primaryGreen translate-x-0.5'
                      : 'text-slate-300 group-hover:text-desa-primaryGreen group-hover:translate-x-0.5'
                  )}
                />
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
