import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPotensiBySlug, getPotensiList } from '@/lib/cms'
import { getMediaUrl } from '@/lib/utils'
import { PageHeader, Card, Prose } from '@/components'
import {
  Sparkles,
  MapPin,
  Phone,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Building2,
  CheckCircle2,
  Images,
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

  const imageUrl = getMediaUrl(item.gambar, '/seed/potensi-pertanian.jpg')

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
  }
}

export const revalidate = 60

export default async function PotensiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getPotensiBySlug(slug)

  if (!item) {
    notFound()
  }

  const allPotensi = await getPotensiList()
  const otherPotensi = allPotensi.filter((p) => p.slug !== slug).slice(0, 3)

  const defaultImg =
    item.kategori === 'Pertanian'
      ? '/seed/potensi-pertanian.jpg'
      : item.kategori === 'UMKM'
      ? '/seed/potensi-umkm.jpg'
      : item.kategori === 'Wisata' || item.kategori === 'Wisata Alam'
      ? '/seed/potensi-wisata.jpg'
      : '/seed/potensi-budaya.jpg'
  const imgUrl = getMediaUrl(item.gambar, defaultImg)

  // Contoh galeri foto terkait untuk detail potensi
  const galeriTerkait = [
    imgUrl,
    '/seed/galeri-1.jpg',
    '/seed/galeri-2.jpg',
    '/seed/galeri-3.jpg',
  ]

  return (
    <div className="min-h-screen bg-desa-pageBg pb-16">
      {/* 1. PageHeader Banner Pendek Sesuai Template Standar */}
      <PageHeader
        title={item.judul}
        subtitle={`Sektor ${item.kategori} Unggulan Desa Bolali`}
        badge="Potensi Desa"
        badgeIcon={<Sparkles className="w-3.5 h-3.5 text-desa-gold" strokeWidth={1.75} />}
        breadcrumbs={[
          { label: 'Potensi Desa', href: '/potensi-desa' },
          { label: item.judul },
        ]}
        bgImage="/seed/hero-1.webp"
      />

      {/* 2. Konten Utama: Container 1344px */}
      <div className="max-w-[1344px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Tautan Kembali */}
          <Link
            href="/potensi-desa"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-desa-darkGreen hover:text-desa-greenHover transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Kembali ke Daftar Potensi Desa</span>
          </Link>

          {/* Kartu Detail Potensi */}
          <Card className="p-6 sm:p-8 md:p-10">
            <div className="pb-5 border-b border-desa-border space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-desa-lightGreen text-desa-darkGreen text-xs font-bold border border-emerald-200">
                Kategori {item.kategori}
              </span>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-desa-textDark tracking-tight font-sans">
                {item.judul}
              </h1>

              {item.lokasi && (
                <div className="flex items-center gap-1.5 text-xs text-desa-textMuted font-sans">
                  <MapPin className="w-4 h-4 text-desa-accentGreen shrink-0" strokeWidth={1.75} />
                  <span>{item.lokasi}</span>
                </div>
              )}
            </div>

            {/* Foto Utama */}
            <div className="relative aspect-[16/10] w-full rounded-desa-card overflow-hidden my-6 bg-slate-100 border border-desa-border shadow-xs">
              <Image
                src={imgUrl}
                alt={item.judul}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            {/* Deskripsi dalam Prose */}
            <Prose className="mt-6">
              {item.ringkasan && (
                <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed italic border-l-4 border-desa-primaryGreen pl-4 py-1 bg-desa-lightGreen/40 rounded-r-desa-sm mb-6">
                  {item.ringkasan}
                </p>
              )}

              {item.deskripsi ? (
                <p className="text-slate-700 leading-relaxed">
                  {item.deskripsi.replace(/\s*\[Data Dummy\]/gi, '')}
                </p>
              ) : (
                <p className="text-slate-700 leading-relaxed">
                  Potensi unggulan ini dikembangkan secara berkelanjutan oleh masyarakat dan Pemerintah Desa Bolali guna meningkatkan pendapatan warga, membuka lapangan kerja lokal, serta memperkuat identitas kemandirian desa.
                </p>
              )}
            </Prose>

            {/* Galeri Foto Dokumentasi Produk/Kawasan Sesuai Spesifikasi */}
            <div className="mt-8 pt-6 border-t border-desa-border">
              <div className="flex items-center gap-2 mb-4">
                <Images className="w-4 h-4 text-desa-accentGreen" strokeWidth={1.75} />
                <h3 className="text-base font-bold text-desa-textDark font-sans">
                  Galeri Dokumentasi Potensi
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galeriTerkait.map((foto, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-desa-sm overflow-hidden bg-slate-100 border border-desa-border"
                  >
                    <Image
                      src={foto}
                      alt={`Dokumentasi ${item.judul} ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 200px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kotak Kontak Pengelola / Pembelian */}
            {item.kontakPengelola && (
              <div className="mt-8 p-4 sm:p-5 rounded-desa-card bg-slate-50 border border-desa-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider block">
                    Narahubung & Pengelola Unit
                  </span>
                  <span className="text-sm font-bold text-desa-textDark block mt-0.5 font-sans">
                    {item.kontakPengelola}
                  </span>
                </div>

                <a
                  href={`tel:${item.kontakPengelola.replace(/[^0-9]/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-desa-darkGreen hover:bg-desa-greenHover text-white text-xs font-semibold shadow-2xs transition-colors shrink-0 min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Hubungi Pengelola</span>
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
