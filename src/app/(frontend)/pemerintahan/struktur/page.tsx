import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPerangkatDesaList, getBpdList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { Card, SectionHeader } from '@/components'
import { GitFork, User, ShieldCheck, CaretRight } from '@phosphor-icons/react/dist/ssr'

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

  const cleanName = (name: string) => name.replace(/\s*\[Data Dummy\]/gi, '')

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Pengantar Struktur Organisasi */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Struktur Organisasi & Tata Kerja (SOTK)"
          subtitle="Pemerintah Desa Bolali, Kecamatan Wonosari, Kabupaten Klaten"
          icon={<GitFork className="w-4 h-4 text-desa-accentGreen" />}
        />

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
          Berdasarkan Peraturan Menteri Dalam Negeri Nomor 84 Tahun 2015, susunan organisasi Pemerintah Desa Bolali dipimpin oleh Kepala Desa dan dibantu oleh Sekretaris Desa, jajaran Kepala Seksi (Kasi), Kepala Urusan (Kaur), serta Kepala Dusun (Kadus) sebagai pelaksana kewilayahan.
        </p>
      </Card>

      {/* 2. BAGAN HIERARKI BERSIH DENGAN GARIS PENGHUBUNG TIPIS (RESPONSIF) Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-8 overflow-hidden">
        <SectionHeader
          title="Bagan Hierarki Kepemimpinan Desa"
          icon={<GitFork className="w-4 h-4 text-desa-accentGreen" />}
        />

        {/* ========================================================
            A. TAMPILAN DESKTOP (>=768px): Bagan Pohon Garis Tipis
           ======================================================== */}
        <div className="hidden md:flex flex-col items-center space-y-6 mt-8">
          {/* Level 1: Kepala Desa & Mitra BPD */}
          <div className="flex items-center justify-center gap-12 w-full max-w-2xl relative">
            {/* Kepala Desa Box */}
            {kades && (
              <div className="w-64 bg-desa-darkGreen text-white rounded-desa-card p-4 shadow-desa-sm border-2 border-desa-gold text-center relative z-10">
                <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-white/80 mb-2 bg-white/10">
                  {kades.foto ? (
                    <Image
                      src={getMediaUrl(kades.foto)}
                      alt={cleanName(kades.nama)}
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white m-auto" />
                  )}
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-desa-gold text-desa-darkGreen text-[10px] font-extrabold uppercase mb-1">
                  {kades.jabatan}
                </span>
                <h4 className="font-bold text-sm text-white font-sans">{cleanName(kades.nama)}</h4>
                {kades.niap && <p className="text-[10px] text-emerald-100/80 mt-0.5">NIAP: {kades.niap}</p>}
              </div>
            )}

            {/* Garis Horizontal Penghubung Kades - BPD (Kemitraan) */}
            <div className="h-0.5 bg-slate-300 w-12 border-t-2 border-dashed border-slate-300" />

            {/* Mitra BPD */}
            {ketuaBpd && (
              <div className="w-60 bg-slate-50 border-2 border-dashed border-slate-300 rounded-desa-card p-4 text-center relative z-10">
                <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden border border-slate-300 mb-2 bg-white">
                  {ketuaBpd.foto ? (
                    <Image
                      src={getMediaUrl(ketuaBpd.foto)}
                      alt={cleanName(ketuaBpd.nama)}
                      fill
                      className="object-cover object-top"
                      sizes="56px"
                    />
                  ) : (
                    <ShieldCheck className="w-7 h-7 text-slate-400 m-auto" />
                  )}
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold uppercase mb-1">
                  Mitra Legislatif
                </span>
                <h4 className="font-bold text-xs text-desa-textDark font-sans">{cleanName(ketuaBpd.nama)}</h4>
                <p className="text-[10px] text-desa-textMuted">{ketuaBpd.jabatan}</p>
              </div>
            )}
          </div>

          {/* Garis Vertikal Turun ke Sekdes */}
          <div className="w-0.5 h-6 bg-slate-300" />

          {/* Level 2: Sekretaris Desa */}
          {sekdes && (
            <div className="w-60 bg-white border-2 border-desa-primaryGreen rounded-desa-card p-3.5 text-center shadow-desa-sm">
              <span className="inline-block px-2 py-0.5 rounded-full bg-desa-lightGreen text-desa-darkGreen text-[10px] font-extrabold uppercase mb-1">
                {sekdes.jabatan}
              </span>
              <h4 className="font-bold text-sm text-desa-textDark font-sans">{cleanName(sekdes.nama)}</h4>
              {sekdes.niap && <p className="text-[10px] text-desa-textMuted mt-0.5">NIAP: {sekdes.niap}</p>}
            </div>
          )}

          {/* Garis Vertikal Turun ke Jajaran Kasi & Kaur */}
          <div className="w-0.5 h-6 bg-slate-300" />

          {/* Level 3: Pelaksana Teknis (Kasi) & Sekretariat (Kaur) */}
          <div className="w-full">
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-desa-textMuted bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Kepala Seksi (Kasi) & Kepala Urusan (Kaur)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[...kasis, ...kaurs].slice(0, 6).map((staff) => (
                <div
                  key={staff.id}
                  className="p-3 rounded-desa-sm bg-slate-50 border border-desa-border text-center hover:border-emerald-300 transition-colors"
                >
                  <span className="text-[10px] font-bold text-desa-primaryGreen uppercase tracking-wider block">
                    {staff.jabatan}
                  </span>
                  <h5 className="font-bold text-xs text-desa-textDark mt-1 font-sans">{cleanName(staff.nama)}</h5>
                </div>
              ))}
            </div>
          </div>

          {/* Garis Vertikal Turun ke Kepala Dusun */}
          <div className="w-0.5 h-6 bg-slate-300" />

          {/* Level 4: Pelaksana Kewilayahan (Kadus) */}
          <div className="w-full">
            <div className="text-center mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-desa-textMuted bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Pelaksana Kewilayahan (Kepala Dusun)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {kadus.map((staff) => (
                <div
                  key={staff.id}
                  className="p-3 rounded-desa-sm bg-emerald-50/60 border border-emerald-200 text-center"
                >
                  <span className="text-[10px] font-bold text-desa-darkGreen uppercase tracking-wider block">
                    {staff.jabatan}
                  </span>
                  <h5 className="font-bold text-xs text-desa-textDark mt-1 font-sans">{cleanName(staff.nama)}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            B. TAMPILAN MOBILE (<768px): Daftar Bertingkat Rapi Sesuai Spesifikasi
           ======================================================== */}
        <div className="flex md:hidden flex-col space-y-3 mt-4">
          {/* Level 1: Kepala Desa */}
          {kades && (
            <div className="p-3.5 rounded-desa-card bg-desa-darkGreen text-white border border-desa-gold shadow-2xs">
              <span className="text-[10px] font-extrabold uppercase text-desa-gold block">1. Pimpinan Tertinggi</span>
              <h4 className="text-sm font-bold text-white mt-0.5">{cleanName(kades.nama)}</h4>
              <p className="text-xs text-emerald-100">{kades.jabatan}</p>
            </div>
          )}

          {/* Level 2: Sekretaris Desa */}
          {sekdes && (
            <div className="ml-3 p-3 rounded-desa-card bg-slate-50 border-l-4 border-desa-primaryGreen border-desa-border shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-desa-primaryGreen block">2. Pimpinan Sekretariat</span>
              <h4 className="text-xs font-bold text-desa-textDark mt-0.5">{cleanName(sekdes.nama)}</h4>
              <p className="text-[11px] text-desa-textMuted">{sekdes.jabatan}</p>
            </div>
          )}

          {/* Level 3: Kasi & Kaur */}
          <div className="ml-6 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-desa-textMuted block">
              3. Pelaksana Teknis & Urusan (Kasi / Kaur):
            </span>
            {[...kasis, ...kaurs].map((staff) => (
              <div key={staff.id} className="p-2.5 rounded-desa-sm bg-white border border-desa-border">
                <span className="text-[10px] font-semibold text-desa-primaryGreen block">{staff.jabatan}</span>
                <span className="text-xs font-bold text-desa-textDark block">{cleanName(staff.nama)}</span>
              </div>
            ))}
          </div>

          {/* Level 4: Kepala Dusun */}
          <div className="ml-6 space-y-2 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-desa-textMuted block">
              4. Pelaksana Kewilayahan (Kadus):
            </span>
            {kadus.map((staff) => (
              <div key={staff.id} className="p-2.5 rounded-desa-sm bg-emerald-50/60 border border-emerald-200">
                <span className="text-[10px] font-bold text-desa-darkGreen block">{staff.jabatan}</span>
                <span className="text-xs font-bold text-desa-textDark block">{cleanName(staff.nama)}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
