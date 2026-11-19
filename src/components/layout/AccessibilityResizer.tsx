'use client'

import React, { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

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
        <Eye className="w-3.5 h-3.5" />
        <span className="hidden sm:inline font-medium">Aksesibilitas</span>
      </div>
      <div className="flex items-center bg-desa-green-900/80 rounded border border-emerald-700/60 p-0.5">
        <button
          type="button"
          onClick={() => changeSize('small')}
          title="Perkecil Ukuran Font (A-)"
          className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
            fontSize === 'small'
              ? 'bg-desa-gold-500 text-slate-950 shadow-sm'
              : 'text-emerald-100 hover:bg-emerald-800/80'
          }`}
        >
          A-
        </button>
        <button
          type="button"
          onClick={() => changeSize('normal')}
          title="Ukuran Font Standar (A)"
          className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
            fontSize === 'normal'
              ? 'bg-desa-gold-500 text-slate-950 shadow-sm'
              : 'text-emerald-100 hover:bg-emerald-800/80'
          }`}
        >
          A
        </button>
        <button
          type="button"
          onClick={() => changeSize('large')}
          title="Perbesar Ukuran Font (A+)"
          className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
            fontSize === 'large'
              ? 'bg-desa-gold-500 text-slate-950 shadow-sm'
              : 'text-emerald-100 hover:bg-emerald-800/80'
          }`}
        >
          A+
        </button>
      </div>
    </div>
  )
}
