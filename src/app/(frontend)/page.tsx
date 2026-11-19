import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Database, Layers, ArrowRight, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Notification Bar */}
      <div className="bg-desa-green-950 text-emerald-100 text-xs py-2 px-4 text-center border-b border-desa-green-900 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Website Desa Bolali (Kec. Wonosari, Kab. Klaten) — Tahap 1: Inisialisasi Fondasi Selesai</span>
      </div>

      {/* Hero Container */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-desa-green-100 text-desa-green-900 text-xs font-semibold uppercase tracking-wider mb-6 border border-desa-green-200">
          <ShieldCheck className="w-4 h-4 text-desa-green-700" />
          Sistem Resmi Desa Bolali
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-desa-green-900 tracking-tight leading-tight">
          Selamat Datang di Portal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-desa-green-800 via-desa-green-700 to-desa-gold-600">
            Pemerintah Desa Bolali
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
          Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah. Platform terpadu informasi publik, tata kelola pemerintahan, potensi desa, dan transparansi anggaran.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-desa-green-900 hover:bg-desa-green-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Masuk Panel Admin CMS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-desa-gold-500 hover:bg-desa-gold-600 text-slate-900 font-semibold shadow-sm hover:shadow transition-all duration-200"
          >
            <span>Login Petugas Desa</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Tech Stack Cards */}
        <div className="mt-14 w-full grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-desa-green-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-desa-green-800 flex items-center justify-center font-bold mb-3">
              <Layers className="w-5 h-5 text-desa-green-700" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">Next.js 15 & Payload CMS 3</h3>
            <p className="mt-1 text-sm text-slate-500">
              App Router terintegrasi dengan CMS headless modern, TypeScript murni, dan performa tinggi.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-desa-green-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold mb-3">
              <Database className="w-5 h-5 text-blue-700" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">PostgreSQL Database</h3>
            <p className="mt-1 text-sm text-slate-500">
              Database relasional tangguh dijalankan melalui Docker container terisolasi pada port 5433.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-desa-gold-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-desa-gold-800 flex items-center justify-center font-bold mb-3">
              <span className="text-lg">🎨</span>
            </div>
            <h3 className="font-semibold text-slate-900 text-base">Desain Identitas Desa</h3>
            <p className="mt-1 text-sm text-slate-500">
              Tailwind CSS dengan warna utama Hijau Tua dan aksen Emas/Kuning sesuai acuan desain beranda.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Pemerintah Desa Bolali. Seluruh hak cipta dilindungi.</p>
          <p className="text-xs text-slate-400">
            Kec. Wonosari, Kab. Klaten, Jawa Tengah
          </p>
        </div>
      </footer>
    </div>
  )
}
