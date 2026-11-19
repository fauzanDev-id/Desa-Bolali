import React from 'react'
import type { Metadata } from 'next'
import { getDataKependudukan } from '@/lib/cms'
import {
  Users,
  Home,
  UserCheck,
  Briefcase,
  GraduationCap,
  Calendar,
  Percent,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Data Kependudukan | Profil Desa Bolali',
  description: 'Statistik demografi, jumlah penduduk, kepala keluarga, kelompok umur, dan mata pencaharian Desa Bolali.',
}

export const revalidate = 60

export default async function KependudukanPage() {
  const data = await getDataKependudukan()

  const persentaseLaki = ((data.jumlahLakiLaki / data.totalPenduduk) * 100).toFixed(1)
  const persentasePerempuan = ((data.jumlahPerempuan / data.totalPenduduk) * 100).toFixed(1)

  return (
    <div className="space-y-8">
      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-card">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-desa-green-50 flex items-center justify-center text-desa-green-800">
            <Users className="w-5 h-5 text-desa-green-800" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Statistik Demografi Desa Bolali
            </h2>
            <p className="text-xs text-slate-500">
              Pembaruan data kependudukan tahun {data.tahunData} <span className="text-slate-400">[Data Dummy]</span>
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-desa-green-900 text-xs font-semibold self-start sm:self-auto border border-emerald-100">
          <Calendar className="w-3.5 h-3.5 text-desa-green-800" />
          <span>Tahun {data.tahunData}</span>
        </div>
      </div>

      {/* 4 Counter Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Penduduk */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Penduduk
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-desa-green-950">
            {data.totalPenduduk.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">Jiwa terdaftar</span>
        </div>

        {/* Kepala Keluarga */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Kepala Keluarga
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {data.jumlahKepalaKeluarga.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">KK terdaftar</span>
        </div>

        {/* Laki-Laki */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
            Laki-Laki
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-900">
            {data.jumlahLakiLaki.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-blue-600/80 mt-1 block">{persentaseLaki}% dari total</span>
        </div>

        {/* Perempuan */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-5">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
            Perempuan
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-900">
            {data.jumlahPerempuan.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-rose-600/80 mt-1 block">{persentasePerempuan}% dari total</span>
        </div>
      </div>

      {/* Komparasi Rasio Jenis Kelamin */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          Komposisi Gender & Rasio Jenis Kelamin
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4">
          Perbandingan proporsi penduduk laki-laki dan perempuan di wilayah Desa Bolali.
        </p>

        {/* Gender Bar */}
        <div className="space-y-2">
          <div className="w-full h-5 rounded-full overflow-hidden flex bg-slate-100">
            <div
              style={{ width: `${persentaseLaki}%` }}
              className="bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold"
            >
              Laki-Laki ({persentaseLaki}%)
            </div>
            <div
              style={{ width: `${persentasePerempuan}%` }}
              className="bg-rose-500 flex items-center justify-center text-[10px] text-white font-bold"
            >
              Perempuan ({persentasePerempuan}%)
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-600 font-medium px-1">
            <span>{data.jumlahLakiLaki.toLocaleString('id-ID')} Jiwa</span>
            <span>{data.jumlahPerempuan.toLocaleString('id-ID')} Jiwa</span>
          </div>
        </div>
      </div>

      {/* Distribusi Kelompok Umur */}
      {data.kelompokUmur && data.kelompokUmur.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
            <UserCheck className="w-4 h-4 text-desa-gold-500" />
            <span>Struktur Demografi</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
            Distribusi Berdasarkan Kelompok Usia
          </h3>

          <div className="space-y-3.5">
            {data.kelompokUmur.map((item, idx) => {
              const pct = ((item.jumlah / data.totalPenduduk) * 100).toFixed(1)
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs sm:text-sm font-semibold">
                    <span className="text-slate-800">{item.rentang}</span>
                    <span className="text-slate-900 font-bold">
                      {item.jumlah.toLocaleString('id-ID')} Jiwa ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full bg-desa-green-800 rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pekerjaan / Mata Pencaharian */}
      {data.pekerjaan && data.pekerjaan.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4 text-desa-gold-500" />
            <span>Mata Pencaharian</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
            Mata Pencaharian & Profesi Warga
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Jenis Profesi / Pekerjaan</th>
                  <th className="py-3 px-4 text-right">Jumlah (Jiwa)</th>
                  <th className="py-3 px-4 text-right">Proporsi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.pekerjaan.map((item, idx) => {
                  const pct = ((item.jumlah / data.totalPenduduk) * 100).toFixed(1)
                  return (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 text-slate-400 font-medium">{idx + 1}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{item.namaPekerjaan}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900">
                        {item.jumlah.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600 font-medium">{pct}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tingkat Pendidikan Terakhir */}
      {data.pendidikan && data.pendidikan.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-desa-gold-500" />
            <span>Tingkat Pendidikan</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
            Pendidikan Terakhir Masyarakat
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.pendidikan.map((item, idx) => {
              const pct = ((item.jumlah / data.totalPenduduk) * 100).toFixed(1)
              return (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    {item.jenjang}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-desa-green-950">
                      {item.jumlah.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs font-bold text-desa-gold-600 bg-desa-gold-50 px-2 py-0.5 rounded-full border border-desa-gold-200/60">
                      {pct}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
