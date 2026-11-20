import type { Metadata } from 'next'
import React from 'react'
import { Plus_Jakarta_Sans, Dancing_Script } from 'next/font/google'
import './globals.css'
import { TopBar, Navbar, Footer } from '@/components'
import { getContactData, getWebsiteSettings } from '@/lib/cms'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'optional',
  weight: ['400', '500', '600', '700', '800'],
})

const script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'optional',
  weight: ['600', '700'],
})

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
    <html lang="id" className={`${sans.variable} ${script.variable}`}>
      <body className="min-h-screen flex flex-col bg-desa-pageBg text-desa-textDark font-sans antialiased selection:bg-desa-primaryGreen selection:text-white">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-900 focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          Lewati ke konten utama
        </a>

        {/* Header: TopBar + Navbar */}
        <TopBar contact={contact} settings={settings} />
        <Navbar settings={settings} contact={contact} />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 min-h-[calc(100vh-76px)]">{children}</main>

        {/* Footer */}
        <Footer contact={contact} settings={settings} />
      </body>
    </html>
  )
}
