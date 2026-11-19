'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Home,
  Shield,
} from 'lucide-react'
import type { WebsiteSettingsData } from '@/lib/cms'

interface NavbarProps {
  settings: WebsiteSettingsData
}

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Tutup menu saat menekan tombol Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Tutup menu mobile saat route berganti
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const menuItems = settings.menuNavigasi || []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/informasi/berita?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    }
  }

  const toggleMobileGroup = (label: string) => {
    setMobileExpandedGroup((prev) => (prev === label ? null : label))
  }

  return (
    <header className="sticky top-0 z-50 bg-desa-surface border-b border-desa-border shadow-desa-sm transition-all duration-200">
      <div className="max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px] gap-3 lg:gap-6">
          {/* Sisi Kiri: Logo Resmi & Nama Desa Bolali */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group py-1 select-none focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen rounded-lg"
          >
            {settings.logo && typeof settings.logo === 'object' && settings.logo.url ? (
              <div className="relative w-11 h-12 shrink-0">
                <Image
                  src={settings.logo.url}
                  alt={settings.namaWebsite || 'Logo Desa Bolali'}
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="w-11 h-12 rounded-lg bg-desa-darkGreen text-desa-gold p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-desa-gold/50">
                <Shield className="w-7 h-7 text-desa-gold fill-desa-gold/20" />
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-desa-darkGreen tracking-tight leading-none group-hover:text-desa-greenHover transition-colors font-sans">
                {settings.namaWebsite || 'Desa Bolali'}
              </span>
              <span className="text-[11px] sm:text-xs text-desa-textMuted font-medium tracking-tight mt-1 truncate max-w-[200px] sm:max-w-[340px]">
                {settings.subInstansi || 'Kecamatan Wonosari • Kabupaten Klaten • Jawa Tengah'}
              </span>
            </div>
          </Link>

          {/* Sisi Tengah: Navigasi Desktop */}
          <nav
            ref={dropdownRef}
            aria-label="Navigasi Utama"
            className="hidden xl:flex items-center gap-1 text-[13.5px] font-semibold text-desa-textDark"
          >
            {menuItems.map((item, index) => {
              const isBeranda = item.url === '/'
              const isActive = isBeranda ? pathname === '/' : pathname.startsWith(item.url)
              const hasSubmenus = item.submenus && item.submenus.length > 0
              const isDropdownOpen = openDropdown === item.label

              if (hasSubmenus) {
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen ${
                        isActive
                          ? 'bg-desa-primaryGreen text-white shadow-desa-sm'
                          : 'text-desa-textDark hover:text-desa-darkGreen hover:bg-desa-lightGreen'
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Card */}
                    {isDropdownOpen && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 mt-1 w-56 rounded-xl bg-desa-surface shadow-desa-dropdown border border-desa-border p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                      >
                        {item.submenus!.map((sub, sIndex) => {
                          const isSubActive = pathname === sub.url
                          return (
                            <Link
                              key={sIndex}
                              href={sub.url}
                              className={`block px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                                isSubActive
                                  ? 'bg-desa-lightGreen text-desa-darkGreen font-bold'
                                  : 'text-desa-textDark hover:bg-desa-lightGreen hover:text-desa-darkGreen'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              // Menu tanpa submenu (misal: Beranda, Kontak)
              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen ${
                    isActive
                      ? 'bg-desa-primaryGreen text-white shadow-desa-sm font-bold'
                      : 'text-desa-textDark hover:text-desa-darkGreen hover:bg-desa-lightGreen'
                  }`}
                >
                  {isBeranda && <Home className="w-4 h-4 text-desa-gold" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sisi Kanan: Kolom Pencarian Desktop (Pill Shape) */}
          <div className="hidden xl:flex items-center shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari informasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 2xl:w-52 pl-3.5 pr-8 py-2 text-xs rounded-full bg-slate-50 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen focus:border-transparent transition-all placeholder:text-desa-textMuted"
              />
              <button
                type="submit"
                aria-label="Cari Informasi"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen transition-colors focus:outline-none"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Tombol Hamburger Mobile (< xl) */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-desa-textDark hover:text-desa-darkGreen hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
              aria-label={mobileMenuOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-desa-darkGreen" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Menu Mobile (< xl) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-desa-border bg-desa-surface px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          {/* Kolom Pencarian Mobile */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Cari berita, agenda, pelayanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 text-sm rounded-full bg-slate-100 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
            />
            <button
              type="submit"
              aria-label="Cari"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Daftar Menu Mobile */}
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isBeranda = item.url === '/'
              const isActive = isBeranda ? pathname === '/' : pathname.startsWith(item.url)
              const hasSubmenus = item.submenus && item.submenus.length > 0
              const isExpanded = mobileExpandedGroup === item.label

              if (hasSubmenus) {
                return (
                  <div key={index} className="border-b border-slate-100 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggleMobileGroup(item.label)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-desa-lightGreen text-desa-darkGreen'
                          : 'text-desa-textDark hover:bg-slate-50'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-desa-darkGreen' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-lg my-1">
                        {item.submenus!.map((sub, sIndex) => (
                          <Link
                            key={sIndex}
                            href={sub.url}
                            className={`block px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                              pathname === sub.url
                                ? 'bg-desa-lightGreen text-desa-darkGreen font-bold'
                                : 'text-desa-textDark hover:text-desa-darkGreen hover:bg-white'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-desa-primaryGreen text-white'
                      : 'text-desa-textDark hover:bg-slate-100'
                  }`}
                >
                  {isBeranda && <Home className="w-4 h-4 text-desa-gold" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
