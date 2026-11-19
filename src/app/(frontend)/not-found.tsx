import React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, Search, FileText, BarChart3, Phone, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Badge 404 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-6">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>Galat 404 • Halaman Tidak Ditemukan</span>
        </div>

        {/* Big 404 Display */}
        <h1 className="text-7xl sm:text-9xl font-extrabold text-desa-darkGreen tracking-tight mb-4 drop-shadow-sm">
          4<span className="text-amber-500">0</span>4
        </h1>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Waduh, Halaman yang Anda Cari Tidak Ada
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
          Mohon maaf, halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau alamat URL yang dimasukkan salah.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-desa-darkGreen text-white font-medium hover:bg-emerald-900 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          >
            <Home className="w-5 h-5 text-amber-300" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-desa-darkGreen focus:ring-offset-2"
          >
            <Phone className="w-5 h-5 text-gray-500" />
            <span>Hubungi Perangkat Desa</span>
          </Link>
        </div>

        {/* Quick Navigation Cards */}
        <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 text-left">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 text-center sm:text-left">
            Tautan Cepat yang Mungkin Membantu:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/informasi/berita"
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-gray-800 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Kabar Berita</div>
                <div className="text-xs text-gray-500">Informasi terbaru desa</div>
              </div>
            </Link>

            <Link
              href="/transparansi"
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-gray-800 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-200 transition-colors">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Transparansi</div>
                <div className="text-xs text-gray-500">Laporan APBDes resmi</div>
              </div>
            </Link>

            <Link
              href="/potensi-desa"
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 text-gray-800 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-blue-100 text-blue-800 group-hover:bg-blue-200 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Potensi Desa</div>
                <div className="text-xs text-gray-500">UMKM, wisata & produk</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
