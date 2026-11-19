import React from 'react'
import type { Metadata } from 'next'
import { getProfilDesa } from '@/lib/cms'
import { RichText } from '@/components'
import { BookOpen, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sejarah Desa | Profil Desa Bolali',
  description: 'Sejarah asal-usul berdirinya Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah.',
}

export const revalidate = 60

export default async function SejarahPage() {
  const profil = await getProfilDesa()

  const eraMilestones = [
    {
      tahun: 'Masa Lampau',
      judul: 'Era Perintisan & Pembukaan Lahan',
      deskripsi:
        'Para sesepuh dan perintis desa membuka lahan persawahan subur di dataran Wonosari dengan sistem irigasi gotong royong [Data Dummy].',
    },
    {
      tahun: 'Era Pembagian Wilayah',
      judul: 'Pembentukan 4 Pedukuhan Adat',
      deskripsi:
        'Kekompakan warga melahirkan 4 wilayah pedukuhan yang guyub rukun: Dusun Bolali I, Dusun Bolali II, Dusun Tegalrejo, dan Dusun Karanganyar [Data Dummy].',
    },
    {
      tahun: 'Era Reformasi',
      judul: 'Penguatan Kelembagaan Desa',
      deskripsi:
        'Penyusunan tata kelola desa berbasis musyawarah mufakat bersama BPD dan penguatan ketahanan pangan lokal [Data Dummy].',
    },
    {
      tahun: 'Era Sekarang (2026)',
      judul: 'Transformasi Desa Mandiri & Digital',
      deskripsi:
        'Pencapaian status Desa Mandiri (IDM), keterbukaan APBDes digital, pemberdayaan BUMDes, serta pelayanan warga terpadu [Data Dummy].',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Main Historical Article Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-desa-gold-500" />
          <span>Riwayat & Asal-Usul</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-6 pb-4 border-b border-slate-100">
          Riwayat Singkat Berdirinya Desa Bolali
        </h2>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none">
          <RichText content={profil.sejarah} />
        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-desa-gold-500" />
          <span>Tonggak Sejarah Desa</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
          Linimasa Perkembangan Desa Bolali
        </h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-desa-green-800/30 space-y-6 sm:space-y-8">
          {eraMilestones.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-4 border-desa-green-800 shadow-sm group-hover:scale-125 transition-transform" />

              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70 hover:border-desa-green-300 transition-colors">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-desa-green-100/80 text-desa-green-900 text-xs font-bold mb-1.5">
                  <Calendar className="w-3 h-3 text-desa-green-800" />
                  <span>{item.tahun}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {item.judul}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nilai-Nilai Leluhur */}
      <div className="bg-gradient-to-br from-desa-green-900 to-desa-green-950 text-white rounded-2xl p-6 sm:p-8 shadow-card border border-desa-green-800">
        <h3 className="text-base sm:text-lg font-bold text-desa-gold-400 mb-2">
          Filosofi & Nilai Luhur Desa Bolali
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-4">
          Hingga hari ini, semangat kebersamaan dan keterbukaan tetap diwariskan dari generasi ke generasi, menjadi pondasi utama aparatur dan masyarakat dalam mewujudkan kemandirian desa [Data Dummy].
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-desa-gold-400 shrink-0" />
            <span>Gotong Royong Guyub Rukun</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-desa-gold-400 shrink-0" />
            <span>Keterbukaan & Kejujuran</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-desa-gold-400 shrink-0" />
            <span>Pelayanan Tulus Bagi Warga</span>
          </div>
        </div>
      </div>
    </div>
  )
}
