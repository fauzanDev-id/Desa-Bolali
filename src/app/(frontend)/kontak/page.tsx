import React from 'react'
import type { Metadata } from 'next'
import { getContactData, getWebsiteSettings } from '@/lib/cms'
import { PageHeader } from '@/components/ui/PageHeader'
import { FormulirPesan } from '@/components/kontak/FormulirPesan'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Info,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kontak & Layanan Warga | Pemerintah Desa Bolali',
  description: 'Informasi alamat kantor desa, nomor telepon, WhatsApp pengaduan, email resmi, peta digital lokasi balai desa, dan formulir pengaduan masyarakat Desa Bolali.',
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

  const googleMapsUrl = `https://maps.google.com/?q=${contact.latitude || -7.6321},${contact.longitude || 110.7432}`

  return (
    <div className="min-h-screen bg-desa-bg pb-16">
      {/* 1. Page Header Standar Desa Bolali */}
      <PageHeader
        title="Kontak & Layanan Warga"
        subtitle="Pusat informasi, alamat resmi, layanan administrasi, dan saluran aspirasi masyarakat Desa Bolali."
        breadcrumbs={[{ label: 'Kontak', href: '/kontak' }]}
      />

      {/* Main Container max-w-[1344px] */}
      <div className="max-w-[1344px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* 2. Dua Kolom: Info Kontak (Kiri) & Formulir Pesan (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8 sm:mb-12">
          {/* Kolom Kiri: Informasi Kontak Resmi (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Kartu Alamat Kantor */}
            <div className="bg-white rounded-desa-card border border-desa-border shadow-desa-sm p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-desa-sm bg-emerald-50 text-desa-primaryGreen flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block mb-1">
                    Alamat Balai Desa
                  </span>
                  <p className="text-sm font-semibold text-desa-textDark leading-relaxed">
                    {contact.alamat || 'Jl. Mawar No. 10, Desa Bolali'}
                  </p>
                  <p className="text-xs text-desa-textMuted mt-1">
                    Kecamatan Wonosari, Kabupaten Klaten, Jawa Tengah
                  </p>
                  {contact.kodePos && (
                    <span className="inline-block mt-2 px-2.5 py-0.5 rounded-desa-pill bg-slate-100 text-xs font-mono text-slate-700">
                      Kode Pos: {contact.kodePos}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Kartu Jam Operasional */}
            <div className="bg-white rounded-desa-card border border-desa-border shadow-desa-sm p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-desa-sm bg-amber-50 text-desa-gold flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block mb-1">
                    Jam Layanan Pelayanan
                  </span>
                  <p className="text-sm font-semibold text-desa-textDark leading-relaxed">
                    {contact.jamOperasional || 'Senin – Kamis: 08.00 – 15.00 WIB | Jumat: 08.00 – 11.30 WIB'}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-desa-textMuted">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-400" />
                    <span>Sabtu, Minggu & Hari Libur Nasional: Tutup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Telepon, WhatsApp & Email */}
            <div className="bg-white rounded-desa-card border border-desa-border shadow-desa-sm p-5 sm:p-6 space-y-4">
              <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block border-b border-desa-border pb-2">
                Saluran Komunikasi
              </span>

              {/* Telepon */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-desa-sm bg-slate-100 text-desa-primaryGreen flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-desa-textMuted block">Telepon Kantor</span>
                  <a
                    href={`tel:${contact.telepon}`}
                    className="text-xs sm:text-sm font-semibold text-desa-textDark hover:text-desa-primaryGreen transition-colors"
                  >
                    {contact.telepon || '(0272) 123456'}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              {contact.whatsapp && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-desa-sm bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-desa-textMuted block">Layanan WhatsApp</span>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>{contact.whatsapp}</span>
                      <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-desa-sm bg-slate-100 text-desa-primaryGreen flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-desa-textMuted block">Email Resmi</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-xs sm:text-sm font-semibold text-desa-primaryGreen hover:underline break-all"
                  >
                    {contact.email || 'desa@bolali.desa.id'}
                  </a>
                </div>
              </div>
            </div>

            {/* Catatan Pelayanan */}
            <div className="p-4 rounded-desa-card bg-emerald-50/60 border border-emerald-100/80 text-xs text-emerald-950 flex items-start gap-3">
              <Info className="w-4 h-4 text-desa-primaryGreen shrink-0 mt-0.5" strokeWidth={1.75} />
              <p className="leading-relaxed">
                Untuk pengurusan surat pengantar, kartu keluarga, dan administrasi kependudukan lainnya, warga diharapkan membawa KTP/KK asli dan surat pengantar dari RT/RW setempat.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Pesan & Aspirasi (7 cols) */}
          <div className="lg:col-span-7">
            <FormulirPesan />
          </div>
        </div>

        {/* 3. Peta Digital Lebar Penuh di Bawah */}
        <div className="bg-white rounded-desa-card border border-desa-border shadow-desa-sm p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-desa-border gap-3">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-desa-primaryGreen" strokeWidth={1.75} />
                <h3 className="font-bold text-base text-desa-textDark">Peta Lokasi Balai Desa Bolali</h3>
              </div>
              <p className="text-xs text-desa-textMuted mt-1">
                Koordinat: {contact.latitude || -7.6321}, {contact.longitude || 110.7432} • Kecamatan Wonosari, Klaten
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 min-h-[44px] rounded-desa-pill bg-slate-100 text-desa-textDark hover:bg-emerald-50 hover:text-desa-primaryGreen text-xs font-semibold border border-desa-border transition-colors self-start sm:self-auto"
            >
              <span>Buka Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
            </a>
          </div>

          {/* Map Embed Frame */}
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-desa-sm overflow-hidden bg-slate-100 border border-desa-border">
            <iframe
              src={mapEmbedUrl}
              title="Peta Lokasi Kantor Desa Bolali"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div className="mt-4 p-3.5 rounded-desa-sm bg-slate-50 border border-desa-border text-xs text-desa-textMuted flex items-start gap-2.5">
            <Info className="w-4 h-4 text-desa-primaryGreen shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="leading-relaxed">
              Balai Desa Bolali dapat diakses dengan mudah melalui jalan poros kecamatan Wonosari. Tersedia area parkir roda dua dan roda empat yang memadai untuk kemudahan masyarakat saat berkunjung.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
