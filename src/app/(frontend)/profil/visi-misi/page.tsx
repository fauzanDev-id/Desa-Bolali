import React from 'react'
import type { Metadata } from 'next'
import { getProfilDesa } from '@/lib/cms'
import { Target, Compass, Award, CheckCircle2, ShieldCheck, HeartHandshake, Trees, Landmark } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Visi & Misi | Profil Desa Bolali',
  description: 'Visi dan Misi Pembangunan Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah.',
}

export const revalidate = 60

export default async function VisiMisiPage() {
  const profil = await getProfilDesa()

  const prioritasPembangunan = [
    {
      icon: <Landmark className="w-5 h-5 text-desa-green-800" />,
      judul: 'Tata Kelola & Pelayanan Prima',
      deskripsi: 'Transparansi anggaran APBDes dan percepatan layanan surat warga berbasis digital.',
    },
    {
      icon: <Trees className="w-5 h-5 text-desa-green-800" />,
      judul: 'Pertanian & Ketahanan Pangan',
      deskripsi: 'Modernisasi sistem irigasi, bantuan pupuk berimbang, dan penguatan kelompok tani.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-desa-green-800" />,
      judul: 'Pemberdayaan Ekonomi & BUMDes',
      deskripsi: 'Pendampingan UMKM olahan pangan lokal, permodalan usaha, dan inovasi pasar digital.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-desa-green-800" />,
      judul: 'Infrastruktur & Lingkungan Lestari',
      deskripsi: 'Pavingisasi jalan desa, penerangan jalan umum, dan pengelolaan sampah terpadu.',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Visi Desa Card */}
      <div className="bg-gradient-to-br from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white rounded-2xl p-6 sm:p-8 shadow-card border border-desa-gold-500/30 relative overflow-hidden">
        {/* Glow & Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-desa-gold-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desa-gold-500/20 text-desa-gold-300 text-xs font-bold border border-desa-gold-500/30 mb-4">
            <Target className="w-3.5 h-3.5 text-desa-gold-400" />
            <span>VISI DESA BOLALI</span>
            <span className="text-[10px] text-white/50 font-normal">[Data Dummy]</span>
          </div>

          <blockquote className="text-lg sm:text-2xl font-bold leading-relaxed text-white">
            “{profil.visi}”
          </blockquote>

          <p className="mt-4 text-xs sm:text-sm text-emerald-100/80 leading-relaxed border-t border-white/10 pt-4">
            Visi ini menjadi arah haluan dan kompas pembangunan jangka menengah Desa Bolali, berlandaskan prinsip kemandirian, partisipatif, serta pelestarian nilai-nilai gotong royong warga.
          </p>
        </div>
      </div>

      {/* Misi Desa Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4 text-desa-gold-500" />
          <span>MISI PEMBANGUNAN</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-6 pb-4 border-b border-slate-100">
          Misi Pemerintah Desa Bolali
        </h2>

        <div className="space-y-4">
          {profil.misi.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-desa-green-300 hover:bg-desa-green-50/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-desa-green-900 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {item.poin}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Pilar Prioritas */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <Award className="w-4 h-4 text-desa-gold-500" />
          <span>Fokus Pembangunan</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
          Pilar Prioritas Pelaksanaan Program
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prioritasPembangunan.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-card transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-desa-green-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h4 className="font-bold text-sm text-slate-900">{item.judul}</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-12">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
