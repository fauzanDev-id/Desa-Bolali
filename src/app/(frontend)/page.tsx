import React from 'react'
import {
  Breadcrumb,
  Button,
  SectionCard,
  SectionTitle,
} from '@/components'
import { ShieldCheck, Sparkles, Layers, Palette, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Demo */}
      <Breadcrumb
        items={[
          { label: 'Sistem Desain & Layout Global' },
        ]}
      />

      {/* Status Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-desa-green-900 to-desa-green-950 text-white p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-emerald-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desa-gold-500/20 text-desa-gold-400 text-xs font-bold uppercase tracking-wider border border-desa-gold-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tahap 3 Selesai: Sistem Desain & Layout Global</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Fondasi Tampilan Website Desa Bolali Telah Siap
          </h1>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Header (TopBar kontak, kontrol aksesibilitas A-/A/A+, logo, menu navigasi dropdown dinamis, pencarian, dan menu mobile) serta Footer resmi telah aktif dan terhubung langsung ke data CMS.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            href="/admin"
            variant="gold"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Buka Panel CMS
          </Button>
        </div>
      </div>

      {/* Komponen Dasar Pratinjau (Showcase Design System) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Palet Warna Identitas */}
        <SectionCard hoverEffect>
          <SectionTitle
            title="Palet Warna"
            subtitle="Ekstraksi dari mockup beranda"
            icon={<Palette className="w-4 h-4 text-desa-green-800" />}
          />
          <div className="space-y-3 mt-4 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-desa-green-900 text-white font-medium">
              <span>Hijau Tua Utama</span>
              <span className="font-mono opacity-80">#0B4619</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-desa-green-800 text-white font-medium">
              <span>Hijau Forest Sedang</span>
              <span className="font-mono opacity-80">#14532D</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-desa-gold-500 text-slate-900 font-semibold">
              <span>Aksen Emas / Kuning</span>
              <span className="font-mono">#EAB308</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-desa-green-50 text-desa-green-900 font-medium border border-desa-green-200">
              <span>Hijau Permukaan Halus</span>
              <span className="font-mono">#F0FDF4</span>
            </div>
          </div>
        </SectionCard>

        {/* Card 2: Ragam Komponen Tombol */}
        <SectionCard hoverEffect>
          <SectionTitle
            title="Komponen Tombol"
            subtitle="Variasi tombol desain sistem"
            icon={<Layers className="w-4 h-4 text-desa-green-800" />}
          />
          <div className="flex flex-wrap gap-2.5 mt-4">
            <Button variant="primary" size="sm">
              Primary SM
            </Button>
            <Button variant="gold" size="sm">
              Gold SM
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Button variant="primary" size="md" className="w-full">
              Tombol Primary Penuh
            </Button>
          </div>
        </SectionCard>

        {/* Card 3: Standar Tipografi & Aksesibilitas */}
        <SectionCard hoverEffect>
          <SectionTitle
            title="Aksesibilitas Font"
            subtitle="Dukungan perbesaran teks warga"
            icon={<ShieldCheck className="w-4 h-4 text-desa-green-800" />}
          />
          <p className="text-xs text-slate-600 leading-relaxed mt-2">
            Tersedia kontrol ukuran font di Top Bar (A- / A / A+) yang dapat menyimpan preferensi pengguna di peramban secara otomatis untuk kenyamanan membaca seluruh kalangan warga.
          </p>
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700">
            <p className="font-semibold text-desa-green-900">Uji Coba Ukuran Font:</p>
            <p className="mt-1 text-slate-500 text-[11px]">
              Klik tombol A- atau A+ di bagian atas kanan halaman untuk melihat perubahan ukuran teks secara dinamis di seluruh komponen website.
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
