import React from 'react'
import type { Metadata } from 'next'
import { PageHeader, SidebarSubmenu, type SubmenuItem } from '@/components'
import { BookOpen, Target, Compass, Users, MapPin, Bank } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Profil Desa',
  description: 'Profil lengkap Desa Bolali: Sejarah, Visi & Misi, Kondisi Geografis, Kependudukan, dan Wilayah Pedukuhan.',
}

const profilSubmenu: SubmenuItem[] = [
  {
    label: 'Sejarah Desa',
    href: '/profil/sejarah',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    label: 'Visi & Misi',
    href: '/profil/visi-misi',
    icon: <Target className="w-4 h-4" />,
  },
  {
    label: 'Geografis & Wilayah',
    href: '/profil/geografis',
    icon: <Compass className="w-4 h-4" />,
  },
  {
    label: 'Data Kependudukan',
    href: '/profil/kependudukan',
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: 'Wilayah & Dusun',
    href: '/profil/wilayah-dusun',
    icon: <MapPin className="w-4 h-4" />,
  },
]

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title="Profil Desa Bolali"
        subtitle="Mengenal lebih dekat sejarah berdirinya desa, visi & misi pembangunan, bentang geografis, dan kependudukan."
        badge="Profil Resmi Desa"
        badgeIcon={<Bank className="w-3.5 h-3.5 text-desa-gold" />}
        breadcrumbs={[{ label: 'Profil Desa', href: '/profil/sejarah' }]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px dengan Sidebar Submenu 280px (Desktop) / Dropdown (Mobile) */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Submenu Sidebar 280px */}
          <SidebarSubmenu
            title="Profil Desa"
            subtitle="Pilih informasi profil"
            icon={<Bank className="w-4 h-4 text-desa-gold" />}
            items={profilSubmenu}
            className="lg:w-[280px] shrink-0"
          />

          {/* Child Page Content */}
          <div className="flex-1 w-full min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
