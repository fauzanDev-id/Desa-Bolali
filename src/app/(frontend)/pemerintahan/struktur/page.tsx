import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPerangkatDesaList, getBpdList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { GitFork, User, ShieldCheck, Landmark, ChevronDown, ArrowDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Struktur Organisasi | Pemerintah Desa Bolali',
  description: 'Bagan dan struktur hierarki kepemimpinan Pemerintah Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function StrukturOrganisasiPage() {
  const [perangkatList, bpdList] = await Promise.all([
    getPerangkatDesaList(),
    getBpdList(),
  ])

  const kades = perangkatList.find((p) => p.kategoriJabatan === 'Kepala-Desa') || perangkatList[0]
  const sekdes = perangkatList.find(
    (p) => p.jabatan.toLowerCase().includes('sekretaris') && p.kategoriJabatan === 'Sekretariat'
  )
  const ketuaBpd = bpdList.find((b) => b.jabatan.toLowerCase().includes('ketua') && !b.jabatan.toLowerCase().includes('wakil')) || bpdList[0]

  const kaurs = perangkatList.filter(
    (p) => p.kategoriJabatan === 'Sekretariat' && !p.jabatan.toLowerCase().includes('sekretaris')
  )
  const kasis = perangkatList.filter((p) => p.kategoriJabatan === 'Teknis')
  const kadus = perangkatList.filter((p) => p.kategoriJabatan === 'Kewilayahan')

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <GitFork className="w-4 h-4 text-desa-gold-500" />
          <span>Bagan Organisasi Desa</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-3">
          Struktur Organisasi & Tata Kerja (SOTK) Pemerintah Desa Bolali
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Berdasarkan Peraturan Menteri Dalam Negeri Nomor 84 Tahun 2015 tentang Susunan Organisasi dan Tata Kerja Pemerintah Desa, struktur pemerintahan dipimpin oleh Kepala Desa dibantu oleh Sekretariat Desa, Pelaksana Teknis, dan Pelaksana Kewilayahan.
        </p>
      </div>

      {/* Visual Organigram Tree */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8 overflow-hidden">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-8 text-center">
          Bagan Hierarki Pemerintahan Desa Bolali
        </h3>

        {/* Level 1: Kepala Desa & BPD */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative">
          {/* Kepala Desa Box */}
          {kades && (
            <div className="w-full max-w-xs bg-gradient-to-br from-desa-green-950 to-desa-green-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border-2 border-desa-gold-500 text-center relative z-10">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-desa-gold-400 shadow-md mb-3 bg-white/10">
                {kades.foto ? (
                  <Image
                    src={getMediaUrl(kades.foto)}
                    alt={kades.nama}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-desa-gold-300">
                    <User className="w-10 h-10" />
                  </div>
                )}
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-desa-gold-500 text-desa-green-950 text-[11px] font-extrabold uppercase mb-1">
                {kades.jabatan}
              </span>
              <h4 className="font-bold text-sm sm:text-base text-white tracking-tight">{kades.nama}</h4>
              {kades.niap && <p className="text-[11px] text-emerald-200/80 mt-0.5">NIAP: {kades.niap}</p>}
            </div>
          )}

          {/* Mitra Kerja BPD Box */}
          {ketuaBpd && (
            <div className="w-full max-w-xs bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 sm:p-5 text-center relative z-10">
              <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-slate-300 shadow-sm mb-3 bg-white">
                {ketuaBpd.foto ? (
                  <Image
                    src={getMediaUrl(ketuaBpd.foto)}
                    alt={ketuaBpd.nama}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                )}
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold uppercase mb-1">
                Mitra / Pengawas (BPD)
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-800">{ketuaBpd.nama}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{ketuaBpd.jabatan}</p>
            </div>
          )}
        </div>

        {/* Connector Line to Sekdes */}
        <div className="flex flex-col items-center my-4">
          <div className="w-0.5 h-6 bg-slate-300" />
          <ChevronDown className="w-4 h-4 text-slate-400 -mt-1" />
        </div>

        {/* Level 2: Sekretaris Desa */}
        {sekdes && (
          <div className="flex justify-center">
            <div className="w-full max-w-xs bg-desa-green-900/90 text-white rounded-2xl p-4 shadow-md border border-desa-green-800 text-center">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[11px] font-bold uppercase mb-1">
                {sekdes.jabatan}
              </span>
              <h4 className="font-bold text-sm text-white">{sekdes.nama}</h4>
              {sekdes.niap && <p className="text-[11px] text-emerald-200/80 mt-0.5">NIAP: {sekdes.niap}</p>}
            </div>
          </div>
        )}

        {/* Connector to Staf & Teknis */}
        <div className="flex flex-col items-center my-4">
          <div className="w-0.5 h-6 bg-slate-300" />
          <ChevronDown className="w-4 h-4 text-slate-400 -mt-1" />
        </div>

        {/* Level 3: Dual Column (Kepala Urusan / Sekretariat & Kepala Seksi / Teknis) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Unsur Sekretariat (Kaur) */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <div className="text-center pb-3 border-b border-slate-200 mb-4">
              <span className="text-xs font-bold text-desa-green-900 uppercase tracking-wider block">
                Unsur Staf Sekretariat (Kaur)
              </span>
              <span className="text-[11px] text-slate-500">Membantu tugas kesekretariatan & administrasi</span>
            </div>

            <div className="space-y-3">
              {kaurs.map((kaur) => (
                <div
                  key={kaur.id}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-desa-green-100 flex items-center justify-center shrink-0 text-desa-green-900 font-bold text-xs">
                    Kaur
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">{kaur.nama}</h5>
                    <p className="text-xs text-desa-green-800 font-semibold">{kaur.jabatan}</p>
                    {kaur.niap && <p className="text-[10px] text-slate-400">NIAP: {kaur.niap}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unsur Pelaksana Teknis (Kasi) */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
            <div className="text-center pb-3 border-b border-slate-200 mb-4">
              <span className="text-xs font-bold text-desa-green-900 uppercase tracking-wider block">
                Unsur Pelaksana Teknis (Kasi)
              </span>
              <span className="text-[11px] text-slate-500">Membantu tugas operasional & pelayanan lapangan</span>
            </div>

            <div className="space-y-3">
              {kasis.map((kasi) => (
                <div
                  key={kasi.id}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-desa-gold-100 flex items-center justify-center shrink-0 text-desa-gold-700 font-bold text-xs">
                    Kasi
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-slate-900">{kasi.nama}</h5>
                    <p className="text-xs text-desa-green-800 font-semibold">{kasi.jabatan}</p>
                    {kasi.niap && <p className="text-[10px] text-slate-400">NIAP: {kasi.niap}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Level 4: Pelaksana Kewilayahan (Kepala Dusun) */}
        <div className="mt-8 bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
          <div className="text-center pb-3 border-b border-slate-200 mb-4">
            <span className="text-xs font-bold text-desa-green-900 uppercase tracking-wider block">
              Unsur Kewilayahan (Kepala Dusun / Kadus)
            </span>
            <span className="text-[11px] text-slate-500">
              Pelaksana teknis di wilayah pedukuhan masing-masing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {kadus.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-center"
              >
                <div className="w-9 h-9 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-desa-green-900 font-bold text-xs mb-2">
                  Kadus
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">{item.nama}</h5>
                <p className="text-xs text-desa-green-800 font-semibold mt-0.5">{item.jabatan}</p>
                {item.niap && <p className="text-[10px] text-slate-400 mt-0.5">NIAP: {item.niap}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
