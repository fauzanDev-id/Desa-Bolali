import React from 'react'
import type { Metadata } from 'next'
import { getBeritaPaginated } from '@/lib/cms'
import { BeritaListClient } from '@/components/informasi/BeritaListClient'

export const metadata: Metadata = {
  title: 'Kabar & Berita Terkini | Desa Bolali',
  description: 'Daftar berita, kabar pembangunan, serta liputan kegiatan masyarakat Desa Bolali, Kecamatan Wonosari, Klaten.',
  openGraph: {
    title: 'Kabar & Berita Terkini | Website Resmi Desa Bolali',
    description: 'Kabar terkini dan artikel resmi kegiatan Pemerintah dan Masyarakat Desa Bolali.',
    url: '/informasi/berita',
    siteName: 'Desa Bolali',
    locale: 'id_ID',
    type: 'website',
  },
}

export const revalidate = 60

export default async function BeritaListPage() {
  const isPerfLog = process.env.PERF_LOG === '1'
  const t0 = isPerfLog ? performance.now() : 0

  const result = await getBeritaPaginated({
    page: 1,
    limit: 50,
  })

  if (isPerfLog) {
    console.log(`[PERF_LOG] Server Render /informasi/berita data fetching took ${(performance.now() - t0).toFixed(2)}ms`)
  }

  return <BeritaListClient initialDocs={result.docs} />
}
