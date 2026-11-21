import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { AppHeader, Footer } from '@/components'
import { getContactData, getWebsiteSettings } from '@/lib/cms'
import { sans, allura, kaushan } from '@/lib/fonts'

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
    <html lang="id" className={`${sans.variable} ${allura.variable} ${kaushan.variable}`}>
      <body className="min-h-screen flex flex-col bg-desa-pageBg text-desa-textDark font-sans antialiased selection:bg-desa-primaryGreen selection:text-white">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-desa-gold focus:text-slate-900 focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen"
        >
          Lewati ke konten utama
        </a>

        {/* Header Resmi: AppHeader (TopBar collapse saat scroll + Navbar 64px sticky) */}
        <AppHeader contact={contact} settings={settings} />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 min-h-[calc(100vh-76px)]">{children}</main>

        {/* Footer */}
        <Footer contact={contact} settings={settings} />
      </body>
    </html>
  )
}
