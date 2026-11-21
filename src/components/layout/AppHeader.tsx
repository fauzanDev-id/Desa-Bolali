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
 * - TopBar berada di atas Navbar dalam aliran dokumen normal.
 *   Saat pengguna scroll ke bawah, TopBar secara alami dan mulus bergerak ke atas keluar layar.
 *   Tidak menggunakan collapse JavaScript max-h-0 yang merusak tinggi dokumen dan menyebabkan efek bergetar (jitter/layout thrashing)!
 * - Navbar 64px menempel (sticky top-0 z-50) dengan performa GPU 60fps tanpa lompatan tata letak.
 */
export function AppHeader({ contact, settings }: AppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // Threshold 32px sesuai tinggi TopBar, mengaktifkan shadow dan latar putih solid saat sticky
      const scrolled = window.scrollY > 32
      setIsScrolled(scrolled)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* TopBar kontak & medsos: hanya tampil di desktop/tablet, scroll alami keluar layar */}
      <TopBar contact={contact} settings={settings} />

      {/* Navbar Utama 64px: sticky top-0 menempel stabil, lancar, dan tanpa getaran */}
      <header className="sticky top-0 z-50 w-full select-none">
        <Navbar settings={settings} contact={contact} isScrolled={isScrolled} />
      </header>
    </>
  )
}
