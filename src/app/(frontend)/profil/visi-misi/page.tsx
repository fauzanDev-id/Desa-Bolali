import React from 'react'
import type { Metadata } from 'next'
import { getProfilDesa } from '@/lib/cms'
import { Card, SectionHeader } from '@/components'
import { Target, Compass, Medal, ShieldCheck, Handshake, Tree, Bank, Quotes } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Visi & Misi | Profil Desa Bolali',
  description: 'Visi dan Misi Pembangunan Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah.',
}

export const revalidate = 60

export default async function VisiMisiPage() {
  const profil = await getProfilDesa()

  const pilarPrioritas = [
    {
      icon: <Bank className="w-5 h-5 text-desa-accentGreen" />,
      judul: 'Tata Kelola & Pelayanan Prima',
      deskripsi: 'Keterbukaan informasi anggaran desa dan percepatan pelayanan administrasi warga secara terpadu.',
    },
    {
      icon: <Tree className="w-5 h-5 text-desa-accentGreen" />,
      judul: 'Pertanian & Ketahanan Pangan',
      deskripsi: 'Modernisasi sistem irigasi teknis, bantuan sarana produksi pertanian, dan pendampingan kelompok tani.',
    },
    {
      icon: <Handshake className="w-5 h-5 text-desa-accentGreen" />,
      judul: 'Pemberdayaan Ekonomi & BUMDes',
      deskripsi: 'Penguatan sentra UMKM gerabah, olahan pangan lokal, permodalan usaha, dan inovasi pemasaran produk.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-desa-accentGreen" />,
      judul: 'Infrastruktur & Lingkungan Lestari',
      deskripsi: 'Pembangunan jalan rabat beton dan drainase lingkungan, penerangan jalan umum, dan kebersihan lingkungan.',
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. VISI DESA: Ditampilkan sebagai Blok Rapi Sesuai Spesifikasi */}
      <Card className="p-6 sm:p-8 bg-desa-darkGreen text-white border-0 shadow-desa-sm relative overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold text-xs font-bold border border-white/20 w-fit mb-4">
          <Target className="w-3.5 h-3.5 text-desa-gold" />
          <span>VISI PEMERINTAH DESA BOLALI</span>
        </div>

        <div className="relative pl-2 sm:pl-3">
          <Quotes className="w-8 h-8 text-desa-gold/40 rotate-180 mb-2" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed text-white font-sans tracking-tight">
            “{profil.visi || 'Terwujudnya Desa Bolali yang Maju, Mandiri, dan Sejahtera Berlandaskan Gotong Royong dan Nilai Keagamaan.'}”
          </blockquote>
        </div>

        <p className="mt-5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed border-t border-white/15 pt-4 font-sans">
          Visi ini menjadi arah haluan dan kompas pembangunan jangka menengah Desa Bolali, berlandaskan prinsip kemandirian, partisipatif, serta pelestarian nilai-nilai luhur kemasyarakatan.
        </p>
      </Card>

      {/* 2. MISI DESA: Ditampilkan sebagai Daftar Bernomor Rapi Sesuai Spesifikasi */}
      <Card className="p-6 sm:p-8">
        <SectionHeader
          title="Misi Pembangunan Desa Bolali"
          icon={<Compass className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="space-y-3.5 mt-5">
          {profil.misi && profil.misi.length > 0 ? (
            profil.misi.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-desa-card bg-slate-50 border border-desa-border hover:border-emerald-300 hover:bg-emerald-50/20 transition-colors"
              >
                {/* Nomor Urut Bulat */}
                <div className="w-8 h-8 rounded-full bg-desa-darkGreen text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs mt-0.5 font-sans">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-desa-textDark leading-relaxed font-sans">
                    {item.poin}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-desa-textMuted italic">Daftar misi desa sedang diperbarui.</p>
          )}
        </div>
      </Card>

      {/* 3. Empat Pilar Prioritas Pembangunan */}
      <Card className="p-6 sm:p-8">
        <SectionHeader
          title="Fokus & Pilar Prioritas Pelaksanaan"
          icon={<Medal className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {pilarPrioritas.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-desa-card bg-slate-50 border border-desa-border hover:border-emerald-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-desa-sm bg-desa-lightGreen flex items-center justify-center mb-3 border border-emerald-200">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-desa-textDark mb-1 font-sans">
                {item.judul}
              </h3>
              <p className="text-xs sm:text-sm text-desa-textMuted leading-relaxed font-sans">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
