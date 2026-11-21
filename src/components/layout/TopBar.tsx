'use client'

import React from 'react'
import { MapPin, Phone, Envelope } from '@phosphor-icons/react'
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6'
import { AccessibilityResizer } from './AccessibilityResizer'
import type { ContactData, WebsiteSettingsData } from '@/lib/cms'

interface TopBarProps {
  contact: ContactData
  settings: WebsiteSettingsData
}

/**
 * TopBar Resmi Pemerintah Desa Bolali:
 * - Tinggi: 32px
 * - Latar: Hijau tua #073C24
 * - Teks: 12px putih
 * - Ikon kontak: Phosphor weight="fill"
 * - Ikon sosmed: react-icons/fa6 putih polos 18px tanpa lingkaran/border
 */
export function TopBar({ contact, settings }: TopBarProps) {
  const sosmed = settings.mediaSosial

  return (
    <div className="hidden md:block bg-desa-darkGreen text-white text-[12px] select-none border-b border-black/10 z-50 relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6 h-[32px] flex items-center justify-between gap-4">
        {/* Sisi Kiri: Alamat Kantor, Telepon, Email Resmi */}
        <div className="flex items-center gap-x-3 text-[12px] text-white/95 font-normal">
          <div className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin size={14} weight="fill" className="text-white shrink-0" />
            <span className="truncate max-w-[360px] lg:max-w-none">
              {contact.alamat || 'Jl. Mawar No. 10, Desa Bolali, Kec. Wonosari, Kab. Klaten, Jawa Tengah'}
            </span>
          </div>

          <span className="text-white/30" aria-hidden="true">|</span>

          {contact.telepon && (
            <a
              href={`tel:${contact.telepon.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={14} weight="fill" className="text-white shrink-0" />
              <span>{contact.telepon}</span>
            </a>
          )}

          <span className="text-white/30" aria-hidden="true">|</span>

          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Envelope size={14} weight="fill" className="text-white shrink-0" />
              <span>{contact.email}</span>
            </a>
          )}
        </div>

        {/* Sisi Kanan: Aksesibilitas, Pemilih Ukuran Teks, Media Sosial */}
        <div className="flex items-center gap-3 shrink-0">
          <AccessibilityResizer />

          <span className="text-white/30" aria-hidden="true">|</span>

          {/* Ikon Media Sosial Resmi: react-icons/fa6 putih polos 18px tanpa lingkaran */}
          <div className="flex items-center gap-3 text-white">
            <a
              href={sosmed?.youtube || 'https://youtube.com'}
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube Resmi Desa Bolali"
              aria-label="YouTube Resmi Desa Bolali"
              className="text-white hover:text-white/80 transition-opacity"
            >
              <FaYoutube className="w-[18px] h-[18px]" />
            </a>

            <a
              href={sosmed?.facebook || 'https://facebook.com'}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook Resmi Desa Bolali"
              aria-label="Facebook Resmi Desa Bolali"
              className="text-white hover:text-white/80 transition-opacity"
            >
              <FaFacebookF className="w-[16px] h-[16px]" />
            </a>

            <a
              href={sosmed?.instagram || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram Resmi Desa Bolali"
              aria-label="Instagram Resmi Desa Bolali"
              className="text-white hover:text-white/80 transition-opacity"
            >
              <FaInstagram className="w-[18px] h-[18px]" />
            </a>

            <a
              href={sosmed?.tiktok || 'https://tiktok.com'}
              target="_blank"
              rel="noopener noreferrer"
              title="TikTok Resmi Desa Bolali"
              aria-label="TikTok Resmi Desa Bolali"
              className="text-white hover:text-white/80 transition-opacity"
            >
              <FaTiktok className="w-[16px] h-[16px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
