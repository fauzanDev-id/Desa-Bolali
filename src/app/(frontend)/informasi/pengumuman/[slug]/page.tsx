import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPengumumanBySlug } from '@/lib/cms'
import { getMediaUrl, formatDateFullIndonesia } from '@/lib/utils'
import { Breadcrumb, RichText } from '@/components'
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  Calendar,
  ArrowLeft,
  FileText,
  Download,
  Share2,
  CheckCircle2,
} from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pengumuman = await getPengumumanBySlug(slug)

  if (!pengumuman) {
    return {
      title: 'Pengumuman Tidak Ditemukan | Desa Bolali',
      description: 'Halaman pengumuman tidak ditemukan.',
    }
  }

  return {
    title: `${pengumuman.judul} | Pengumuman Desa Bolali`,
    description: pengumuman.ringkasan || pengumuman.judul,
    openGraph: {
      title: pengumuman.judul,
      description: pengumuman.ringkasan || pengumuman.judul,
      url: `/informasi/pengumuman/${slug}`,
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'article',
      publishedTime: pengumuman.tanggal,
    },
    twitter: {
      card: 'summary',
      title: pengumuman.judul,
      description: pengumuman.ringkasan || pengumuman.judul,
    },
  }
}

export const revalidate = 60

export default async function PengumumanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pengumuman = await getPengumumanBySlug(slug)

  if (!pengumuman) {
    notFound()
  }

  const getPriorityTheme = (prioritas: string) => {
    switch (prioritas) {
      case 'Mendesak':
        return {
          bannerBg: 'bg-rose-50 border-rose-200 text-rose-900',
          badgeCls: 'bg-rose-600 text-white',
          icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
          title: 'Perhatian: Pengumuman Bersifat Mendesak / Darurat',
        }
      case 'Penting':
        return {
          bannerBg: 'bg-amber-50 border-amber-200 text-amber-900',
          badgeCls: 'bg-amber-500 text-white',
          icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
          title: 'Pengumuman Penting untuk Seluruh Warga',
        }
      default:
        return {
          bannerBg: 'bg-blue-50 border-blue-200 text-blue-900',
          badgeCls: 'bg-desa-green-900 text-white',
          icon: <Info className="w-5 h-5 text-desa-green-800" />,
          title: 'Pengumuman Informasi Umum Desa',
        }
    }
  }

  const theme = getPriorityTheme(pengumuman.prioritas)
  const lampiranUrl = pengumuman.lampiran ? getMediaUrl(pengumuman.lampiran, '') : null

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/informasi/pengumuman"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-desa-green-800 hover:text-desa-green-950 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Semua Pengumuman</span>
      </Link>

      {/* Main Container Card */}
      <article className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
        {/* Priority Banner Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center gap-3 ${theme.bannerBg}`}>
          <div className="shrink-0">{theme.icon}</div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wider block">
              {theme.title}
            </span>
            <span className="text-[11px] opacity-80">
              Diterbitkan resmi oleh Pemerintah Desa Bolali <span className="font-normal">[Data Dummy]</span>
            </span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase shrink-0 ${theme.badgeCls}`}>
            {pengumuman.prioritas}
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="p-6 sm:p-8 md:p-10 pb-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {pengumuman.judul}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-desa-gold-500" />
              <span>Diterbitkan: {formatDateFullIndonesia(pengumuman.tanggal)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-desa-green-800" />
              <span>Status: Berlaku Aktif</span>
            </div>
          </div>
        </div>

        {/* Ringkasan jika ada */}
        {pengumuman.ringkasan && (
          <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-700 italic leading-relaxed">
              {pengumuman.ringkasan}
            </p>
          </div>
        )}

        {/* Full Rich Text Content */}
        <div className="p-6 sm:p-8 md:p-10">
          <RichText content={pengumuman.isi} />

          {/* Lampiran File Box (jika ada) */}
          {lampiranUrl && (
            <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-desa-green-100 text-desa-green-900 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Berkas Lampiran Resmi</h4>
                  <p className="text-xs text-slate-500">Unduh dokumen edaran resmi (PDF / Gambar)</p>
                </div>
              </div>
              <a
                href={lampiranUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-desa-green-900 text-white text-xs font-semibold hover:bg-desa-green-950 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Berkas</span>
              </a>
            </div>
          )}

          {/* Share Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Share2 className="w-4 h-4 text-desa-green-800" />
              <span>Bagikan Pengumuman:</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(pengumuman.judul)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
