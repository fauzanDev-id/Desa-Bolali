import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pemerintah Desa Bolali | Maju, Mandiri, Sejahtera',
  description:
    'Portal Resmi Pemerintah Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah. Bersama membangun desa dengan pelayanan terbaik dan transparansi.',
  keywords: [
    'Desa Bolali',
    'Wonosari Klaten',
    'Pemerintah Desa',
    'Klaten Jawa Tengah',
    'Transparansi APBDes',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-desa-green-900 selection:text-white">
        {children}
      </body>
    </html>
  )
}
