import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { TopBar, Navbar, Footer } from '@/components'
import { getContactData, getWebsiteSettings } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getWebsiteSettings()

  return {
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
        {/* Header: TopBar + Navbar */}
        <TopBar contact={contact} settings={settings} />
        <Navbar settings={settings} />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer contact={contact} settings={settings} />
      </body>
    </html>
  )
}
