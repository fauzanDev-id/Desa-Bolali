'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Envelope } from '@phosphor-icons/react'
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

  const officialTagline = settings.tagline && settings.tagline.toLowerCase().includes('bersama membangun')
    ? '“Bersama Membangun Desa yang Lebih Baik”'
    : `“${settings.tagline || 'Bersama Membangun Desa yang Lebih Baik'}”`

  return (
    <footer className="relative bg-desa-darkGreen text-emerald-100 overflow-hidden border-t-2 border-desa-gold select-none">
      {/* Hiasan Motif Siluet Daun / Pegunungan */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden text-emerald-300">
        <Image
          src="/seed/motif-footer.svg"
          alt=""
          fill
          className="object-cover object-bottom"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-4 md:px-6 pt-8 pb-6">
        {/* Bagian Atas: Identitas, Kontak & Media Sosial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-white/15 items-center">
          {/* Kolom Kiri: Identitas Desa & Tagline */}
          <div className="md:col-span-5 flex items-center gap-3.5">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src={
                  settings.logo && typeof settings.logo === 'object' && settings.logo.url
                    ? settings.logo.url
                    : '/seed/logo-desa-placeholder.svg'
                }
                alt={settings.namaInstansi || 'Logo Desa Bolali'}
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-lg font-black text-white font-sans leading-tight">
                {settings.namaInstansi || 'Pemerintah Desa Bolali'}
              </h3>
              <p className="mt-0.5 text-xs text-white/90 font-medium italic">
                {officialTagline}
              </p>
            </div>
          </div>

          {/* Kolom Tengah: Rincian Kontak Resmi */}
          <div className="md:col-span-4 space-y-2 text-xs text-emerald-100/90 font-medium">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} weight="fill" className="text-desa-gold shrink-0 mt-0.5" />
              <span className="leading-relaxed">{contact.alamat}</span>
            </div>

            {contact.telepon && (
              <div className="flex items-center gap-2.5">
                <Phone size={16} weight="fill" className="text-desa-gold shrink-0" />
                <a
                  href={`tel:${contact.telepon.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-white transition-colors py-0.5"
                >
                  {contact.telepon}
                </a>
              </div>
            )}

            {contact.email && (
              <div className="flex items-center gap-2.5">
                <Envelope size={16} weight="fill" className="text-desa-gold shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors py-0.5"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Media Sosial Resmi */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2.5 md:text-right">
                Ikuti Kami:
              </p>
              <div className="flex items-center gap-3 text-white">
                <a
                  href={sosmed?.youtube || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Kanal YouTube Desa Bolali"
                  aria-label="Kunjungi Kanal YouTube Desa Bolali"
                  className="hover:text-desa-gold transition-colors"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>

                <a
                  href={sosmed?.facebook || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Halaman Facebook Desa Bolali"
                  aria-label="Kunjungi Halaman Facebook Desa Bolali"
                  className="hover:text-desa-gold transition-colors"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>

                <a
                  href={sosmed?.instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Akun Instagram Desa Bolali"
                  aria-label="Kunjungi Akun Instagram Desa Bolali"
                  className="hover:text-desa-gold transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>

                <a
                  href={sosmed?.tiktok || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Akun TikTok Desa Bolali"
                  aria-label="Kunjungi Akun TikTok Desa Bolali"
                  className="hover:text-desa-gold transition-colors"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Tengah: Tautan Menu Navigasi Bawah */}
        <div className="py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-emerald-100/80 border-b border-white/10">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="hover:text-desa-gold transition-colors py-1.5"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bagian Bawah: Baris Hak Cipta Tunggal */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-emerald-100/70 text-center sm:text-left">
          <p>© {currentYear} {settings.namaInstansi || 'Pemerintah Desa Bolali'}. All Rights Reserved</p>
          <p className="text-[11px] text-emerald-100/50">
            Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah 57473
          </p>
        </div>
      </div>
    </footer>
  )
}
