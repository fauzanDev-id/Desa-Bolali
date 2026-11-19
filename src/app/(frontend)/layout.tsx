import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { TopBar, Navbar, Footer } from '@/components'
import { getContactData, getWebsiteSettings } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings()

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://bolali.desa.id'),
    title: {
      default: `${settings.namaInstansi} | ${settings.tagline}`,
      template: `%s | ${settings.namaInstansi}`,
    },
    description: settings.deskripsiHero,
    keywords: [
      'Desa Bolali',
      'Pemerintah Desa Bolali',
      'Wonosari Klaten',
      'Klaten Jawa Tengah',
      'Website Resmi Desa',
      'Transparansi APBDes',
    ],
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [contact, settings] = await Promise.all([
    getContactData(),
    getWebsiteSettings(),
  ])

  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-desa-green-900 selection:text-white">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-900 focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          Lewati ke konten utama
        </a>

        {/* Header: TopBar + Navbar */}
        <TopBar contact={contact} settings={settings} />
        <Navbar settings={settings} />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1">{children}</main>

        {/* Footer */}
        <Footer contact={contact} settings={settings} />
      </body>
    </html>
  )
}
