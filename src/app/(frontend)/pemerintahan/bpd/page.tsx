import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getBpdList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { Card, SectionHeader } from '@/components'
import { ShieldCheck, User, CheckCircle2, FileText, MessagesSquare, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Badan Permusyawaratan Desa (BPD) | Pemerintah Desa Bolali',
  description: 'Daftar anggota dan susunan pengurus Badan Permusyawaratan Desa (BPD) Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function BpdPage() {
  const bpdList = await getBpdList()

  const cleanName = (name: string) => name.replace(/\s*\[Data Dummy\]/gi, '')

  const fungsiBpd = [
    {
      icon: <FileText className="w-5 h-5 text-desa-accentGreen" strokeWidth={1.75} />,
      judul: 'Legislasi & Regulasi',
      deskripsi: 'Membahas dan menyepakati Rancangan Peraturan Desa (Perdes) bersama Kepala Desa.',
    },
    {
      icon: <MessagesSquare className="w-5 h-5 text-desa-accentGreen" strokeWidth={1.75} />,
      judul: 'Penyerapan Aspirasi',
      deskripsi: 'Menampung, menghimpun, dan menyalurkan aspirasi serta keluhan masyarakat desa.',
    },
    {
      icon: <Search className="w-5 h-5 text-desa-accentGreen" strokeWidth={1.75} />,
      judul: 'Pengawasan Kinerja',
      deskripsi: 'Mengawasi kinerja Kepala Desa dan pelaksanaan program APBDes agar tepat sasaran.',
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header Info Banner */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Badan Permusyawaratan Desa (BPD) Bolali"
          subtitle="Lembaga perwujudan demokrasi dan mitra kerja sejajar Pemerintah Desa"
          icon={<ShieldCheck className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
          Badan Permusyawaratan Desa (BPD) berkedudukan sebagai mitra kerja Pemerintah Desa dalam membahas kebijakan desa, menampung aspirasi masyarakat, serta mengawasi pelaksanaan APBDes demi terwujudnya tata kelola desa yang transparan.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desa-lightGreen text-desa-darkGreen text-xs font-semibold border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-desa-accentGreen" strokeWidth={1.75} />
          <span>{bpdList.length} Anggota Terpilih Mewakili Seluruh Wilayah Warga</span>
        </div>
      </Card>

      {/* 2. Tiga Fungsi Pokok BPD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {fungsiBpd.map((item, idx) => (
          <Card key={idx} className="p-4 sm:p-5">
            <div className="w-10 h-10 rounded-desa-sm bg-desa-lightGreen flex items-center justify-center mb-3 border border-emerald-200">
              {item.icon}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-desa-textDark mb-1 font-sans">{item.judul}</h3>
            <p className="text-xs text-desa-textMuted leading-relaxed font-sans">{item.deskripsi}</p>
          </Card>
        ))}
      </div>

      {/* 3. GRID KARTU ANGGOTA BPD: 4 Kolom Desktop, 2 Kolom Mobile, Foto Rasio 4:5 Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Daftar Susunan Anggota BPD Desa Bolali"
          icon={<ShieldCheck className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-5">
          {bpdList.map((member) => {
            const namaBersih = cleanName(member.nama)

            return (
              <div
                key={member.id}
                className="bg-white rounded-desa-card border border-desa-border overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-all group"
              >
                {/* Foto Rasio 4:5 */}
                <div className="relative w-full aspect-[4/5] bg-slate-100 border-b border-desa-border overflow-hidden">
                  {member.foto ? (
                    <Image
                      src={getMediaUrl(member.foto)}
                      alt={namaBersih}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                      <User className="w-12 h-12 text-slate-300" strokeWidth={1.75} />
                      <span className="text-[10px] text-slate-400 mt-1 font-medium font-sans">Foto Resmi</span>
                    </div>
                  )}
                </div>

                {/* Info Anggota */}
                <div className="p-3">
                  <span className="inline-block px-2 py-0.5 rounded-desa-sm text-[9px] font-bold bg-slate-100 text-slate-700 border border-slate-200 uppercase tracking-wider mb-1">
                    {member.jabatan}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-desa-textDark line-clamp-1 font-sans">
                    {namaBersih}
                  </h4>
                  {member.keterangan && (
                    <p className="text-[11px] text-desa-textMuted mt-0.5 line-clamp-1 font-sans">
                      {member.keterangan}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
