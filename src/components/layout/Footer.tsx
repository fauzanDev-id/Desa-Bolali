import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Shield } from 'lucide-react'
import type { ContactData, WebsiteSettingsData } from '@/lib/cms'

interface FooterProps {
  contact: ContactData
  settings: WebsiteSettingsData
}

export function Footer({ contact, settings }: FooterProps) {
  const sosmed = settings.mediaSosial
  const navLinks = settings.menuNavigasi || []
  const currentYear = new Date().getFullYear()

  // Tagline resmi bersih (menghindari typo "Dess" pada mockup rancangan awal)
  const officialTagline = settings.tagline && settings.tagline.toLowerCase().includes('bersama membangun')
    ? '“Bersama Membangun Desa yang Lebih Baik”'
    : `“${settings.tagline || 'Bersama Membangun Desa yang Lebih Baik'}”`

  return (
    <footer className="relative bg-desa-darkGreen text-emerald-100 overflow-hidden border-t-2 border-desa-gold select-none">
      {/* Hiasan Siluet Kontur Bukit & Daun Tradisional di Sudut Kanan Bawah (Halus, Opasitas Rendah) */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 overflow-hidden">
        <svg
          width="480"
          height="200"
          viewBox="0 0 480 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 200C140 160 260 200 380 140C430 115 465 75 480 45V200H0Z"
            fill="#EAB308"
          />
          <path
            d="M90 200C190 170 290 190 390 120C440 90 470 50 480 20V200H90Z"
            fill="#22C55E"
          />
        </svg>
      </div>

      <div className="relative max-w-[1376px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* Bagian Atas: Identitas, Kontak & Media Sosial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/15">
          {/* Kolom Kiri: Identitas Desa & Tagline (5 Kolom) */}
          <div className="md:col-span-5 flex items-start gap-3.5">
            {settings.logo && typeof settings.logo === 'object' && settings.logo.url ? (
              <div className="relative w-12 h-14 shrink-0">
                <Image
                  src={settings.logo.url}
                  alt={settings.namaInstansi || 'Logo Desa Bolali'}
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-14 rounded-lg bg-black/30 text-desa-gold p-2 flex items-center justify-center shrink-0 border border-desa-gold/50 shadow">
                <Shield className="w-8 h-8 text-desa-gold fill-desa-gold/20" />
              </div>
            )}

            <div>
              <h3 className="text-xl font-black text-white tracking-tight font-sans">
                {settings.namaInstansi || 'Pemerintah Desa Bolali'}
              </h3>
              <p className="mt-1 text-xs text-desa-gold font-medium italic">
                {officialTagline}
              </p>
              <p className="mt-2 text-xs text-emerald-100/75 leading-relaxed max-w-sm">
                Portal resmi keterbukaan informasi publik, tata kelola pemerintahan, potensi ekonomi, dan transparansi anggaran Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten.
              </p>
            </div>
          </div>

          {/* Kolom Tengah: Rincian Kontak Resmi (4 Kolom) */}
          <div className="md:col-span-4 space-y-2.5 text-xs text-emerald-100/90 font-medium">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-desa-gold shrink-0 mt-0.5" />
              <span className="leading-relaxed">{contact.alamat}</span>
            </div>

            {contact.telepon && (
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-desa-gold shrink-0" />
                <a
                  href={`tel:${contact.telepon.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.telepon}
                </a>
              </div>
            )}

            {contact.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-desa-gold shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Media Sosial Resmi (3 Kolom) */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2.5 md:text-right">
                Ikuti Kami:
              </p>
              <div className="flex items-center gap-2.5 text-white">
                {sosmed?.youtube && (
                  <a
                    href={sosmed.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Kanal YouTube Desa Bolali"
                    aria-label="Kunjungi Kanal YouTube Desa Bolali"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-desa-gold hover:text-desa-darkGreen border border-white/20 flex items-center justify-center transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}

                {sosmed?.facebook && (
                  <a
                    href={sosmed.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Halaman Facebook Desa Bolali"
                    aria-label="Kunjungi Halaman Facebook Desa Bolali"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-desa-gold hover:text-desa-darkGreen border border-white/20 flex items-center justify-center transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}

                {sosmed?.instagram && (
                  <a
                    href={sosmed.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Akun Instagram Desa Bolali"
                    aria-label="Kunjungi Akun Instagram Desa Bolali"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-desa-gold hover:text-desa-darkGreen border border-white/20 flex items-center justify-center transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}

                {sosmed?.tiktok && (
                  <a
                    href={sosmed.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Akun TikTok Desa Bolali"
                    aria-label="Kunjungi Akun TikTok Desa Bolali"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-desa-gold hover:text-desa-darkGreen border border-white/20 flex items-center justify-center transition-all duration-200"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.23 1.03.14 2.19.94 2.87.75.66 1.83.84 2.78.53.86-.27 1.54-.97 1.75-1.85.12-.51.13-1.03.13-1.55.01-5.69 0-11.38 0-17.07z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Tengah: Tautan Menu Navigasi Bawah */}
        <div className="py-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-emerald-100/80 border-b border-white/10">
          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.url}
              className="hover:text-desa-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bagian Bawah: Baris Hak Cipta Tunggal (Tahun Berjalan Dinamis) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-100/70 text-center sm:text-left">
          <p>© {currentYear} {settings.namaInstansi || 'Pemerintah Desa Bolali'}. All Rights Reserved</p>
          <p className="text-[11px] text-emerald-100/50">
            Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah 57473
          </p>
        </div>
      </div>
    </footer>
  )
}
