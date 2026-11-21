'use client'

import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PETA_CATEGORIES, type PetaCategoryKey } from './petaConstants'

interface LocationItem {
  id: string
  name: string
  kategori: 'fasilitas' | 'sekolah' | 'ibadah' | 'umkm' | 'publik'
  lat: number
  lng: number
}

interface PetaDigitalLeafletProps {
  centerLat: number
  centerLng: number
}

export default function PetaDigitalLeaflet({ centerLat, centerLng }: PetaDigitalLeafletProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const layerGroupsRef = useRef<Record<string, L.LayerGroup>>({})

  // Default peta HANYA 1 pin merah di tengah: seluruh kategori POI default nonaktif (false)
  const [activeCategories, setActiveCategories] = useState<Record<PetaCategoryKey, boolean>>({
    fasilitas: false,
    sekolah: false,
    ibadah: false,
    umkm: false,
    publik: false,
  })

  // Inisialisasi Peta Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // Titik-titik POI di sekitar Desa Bolali
    const locations: LocationItem[] = [
      // Fasilitas Umum (#2F80ED)
      { id: '1', name: 'Balai Desa Bolali', kategori: 'fasilitas', lat: centerLat + 0.0005, lng: centerLng - 0.0008 },
      { id: '2', name: 'Poskesdes Bolali', kategori: 'fasilitas', lat: centerLat - 0.0018, lng: centerLng + 0.0020 },
      // Sekolah (#E8B923)
      { id: '3', name: 'SD Negeri 1 Bolali', kategori: 'sekolah', lat: centerLat - 0.0025, lng: centerLng - 0.0018 },
      { id: '4', name: 'PAUD Tunas Harapan', kategori: 'sekolah', lat: centerLat + 0.0022, lng: centerLng - 0.0030 },
      // Tempat Ibadah (#B3261E)
      { id: '5', name: 'Masjid Jami Al-Huda Bolali', kategori: 'ibadah', lat: centerLat + 0.0012, lng: centerLng + 0.0018 },
      { id: '6', name: 'Musholla Al-Ikhlas', kategori: 'ibadah', lat: centerLat - 0.0032, lng: centerLng + 0.0008 },
      // UMKM (#2E9B3E)
      { id: '7', name: 'Sentra Kerajinan Gerabah Bolali', kategori: 'umkm', lat: centerLat - 0.0010, lng: centerLng + 0.0035 },
      { id: '8', name: 'Produksi Keripik Pisang Berkah', kategori: 'umkm', lat: centerLat + 0.0030, lng: centerLng + 0.0010 },
      // Area Publik (#17A2B8)
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

    // Citra Satelit Aerial Sesuai Mockup
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri, Maxar',
      maxZoom: 18,
    }).addTo(map)

    // Marker Pusat Desa Bolali (1 Pin Merah Menonjol dengan Label Putih Sesuai Mockup)
    const centerIcon = L.divIcon({
      className: 'custom-center-pin',
      html: `
        <div role="img" aria-label="Pusat Desa Bolali" style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background-color: #ffffff; color: #073c24; font-weight: 700; font-size: 11px; padding: 2px 8px; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.25); border: 1px solid #cbd5e1; white-space: nowrap; margin-bottom: 2px;">
            Desa Bolali
          </div>
          <div style="width: 13px; height: 13px; background-color: #ef4444; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 0 8px rgba(239,68,68,0.7);"></div>
        </div>
      `,
      iconSize: [0, 0],
    })

    L.marker([centerLat, centerLng], {
      icon: centerIcon,
      title: 'Pusat Desa Bolali',
      alt: 'Pusat Desa Bolali',
    })
      .bindPopup('<b style="color: #073c24;">Pusat Desa Bolali</b><br/>Kec. Wonosari, Kab. Klaten')
      .addTo(map)

    // Layer groups untuk masing-masing kategori (Default tidak ditambahkan ke map)
    const groups: Record<string, L.LayerGroup> = {}

    PETA_CATEGORIES.forEach((cat) => {
      const group = L.layerGroup()
      groups[cat.key] = group
    })

    // Tambahkan markers per kategori ke layer group
    locations.forEach((loc) => {
      const catConfig = PETA_CATEGORIES.find((c) => c.key === loc.kategori)
      const color = catConfig ? catConfig.color : '#64748b'

      const customIcon = L.divIcon({
        className: 'custom-poi-marker',
        html: `
          <div role="img" aria-label="${loc.name}" style="width: 11px; height: 11px; background-color: ${color}; border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.3); transform: translate(-50%, -50%); cursor: pointer;"></div>
        `,
        iconSize: [0, 0],
      })

      const marker = L.marker([loc.lat, loc.lng], {
        icon: customIcon,
        title: loc.name,
        alt: loc.name,
      }).bindPopup(`<b>${loc.name}</b><br/><span style="font-size:11px;color:#64748b;">Kategori: ${catConfig?.label}</span>`)

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

  // Toggle Visibility Layer Kategori Berdasarkan Klik Legenda
  const toggleCategory = (key: PetaCategoryKey) => {
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
    <div className="flex flex-col md:flex-row gap-3 mt-1 items-center">
      {/* Peta Sisi Kiri (±60% Lebar, tinggi menyesuaikan ubin potensi ~120px) */}
      <div className="w-full md:w-[60%] h-[200px] md:h-[120px] relative rounded-[10px] overflow-hidden border border-slate-200 shadow-xs bg-slate-100 shrink-0 z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Legenda Sisi Kanan (±40% Lebar): DAFTAR POLOS (Titik 10px + Teks 13px, Tanpa Kotak/Border, Tanpa Judul) */}
      <div className="w-full md:w-[40%] flex flex-col justify-center space-y-1 py-0.5">
        {PETA_CATEGORIES.map((cat) => {
          const isActive = activeCategories[cat.key]

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => toggleCategory(cat.key)}
              aria-label={`Toggle kategori ${cat.label}`}
              className="group flex items-center gap-2 py-0.5 px-0.5 rounded text-left transition-colors cursor-pointer w-full"
            >
              {/* Titik 10px: Terisi Solid saat Aktif, Outline saat Nonaktif */}
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 transition-all"
                style={{
                  backgroundColor: isActive ? cat.color : 'transparent',
                  border: `2px solid ${cat.color}`,
                }}
              />
              {/* Teks 12.5px */}
              <span
                className={`text-[12.5px] font-sans truncate transition-colors ${
                  isActive
                    ? 'font-semibold text-slate-900'
                    : 'font-normal text-slate-600 group-hover:text-slate-900'
                }`}
              >
                {cat.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
