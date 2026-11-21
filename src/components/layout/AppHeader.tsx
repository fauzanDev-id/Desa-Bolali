'use client'

import React, { useState, useEffect } from 'react'
import { TopBar } from './TopBar'
import { Navbar } from './Navbar'
import type { ContactData, WebsiteSettingsData } from '@/lib/cms'

interface AppHeaderProps {
  contact: ContactData
  settings: WebsiteSettingsData
}

/**
 * AppHeader Resmi Website Desa Bolali:
 * - Menempel (sticky top-0 z-50) di SEMUA halaman (Beranda dan halaman dalam)
 * - TopBar (kontak + sosmed) collapse tingginya ke 0 dengan transisi 200ms saat scroll turun >24px,
 *   dan muncul kembali saat berada di paling atas
 * - Navbar 64px tetap menempel di atas (top: 0)
 * - Tinggi header tersinkronisasi ke CSS variable --header-h
 */
export function AppHeader({ contact, settings }: AppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 24
      setIsScrolled(scrolled)
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--header-h', '64px')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* TopBar container: collapse ke 0 saat scroll turun >24px dengan transisi 200ms */}
      <div
        className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out ${
          isScrolled ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-8 opacity-100'
        }`}
      >
        <TopBar contact={contact} settings={settings} />
      </div>

      {/* Navbar Utama 64px */}
      <Navbar settings={settings} contact={contact} isScrolled={isScrolled} />
    </header>
  )
}
