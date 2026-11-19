import React from 'react'
import type { Metadata } from 'next'
import { getAgendaList } from '@/lib/cms'
import { AgendaView } from '@/components/informasi/AgendaView'

export const metadata: Metadata = {
  title: 'Agenda & Jadwal Kegiatan | Pemerintah Desa Bolali',
  description: 'Kalender agenda dan jadwal kegiatan resmi Pemerintah Desa Bolali, musyawarah desa, posyandu, dan acara kebudayaan.',
  openGraph: {
    title: 'Agenda Kegiatan Desa Bolali | Kalender & Jadwal Acara',
    description: 'Jadwal resmi kegiatan pemerintah dan masyarakat Desa Bolali, Kecamatan Wonosari, Klaten.',
    url: '/informasi/agenda',
    siteName: 'Desa Bolali',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Agenda Kegiatan Desa Bolali',
    description: 'Kalender dan jadwal kegiatan resmi Desa Bolali.',
  },
}

export const revalidate = 60

export default async function AgendaPage() {
  const agendaList = await getAgendaList()

  return <AgendaView initialAgenda={agendaList} />
}
