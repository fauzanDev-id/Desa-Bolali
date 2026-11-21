import React from 'react'
import type { Metadata } from 'next'
import { getDataKependudukan } from '@/lib/cms'
import { Card, SectionHeader } from '@/components'
import { Users, House, User, CalendarBlank } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Data Kependudukan | Profil Desa Bolali',
  description: 'Statistik demografi, jumlah penduduk, kepala keluarga, kelompok umur, dan mata pencaharian Desa Bolali.',
}

export const revalidate = 60

export default async function KependudukanPage() {
  const data = await getDataKependudukan()

  const totalPenduduk = data.totalPenduduk || 5248
  const jumlahLaki = data.jumlahLakiLaki || 2614
  const jumlahPerempuan = data.jumlahPerempuan || 2634
  const jumlahKK = data.jumlahKepalaKeluarga || 1642

  const persentaseLaki = ((jumlahLaki / totalPenduduk) * 100).toFixed(1)
  const persentasePerempuan = ((jumlahPerempuan / totalPenduduk) * 100).toFixed(1)

  // Distribusi penduduk per dusun untuk Bar Chart sederhana satu warna hijau
  const dusunDistribution = [
    { nama: 'Dusun Bolali I', jiwa: 1420, kk: 440, persen: 27.1 },
    { nama: 'Dusun Bolali II', jiwa: 1350, kk: 422, persen: 25.7 },
    { nama: 'Dusun Tegalrejo', jiwa: 1260, kk: 395, persen: 24.0 },
    { nama: 'Dusun Karanganyar', jiwa: 1218, kk: 385, persen: 23.2 },
  ]

  // Kelompok Usia
  const usiaDistribution = [
    { kelompok: '0 - 14 Tahun (Anak-anak)', jiwa: 1048, persen: 20 },
    { kelompok: '15 - 64 Tahun (Usia Produktif)', jiwa: 3516, persen: 67 },
    { kelompok: '65+ Tahun (Lanjut Usia)', jiwa: 684, persen: 13 },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. KARTU ANGKA: Jumlah Penduduk, KK, Laki-Laki, Perempuan Sesuai Spesifikasi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Penduduk */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider">
              Penduduk
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-desa-textDark tracking-tight font-sans">
            {totalPenduduk.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-desa-textMuted mt-1 block font-medium">Jiwa terdaftar</span>
        </Card>

        {/* Kepala Keluarga */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <House className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider">
              Kepala Keluarga
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-desa-textDark tracking-tight font-sans">
            {jumlahKK.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-desa-textMuted mt-1 block font-medium">KK terdaftar</span>
        </Card>

        {/* Laki-Laki */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider">
              Laki-Laki
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-desa-textDark tracking-tight font-sans">
            {jumlahLaki.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-desa-textMuted mt-1 block font-medium">{persentaseLaki}% dari total</span>
        </Card>

        {/* Perempuan */}
        <Card className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider">
              Perempuan
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-desa-textDark tracking-tight font-sans">
            {jumlahPerempuan.toLocaleString('id-ID')}
          </div>
          <span className="text-xs text-desa-textMuted mt-1 block font-medium">{persentasePerempuan}% dari total</span>
        </Card>
      </div>

      {/* 2. BAR CHART SEDERHANA SATU WARNA HIJAU Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Distribusi Penduduk per Wilayah Dusun"
          subtitle="Grafik bar sederhana satu warna hijau resmi desa"
          icon={<Users className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="space-y-4 mt-6">
          {dusunDistribution.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-desa-textDark font-sans">
                <span>{item.nama}</span>
                <span className="text-desa-darkGreen font-bold">
                  {item.jiwa.toLocaleString('id-ID')} Jiwa ({item.persen}%)
                </span>
              </div>

              {/* Bar Chart Sederhana Satu Warna Hijau */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-desa-primaryGreen rounded-full transition-all duration-500"
                  style={{ width: `${(item.jiwa / 1600) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. TABEL DATA BERSIH: Kelompok Usia & Struktur Warga */}
      <Card className="p-5 sm:p-7">
        <SectionHeader
          title="Tabel Struktur Usia Penduduk"
          icon={<CalendarBlank className="w-4 h-4 text-desa-accentGreen" />}
        />

        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-desa-border rounded-desa-sm text-xs sm:text-sm font-sans">
            <thead>
              <tr className="bg-slate-50 border-b border-desa-border text-desa-textDark">
                <th className="py-2.5 px-4 text-left font-bold">Kelompok Usia</th>
                <th className="py-2.5 px-4 text-right font-bold">Jumlah Jiwa</th>
                <th className="py-2.5 px-4 text-right font-bold">Proporsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-desa-border">
              {usiaDistribution.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="py-2.5 px-4 font-medium text-slate-800">{item.kelompok}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-desa-textDark">
                    {item.jiwa.toLocaleString('id-ID')} Jiwa
                  </td>
                  <td className="py-2.5 px-4 text-right font-semibold text-desa-primaryGreen">
                    {item.persen}%
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-50/60 font-bold border-t-2 border-desa-border">
                <td className="py-2.5 px-4 text-desa-darkGreen">Total Keseluruhan</td>
                <td className="py-2.5 px-4 text-right text-desa-darkGreen">
                  {totalPenduduk.toLocaleString('id-ID')} Jiwa
                </td>
                <td className="py-2.5 px-4 text-right text-desa-darkGreen">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
