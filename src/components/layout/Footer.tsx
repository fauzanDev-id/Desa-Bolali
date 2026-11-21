'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, EnvelopeSimple } from '@phosphor-icons/react'
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6'
import type { ContactData, WebsiteSettingsData } from '@/lib/cms'

interface FooterProps {
  contact: ContactData
  settings: WebsiteSettingsData
}

export function Footer({ contact, settings }: FooterProps) {
  const sosmed = settings.mediaSosial
  const navLinks = settings.menuNavigasi || []
  const currentYear = new Date().getFullYear()

  const officialTagline =
    settings.tagline && settings.tagline.toLowerCase().includes('bersama membangun')
      ? '“Bersama Membangun Desa yang Lebih Baik”'
      : `“${settings.tagline || 'Bersama Membangun Desa yang Lebih Baik'}”`

  // Format alamat bersih 2 baris persis mockup
  const rawAddress = contact.alamat || 'Jl. Mawar No. 10, Desa Bolali, Kec. Wonosari, Kab. Klaten, Jawa Tengah'
  const addressParts = rawAddress.includes('Kec.')
    ? rawAddress.split(/,\s*(?=Kec\.)/i)
    : [rawAddress.substring(0, 32), rawAddress.substring(32)]
  const line1 = addressParts[0] || rawAddress
  const line2 = addressParts.slice(1).join(', ') || 'Kec. Wonosari, Kab. Klaten, Jawa Tengah'

  const phoneNum = contact.telepon || '(0272) 1234567'
  const emailAddr = (contact.email || 'desa@bolali.desa.id').replace(/bolalimali/gi, 'bolali')

  return (
    <footer className="relative bg-[#073C24] text-white overflow-hidden select-none">
      {/* Hiasan Siluet Pegunungan & Daun Hijau Sedikit Lebih Terang + Garis Lengkung Emas di Kanan Bawah Sesuai Mockup */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/seed/footer-decoration.svg"
          alt=""
          fill
          className="object-cover object-right-bottom"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6 pt-5 pb-3">
        {/* ========================================================
            BARIS 1: 5 Kolom Dipisah Garis Vertikal Tipis Sesuai Mockup
            [Logo + Nama + Tagline] | [Pin + Alamat] | [Telepon] | [Email] | [Sosmed]
           ======================================================== */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-3 py-1">
          {/* Kolom 1: Logo 56px + Nama 16px/700 + Tagline Miring 12px */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src={
                  settings.logo && typeof settings.logo === 'object' && settings.logo.url
                    ? settings.logo.url
                    : '/seed/logo-desa-placeholder.svg'
                }
                alt={settings.namaInstansi || 'Logo Desa Bolali'}
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-white font-sans leading-tight">
                {settings.namaInstansi || 'Pemerintah Desa Bolali'}
              </h3>
              <p className="mt-0.5 text-[12px] text-white/90 font-normal italic">
                {officialTagline}
              </p>
            </div>
          </div>

          {/* Garis Pemisah Vertikal 1 */}
          <div className="hidden lg:block w-px h-9 bg-white/15 shrink-0" />

          {/* Kolom 2: Ikon Pin + Alamat 2 Baris 13px */}
          <div className="flex items-center gap-2.5 text-[13px] text-white/95 shrink-0">
            <MapPin size={20} weight="fill" className="text-white shrink-0" />
            <div className="leading-tight">
              <div>{line1}</div>
              <div className="text-white/85 text-[12px]">{line2}</div>
            </div>
          </div>

          {/* Garis Pemisah Vertikal 2 */}
          <div className="hidden lg:block w-px h-9 bg-white/15 shrink-0" />

          {/* Kolom 3: Ikon Telepon + Nomor 13px */}
          <div className="flex items-center gap-2.5 text-[13px] text-white/95 shrink-0">
            <Phone size={20} weight="fill" className="text-white shrink-0" />
            <a
              href={`tel:${phoneNum.replace(/[^0-9+]/g, '')}`}
              className="hover:text-desa-gold transition-colors font-medium"
            >
              {phoneNum}
            </a>
          </div>

          {/* Garis Pemisah Vertikal 3 */}
          <div className="hidden lg:block w-px h-9 bg-white/15 shrink-0" />

          {/* Kolom 4: Ikon Amplop + Email 13px */}
          <div className="flex items-center gap-2.5 text-[13px] text-white/95 shrink-0">
            <EnvelopeSimple size={20} weight="fill" className="text-white shrink-0" />
            <a
              href={`mailto:${emailAddr}`}
              className="hover:text-desa-gold transition-colors font-medium"
            >
              {emailAddr}
            </a>
          </div>

          {/* Garis Pemisah Vertikal 4 */}
          <div className="hidden lg:block w-px h-9 bg-white/15 shrink-0" />

          {/* Kolom 5: "Ikuti Kami:" 12px + 4 Ikon Sosmed Putih Polos 20px Tanpa Lingkaran/Border */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[12px] text-white/85 font-medium">Ikuti Kami:</span>
            <div className="flex items-center gap-2.5 text-white">
              <a
                href={sosmed?.youtube || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title="Kanal YouTube Desa Bolali"
                aria-label="YouTube Desa Bolali"
                className="hover:text-desa-gold transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>

              <a
                href={sosmed?.facebook || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title="Halaman Facebook Desa Bolali"
                aria-label="Facebook Desa Bolali"
                className="hover:text-desa-gold transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href={sosmed?.instagram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title="Akun Instagram Desa Bolali"
                aria-label="Instagram Desa Bolali"
                className="hover:text-desa-gold transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              <a
                href={sosmed?.tiktok || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title="Akun TikTok Desa Bolali"
                aria-label="TikTok Desa Bolali"
                className="hover:text-desa-gold transition-colors"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Garis Pembatas Tipis Putih 15% Sesuai Mockup */}
        <hr className="border-t border-white/15 my-2.5" />

        {/* ========================================================
            BARIS 2: Tautan Navigasi 12px Rata Tengah Dipisah "|" Tipis
           ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[12px] text-white/85 py-0.5">
          {navLinks.map((item, idx) => (
            <React.Fragment key={item.url || idx}>
              <Link
                href={item.url}
                className="hover:text-desa-gold transition-colors py-0.5 whitespace-nowrap"
              >
                {item.label}
              </Link>
              {idx < navLinks.length - 1 && (
                <span className="text-white/30 text-[11px] select-none">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ========================================================
            BARIS 3: Satu Baris Copyright Rata Tengah 12px
           ======================================================== */}
        <div className="text-center text-[11.5px] text-white/70 pt-1 pb-1">
          <p>© {currentYear} Pemerintah Desa Bolali. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
