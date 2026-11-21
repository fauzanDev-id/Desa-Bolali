import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBeritaBySlug, getBeritaTerkait, getBeritaTerbaru } from '@/lib/cms'
import { getMediaUrl, formatDateFullIndonesia, formatDateIndonesia } from '@/lib/utils'
import { PageHeader, Card, Prose } from '@/components'
import { CalendarBlank, User, ArrowLeft, ArrowRight, ShareNetwork, Copy, Check } from '@phosphor-icons/react/dist/ssr'

export const revalidate = 60

export async function generateStaticParams() {
  const beritaList = await getBeritaTerbaru(20)
  return beritaList.map((item) => ({ slug: item.slug }))
}

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

  const imageUrl = getMediaUrl(berita.gambar, '/seed/berita-1.webp')

  return {
    title: `${berita.judul} | Kabar Desa Bolali`,
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
  const imgUrl = getMediaUrl(berita.gambar, '/seed/berita-1.webp')

  // Share URL encode
  const shareTitle = encodeURIComponent(berita.judul)
  const shareUrl = encodeURIComponent(`https://bolali.desa.id/berita/${slug}`)

  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title={berita.judul}
        subtitle={`Kategori: ${berita.kategori} • Diterbitkan ${formatDateIndonesia(berita.tanggalTerbit)}`}
        badge="Warta Berita Desa"
        breadcrumbs={[
          { label: 'Informasi', href: '/informasi/berita' },
          { label: 'Berita Desa', href: '/informasi/berita' },
          { label: berita.judul },
        ]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Artikel: Container 1344px */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Tautan Kembali */}
          <Link
            href="/informasi/berita"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-desa-darkGreen hover:text-desa-greenHover transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Berita</span>
          </Link>

          {/* Kartu Utama Artikel */}
          <Card className="overflow-hidden p-6 sm:p-8 md:p-10">
            {/* Metadata Header */}
            <div className="pb-6 border-b border-desa-border space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-desa-lightGreen text-desa-darkGreen text-xs font-bold border border-emerald-200">
                {berita.kategori}
              </span>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-desa-textDark tracking-tight leading-snug font-sans">
                {berita.judul}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-desa-textMuted font-medium pt-1">
                <span className="flex items-center gap-1.5">
                  <CalendarBlank className="w-3.5 h-3.5 text-desa-accentGreen" />
                  <span>{formatDateFullIndonesia(berita.tanggalTerbit)}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-desa-accentGreen" />
                  <span>{berita.penulis || 'Pemerintah Desa Bolali'}</span>
                </span>
              </div>
            </div>

            {/* Gambar Utama Artikel aspect-[16/9] */}
            <div className="relative aspect-[16/9] w-full rounded-desa-card overflow-hidden my-6 bg-slate-100 border border-desa-border shadow-xs">
              <Image
                src={imgUrl}
                alt={berita.judul}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            {/* Isi Artikel dalam Komponen Prose Standar */}
            <Prose className="mt-6">
              {berita.ringkasan && (
                <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed italic border-l-4 border-desa-primaryGreen pl-4 py-1 bg-desa-lightGreen/40 rounded-r-desa-sm mb-6">
                  {berita.ringkasan}
                </p>
              )}

              {berita.isi ? (
                <div dangerouslySetInnerHTML={{ __html: typeof berita.isi === 'string' ? berita.isi : '' }} />
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  Pemerintah Desa Bolali terus berkomitmen memberikan pelayanan terbaik bagi seluruh masyarakat desa, menjaga keterbukaan informasi publik, serta mendorong pembangunan yang berkelanjutan di seluruh wilayah pedukuhan.
                </p>
              )}
            </Prose>

            {/* Tombol Bagikan Sederhana Sesuai Spesifikasi: Salin Tautan, WhatsApp, Facebook */}
            <div className="mt-8 pt-6 border-t border-desa-border flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold text-desa-textMuted uppercase tracking-wider flex items-center gap-1.5">
                <ShareNetwork className="w-4 h-4 text-desa-accentGreen" />
                <span>Bagikan Artikel Ini:</span>
              </span>

              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors min-h-[44px]"
                  aria-label="Bagikan ke WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.178-.175.2-.351.225-.652.075-.3-.15-1.267-.467-2.414-1.49-1.077-.96-1.805-2.146-2.016-2.508-.21-.362-.022-.558.128-.707.135-.135.3-.35.451-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.632-.927-2.235-.244-.588-.492-.508-.677-.518-.175-.009-.375-.009-.576-.009s-.527.075-.802.375c-.276.3-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.228 3.11.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.076-.125-.276-.2-.577-.35zM12.004 2C6.48 2 2 6.48 2 12c0 1.764.462 3.486 1.338 5.008L2 22l5.12-1.343A9.957 9.957 0 0 0 12.004 22c5.523 0 10.004-4.48 10.004-10s-4.481-10-10.004-10z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors min-h-[44px]"
                  aria-label="Bagikan ke Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </Card>

          {/* 3. Berita Terkait di Bagian Bawah */}
          {relatedArticles.length > 0 && (
            <div className="pt-6">
              <h3 className="text-lg font-bold text-desa-textDark mb-4 font-sans">
                Berita Terkait Lainnya
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((item) => {
                  const relImg = getMediaUrl(item.gambar, '/seed/berita-2.webp')

                  return (
                    <Card
                      key={item.id}
                      className="overflow-hidden p-0 flex flex-col justify-between hover:border-emerald-300 transition-all group"
                    >
                      <Link
                        href={`/berita/${item.slug}`}
                        className="block relative aspect-[16/10] w-full overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={relImg}
                          alt={item.judul}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 280px"
                        />
                      </Link>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-desa-textMuted font-medium block mb-1">
                            {formatDateIndonesia(item.tanggalTerbit)}
                          </span>
                          <Link
                            href={`/berita/${item.slug}`}
                            className="text-xs font-bold text-desa-textDark group-hover:text-desa-primaryGreen line-clamp-2 leading-snug font-sans"
                          >
                            {item.judul}
                          </Link>
                        </div>

                        <Link
                          href={`/berita/${item.slug}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-desa-primaryGreen mt-2 font-sans"
                        >
                          <span>Baca</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
