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
  MapPin,
  Phone,
  Mail,
} from 'lucide-react'
import type { WebsiteSettingsData, ContactData } from '@/lib/cms'

interface NavbarProps {
  settings: WebsiteSettingsData
  contact?: ContactData
}

export function Navbar({ settings, contact }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Tutup dropdown desktop saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Kunci scroll saat drawer mobile terbuka & fokus tertangkap
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      // Auto-focus tombol tutup untuk aksesibilitas
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 50)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Tutup menu saat menekan tombol Escape & keyboard focus trap
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }

      // Simple focus trap untuk drawer mobile
      if (mobileMenuOpen && event.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              event.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              event.preventDefault()
            }
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Tutup menu mobile saat route berganti
  useEffect(() => {
    setMobileMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const menuItems = settings.menuNavigasi || []
  const sosmed = settings.mediaSosial

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
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] sm:h-[76px] gap-2 sm:gap-4 lg:gap-6">
          {/* Sisi Kiri: Logo Resmi & Identitas Desa */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 group py-1 select-none focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen rounded-desa-sm"
          >
            <div className="relative w-9 h-10 sm:w-11 sm:h-12 shrink-0">
              <Image
                src={
                  settings.logo && typeof settings.logo === 'object' && settings.logo.url
                    ? settings.logo.url
                    : '/seed/logo-desa-placeholder.svg'
                }
                alt={settings.namaWebsite || 'Logo Desa Bolali'}
                fill
                sizes="(max-width: 640px) 36px, 48px"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl font-black text-desa-darkGreen tracking-tight leading-none group-hover:text-desa-greenHover transition-colors font-sans truncate">
                {settings.namaWebsite || 'Desa Bolali'}
              </span>
              <span className="text-[10px] sm:text-xs text-desa-textMuted font-medium tracking-tight mt-1 truncate max-w-[170px] xs:max-w-[210px] sm:max-w-[340px]">
                {settings.subInstansi || 'Kecamatan Wonosari • Kabupaten Klaten • Jawa Tengah'}
              </span>
            </div>
          </Link>

          {/* Sisi Tengah: Navigasi Desktop (>=1280px / xl) */}
          <nav
            ref={dropdownRef}
            aria-label="Navigasi Utama"
            className="hidden xl:flex items-center gap-1 text-[13px] font-semibold text-desa-textDark"
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
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen ${
                        isActive
                          ? 'bg-desa-darkGreen text-white shadow-desa-sm'
                          : 'text-desa-textDark hover:text-desa-darkGreen hover:bg-desa-lightGreen'
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span className="whitespace-nowrap">{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>

                    {/* Dropdown Card: Fade + Turun 4px, 150ms */}
                    {isDropdownOpen && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 mt-1 w-56 rounded-desa-card bg-desa-surface shadow-desa-dropdown border border-desa-border p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ease-out motion-reduce:animate-none"
                      >
                        {item.submenus!.map((sub, sIndex) => {
                          const isSubActive = pathname === sub.url
                          return (
                            <Link
                              key={sIndex}
                              href={sub.url}
                              className={`block px-3.5 py-2 rounded-desa-sm text-xs font-medium transition-colors whitespace-nowrap ${
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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-150 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen ${
                    isActive
                      ? 'bg-desa-darkGreen text-white shadow-desa-sm font-bold'
                      : 'text-desa-textDark hover:text-desa-darkGreen hover:bg-desa-lightGreen'
                  }`}
                >
                  {isBeranda && <Home className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />}
                  <span className="whitespace-nowrap">{item.label}</span>
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
                className="w-44 2xl:w-48 pl-3.5 pr-8 py-1.5 text-xs rounded-full bg-slate-50 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen focus:border-transparent transition-all placeholder:text-desa-textMuted"
              />
              <button
                type="submit"
                aria-label="Cari Informasi"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen transition-colors focus:outline-none"
              >
                <Search className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </form>
          </div>

          {/* Tombol Hamburger Mobile (< xl) dengan Target Sentuh Minimal 44x44px */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-full text-desa-textDark hover:text-desa-darkGreen hover:bg-slate-100 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
              aria-label="Buka Menu Navigasi"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 text-desa-darkGreen" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Menu Mobile (< xl) dengan Backdrop & Kunci Scroll */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          {/* Backdrop gelap */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi Mobile"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[360px] bg-white z-50 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div>
              {/* Header Drawer: Logo & Tombol Tutup Jelas */}
              <div className="p-4 border-b border-desa-border flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-9 rounded-desa-sm bg-desa-darkGreen text-desa-gold p-1 flex items-center justify-center shrink-0 border border-desa-gold/50">
                    <Shield className="w-5 h-5 text-desa-gold fill-desa-gold/20" strokeWidth={1.75} />
                  </div>
                  <span className="font-bold text-sm text-desa-darkGreen font-sans">
                    Menu Desa Bolali
                  </span>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] p-2 rounded-full text-desa-textDark hover:text-desa-darkGreen hover:bg-slate-200/70 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
                  aria-label="Tutup Menu Navigasi"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>

              {/* Kolom Pencarian Mobile */}
              <div className="p-4 border-b border-desa-border">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Cari berita, agenda, pengumuman..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 text-xs rounded-full bg-slate-100 border border-desa-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen min-h-[44px]"
                  />
                  <button
                    type="submit"
                    aria-label="Cari"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-desa-textMuted hover:text-desa-darkGreen min-w-[36px] min-h-[36px] flex items-center justify-center"
                  >
                    <Search className="w-4 h-4" strokeWidth={1.75} />
                  </button>
                </form>
              </div>

              {/* Daftar Menu Accordion */}
              <div className="p-3 space-y-1">
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
                          className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-desa-sm text-sm font-semibold transition-colors ${
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
                            strokeWidth={1.75}
                          />
                        </button>

                        {/* Accordion Submenu */}
                        {isExpanded && (
                          <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-desa-sm my-1">
                            {item.submenus!.map((sub, sIndex) => (
                              <Link
                                key={sIndex}
                                href={sub.url}
                                className={`block px-3 py-2.5 rounded-desa-sm text-xs font-medium transition-colors min-h-[40px] flex items-center ${
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
                      className={`min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-desa-sm text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-desa-darkGreen text-white'
                          : 'text-desa-textDark hover:bg-slate-100'
                      }`}
                    >
                      {isBeranda && <Home className="w-4 h-4 text-desa-gold" strokeWidth={1.75} />}
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Bagian Bawah Drawer: Kontak Desa & Media Sosial (Pindahan dari TopBar untuk <768px) */}
            {contact && (
              <div className="p-4 bg-slate-50 border-t border-desa-border space-y-3">
                <div className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider">
                  Kontak Resmi Desa
                </div>

                <div className="space-y-2 text-xs text-desa-textDark">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-desa-accentGreen shrink-0 mt-0.5" strokeWidth={1.75} />
                    <span className="leading-snug text-desa-textMuted">{contact.alamat}</span>
                  </div>

                  {contact.telepon && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                      <a
                        href={`tel:${contact.telepon.replace(/[^0-9+]/g, '')}`}
                        className="text-desa-darkGreen font-semibold hover:underline"
                      >
                        {contact.telepon}
                      </a>
                    </div>
                  )}

                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-desa-darkGreen font-semibold hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Media Sosial */}
                {sosmed && (
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-3">
                    {sosmed.youtube && (
                      <a
                        href={sosmed.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-desa-darkGreen transition-colors"
                        aria-label="YouTube"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </a>
                    )}
                    {sosmed.facebook && (
                      <a
                        href={sosmed.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-desa-darkGreen transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {sosmed.instagram && (
                      <a
                        href={sosmed.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-desa-darkGreen transition-colors"
                        aria-label="Instagram"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {sosmed.tiktok && (
                      <a
                        href={sosmed.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-desa-darkGreen transition-colors"
                        aria-label="TikTok"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.23 1.03.14 2.19.94 2.87.75.66 1.83.84 2.78.53.86-.27 1.54-.97 1.75-1.85.12-.51.13-1.03.13-1.55.01-5.69 0-11.38 0-17.07z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
