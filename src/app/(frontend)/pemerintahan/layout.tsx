import React from 'react'
import type { Metadata } from 'next'
import { PageHeader, SidebarSubmenu, type SubmenuItem } from '@/components'
import { GitFork, Users, ShieldCheck, House, Bank } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Pemerintahan Desa',
  description: 'Struktur organisasi dan susunan aparatur Pemerintah Desa Bolali, Badan Permusyawaratan Desa (BPD), dan pengurus RT/RW.',
}

const pemerintahanSubmenu: SubmenuItem[] = [
  {
    label: 'Struktur Organisasi',
    href: '/pemerintahan/struktur',
    icon: <GitFork className="w-4 h-4" />,
  },
  {
    label: 'Perangkat Desa',
    href: '/pemerintahan/perangkat-desa',
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: 'Badan Permusyawaratan Desa (BPD)',
    href: '/pemerintahan/bpd',
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    label: 'Rukun Tetangga & RW',
    href: '/pemerintahan/rt-rw',
    icon: <House className="w-4 h-4" />,
  },
]

export default function PemerintahanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title="Pemerintahan Desa Bolali"
        subtitle="Susunan hierarki kepemimpinan, jajaran aparatur pamong praja desa, BPD, serta lembaga kemasyarakatan RT/RW."
        badge="Tata Pamong Desa"
        badgeIcon={<Bank className="w-3.5 h-3.5 text-desa-gold" />}
        breadcrumbs={[{ label: 'Pemerintahan', href: '/pemerintahan/struktur' }]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px dengan Sidebar Submenu 280px (Desktop) / Dropdown (Mobile) */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Submenu Sidebar 280px */}
          <SidebarSubmenu
            title="Pemerintahan"
            subtitle="Pilih struktur & lembaga"
            icon={<Bank className="w-4 h-4 text-desa-gold" />}
            items={pemerintahanSubmenu}
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
