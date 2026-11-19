import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPotensiBySlug, getPotensiList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { Breadcrumb, RichText } from '@/components'
import {
  Sparkles,
  MapPin,
  Phone,
  ArrowLeft,
  Share2,
  ArrowRight,
  MessageCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getPotensiBySlug(slug)

  if (!item) {
    return {
      title: 'Potensi Tidak Ditemukan | Desa Bolali',
      description: 'Halaman potensi desa tidak ditemukan.',
    }
  }

  const imageUrl = getMediaUrl(item.gambar, '/images/hero-desa.jpg')

  return {
    title: `${item.judul} | Potensi Unggulan Desa Bolali`,
    description: item.ringkasan,
    openGraph: {
      title: `${item.judul} - Potensi Desa Bolali`,
      description: item.ringkasan,
      url: `/potensi-desa/${slug}`,
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.judul,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.judul,
      description: item.ringkasan,
      images: [imageUrl],
    },
  }
}

export const revalidate = 60

export default async function PotensiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const potensi = await getPotensiBySlug(slug)

  if (!potensi) {
    notFound()
  }

  const allPotensi = await getPotensiList()
  const relatedPotensi = allPotensi.filter((p) => p.slug !== slug).slice(0, 3)
  const imgUrl = getMediaUrl(potensi.gambar, '/images/hero-desa.jpg')

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          items={[
            { label: 'Potensi Desa', href: '/potensi-desa' },
            { label: potensi.judul },
          ]}
          className="mb-4"
        />

        {/* Back Link */}
        <Link
          href="/potensi-desa"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-desa-green-800 hover:text-desa-green-950 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Semua Potensi</span>
        </Link>

        {/* Main Article Card */}
        <article className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
          {/* Header Metadata */}
          <div className="p-6 sm:p-8 md:p-10 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-desa-green-50 text-desa-green-900 text-xs font-bold border border-desa-green-100">
                <Sparkles className="w-3.5 h-3.5 text-desa-gold-500" />
                <span>Kategori: {potensi.kategori}</span>
              </span>
              <span className="text-[11px] text-slate-400">[Data Dummy]</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {potensi.judul}
            </h1>

            {potensi.lokasi && (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-desa-gold-600 shrink-0" />
                <span>Lokasi: <strong>{potensi.lokasi}</strong></span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
            <Image
              src={imgUrl}
              alt={potensi.judul}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Ringkasan Highlight Box */}
          <div className="p-6 sm:p-8 bg-desa-green-50/50 border-b border-desa-green-100/60">
            <p className="text-sm sm:text-base font-medium text-slate-700 italic leading-relaxed">
              “{potensi.ringkasan}”
            </p>
          </div>

          {/* Full Description */}
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            <div className="prose prose-slate max-w-none">
              <RichText content={potensi.deskripsi || potensi.ringkasan} />
            </div>

            {/* Pengelola / Kontak Card */}
            {potensi.kontakPengelola && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-desa-green-100 text-desa-green-900 flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Pengelola & Narahubung Usaha</h4>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">{potensi.kontakPengelola}</p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Halo, saya tertarik dengan informasi potensi ${potensi.judul} Desa Bolali.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hubungi via WhatsApp</span>
                </a>
              </div>
            )}

            {/* Share Strip */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-desa-green-800" />
                <span>Bagikan Potensi Ini:</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(potensi.judul)}`}
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

        {/* Related Potensi */}
        {relatedPotensi.length > 0 && (
          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-desa-green-800" />
                <span>Potensi Unggulan Lainnya</span>
              </h3>
              <Link
                href="/potensi-desa"
                className="text-xs font-semibold text-desa-green-800 hover:text-desa-green-950 transition-colors"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPotensi.map((rel) => {
                const relImg = getMediaUrl(rel.gambar, '/images/hero-desa.jpg')

                return (
                  <Link
                    key={rel.id}
                    href={`/potensi-desa/${rel.slug}`}
                    className="bg-white rounded-xl border border-slate-200/90 shadow-card overflow-hidden hover:border-desa-green-300 hover:shadow-card-hover transition-all flex flex-col group"
                  >
                    <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={relImg}
                        alt={rel.judul}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 640px) 100vw, 300px"
                      />
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-desa-green-800 block mb-1">
                        {rel.kategori}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-desa-green-800 transition-colors line-clamp-2 leading-snug">
                        {rel.judul}
                      </h4>
                      <span className="text-[11px] font-semibold text-desa-green-900 inline-flex items-center gap-1 mt-2">
                        <span>Lihat Rincian</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
