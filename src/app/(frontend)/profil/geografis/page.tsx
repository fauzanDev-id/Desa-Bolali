import React from 'react'
import type { Metadata } from 'next'
import { getProfilDesa } from '@/lib/cms'
import { RichText } from '@/components'
import {
  Compass,
  MapPin,
  Maximize2,
  PieChart,
  SunMedium,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Layers,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Geografis & Wilayah | Profil Desa Bolali',
  description: 'Kondisi geografis, letak wilayah, batas desa, dan tata guna lahan Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function GeografisPage() {
  const profil = await getProfilDesa()

  const tataGunaLahan = [
    { nama: 'Lahan Persawahan Beririgasi Teknis', persentase: '65%', luas: '2,44 km²', warna: 'bg-emerald-500' },
    { nama: 'Kawasan Permukiman Warga', persentase: '23%', luas: '0,86 km²', warna: 'bg-amber-500' },
    { nama: 'Fasilitas Umum & Perkantoran', persentase: '7%', luas: '0,26 km²', warna: 'bg-blue-500' },
    { nama: 'Jalan Desa & Saluran Air', persentase: '5%', luas: '0,19 km²', warna: 'bg-teal-500' },
  ]

  return (
    <div className="space-y-8">
      {/* Ringkasan Luas & Tipologi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-desa-green-50 text-desa-green-900 flex items-center justify-center shrink-0 border border-desa-green-100">
            <Maximize2 className="w-6 h-6 text-desa-green-800" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Luas Wilayah
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-desa-green-950">
              {profil.luasWilayah || '3,75 km²'}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Mencakup 4 wilayah pedukuhan</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-desa-gold-50 text-desa-gold-600 flex items-center justify-center shrink-0 border border-desa-gold-100">
            <Compass className="w-6 h-6 text-desa-gold-600" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tipologi & Topografi
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900">
              {profil.tipologi || 'Dataran Rendah / Pertanian'}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Ketinggian ± 120 mdpl [Data Dummy]</p>
          </div>
        </div>
      </div>

      {/* Batas-Batas Wilayah */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <MapPin className="w-4 h-4 text-desa-gold-500" />
          <span>Batas Wilayah Administratif</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-6 pb-4 border-b border-slate-100">
          Batas Wilayah Desa Bolali
        </h2>

        {/* 4 Compass Direction Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Utara */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-desa-green-900 text-white flex items-center justify-center shrink-0">
              <ArrowUp className="w-4 h-4 text-desa-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-desa-green-900 uppercase">Sebelah Utara</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {profil.batasUtara || 'Desa Boto, Kec. Wonosari'}
              </p>
            </div>
          </div>

          {/* Timur */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-desa-green-900 text-white flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-desa-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-desa-green-900 uppercase">Sebelah Timur</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {profil.batasTimur || 'Desa Bentakan, Kec. Wonosari'}
              </p>
            </div>
          </div>

          {/* Selatan */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-desa-green-900 text-white flex items-center justify-center shrink-0">
              <ArrowDown className="w-4 h-4 text-desa-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-desa-green-900 uppercase">Sebelah Selatan</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {profil.batasSelatan || 'Desa Teloyo, Kec. Wonosari'}
              </p>
            </div>
          </div>

          {/* Barat */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-desa-green-900 text-white flex items-center justify-center shrink-0">
              <ArrowLeft className="w-4 h-4 text-desa-gold-400" />
            </div>
            <div>
              <span className="text-xs font-bold text-desa-green-900 uppercase">Sebelah Barat</span>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">
                {profil.batasBarat || 'Desa Wadunggetas, Kec. Wonosari'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tata Guna Lahan */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <PieChart className="w-4 h-4 text-desa-gold-500" />
          <span>Tata Ruang & Lahan</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
          Penggunaan Lahan Desa Bolali
        </h3>

        {/* Progress Bar Visual */}
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 mb-6">
          <div style={{ width: '65%' }} className="bg-emerald-500" title="Persawahan (65%)" />
          <div style={{ width: '23%' }} className="bg-amber-500" title="Permukiman (23%)" />
          <div style={{ width: '7%' }} className="bg-blue-500" title="Fasilitas Umum (7%)" />
          <div style={{ width: '5%' }} className="bg-teal-500" title="Jalan & Saluran (5%)" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tataGunaLahan.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <span className={`w-3.5 h-3.5 rounded-md ${item.warna} shrink-0`} />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.nama}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs sm:text-sm font-bold text-slate-900">{item.persentase}</span>
                <span className="text-[11px] text-slate-400 block">{item.luas}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deskripsi Tambahan Geografis */}
      {profil.geografis && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-desa-green-800" />
            <span>Kondisi Fisik & Iklim</span>
          </h3>
          <div className="prose prose-slate max-w-none">
            <RichText content={profil.geografis} />
          </div>
        </div>
      )}
    </div>
  )
}
