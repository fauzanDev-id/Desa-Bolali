import React from 'react'
import type { Metadata } from 'next'
import { getContactData, getWebsiteSettings } from '@/lib/cms'
import { Breadcrumb } from '@/components'
import { FormulirPesan } from '@/components/kontak/FormulirPesan'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Building,
  Navigation,
  ExternalLink,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kontak & Lokasi Kantor | Pemerintah Desa Bolali',
  description: 'Alamat kantor desa, nomor telepon, WhatsApp pengaduan, email resmi, peta digital lokasi balai desa, dan formulir kirim pesan warga Desa Bolali.',
  openGraph: {
    title: 'Hubungi Pemerintah Desa Bolali | Kontak & Alamat',
    description: 'Kanal komunikasi resmi Pemerintah Desa Bolali, Kecamatan Wonosari, Klaten.',
    url: '/kontak',
    siteName: 'Desa Bolali',
    locale: 'id_ID',
    type: 'website',
  },
}

export const revalidate = 60

export default async function KontakPage() {
  const [contact, settings] = await Promise.all([
    getContactData(),
    getWebsiteSettings(),
  ])

  const mapEmbedUrl =
    contact.googleMapsEmbedUrl ||
    `https://www.openstreetmap.org/export/embed.html?bbox=110.7300%2C-7.6400%2C110.7550%2C-7.6250&layer=mapnik&marker=${contact.latitude || -7.6321}%2C${contact.longitude || 110.7432}`

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-desa-green-950 via-desa-green-900 to-desa-green-800 text-white overflow-hidden py-10 sm:py-14 border-b border-desa-gold-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-desa-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-desa-gold-300 text-xs font-semibold backdrop-blur-sm border border-white/10 mb-3">
              <Building className="w-3.5 h-3.5 text-desa-gold-400" />
              <span>Pusat Layanan Warga</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Kontak & Lokasi Kantor Desa
            </h1>
            <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
              Hubungi kami untuk layanan administrasi, permohonan surat keterangan, usulan pembangunan, atau kunjungi langsung Kantor Balai Desa Bolali.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          items={[{ label: 'Kontak', href: '/kontak' }]}
          className="mb-6"
        />

        {/* 4 Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Alamat */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-desa-green-50 text-desa-green-900 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-desa-green-800" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Alamat Kantor
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {contact.alamat}
              </p>
            </div>
            {contact.kodePos && (
              <span className="text-xs text-slate-500 mt-2 block font-mono">
                Kode Pos: {contact.kodePos}
              </span>
            )}
          </div>

          {/* Telepon & WhatsApp */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-emerald-700" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Telepon & WhatsApp
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {contact.telepon}
              </p>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {contact.whatsapp}</span>
                </a>
              )}
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">Layanan Cepat Respons</span>
          </div>

          {/* Email Resmi */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Email Resmi
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-xs sm:text-sm font-semibold text-desa-green-800 hover:underline break-all"
              >
                {contact.email}
              </a>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">Surat Menyurat & Undangan</span>
          </div>

          {/* Jam Pelayanan */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-desa-gold-50 text-desa-gold-700 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-desa-gold-600" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Jam Operasional
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {contact.jamOperasional}
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">Sabtu & Minggu Tutup</span>
          </div>
        </div>

        {/* Two Columns: Formulir Pesan & Peta Lokasi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Kiri: Formulir Aspirasi Warga (7 Cols) */}
          <div className="lg:col-span-7">
            <FormulirPesan />
          </div>

          {/* Kolom Kanan: Peta Lokasi Digital (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-desa-green-800" />
                  <h3 className="font-bold text-base text-slate-900">Peta Lokasi Kantor Desa</h3>
                </div>
                <a
                  href={`https://maps.google.com/?q=${contact.latitude || -7.6321},${contact.longitude || 110.7432}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-desa-green-800 hover:text-desa-green-950"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Embed Frame */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <iframe
                  src={mapEmbedUrl}
                  title="Peta Lokasi Kantor Desa Bolali"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">Petunjuk Arah:</p>
                <p className="mt-0.5 leading-relaxed">
                  Terletak di jalur utama Kecamatan Wonosari, berdekatan dengan Puskesmas dan Pasar Wonosari Klaten [Data Dummy].
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
