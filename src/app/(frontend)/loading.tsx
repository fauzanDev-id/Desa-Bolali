import React from 'react'

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-desa-darkGreen animate-spin" />

        {/* Inner pulsing dot */}
        <div className="absolute w-4 h-4 rounded-full bg-amber-500 animate-pulse" />
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-base font-semibold text-gray-800">
          Memuat Informasi Desa...
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Website Resmi Pemerintah Desa Bolali
        </p>
      </div>

      <span className="sr-only">Sedang memuat konten halaman...</span>
    </div>
  )
}
