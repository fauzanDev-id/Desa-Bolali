import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBeritaBySlug, getBeritaTerkait } from '@/lib/cms'
import { getMediaUrl, formatDateFullIndonesia, formatDateIndonesia } from '@/lib/utils'
import { Breadcrumb, RichText } from '@/components'
import { Calendar, User, Tag, ArrowLeft, Share2, ArrowRight, Newspaper } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)

  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan | Desa Bolali',
      description: 'Halaman berita yang Anda cari tidak ditemukan.',
    }
  }

  const imageUrl = getMediaUrl(berita.gambar, '/images/hero-desa.jpg')

  return {
    title: `${berita.judul} | Desa Bolali`,
    description: berita.ringkasan,
    openGraph: {
      title: berita.judul,
      description: berita.ringkasan,
      url: `/berita/${slug}`,
      siteName: 'Desa Bolali',
      locale: 'id_ID',
      type: 'article',
      publishedTime: berita.tanggalTerbit,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: berita.judul,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: berita.judul,
      description: berita.ringkasan,
      images: [imageUrl],
    },
  }
}

export const revalidate = 60

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const berita = await getBeritaBySlug(slug)

  if (!berita) {
    notFound()
  }

  const relatedArticles = await getBeritaTerkait(slug, berita.kategori, 3)
  const imgUrl = getMediaUrl(berita.gambar, '/images/berita-1.jpg')

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Breadcrumb Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <Breadcrumb
          items={[
            { label: 'Informasi', href: '/informasi/berita' },
            { label: 'Berita', href: '/informasi/berita' },
            { label: berita.judul },
          ]}
          className="mb-4"
        />

        {/* Back Link */}
        <Link
          href="/informasi/berita"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-desa-green-800 hover:text-desa-green-950 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Semua Berita</span>
        </Link>

        {/* Main Article Card */}
        <article className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
          {/* Header Metadata */}
          <div className="p-6 sm:p-8 md:p-10 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-desa-green-50 text-desa-green-900 text-xs font-bold border border-desa-green-100">
                <Tag className="w-3 h-3 text-desa-green-800" />
                <span>{berita.kategori}</span>
              </span>
              <span className="text-[11px] text-slate-400">[Data Dummy]</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {berita.judul}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-desa-gold-500" />
                <span>{formatDateFullIndonesia(berita.tanggalTerbit)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-desa-green-800" />
                <span>Pemerintah Desa Bolali</span>
              </div>
            </div>
          </div>

          {/* Main Hero Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
            <Image
              src={imgUrl}
              alt={berita.judul}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>

          {/* Article Summary Box */}
          {berita.ringkasan && (
            <div className="p-6 sm:p-8 bg-desa-green-50/50 border-b border-desa-green-100/60">
              <p className="text-sm sm:text-base font-medium text-slate-700 italic leading-relaxed">
                “{berita.ringkasan}”
              </p>
            </div>
          )}

          {/* Article Rich Content */}
          <div className="p-6 sm:p-8 md:p-10">
            <RichText content={berita.isi} />

            {/* Share Strip */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-desa-green-800" />
                <span>Bagikan Kabar Ini:</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(berita.judul)}`}
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
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(berita.judul)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 transition-colors shadow-sm"
                >
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related News Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-desa-green-800" />
                <span>Berita Terkait Lainnya</span>
              </h3>
              <Link
                href="/informasi/berita"
                className="text-xs font-semibold text-desa-green-800 hover:text-desa-green-950 transition-colors"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => {
                const relImg = getMediaUrl(rel.gambar, '/images/berita-1.jpg')

                return (
                  <Link
                    key={rel.id}
                    href={`/berita/${rel.slug}`}
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
                        {formatDateIndonesia(rel.tanggalTerbit)}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-desa-green-800 transition-colors line-clamp-2 leading-snug">
                        {rel.judul}
                      </h4>
                      <span className="text-[11px] font-semibold text-desa-green-900 inline-flex items-center gap-1 mt-2">
                        <span>Baca</span>
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
