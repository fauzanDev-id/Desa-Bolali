import React from 'react'
import type { Metadata } from 'next'
import { getProfilDesa } from '@/lib/cms'
import { Card, SectionHeader, Prose } from '@/components'
import { Compass, MapPin, ArrowsOut, ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Geografis & Wilayah | Profil Desa Bolali',
  description: 'Kondisi geografis, letak wilayah, batas desa, dan tata guna lahan Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function GeografisPage() {
  const profil = await getProfilDesa()

  const ringkasanGeografis = [
    { label: 'Luas Wilayah', nilai: profil.luasWilayah || '3,75 km² (375 Hektar)' },
    { label: 'Letak Administratif', nilai: 'Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah' },
    { label: 'Koordinat Astronomis', nilai: '7°37\'55" LS - 7°39\'12" LS dan 110°44\'20" BT - 110°45\'45" BT' },
    { label: 'Ketinggian Tempat', nilai: '± 120 meter di atas permukaan laut (mdpl)' },
    { label: 'Tipologi Wilayah', nilai: profil.tipologi || 'Dataran Rendah / Kawasan Pertanian Beririgasi Teknis' },
    { label: 'Jumlah Dusun', nilai: '4 Wilayah Pedukuhan (Bolali I, Bolali II, Tegalrejo, Karanganyar)' },
    { label: 'Orbitasi ke Kecamatan', nilai: '± 3,5 km (sekitar 8 menit perjalanan)' },
    { label: 'Orbitasi ke Kabupaten', nilai: '± 18 km dari Pusat Pemerintahan Kabupaten Klaten' },
  ]

  const batasWilayah = [
    {
      arah: 'Sebelah Utara',
      desa: profil.batasUtara || 'Desa Boto, Kecamatan Wonosari',
      icon: <ArrowUp className="w-4 h-4 text-desa-accentGreen" />,
    },
    {
      arah: 'Sebelah Timur',
      desa: profil.batasTimur || 'Desa Bentakan, Kecamatan Wonosari',
      icon: <ArrowRight className="w-4 h-4 text-desa-accentGreen" />,
    },
    {
      arah: 'Sebelah Selatan',
      desa: profil.batasSelatan || 'Desa Teloyo, Kecamatan Wonosari',
      icon: <ArrowDown className="w-4 h-4 text-desa-accentGreen" />,
    },
    {
      arah: 'Sebelah Barat',
      desa: profil.batasBarat || 'Desa Sekaran, Kecamatan Wonosari',
      icon: <ArrowLeft className="w-4 h-4 text-desa-accentGreen" />,
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Pengantar Geografis dengan Komponen Prose */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Kondisi Geografis & Wilayah"
          icon={<Compass className="w-4 h-4 text-desa-accentGreen" />}
        />

        <Prose className="mt-4">
          <p>
            Desa Bolali merupakan salah satu desa di wilayah Kecamatan Wonosari, Kabupaten Klaten, Provinsi Jawa Tengah yang didominasi oleh bentang alam dataran rendah subur beririgasi teknis mandiri.
          </p>
          <p>
            Kondisi tanah yang kaya unsur hara dan ketersediaan pasokan air yang stabil dari saluran irigasi pedesaan menjadikan kawasan ini sangat ideal untuk pengembangan pertanian padi sawah, budidaya hortikultura musiman, serta industri kreatif berbasis tanah liat.
          </p>
        </Prose>
      </Card>

      {/* 2. Info Ringkas: Tabel Dua Kolom (Letak, Batas, Luas, Orbitasi) Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Data Letak, Batas & Luas Wilayah"
          icon={<ArrowsOut className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-desa-border rounded-desa-sm text-xs sm:text-sm">
            <tbody className="divide-y divide-desa-border">
              {ringkasanGeografis.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                  <td className="py-3 px-4 font-bold text-desa-textDark w-1/3 sm:w-1/4 border-r border-desa-border">
                    {item.label}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {item.nilai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 3. Batas-Batas Wilayah Administratif 4 Arah */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Batas Wilayah Administratif Desa"
          icon={<MapPin className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
          {batasWilayah.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-desa-card border border-desa-border bg-slate-50 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-desa-lightGreen border border-emerald-200 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">
                  {item.arah}
                </span>
                <span className="text-xs sm:text-sm font-bold text-desa-textDark truncate block mt-0.5">
                  {item.desa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
