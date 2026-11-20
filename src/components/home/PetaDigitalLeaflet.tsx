'use client'

import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface LocationItem {
  id: string
  name: string
  kategori: 'fasilitas' | 'sekolah' | 'ibadah' | 'umkm' | 'publik'
  lat: number
  lng: number
}

const CATEGORIES = [
  { key: 'fasilitas', label: 'Fasilitas Umum', color: '#3b82f6', bgClass: 'bg-blue-500' },
  { key: 'sekolah', label: 'Sekolah', color: '#10b981', bgClass: 'bg-emerald-500' },
  { key: 'ibadah', label: 'Tempat Ibadah', color: '#f59e0b', bgClass: 'bg-amber-500' },
  { key: 'umkm', label: 'UMKM', color: '#eab308', bgClass: 'bg-yellow-500' },
  { key: 'publik', label: 'Area Publik', color: '#06b6d4', bgClass: 'bg-cyan-500' },
] as const

type CategoryKey = typeof CATEGORIES[number]['key']

interface PetaDigitalLeafletProps {
  centerLat: number
  centerLng: number
}

export default function PetaDigitalLeaflet({ centerLat, centerLng }: PetaDigitalLeafletProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const layerGroupsRef = useRef<Record<string, L.LayerGroup>>({})

  // Kategori aktif (default semua aktif)
  const [activeCategories, setActiveCategories] = useState<Record<CategoryKey, boolean>>({
    fasilitas: true,
    sekolah: true,
    ibadah: true,
    umkm: true,
    publik: true,
  })

  // Inisialisasi Peta Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Data lokasi dummy sekitar Desa Bolali
    const locations: LocationItem[] = [
      // Fasilitas Umum (Biru)
      { id: '1', name: 'Balai Desa Bolali', kategori: 'fasilitas', lat: centerLat + 0.0005, lng: centerLng - 0.0008 },
      { id: '2', name: 'Poskesdes Bolali', kategori: 'fasilitas', lat: centerLat - 0.0018, lng: centerLng + 0.0020 },
      // Sekolah (Hijau)
      { id: '3', name: 'SD Negeri 1 Bolali', kategori: 'sekolah', lat: centerLat - 0.0025, lng: centerLng - 0.0018 },
      { id: '4', name: 'PAUD Tunas Harapan', kategori: 'sekolah', lat: centerLat + 0.0022, lng: centerLng - 0.0030 },
      // Tempat Ibadah (Amber)
      { id: '5', name: 'Masjid Jami Al-Huda Bolali', kategori: 'ibadah', lat: centerLat + 0.0012, lng: centerLng + 0.0018 },
      { id: '6', name: 'Musholla Al-Ikhlas', kategori: 'ibadah', lat: centerLat - 0.0032, lng: centerLng + 0.0008 },
      // UMKM (Kuning)
      { id: '7', name: 'Sentra Kerajinan Gerabah Bolali', kategori: 'umkm', lat: centerLat - 0.0010, lng: centerLng + 0.0035 },
      { id: '8', name: 'Produksi Keripik Pisang Berkah', kategori: 'umkm', lat: centerLat + 0.0030, lng: centerLng + 0.0010 },
      // Area Publik (Sian)
      { id: '9', name: 'Lapangan Sepak Bola Desa Bolali', kategori: 'publik', lat: centerLat + 0.0028, lng: centerLng - 0.0012 },
      { id: '10', name: 'Taman Ramah Anak Bolali', kategori: 'publik', lat: centerLat - 0.0015, lng: centerLng - 0.0028 },
    ]

    // Inisialisasi Map
    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false,
    })

    // Basemap Citra Satelit Aerial Sesuai Tampilan Mockup
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri, Maxar, Earthstar Geographics',
      maxZoom: 18,
    }).addTo(map)

    // Marker Pusat Desa Bolali (Pin Merah Menonjol dengan Label Putih Sesuai Mockup)
    const centerIcon = L.divIcon({
      className: 'custom-center-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background-color: #ffffff; color: #073c24; font-weight: 800; font-size: 11px; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.25); border: 1px solid #cbd5e1; white-space: nowrap; margin-bottom: 2px;">
            Desa Bolali
          </div>
          <div style="width: 16px; height: 16px; background-color: #ef4444; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 10px rgba(239,68,68,0.7);"></div>
        </div>
      `,
      iconSize: [0, 0],
    })

    L.marker([centerLat, centerLng], { icon: centerIcon })
      .bindPopup('<b style="color: #073c24;">Pusat Desa Bolali</b><br/>Kec. Wonosari, Kab. Klaten')
      .addTo(map)

    // Layer groups untuk masing-masing kategori
    const groups: Record<string, L.LayerGroup> = {}

    CATEGORIES.forEach((cat) => {
      const group = L.layerGroup().addTo(map)
      groups[cat.key] = group
    })

    // Tambahkan markers per kategori
    locations.forEach((loc) => {
      const catConfig = CATEGORIES.find((c) => c.key === loc.kategori)
      const color = catConfig ? catConfig.color : '#64748b'

      const customIcon = L.divIcon({
        className: 'custom-poi-marker',
        html: `
          <div style="width: 14px; height: 14px; background-color: ${color}; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 1px 4px rgba(0,0,0,0.3); transform: translate(-50%, -50%); cursor: pointer;"></div>
        `,
        iconSize: [0, 0],
      })

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
        .bindPopup(`<b>${loc.name}</b><br/><span style="font-size:11px;color:#64748b;">Kategori: ${catConfig?.label}</span>`)

      if (groups[loc.kategori]) {
        marker.addTo(groups[loc.kategori])
      }
    })

    layerGroupsRef.current = groups
    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [centerLat, centerLng])

  // Toggle Visibility Layer Kategori Berdasarkan State
  const toggleCategory = (key: CategoryKey) => {
    setActiveCategories((prev) => {
      const nextState = !prev[key]
      const map = mapInstanceRef.current
      const group = layerGroupsRef.current[key]

      if (map && group) {
        if (nextState) {
          map.addLayer(group)
        } else {
          map.removeLayer(group)
        }
      }

      return { ...prev, [key]: nextState }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 mt-3">
      {/* Kontainer Peta Leaflet
          - Mobile (<768px): Tinggi tetap 280px sesuai spesifikasi
          - Desktop (>=768px): Kolom 8 dengan rasio aspect-[4/3] */}
      <div className="md:col-span-8 relative h-[280px] md:h-auto md:aspect-[4/3] w-full rounded-desa-card overflow-hidden border border-desa-border shadow-xs bg-slate-100 z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Legenda Interaktif
          - Mobile (<768px): Terletak di bawah peta dengan tombol tap >=44px
          - Desktop (>=768px): 4 kolom vertikal di samping kanan peta */}
      <div className="md:col-span-4 flex flex-col justify-center space-y-1.5 text-xs p-1 md:p-0">
        <span className="text-[11px] font-bold text-desa-textMuted uppercase tracking-wider mb-1 hidden md:block">
          Legenda Titik Lokasi:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategories[cat.key]

            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => toggleCategory(cat.key)}
                aria-label={`Sembunyikan/Tampilkan kategori ${cat.label}`}
                className={`flex items-center justify-between w-full px-2.5 py-2 md:py-1.5 rounded-desa-sm text-left transition-all min-h-[44px] md:min-h-0 border ${
                  isActive
                    ? 'bg-slate-50 border-slate-200 text-desa-textDark font-semibold shadow-2xs'
                    : 'bg-transparent border-transparent text-slate-400 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform ${cat.bgClass} ${
                      isActive ? 'scale-100 shadow-xs' : 'scale-75 opacity-40'
                    }`}
                  />
                  <span className="truncate text-xs font-sans">{cat.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
