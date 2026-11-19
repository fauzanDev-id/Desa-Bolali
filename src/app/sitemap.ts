import type { MetadataRoute } from 'next'
import { getBeritaPaginated, getPengumumanList, getPotensiList } from '@/lib/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://bolali.desa.id'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Profil Desa
    {
      url: `${siteUrl}/profil/sejarah`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/profil/visi-misi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/profil/geografis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/profil/kependudukan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/profil/wilayah-dusun`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Pemerintahan
    {
      url: `${siteUrl}/pemerintahan/struktur-organisasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pemerintahan/perangkat-desa`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pemerintahan/bpd`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pemerintahan/rt-rw`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Informasi
    {
      url: `${siteUrl}/informasi/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/informasi/pengumuman`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/informasi/agenda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Potensi, Transparansi, Galeri, Kontak
    {
      url: `${siteUrl}/potensi-desa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/transparansi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic routes: Berita
  let beritaRoutes: MetadataRoute.Sitemap = []
  try {
    const beritaRes = await getBeritaPaginated({ limit: 100 })
    beritaRoutes = (beritaRes.docs || []).map((b) => ({
      url: `${siteUrl}/berita/${b.slug}`,
      lastModified: b.tanggalTerbit ? new Date(b.tanggalTerbit) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Failed to generate sitemap for berita:', e)
  }

  // Dynamic routes: Pengumuman
  let pengumumanRoutes: MetadataRoute.Sitemap = []
  try {
    const pengumumanDocs = await getPengumumanList({ limit: 100 })
    pengumumanRoutes = (pengumumanDocs || []).map((p) => ({
      url: `${siteUrl}/informasi/pengumuman/${p.slug}`,
      lastModified: p.tanggal ? new Date(p.tanggal) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Failed to generate sitemap for pengumuman:', e)
  }

  // Dynamic routes: Potensi Desa
  let potensiRoutes: MetadataRoute.Sitemap = []
  try {
    const potensiDocs = await getPotensiList()
    potensiRoutes = (potensiDocs || []).map((p) => ({
      url: `${siteUrl}/potensi-desa/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Failed to generate sitemap for potensi:', e)
  }

  return [...staticRoutes, ...beritaRoutes, ...pengumumanRoutes, ...potensiRoutes]
}
