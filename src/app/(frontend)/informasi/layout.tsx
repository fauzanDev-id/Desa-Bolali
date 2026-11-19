import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, SidebarSubmenu, type SubmenuItem } from '@/components'
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
    icon: <Newspaper className="w-4 h-4" />,
  },
  {
    label: 'Pengumuman Warga',
    href: '/informasi/pengumuman',
    icon: <Bell className="w-4 h-4" />,
  },
  {
    label: 'Agenda Kegiatan',
    href: '/informasi/agenda',
    icon: <Calendar className="w-4 h-4" />,
  },
]

export default function InformasiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white overflow-hidden py-10 sm:py-14 border-b border-desa-gold-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-desa-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold-300 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
                <Info className="w-3.5 h-3.5 text-desa-gold-400" />
                <span>Pusat Informasi Publik</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Pusat Informasi Desa Bolali
              </h1>
              <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                Kanal informasi resmi seputar kabar terkini, transparansi pembangunan, pengumuman warga, serta kalender agenda kegiatan Desa Bolali.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar Submenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumb
          items={[
            { label: 'Informasi', href: '/informasi/berita' },
          ]}
          className="mb-4"
        />

        <div className="flex flex-col lg:flex-row items-start gap-8 mt-2">
          {/* Submenu Sidebar */}
          <SidebarSubmenu
            title="Menu Informasi"
            subtitle="Kanal publikasi desa"
            icon={<Info className="w-5 h-5 text-desa-gold-400" />}
            items={informasiSubmenu}
            className="lg:w-72 shrink-0"
          />

          {/* Child Page Content */}
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
