import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getBpdList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { ShieldCheck, User, Award, CheckCircle2, FileText, MessagesSquare, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Badan Permusyawaratan Desa (BPD) | Pemerintah Desa Bolali',
  description: 'Daftar anggota dan susunan pengurus Badan Permusyawaratan Desa (BPD) Desa Bolali, Kecamatan Wonosari, Klaten.',
}

export const revalidate = 60

export default async function BpdPage() {
  const bpdList = await getBpdList()

  const fungsiBpd = [
    {
      icon: <FileText className="w-5 h-5 text-desa-green-800" />,
      judul: 'Legislasi & Regulasi',
      deskripsi: 'Membahas dan menyepakati Rancangan Peraturan Desa (Perdes) bersama Kepala Desa.',
    },
    {
      icon: <MessagesSquare className="w-5 h-5 text-desa-green-800" />,
      judul: 'Penyerapan Aspirasi',
      deskripsi: 'Menampung, menghimpun, dan menyalurkan aspirasi serta keluhan masyarakat desa.',
    },
    {
      icon: <Search className="w-5 h-5 text-desa-green-800" />,
      judul: 'Pengawasan Kinerja',
      deskripsi: 'Mengawasi kinerja Kepala Desa dan pelaksanaan program APBDes agar tepat sasaran.',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-desa-gold-500" />
          <span>Lembaga Permusyawaratan</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-3">
          Badan Permusyawaratan Desa (BPD) Bolali
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Badan Permusyawaratan Desa (BPD) adalah lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa yang berkedudukan sebagai mitra kerja sejajar Pemerintah Desa dalam mengawal kemajuan dan kesejahteraan warga.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-desa-green-900 text-xs font-semibold border border-emerald-100">
          <CheckCircle2 className="w-3.5 h-3.5 text-desa-green-800" />
          <span>{bpdList.length} Anggota Terpilih Mewakili Seluruh Wilayah & Unsur Warga</span>
        </div>
      </div>

      {/* 3 Tugas Pokok BPD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fungsiBpd.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5"
          >
            <div className="w-10 h-10 rounded-xl bg-desa-green-50 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-1">{item.judul}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{item.deskripsi}</p>
          </div>
        ))}
      </div>

      {/* Grid of BPD Members */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
          Daftar Susunan Anggota BPD Desa Bolali
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bpdList.map((member) => {
            const isPimpinan = member.jabatan.toLowerCase().includes('ketua') || member.jabatan.toLowerCase().includes('sekretaris')

            return (
              <div
                key={member.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between hover:bg-white hover:border-desa-green-300 hover:shadow-card transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm shrink-0">
                      {member.foto ? (
                        <Image
                          src={getMediaUrl(member.foto)}
                          alt={member.nama}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <User className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                          isPimpinan
                            ? 'bg-desa-gold-100 text-desa-green-950 border-desa-gold-300'
                            : 'bg-emerald-50 text-desa-green-900 border-emerald-200'
                        }`}
                      >
                        {member.jabatan}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-desa-green-900 transition-colors">
                        {member.nama}
                      </h4>
                    </div>
                  </div>
                </div>

                {member.keterangan && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 text-xs text-slate-600">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Keterwakilan
                    </span>
                    <p className="font-medium text-slate-700">{member.keterangan}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
