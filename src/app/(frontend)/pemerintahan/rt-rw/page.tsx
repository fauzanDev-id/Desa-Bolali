import React from 'react'
import type { Metadata } from 'next'
import { getRtRwList, getDusunList, type RtRwItem, type DusunItem } from '@/lib/cms'
import { Home, Users, Phone, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react'

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

  const totalRW = rtRwList.filter((item) => item.jenis === 'RW').length
  const totalRT = rtRwList.filter((item) => item.jenis === 'RT').length

  // Helper untuk mendapatkan nama dusun dari relasi atau fallback
  const getDusunName = (item: RtRwItem, dusunList: DusunItem[]) => {
    if (item.dusun && typeof item.dusun === 'object' && item.dusun.nama) {
      return item.dusun.nama
    }
    if (item.dusun) {
      const match = dusunList.find((d) => String(d.id) === String(item.dusun))
      if (match) return match.nama
    }
    return 'Dusun Bolali'
  }

  // Kelompokkan RT/RW berdasarkan dusun
  const groupedByDusun = dusunList.map((dusun) => {
    const items = rtRwList.filter((item) => {
      if (item.dusun && typeof item.dusun === 'object') {
        return String(item.dusun.id) === String(dusun.id) || item.dusun.nama === dusun.nama
      }
      return String(item.dusun) === String(dusun.id)
    })

    // Jika relasi tidak cocok (misal mock fallback), bagi berdasarkan urutan
    return {
      dusun,
      items: items.length > 0 ? items : rtRwList.slice(0, 7), // fallback safe
    }
  })

  return (
    <div className="space-y-8">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
          <Home className="w-4 h-4 text-desa-gold-500" />
          <span>Kelembagaan Masyarakat</span>
          <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950 mb-3">
          Lembaga Rukun Warga (RW) & Rukun Tetangga (RT)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          RT dan RW merupakan lembaga kemasyarakatan yang dibentuk melalui musyawarah masyarakat setempat dalam rangka pelayanan pemerintahan, pembangunan sosial, dan pemberdayaan masyarakat di tingkat lingkungan terdekat.
        </p>

        {/* Counter Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total RW</span>
            <span className="text-2xl font-extrabold text-desa-green-950">{totalRW} RW</span>
            <span className="text-[11px] text-slate-500 block">Rukun Warga</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total RT</span>
            <span className="text-2xl font-extrabold text-desa-gold-600">{totalRT} RT</span>
            <span className="text-[11px] text-slate-500 block">Rukun Tetangga</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Cakupan Wilayah</span>
            <span className="text-2xl font-extrabold text-slate-900">{dusunList.length} Dusun</span>
            <span className="text-[11px] text-slate-500 block">Pedukuhan Resmi</span>
          </div>
        </div>
      </div>

      {/* Sections grouped by Dusun */}
      <div className="space-y-6">
        {dusunList.map((dusun) => {
          // Cari items untuk dusun ini
          const dusunItems = rtRwList.filter((item) => {
            if (item.dusun && typeof item.dusun === 'object') {
              return String(item.dusun.id) === String(dusun.id) || item.dusun.nama === dusun.nama
            }
            return String(item.dusun) === String(dusun.id)
          })

          const rwItems = dusunItems.filter((i) => i.jenis === 'RW')
          const rtItems = dusunItems.filter((i) => i.jenis === 'RT')

          return (
            <div
              key={dusun.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8 overflow-hidden"
            >
              {/* Dusun Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-desa-green-50 flex items-center justify-center shrink-0 border border-desa-green-100">
                    <Building2 className="w-5 h-5 text-desa-green-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-desa-green-950">
                      Wilayah {dusun.nama}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Kepala Dusun: <strong className="text-slate-700">{dusun.kepalaDusun}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold self-start sm:self-auto">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {rwItems.length || dusun.jumlahRW} RW
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {rtItems.length || dusun.jumlahRT} RT
                  </span>
                </div>
              </div>

              {/* Table / List of RT and RW */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Tipe Lembaga</th>
                      <th className="py-3 px-4">Nomor</th>
                      <th className="py-3 px-4">Nama Ketua / Pengurus</th>
                      <th className="py-3 px-4">No. Telepon / WhatsApp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dusunItems.length > 0 ? (
                      dusunItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                item.jenis === 'RW'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              }`}
                            >
                              {item.jenis === 'RW' ? 'Rukun Warga' : 'Rukun Tetangga'}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {item.jenis} {item.nomor}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-800">
                            {item.nama}
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                            {item.telepon ? (
                              <span className="inline-flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-desa-green-800" />
                                {item.telepon}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">Melalui Kantor Desa</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-slate-400 italic">
                          Data RT & RW untuk wilayah ini sedang dalam pemutakhiran.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
