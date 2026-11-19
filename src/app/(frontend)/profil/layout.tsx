import React from 'react'
import type { Metadata } from 'next'
import { Breadcrumb, SidebarSubmenu, type SubmenuItem } from '@/components'
import { BookOpen, Target, Compass, Users, MapPin, Landmark } from 'lucide-react'

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
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white overflow-hidden py-10 sm:py-14 border-b border-desa-gold-500/30">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-desa-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold-300 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
                <Landmark className="w-3.5 h-3.5 text-desa-gold-400" />
                <span>Profil Resmi Desa</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Profil Desa Bolali
              </h1>
              <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                Mengenal lebih dekat sejarah berdirinya desa, visi & misi pembangunan, bentang geografis, statistik warga, serta pembagian wilayah dusun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sidebar Submenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumb
          items={[
            { label: 'Profil Desa', href: '/profil/sejarah' },
          ]}
          className="mb-4"
        />

        <div className="flex flex-col lg:flex-row items-start gap-8 mt-2">
          {/* Submenu Sidebar */}
          <SidebarSubmenu
            title="Menu Profil Desa"
            subtitle="Pilih informasi profil"
            icon={<Landmark className="w-5 h-5 text-desa-gold-400" />}
            items={profilSubmenu}
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
