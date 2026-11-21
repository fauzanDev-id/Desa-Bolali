'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  House,
  CaretDown,
  MagnifyingGlass,
  List,
  X,
  MapPin,
  Phone,
  Envelope,
} from '@phosphor-icons/react'
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6'
import type { WebsiteSettingsData, ContactData } from '@/lib/cms'

interface NavbarProps {
  settings: WebsiteSettingsData
  contact?: ContactData
  isScrolled?: boolean
}

export function Navbar({ settings, contact, isScrolled: isScrolledProp }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [localScrolled, setLocalScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Pantau scroll untuk beralih dari transparan (90%) ke putih solid dengan bayangan tipis
  useEffect(() => {
    function handleScroll() {
      setLocalScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isScrolled = isScrolledProp !== undefined ? isScrolledProp : localScrolled
  const isBeranda = pathname === '/'
  const navBgClass = !isBeranda
    ? 'bg-white shadow-sm border-b border-slate-100'
    : isScrolled
    ? 'bg-white shadow-sm border-b border-slate-100'
    : 'bg-white/90 backdrop-blur-xs border-b border-white/20'

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

  // Keyboard navigation untuk accessibility
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null)
        setMobileMenuOpen(false)
      }

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

  useEffect(() => {
    setOpenDropdown(null)
    setMobileMenuOpen(false)
  }, [pathname])

  const menuItems = [
    { label: 'Beranda', url: '/' },
    {
      label: 'Profil Desa',
      url: '/profil',
      submenus: [
        { label: 'Sejarah Desa', url: '/profil/sejarah' },
        { label: 'Visi & Misi', url: '/profil/visi-misi' },
        { label: 'Geografis & Peta', url: '/profil/geografis' },
        { label: 'Data Kependudukan', url: '/profil/demografi' },
      ],
    },
    {
      label: 'Pemerintahan',
      url: '/pemerintahan',
      submenus: [
        { label: 'Struktur Organisasi', url: '/pemerintahan/struktur' },
        { label: 'Perangkat Desa', url: '/pemerintahan/perangkat-desa' },
        { label: 'Badan Permusyawaratan Desa (BPD)', url: '/pemerintahan/bpd' },
      ],
    },
    {
      label: 'Informasi',
      url: '/informasi',
      submenus: [
        { label: 'Berita Desa', url: '/informasi/berita' },
        { label: 'Pengumuman', url: '/informasi/pengumuman' },
        { label: 'Agenda Kegiatan', url: '/informasi/agenda' },
      ],
    },
    {
      label: 'Potensi Desa',
      url: '/potensi-desa',
      submenus: [
        { label: 'Pertanian & Perkebunan', url: '/potensi-desa/pertanian' },
        { label: 'UMKM & Industri Kreatif', url: '/potensi-desa/umkm' },
        { label: 'Wisata Desa', url: '/potensi-desa/wisata' },
        { label: 'Seni & Budaya', url: '/potensi-desa/budaya' },
      ],
    },
    {
      label: 'Transparansi',
      url: '/transparansi',
      submenus: [
        { label: 'APBDes', url: '/transparansi#apbdes' },
        { label: 'Laporan Realisasi', url: '/transparansi#realisasi' },
        { label: 'Rencana Kerja', url: '/transparansi#rkpdes' },
      ],
    },
    {
      label: 'Galeri',
      url: '/galeri',
      submenus: [
        { label: 'Foto Kegiatan', url: '/galeri#foto' },
        { label: 'Video Desa', url: '/galeri#video' },
      ],
    },
    { label: 'Kontak', url: '/kontak' },
  ]

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
    <div className={`w-full transition-all duration-200 select-none ${navBgClass}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-[64px] gap-2 lg:gap-4">
          {/* Sisi Kiri: Logo Resmi & Identitas Desa */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 group py-1 focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen rounded-md shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
              <Image
                src={
                  settings.logo && typeof settings.logo === 'object' && settings.logo.url
                    ? settings.logo.url
                    : '/seed/logo-desa-placeholder.svg'
                }
                alt={settings.namaWebsite || 'Logo Desa Bolali'}
                fill
                sizes="(max-width: 640px) 40px, 44px"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-[19px] font-bold text-slate-900 leading-none group-hover:text-desa-primaryGreen transition-colors font-sans">
                {settings.namaWebsite || 'Desa Bolali'}
              </span>
              <span className="hidden sm:block text-[11px] sm:text-[12px] text-slate-500 font-normal leading-tight mt-1 whitespace-nowrap">
                {settings.subInstansi || 'Kecamatan Wonosari • Kabupaten Klaten • Jawa Tengah'}
              </span>
            </div>
          </Link>

          {/* Sisi Tengah: Navigasi Desktop (>=1280px / xl) */}
          <nav
            ref={dropdownRef}
            aria-label="Navigasi Utama"
            className="hidden xl:flex items-center gap-2 text-[14px] font-semibold text-slate-800"
          >
            {menuItems.map((item, index) => {
              const isBeranda = item.url === '/'
              const isActive = isBeranda ? pathname === '/' : pathname.startsWith(item.url)
              const hasSubmenus = item.submenus && item.submenus.length > 0
              const isDropdownOpen = openDropdown === item.label

              if (isBeranda) {
                return (
                  <React.Fragment key={index}>
                    <Link
                      href="/"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors text-[14px] font-semibold ${
                        isActive
                          ? 'bg-[#0B4625] text-white shadow-xs'
                          : 'text-slate-800 hover:text-desa-primaryGreen hover:bg-slate-100'
                      }`}
                    >
                      <House size={16} weight="fill" className="shrink-0" />
                      <span>Beranda</span>
                    </Link>
                    <span className="text-slate-300" aria-hidden="true">|</span>
                  </React.Fragment>
                )
              }

              if (hasSubmenus) {
                return (
                  <React.Fragment key={index}>
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                        className={`inline-flex items-center gap-1 px-1.5 py-1.5 rounded-md transition-colors text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen cursor-pointer ${
                          isActive
                            ? 'text-[#0B4625] font-bold'
                            : 'text-slate-800 hover:text-[#0B4625]'
                        }`}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="true"
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                        <CaretDown
                          size={12}
                          weight="bold"
                          className={`transition-transform duration-200 shrink-0 text-slate-500 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu Box */}
                      {isDropdownOpen && (
                        <div
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="absolute left-0 mt-1 w-56 rounded-desa-card bg-white shadow-desa-dropdown border border-slate-100 p-1.5 z-50 animate-in fade-in duration-150"
                        >
                          {item.submenus!.map((sub, sIndex) => {
                            const isSubActive = pathname === sub.url
                            return (
                              <Link
                                key={sIndex}
                                href={sub.url}
                                className={`block px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                                  isSubActive
                                    ? 'bg-desa-lightGreen text-desa-darkGreen font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50 hover:text-desa-darkGreen'
                                }`}
                              >
                                {sub.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                    {index < menuItems.length - 1 && (
                      <span className="text-slate-300" aria-hidden="true">|</span>
                    )}
                  </React.Fragment>
                )
              }

              // Menu biasa tanpa dropdown (Kontak)
              return (
                <Link
                  key={index}
                  href={item.url}
                  className={`inline-flex items-center px-1.5 py-1.5 rounded-md transition-colors text-[14px] font-semibold ${
                    isActive
                      ? 'text-[#0B4625] font-bold'
                      : 'text-slate-800 hover:text-[#0B4625]'
                  }`}
                >
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
                className="w-44 2xl:w-48 pl-3.5 pr-8 py-1.5 text-[12px] rounded-full bg-slate-50/90 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen focus:border-transparent transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                aria-label="Cari Informasi"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-desa-darkGreen transition-colors focus:outline-none cursor-pointer"
              >
                <MagnifyingGlass size={14} weight="bold" />
              </button>
            </form>
          </div>

          {/* Tombol Hamburger Mobile (< xl) */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-full text-slate-800 hover:text-desa-darkGreen hover:bg-slate-100 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen cursor-pointer"
              aria-label="Buka Menu Navigasi"
              aria-expanded={mobileMenuOpen}
            >
              <List size={24} weight="bold" className="text-desa-darkGreen" />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Menu Mobile (< xl) */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi Mobile"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[360px] bg-white z-50 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div>
              {/* Header Drawer */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 shrink-0">
                    <Image
                      src={
                        settings.logo && typeof settings.logo === 'object' && settings.logo.url
                          ? settings.logo.url
                          : '/seed/logo-desa-placeholder.svg'
                      }
                      alt="Logo Desa"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-sm text-desa-darkGreen font-sans">
                    Menu Desa Bolali
                  </span>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] p-2 rounded-full text-slate-700 hover:bg-slate-200/70 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen cursor-pointer"
                  aria-label="Tutup Menu Navigasi"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Kolom Pencarian Mobile */}
              <div className="p-4 border-b border-slate-100">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Cari berita, agenda, pengumuman..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 text-xs rounded-full bg-slate-100 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen min-h-[44px]"
                  />
                  <button
                    type="submit"
                    aria-label="Cari"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-desa-darkGreen min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                  >
                    <MagnifyingGlass size={16} weight="bold" />
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
                          className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-desa-lightGreen text-desa-darkGreen'
                              : 'text-slate-800 hover:bg-slate-50'
                          }`}
                          aria-expanded={isExpanded}
                        >
                          <span>{item.label}</span>
                          <CaretDown
                            size={14}
                            weight="bold"
                            className={`transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-desa-darkGreen' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-md my-1">
                            {item.submenus!.map((sub, sIndex) => (
                              <Link
                                key={sIndex}
                                href={sub.url}
                                className={`block px-3 py-2.5 rounded-md text-xs font-medium transition-colors min-h-[40px] flex items-center ${
                                  pathname === sub.url
                                    ? 'bg-desa-lightGreen text-desa-darkGreen font-bold'
                                    : 'text-slate-700 hover:text-desa-darkGreen hover:bg-white'
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
                      className={`min-h-[44px] flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-desa-darkGreen text-white'
                          : 'text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {isBeranda && <House size={18} weight="fill" className="text-white" />}
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Kontak & Medsos di Drawer */}
            {contact && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Kontak Resmi Desa
                </div>

                <div className="space-y-2 text-xs text-slate-800">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} weight="fill" className="text-desa-primaryGreen shrink-0 mt-0.5" />
                    <span className="leading-snug text-slate-600">{contact.alamat}</span>
                  </div>

                  {contact.telepon && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} weight="fill" className="text-desa-primaryGreen shrink-0" />
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
                      <Envelope size={16} weight="fill" className="text-desa-primaryGreen shrink-0" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-desa-darkGreen font-semibold hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Medsos */}
                <div className="pt-2 border-t border-slate-200 flex items-center gap-3 text-slate-700">
                  <a
                    href={settings.mediaSosial?.youtube || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-desa-primaryGreen"
                    aria-label="YouTube"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.mediaSosial?.facebook || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-desa-primaryGreen"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={settings.mediaSosial?.instagram || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-desa-primaryGreen"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                  <a
                    href={settings.mediaSosial?.tiktok || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:text-desa-primaryGreen"
                    aria-label="TikTok"
                  >
                    <FaTiktok className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
