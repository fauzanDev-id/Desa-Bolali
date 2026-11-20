import React from 'react'

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[calc(100vh-76px)] flex flex-col items-center justify-center py-20 px-4 bg-desa-bg"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="w-14 h-14 rounded-full border-4 border-desa-primaryGreen/20 border-t-desa-primaryGreen animate-spin" />

        {/* Inner pulsing dot */}
        <div className="absolute w-3.5 h-3.5 rounded-full bg-desa-gold animate-pulse" />
      </div>

      <div className="mt-5 text-center">
        <h3 className="text-sm font-bold text-desa-darkGreen tracking-tight">
          Memuat Informasi Desa...
        </h3>
        <p className="text-xs text-desa-textMuted mt-1">
          Website Resmi Pemerintah Desa Bolali
        </p>
      </div>

      <span className="sr-only">Sedang memuat data halaman...</span>
    </div>
  )
}
