import React from 'react'
import type { Metadata } from 'next'
import { getRtRwList, getDusunList, type RtRwItem, type DusunItem } from '@/lib/cms'
import { Card, SectionHeader } from '@/components'
import { House, Users, Phone, Buildings, ShieldCheck } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Rukun Tetangga & RW | Pemerintah Desa Bolali',
  description: 'Daftar pengurus Rukun Warga (RW) dan Rukun Tetangga (RT) di seluruh wilayah Dusun Desa Bolali.',
}

export const revalidate = 60

export default async function RtRwPage() {
  const [rtRwList, dusunList] = await Promise.all([
    getRtRwList(),
    getDusunList(),
  ])

  const cleanName = (name: string) => name.replace(/\s*\[Data Dummy\]/gi, '')

  const totalRW = rtRwList.filter((item) => item.jenis === 'RW').length
  const totalRT = rtRwList.filter((item) => item.jenis === 'RT').length

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header Info Banner */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Lembaga Rukun Warga (RW) & Rukun Tetangga (RT)"
          subtitle="Kelembagaan kemasyarakatan tingkat lingkungan di seluruh wilayah Desa Bolali"
          icon={<House className="w-4 h-4 text-desa-accentGreen" />}
        />

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
          RT dan RW merupakan lembaga kemasyarakatan yang dibentuk melalui musyawarah warga dalam rangka membantu pelayanan pemerintahan desa, pemeliharaan keamanan lingkungan, serta menggerakkan partisipasi gotong royong warga.
        </p>

        {/* Counter Summary */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-desa-border">
          <div className="p-3 sm:p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-center">
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">Total RW</span>
            <span className="text-xl sm:text-2xl font-black text-desa-darkGreen font-sans">{totalRW} RW</span>
            <span className="text-[11px] text-desa-textMuted block font-medium">Rukun Warga</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-center">
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">Total RT</span>
            <span className="text-xl sm:text-2xl font-black text-desa-primaryGreen font-sans">{totalRT} RT</span>
            <span className="text-[11px] text-desa-textMuted block font-medium">Rukun Tetangga</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-center">
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">Wilayah</span>
            <span className="text-xl sm:text-2xl font-black text-desa-textDark font-sans">{dusunList.length} Dusun</span>
            <span className="text-[11px] text-desa-textMuted block font-medium">Pedukuhan Resmi</span>
          </div>
        </div>
      </Card>

      {/* 2. Daftar Pengurus per Dusun */}
      <div className="space-y-6">
        {dusunList.map((dusun) => {
          const dusunItems = rtRwList.filter((item) => {
            if (item.dusun && typeof item.dusun === 'object') {
              return String(item.dusun.id) === String(dusun.id) || item.dusun.nama === dusun.nama
            }
            return String(item.dusun) === String(dusun.id)
          })

          const rwItems = dusunItems.filter((i) => i.jenis === 'RW')
          const rtItems = dusunItems.filter((i) => i.jenis === 'RT')

          return (
            <Card key={dusun.id} className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-desa-border mb-4">
                <div className="flex items-center gap-2.5">
                  <Buildings className="w-4 h-4 text-desa-accentGreen" />
                  <h3 className="text-base sm:text-lg font-bold text-desa-textDark font-sans">
                    Wilayah {dusun.nama}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-desa-textMuted">
                  Kadus: {dusun.kepalaDusun}
                </span>
              </div>

              {/* Tabel / Grid RT & RW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dusunItems.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-desa-sm bg-slate-50 border border-desa-border flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-desa-primaryGreen uppercase tracking-wider block">
                        {item.jenis} {item.nomor}
                      </span>
                      <h4 className="text-xs font-bold text-desa-textDark mt-0.5 font-sans">
                        {cleanName(item.namaKetua || item.nama || 'Ketua')}
                      </h4>
                      {item.kontak && (
                        <p className="text-[10px] text-desa-textMuted mt-0.5">{item.kontak}</p>
                      )}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                      {item.jumlahKK ? `${item.jumlahKK} KK` : 'Aktif'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
