import React from 'react'
import Link from 'next/link'
import { Home, Phone, FileText, BarChart3, Search, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-desa-bg">
      <div className="max-w-2xl w-full text-center">
        {/* Badge 404 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-desa-pill bg-emerald-100 text-desa-darkGreen text-xs sm:text-sm font-semibold mb-6">
          <HelpCircle className="w-4 h-4 text-desa-primaryGreen" strokeWidth={1.75} />
          <span>Galat 404 • Halaman Tidak Ditemukan</span>
        </div>

        {/* Big 404 Display */}
        <h1 className="text-7xl sm:text-9xl font-black text-desa-darkGreen tracking-tight mb-3 select-none">
          4<span className="text-desa-gold">0</span>4
        </h1>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-desa-textDark mb-3">
          Halaman yang Anda Tuju Tidak Ditemukan
        </h2>

        {/* Description */}
        <p className="text-desa-textMuted text-xs sm:text-sm lg:text-base mb-8 max-w-lg mx-auto leading-relaxed">
          Mohon maaf, tautan yang Anda buka mungkin telah berpindah, diperbarui, atau alamat yang diketikkan belum tepat.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 min-h-[44px] rounded-desa-pill bg-desa-primaryGreen text-white text-xs sm:text-sm font-bold hover:bg-desa-darkGreen shadow-desa-sm transition-all focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20"
          >
            <Home className="w-4 h-4 text-desa-gold" strokeWidth={1.75} />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center justify-center gap-2 px-6 min-h-[44px] rounded-desa-pill bg-white border border-desa-border text-desa-textDark text-xs sm:text-sm font-semibold hover:bg-slate-50 shadow-desa-sm transition-all focus:outline-none focus:ring-2 focus:ring-desa-primaryGreen/20"
          >
            <Phone className="w-4 h-4 text-desa-textMuted" strokeWidth={1.75} />
            <span>Hubungi Perangkat Desa</span>
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <div className="bg-white rounded-desa-card p-5 sm:p-6 border border-desa-border shadow-desa-sm text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-desa-textMuted mb-3.5 text-center sm:text-left">
            Tautan Cepat Layanan Desa:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/informasi/berita"
              className="flex items-center gap-3 p-3 rounded-desa-sm bg-slate-50 border border-desa-border hover:border-desa-primaryGreen hover:bg-emerald-50/40 text-desa-textDark transition-colors group"
            >
              <div className="w-8 h-8 rounded-desa-sm bg-emerald-100 text-desa-primaryGreen flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors truncate">
                  Warta Berita
                </div>
                <div className="text-[11px] text-desa-textMuted truncate">Kabar kegiatan desa</div>
              </div>
            </Link>

            <Link
              href="/transparansi"
              className="flex items-center gap-3 p-3 rounded-desa-sm bg-slate-50 border border-desa-border hover:border-desa-primaryGreen hover:bg-emerald-50/40 text-desa-textDark transition-colors group"
            >
              <div className="w-8 h-8 rounded-desa-sm bg-amber-100 text-desa-gold flex items-center justify-center shrink-0">
                <BarChart3 className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors truncate">
                  Transparansi
                </div>
                <div className="text-[11px] text-desa-textMuted truncate">Laporan APBDes resmi</div>
              </div>
            </Link>

            <Link
              href="/potensi-desa"
              className="flex items-center gap-3 p-3 rounded-desa-sm bg-slate-50 border border-desa-border hover:border-desa-primaryGreen hover:bg-emerald-50/40 text-desa-textDark transition-colors group"
            >
              <div className="w-8 h-8 rounded-desa-sm bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-desa-textDark group-hover:text-desa-primaryGreen transition-colors truncate">
                  Potensi Desa
                </div>
                <div className="text-[11px] text-desa-textMuted truncate">UMKM dan pertanian</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
