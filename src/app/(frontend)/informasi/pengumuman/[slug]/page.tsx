import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPengumumanBySlug } from '@/lib/cms'
import { getMediaUrl, formatDateFullIndonesia } from '@/lib/utils'
import { Card, Prose } from '@/components'
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  Calendar,
  ArrowLeft,
  FileText,
  Download,
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

  const getPrioritasBadge = (prioritas: string) => {
    switch (prioritas) {
      case 'Mendesak':
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" strokeWidth={1.75} />,
          label: 'Mendesak / Darurat',
          badgeCls: 'bg-rose-50 text-rose-700 border-rose-200',
        }
      case 'Penting':
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.75} />,
          label: 'Penting',
          badgeCls: 'bg-amber-50 text-amber-800 border-amber-200',
        }
      default:
        return {
          icon: <Info className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.75} />,
          label: 'Biasa / Umum',
          badgeCls: 'bg-blue-50 text-blue-800 border-blue-200',
        }
    }
  }

  const badge = getPrioritasBadge(pengumuman.prioritas)
  const lampiranUrl = getMediaUrl(pengumuman.lampiran)

  return (
    <div className="space-y-6">
      {/* Tautan Kembali */}
      <Link
        href="/informasi/pengumuman"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-desa-darkGreen hover:text-desa-greenHover transition-colors py-1"
      >
        <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
        <span>Kembali ke Daftar Pengumuman</span>
      </Link>

      <Card className="p-6 sm:p-8 md:p-10">
        {/* Header Metadata */}
        <div className="pb-5 border-b border-desa-border space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.badgeCls}`}>
              {badge.icon}
              <span>{badge.label}</span>
            </span>
            <span className="text-xs text-desa-textMuted font-medium flex items-center gap-1.5 ml-1">
              <Calendar className="w-3.5 h-3.5 text-desa-accentGreen" strokeWidth={1.75} />
              <span>{formatDateFullIndonesia(pengumuman.tanggal)}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-desa-textDark tracking-tight leading-snug font-sans">
            {pengumuman.judul}
          </h1>

          {pengumuman.nomorSurat && (
            <p className="text-xs text-desa-textMuted font-sans">
              Nomor Surat: <span className="font-semibold text-desa-textDark">{pengumuman.nomorSurat}</span>
            </p>
          )}
        </div>

        {/* Isi Pengumuman dalam Komponen Prose */}
        <Prose className="mt-6">
          {pengumuman.ringkasan && (
            <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed italic border-l-4 border-desa-primaryGreen pl-4 py-1 bg-desa-lightGreen/40 rounded-r-desa-sm mb-6">
              {pengumuman.ringkasan}
            </p>
          )}

          {pengumuman.isi ? (
            <div dangerouslySetInnerHTML={{ __html: typeof pengumuman.isi === 'string' ? pengumuman.isi : '' }} />
          ) : (
            <p className="text-slate-700 leading-relaxed">
              Pengumuman resmi dari Pemerintah Desa Bolali untuk seluruh masyarakat desa. Diharapkan seluruh warga dapat memperhatikan dan mematuhi informasi yang telah disampaikan.
            </p>
          )}
        </Prose>

        {/* Lampiran Dokumen jika Ada */}
        {lampiranUrl && (
          <div className="mt-8 p-4 rounded-desa-card bg-slate-50 border border-desa-border flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-6 h-6 text-emerald-600 shrink-0" strokeWidth={1.75} />
              <div className="min-w-0">
                <span className="text-xs font-bold text-desa-textDark block truncate font-sans">
                  Berkas Lampiran Resmi Pengumuman
                </span>
                <span className="text-[11px] text-desa-textMuted">Format PDF Dokumen</span>
              </div>
            </div>

            <a
              href={lampiranUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-desa-darkGreen hover:bg-desa-greenHover text-white text-xs font-semibold shadow-2xs transition-colors shrink-0 min-h-[44px]"
            >
              <span>Unduh Berkas</span>
              <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
            </a>
          </div>
        )}
      </Card>
    </div>
  )
}
