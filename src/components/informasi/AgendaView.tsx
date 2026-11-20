'use client'

import React, { useState } from 'react'
import type { AgendaItem } from '@/lib/cms'
import { Card, SectionHeader, EmptyState } from '@/components'
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

interface AgendaViewProps {
  initialAgenda: AgendaItem[]
}

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

/**
 * Komponen Agenda Sesuai Spesifikasi:
 * - Format daftar berdasarkan tanggal (blok tanggal di kiri, judul/lokasi/jam di kanan)
 * - Filter bulan interaktif
 */
export function AgendaView({ initialAgenda }: AgendaViewProps) {
  // Default bulan November 2026 sesuai data desa
  const [selectedMonth, setSelectedMonth] = useState<number>(10) // 10 = November
  const [selectedYear, setSelectedYear] = useState<number>(2026)

  // Filter agenda berdasarkan bulan yang dipilih
  const filteredAgenda = initialAgenda.filter((item) => {
    const d = new Date(item.tanggalMulai)
    return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear
  })

  // Format Helper
  const parseDate = (dStr: string) => {
    const d = new Date(dStr)
    return {
      day: d.getDate(),
      monthShort: d.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase(),
      monthFull: d.toLocaleDateString('id-ID', { month: 'long' }),
      year: d.getFullYear(),
      time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.'),
    }
  }

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear((y) => y - 1)
    } else {
      setSelectedMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear((y) => y + 1)
    } else {
      setSelectedMonth((m) => m + 1)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header & Filter Bulan Sesuai Spesifikasi */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-desa-border">
          <SectionHeader
            title="Kalender Agenda & Kegiatan Desa"
            subtitle="Jadwal musyawarah desa, posyandu, pelatihan, dan kegiatan kemasyarakatan"
            icon={<CalendarIcon className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />}
            className="mb-0"
          />

          {/* Kontrol Navigasi Bulan */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Bulan Sebelumnya"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-desa-border flex items-center justify-center text-desa-textDark transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
            </button>

            <span className="px-4 py-1.5 rounded-desa-pill bg-desa-lightGreen border border-emerald-200 text-xs sm:text-sm font-bold text-desa-darkGreen min-w-[150px] text-center font-sans">
              {NAMA_BULAN[selectedMonth]} {selectedYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Bulan Selanjutnya"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-desa-border flex items-center justify-center text-desa-textDark transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Quick Tabs Pemilihan Bulan Cepat */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 scrollbar-none">
          {NAMA_BULAN.map((nama, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedMonth(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all min-h-[36px] ${
                selectedMonth === idx
                  ? 'bg-desa-darkGreen text-white font-bold shadow-2xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {nama}
            </button>
          ))}
        </div>
      </Card>

      {/* 2. DAFTAR BERDASARKAN TANGGAL: Blok Tanggal di Kiri, Judul/Lokasi/Jam di Kanan Sesuai Spesifikasi */}
      {filteredAgenda.length > 0 ? (
        <div className="space-y-3.5">
          {filteredAgenda.map((item) => {
            const dateInfo = parseDate(item.tanggalMulai)

            return (
              <Card
                key={item.id}
                className="p-4 sm:p-5 hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                {/* Blok Tanggal di Sisi Kiri Sesuai Spesifikasi */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-desa-card bg-desa-lightGreen border border-emerald-200 text-desa-darkGreen flex flex-col items-center justify-center shrink-0 shadow-2xs">
                  <span className="text-xl sm:text-2xl font-black leading-none font-sans">
                    {dateInfo.day}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mt-1 text-desa-accentGreen">
                    {dateInfo.monthShort}
                  </span>
                </div>

                {/* Judul, Lokasi, Jam, dan Sasaran di Sisi Kanan Sesuai Spesifikasi */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-desa-goldLight text-desa-goldHover border border-desa-gold/40">
                      {item.kategori || 'Kegiatan Desa'}
                    </span>
                    <span className="text-[11px] text-desa-textMuted font-medium flex items-center gap-1 font-sans">
                      <Clock className="w-3 h-3 text-desa-accentGreen" strokeWidth={1.75} />
                      <span>Pukul {dateInfo.time} WIB</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-desa-textDark font-sans">
                    {item.judul}
                  </h3>

                  {item.deskripsi && (
                    <p className="text-xs text-desa-textMuted line-clamp-2 leading-relaxed font-sans">
                      {item.deskripsi}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-700 font-sans">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                      <span>{item.lokasi}</span>
                    </span>
                    {item.penyelenggara && (
                      <span className="flex items-center gap-1 text-desa-textMuted">
                        <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.75} />
                        <span>Oleh: {item.penyelenggara}</span>
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-8">
          <EmptyState
            title={`Tidak Ada Agenda di Bulan ${NAMA_BULAN[selectedMonth]} ${selectedYear}`}
            description="Belum ada jadwal kegiatan resmi desa yang terdaftar pada bulan ini."
          />
        </Card>
      )}
    </div>
  )
}
