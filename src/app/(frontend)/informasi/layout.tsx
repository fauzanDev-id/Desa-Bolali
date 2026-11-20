import React from 'react'
import type { Metadata } from 'next'
import { PageHeader, SidebarSubmenu, type SubmenuItem } from '@/components'
import { Newspaper, Bell, Calendar, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Informasi Desa',
  description: 'Pusat informasi publik Desa Bolali: Berita terkini seputar pembangunan dan kegiatan warga, pengumuman resmi, dan agenda kegiatan desa.',
  openGraph: {
    title: 'Informasi Desa Bolali | Berita, Pengumuman & Agenda',
    description: 'Pusat informasi publik Desa Bolali: Berita terkini, pengumuman resmi, dan agenda kegiatan desa.',
    siteName: 'Desa Bolali',
    locale: 'id_ID',
    type: 'website',
  },
}

const informasiSubmenu: SubmenuItem[] = [
  {
    label: 'Berita Desa',
    href: '/informasi/berita',
    icon: <Newspaper className="w-4 h-4" strokeWidth={1.75} />,
  },
  {
    label: 'Pengumuman Warga',
    href: '/informasi/pengumuman',
    icon: <Bell className="w-4 h-4" strokeWidth={1.75} />,
  },
  {
    label: 'Agenda Kegiatan',
    href: '/informasi/agenda',
    icon: <Calendar className="w-4 h-4" strokeWidth={1.75} />,
  },
]

export default function InformasiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title="Pusat Informasi Desa Bolali"
        subtitle="Kanal informasi resmi seputar kabar terkini, pengumuman warga, serta kalender agenda kegiatan desa."
        badge="Pusat Informasi Publik"
        badgeIcon={<Info className="w-3.5 h-3.5 text-desa-gold" strokeWidth={1.75} />}
        breadcrumbs={[{ label: 'Informasi', href: '/informasi/berita' }]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px dengan Sidebar Submenu 280px (Desktop) / Dropdown (Mobile) */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Submenu Sidebar 280px */}
          <SidebarSubmenu
            title="Informasi"
            subtitle="Kanal publikasi desa"
            icon={<Info className="w-4 h-4 text-desa-gold" strokeWidth={1.75} />}
            items={informasiSubmenu}
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
