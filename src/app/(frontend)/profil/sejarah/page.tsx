import React from 'react'
import type { Metadata } from 'next'
import { getProfilDesa } from '@/lib/cms'
import { Card, SectionHeader, Prose, RichText } from '@/components'
import { BookOpen, Calendar, Sparkles, Compass, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sejarah Desa | Profil Desa Bolali',
  description: 'Sejarah asal-usul berdirinya Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah.',
}

export const revalidate = 60

export default async function SejarahPage() {
  const profil = await getProfilDesa()

  const faktaSejarah = [
    { label: 'Nama Wilayah', nilai: 'Desa Bolali' },
    { label: 'Kecamatan / Kabupaten', nilai: 'Wonosari / Klaten, Jawa Tengah' },
    { label: 'Asal-Usul Nama', nilai: 'Tradisi lisan leluhur pembuka lahan persawahan Wonosari' },
    { label: 'Pembagian Awal', nilai: '4 Pedukuhan Adat (Bolali I, Bolali II, Tegalrejo, Karanganyar)' },
    { label: 'Status Kemandirian', nilai: 'Desa Mandiri (Indeks Desa Membangun / IDM)' },
    { label: 'Tipologi Wilayah', nilai: 'Desa Agraris Dataran Rendah Beririgasi Teknis' },
  ]

  const eraMilestones = [
    {
      tahun: 'Masa Lampau',
      judul: 'Era Perintisan & Pembukaan Lahan',
      deskripsi:
        'Para sesepuh dan perintis desa membuka lahan persawahan subur di dataran Wonosari dengan sistem irigasi gotong royong.',
    },
    {
      tahun: 'Era Pembagian Wilayah',
      judul: 'Pembentukan 4 Pedukuhan Adat',
      deskripsi:
        'Kekompakan warga melahirkan 4 wilayah pedukuhan yang guyub rukun: Dusun Bolali I, Dusun Bolali II, Dusun Tegalrejo, dan Dusun Karanganyar.',
    },
    {
      tahun: 'Era Reformasi',
      judul: 'Penguatan Kelembagaan Desa',
      deskripsi:
        'Penyusunan tata kelola desa berbasis musyawarah mufakat bersama BPD dan penguatan ketahanan pangan lokal.',
    },
    {
      tahun: 'Era Sekarang (2026)',
      judul: 'Transformasi Desa Mandiri & Digital',
      deskripsi:
        'Pencapaian status Desa Mandiri (IDM), keterbukaan APBDes digital, pemberdayaan BUMDes, serta pelayanan warga terpadu.',
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Riwayat Utama dengan Komponen Prose */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Riwayat & Asal-Usul Desa"
          icon={<BookOpen className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <Prose className="mt-4">
          <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed italic border-l-4 border-desa-primaryGreen pl-4 py-1 bg-desa-lightGreen/50 rounded-r-desa-sm">
            “Desa Bolali adalah desa agraris yang menjunjung tinggi kebersamaan, gotong royong, dan keterbukaan informasi publik menuju masyarakat yang mandiri dan sejahtera.”
          </p>

          <h3 className="text-lg font-bold text-desa-textDark mt-6 mb-2">
            Asal-Usul Nama dan Awal Peradaban
          </h3>
          <p>
            Menurut cerita tutur yang diwariskan secara turun-temurun oleh para sesepuh, nama Desa Bolali berakar dari semangat keteguhan hati para pendahulu dalam mengolah lahan pertanian subur di lembah Sungai Dengkeng dan dataran Klaten bagian timur.
          </p>
          <p>
            Dengan kearifan lokal sistem pranata mangsa dan pengelolaan air tradisional, masyarakat bergotong royong membangun bendungan desa kecil serta saluran irigasi yang menghidupi ratusan hektar sawah produktif.
          </p>
        </Prose>
      </Card>

      {/* 2. Info Ringkas: Tabel Dua Kolom Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Fakta Ringkas Sejarah & Wilayah"
          icon={<Compass className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-desa-border rounded-desa-sm text-xs sm:text-sm">
            <tbody className="divide-y divide-desa-border">
              {faktaSejarah.map((item, idx) => (
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

      {/* 3. Linimasa Perkembangan Desa */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Linimasa Perkembangan Desa Bolali"
          icon={<Sparkles className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-200 space-y-6 sm:space-y-8 mt-6">
          {eraMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-4 border-desa-primaryGreen shadow-xs" />

              <div className="bg-slate-50/90 rounded-desa-card p-4 sm:p-5 border border-desa-border hover:border-emerald-300 transition-colors">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-desa-lightGreen text-desa-darkGreen text-xs font-bold mb-1.5 border border-emerald-200">
                  <Calendar className="w-3 h-3 text-desa-accentGreen" strokeWidth={1.75} />
                  <span>{item.tahun}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-desa-textDark font-sans">
                  {item.judul}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
