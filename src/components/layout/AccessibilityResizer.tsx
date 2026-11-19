'use client'

import React, { useEffect, useState } from 'react'
import { Accessibility } from 'lucide-react'

type FontSize = 'small' | 'normal' | 'large'

export function AccessibilityResizer() {
  const [fontSize, setFontSize] = useState<FontSize>('normal')

  useEffect(() => {
    const saved = localStorage.getItem('desa-bolali-font-size') as FontSize
    if (saved && ['small', 'normal', 'large'].includes(saved)) {
      setFontSize(saved)
      document.documentElement.setAttribute('data-font-size', saved)
    }
  }, [])

  const changeSize = (size: FontSize) => {
    setFontSize(size)
    localStorage.setItem('desa-bolali-font-size', size)
    document.documentElement.setAttribute('data-font-size', size)
  }

  return (
    <div className="flex items-center gap-1.5 text-xs text-emerald-100">
      <div className="flex items-center gap-1 mr-1 text-emerald-200">
        <Accessibility className="w-3.5 h-3.5 text-emerald-300" />
        <span className="hidden sm:inline font-medium">Aksesibilitas</span>
      </div>
      <div className="flex items-center bg-black/25 rounded border border-white/20 p-0.5">
        <button
          type="button"
          onClick={() => changeSize('small')}
          title="Perkecil Ukuran Font (A-)"
          aria-label="Perkecil Ukuran Font (A-)"
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
            fontSize === 'small'
              ? 'bg-desa-gold text-desa-darkGreen shadow-sm'
              : 'text-emerald-100 hover:bg-white/10'
          }`}
        >
          A-
        </button>
        <button
          type="button"
          onClick={() => changeSize('normal')}
          title="Ukuran Font Standar (A)"
          aria-label="Ukuran Font Standar (A)"
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
            fontSize === 'normal'
              ? 'bg-desa-gold text-desa-darkGreen shadow-sm'
              : 'text-emerald-100 hover:bg-white/10'
          }`}
        >
          A
        </button>
        <button
          type="button"
          onClick={() => changeSize('large')}
          title="Perbesar Ukuran Font (A+)"
          aria-label="Perbesar Ukuran Font (A+)"
          className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors ${
            fontSize === 'large'
              ? 'bg-desa-gold text-desa-darkGreen shadow-sm'
              : 'text-emerald-100 hover:bg-white/10'
          }`}
        >
          A+
        </button>
      </div>
    </div>
  )
}
