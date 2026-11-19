'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Home,
  Shield,
  Layers,
  Info,
  Award,
  FileText,
  Image as ImageIcon,
  PhoneCall,
} from 'lucide-react'
import type { WebsiteSettingsData } from '@/lib/cms'

interface NavbarProps {
  settings: WebsiteSettingsData
}

export function Navbar({ settings }: NavbarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
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

  // Tutup menu mobile saat route berganti
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const menuItems = settings.menuNavigasi || []

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/informasi/berita?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  // Ikon pendukung untuk menu navigasi
  const getMenuIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'beranda':
        return <Home className="w-4 h-4" />
      case 'profil desa':
        return <Info className="w-4 h-4" />
      case 'pemerintahan':
        return <Shield className="w-4 h-4" />
      case 'informasi':
        return <Layers className="w-4 h-4" />
      case 'potensi desa':
        return <Award className="w-4 h-4" />
      case 'transparansi':
        return <FileText className="w-4 h-4" />
      case 'galeri':
        return <ImageIcon className="w-4 h-4" />
      case 'kontak':
        return <PhoneCall className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Identitas Desa */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group py-1">
            {settings.logo && typeof settings.logo === 'object' && settings.logo.url ? (
              <div className="relative w-11 h-12 shrink-0">
                <Image
                  src={settings.logo.url}
                  alt={settings.namaWebsite}
                  fill
                  sizes="48px"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              /* Logo Vektor Resmi Default Kabupaten Klaten / Lambang Desa */
              <div className="w-11 h-12 rounded-lg bg-gradient-to-b from-desa-green-800 to-desa-green-950 text-desa-gold-400 p-1.5 flex items-center justify-center shrink-0 shadow-sm border border-desa-gold-500/50">
                <Shield className="w-7 h-7 text-desa-gold-400 fill-desa-gold-400/20" />
              </div>
            )}

            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-desa-green-950 tracking-tight leading-none group-hover:text-desa-green-800 transition-colors">
                {settings.namaWebsite}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-tight mt-1 truncate max-w-[220px] sm:max-w-[340px]">
                {settings.subInstansi}
              </span>
            </div>
          </Link>

          {/* Navigasi Desktop */}
          <nav
            ref={dropdownRef}
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-slate-700"
          >
            {menuItems.map((item, index) => {
              const isActive =
                item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)
              const hasSubmenus = item.submenus && item.submenus.length > 0
              const isDropdownOpen = openDropdown === item.label

              if (hasSubmenus) {
                return (
                  <div key={index} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(isDropdownOpen ? null : item.label)
                      }
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-150 ${
                        isActive
                          ? 'bg-desa-green-900 text-white shadow-sm'
                          : 'text-slate-700 hover:text-desa-green-900 hover:bg-slate-100/80'
                      }`}
                      aria-expanded={isDropdownOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Popup */}
                    {isDropdownOpen && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 mt-1.5 w-56 rounded-xl bg-white shadow-float border border-slate-200/80 p-1.5 z-50 animate-dropdown"
                      >
                        {item.submenus!.map((sub, sIndex) => (
                          <Link
                            key={sIndex}
                            href={sub.url}
                            className="block px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-desa-green-950 hover:bg-desa-green-50 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
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
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-desa-green-900 text-white shadow-sm font-bold'
                      : 'text-slate-700 hover:text-desa-green-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.url === '/' && <Home className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Kolom Pencarian Desktop */}
          <div className="hidden md:flex items-center shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari informasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 lg:w-48 xl:w-56 pl-3.5 pr-8 py-2 text-xs rounded-full bg-slate-50 border border-slate-300/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-green-700 focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label="Cari"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-desa-green-900 transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Tombol Hamburger Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-desa-green-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-desa-green-700"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-desa-green-900" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-dropdown">
          {/* Kolom Pencarian Mobile */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Cari berita, agenda, pelayanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 text-sm rounded-lg bg-slate-100 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-green-700"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-desa-green-900"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Daftar Navigasi Mobile */}
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item, index) => {
              const isActive =
                item.url === '/' ? pathname === '/' : pathname.startsWith(item.url)
              const hasSubmenus = item.submenus && item.submenus.length > 0
              const isExpanded = mobileOpenDropdown === item.label

              if (hasSubmenus) {
                return (
                  <div key={index} className="border-b border-slate-100 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileOpenDropdown(isExpanded ? null : item.label)
                      }
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        {getMenuIcon(item.label)}
                        <span>{item.label}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-desa-green-900' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="pl-6 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-lg my-1">
                        {item.submenus!.map((sub, sIndex) => (
                          <Link
                            key={sIndex}
                            href={sub.url}
                            className="block px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-desa-green-900 hover:bg-emerald-50 rounded"
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
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm font-semibold rounded-lg ${
                    isActive
                      ? 'bg-desa-green-900 text-white'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {getMenuIcon(item.label)}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
