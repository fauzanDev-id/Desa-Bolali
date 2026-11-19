'use client'

import React, { useState } from 'react'
import type { AgendaItem } from '@/lib/cms'
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  CalendarDays,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'

interface AgendaViewProps {
  initialAgenda: AgendaItem[]
}

export function AgendaView({ initialAgenda }: AgendaViewProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [statusFilter, setStatusFilter] = useState<string>('Semua')
  
  // Kalender Bulan (Default November 2026 sesuai data dummy)
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 10, 1)) // Bulan ke-10 = November
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // Filter berdasarkan status
  const filteredAgenda = initialAgenda.filter((item) => {
    if (statusFilter === 'Semua') return true
    return item.status.toLowerCase() === statusFilter.toLowerCase()
  })

  // Format Helper
  const parseDate = (dStr: string) => {
    const d = new Date(dStr)
    return {
      day: d.getDate(),
      monthIndex: d.getMonth(),
      year: d.getFullYear(),
      monthName: d.toLocaleDateString('id-ID', { month: 'short' }),
      fullDate: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.'),
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Akan Datang':
        return {
          label: 'Akan Datang',
          cls: 'bg-emerald-50 text-desa-green-900 border-emerald-200',
          dot: 'bg-emerald-500',
        }
      case 'Berlangsung':
        return {
          label: 'Sedang Berlangsung',
          cls: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
        }
      case 'Selesai':
        return {
          label: 'Telah Selesai',
          cls: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
        }
      default:
        return {
          label: status,
          cls: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
        }
    }
  }

  // Kalender Grid Builder
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7 // Mulai Senin (0) s.d Minggu (6)
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate()
  const monthNameYear = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  // Cari kegiatan di bulan ini
  const eventsInCurrentMonth = initialAgenda.filter((item) => {
    const d = new Date(item.tanggalMulai)
    return d.getMonth() === month && d.getFullYear() === year
  })

  const getEventsForDay = (dayNum: number) => {
    return eventsInCurrentMonth.filter((item) => {
      const d = new Date(item.tanggalMulai)
      return d.getDate() === dayNum
    })
  }

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : []

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* View Switcher & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-desa-green-800 uppercase tracking-wider mb-1">
              <CalendarIcon className="w-4 h-4 text-desa-gold-500" />
              <span>Jadwal & Agenda Desa</span>
              <span className="text-[10px] text-slate-400 font-normal">[Data Dummy]</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-desa-green-950">
              Agenda Kegiatan Desa Bolali
            </h2>
          </div>

          {/* Toggle View Mode Buttons */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 self-start sm:self-auto border border-slate-200/60">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-desa-green-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Daftar Kegiatan</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-desa-green-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Tampilan Kalender</span>
            </button>
          </div>
        </div>

        {/* Filter Status Pills */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1">Status:</span>
          {['Semua', 'Akan Datang', 'Berlangsung', 'Selesai'].map((st) => {
            const isActive = statusFilter === st
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-desa-green-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {st}
              </button>
            )
          })}
        </div>
      </div>

      {/* VIEW MODE 1: LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredAgenda.length > 0 ? (
            filteredAgenda.map((agenda) => {
              const start = parseDate(agenda.tanggalMulai)
              const end = agenda.tanggalSelesai ? parseDate(agenda.tanggalSelesai) : null
              const badge = getStatusBadge(agenda.status)

              return (
                <div
                  key={agenda.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 sm:p-6 hover:border-desa-green-300 hover:shadow-card-hover transition-all flex flex-col md:flex-row gap-5 items-start"
                >
                  {/* Big Date Block */}
                  <div className="w-full md:w-24 shrink-0 rounded-xl bg-gradient-to-br from-desa-green-900 to-desa-green-950 text-white p-3 text-center shadow-sm flex md:flex-col items-center justify-between md:justify-center border border-desa-green-800">
                    <span className="text-xs font-bold text-desa-gold-400 uppercase tracking-wider">
                      {start.monthName}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold my-0.5 tracking-tight">
                      {start.day}
                    </span>
                    <span className="text-[10px] text-emerald-200/80 font-medium">{start.year}</span>
                  </div>

                  {/* Agenda Details */}
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.cls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-desa-green-800" />
                        <span>
                          {start.time} {end ? `- ${end.time} WIB` : 'WIB s.d selesai'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {agenda.judul}
                    </h3>

                    {agenda.deskripsi && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {agenda.deskripsi}
                      </p>
                    )}

                    {/* Location & Host Strip */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-desa-gold-600 shrink-0" />
                        <span className="font-medium text-slate-800">{agenda.lokasi}</span>
                      </div>

                      {agenda.penyelenggara && (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-desa-green-800 shrink-0" />
                          <span>Penyelenggara: <strong className="text-slate-800">{agenda.penyelenggara}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-12 text-center">
              <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Tidak ada agenda untuk status ini</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Silakan pilih status lain atau periksa jadwal di bulan berikutnya.
              </p>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6 sm:p-8">
            {/* Month Header Controller */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <h3 className="text-lg sm:text-xl font-bold text-desa-green-950 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-desa-gold-500" />
                <span className="capitalize">{monthNameYear}</span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentDate(new Date(year, month - 1, 1))
                    setSelectedDay(null)
                  }}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
                  title="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentDate(new Date(year, month + 1, 1))
                    setSelectedDay(null)
                  }}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
                  title="Bulan Berikutnya"
                >
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            </div>

            {/* Day Names Header */}
            <div className="grid grid-cols-7 gap-1 text-center py-3 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span className="text-amber-600">Sab</span>
              <span className="text-rose-600">Min</span>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-3">
              {/* Empty leading days */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-14 sm:h-20 bg-slate-50/50 rounded-xl" />
              ))}

              {/* Day cells */}
              {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
                const dayNum = idx + 1
                const dayEvents = getEventsForDay(dayNum)
                const hasEvents = dayEvents.length > 0
                const isSelected = selectedDay === dayNum

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-14 sm:h-20 p-1.5 sm:p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-desa-green-800 bg-desa-green-50 ring-2 ring-desa-green-800'
                        : hasEvents
                        ? 'border-emerald-200 bg-emerald-50/60 hover:border-desa-green-600 hover:bg-emerald-50'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? 'text-desa-green-950 font-extrabold' : 'text-slate-800'
                      }`}
                    >
                      {dayNum}
                    </span>

                    {hasEvents && (
                      <div className="space-y-1 overflow-hidden">
                        <div className="hidden sm:block">
                          <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-desa-green-900 text-white truncate max-w-full">
                            {dayEvents[0].judul}
                          </span>
                        </div>
                        <div className="sm:hidden flex items-center gap-0.5">
                          <span className="w-2 h-2 rounded-full bg-desa-green-800" />
                          {dayEvents.length > 1 && (
                            <span className="text-[9px] font-bold text-desa-green-900">
                              +{dayEvents.length - 1}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Date Inspector Box */}
          {selectedDay && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
              <h4 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-desa-green-800" />
                <span>
                  Agenda pada Tanggal {selectedDay} {monthNameYear}
                </span>
              </h4>

              {selectedDayEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDayEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-desa-green-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            {ev.status}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {parseDate(ev.tanggalMulai).time} WIB
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-900">{ev.judul}</h5>
                        <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-desa-gold-600" />
                          <span>{ev.lokasi}</span>
                        </p>
                      </div>

                      {ev.penyelenggara && (
                        <span className="text-xs text-slate-500 self-start sm:self-auto">
                          Penyelenggara: <strong className="text-slate-800">{ev.penyelenggara}</strong>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Tidak ada agenda yang dijadwalkan pada tanggal ini.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
