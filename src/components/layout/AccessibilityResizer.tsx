'use client'

import React, { useEffect, useState } from 'react'
import { Wheelchair } from '@phosphor-icons/react'

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
    <div className="flex items-center gap-2 text-xs text-white">
      <div className="flex items-center gap-1 text-white select-none">
        <Wheelchair size={14} weight="fill" className="text-white" />
        <span className="hidden sm:inline font-normal text-[12px]">Aksesibilitas</span>
      </div>

      {/* Kontrol A- A A+ Polos Tanpa Kotak Kuning, Ukuran Aktif Bergaris Bawah */}
      <div className="flex items-center gap-2 ml-1 text-[12px]">
        <button
          type="button"
          onClick={() => changeSize('small')}
          title="Perkecil Ukuran Font (A-)"
          aria-label="Perkecil Ukuran Font (A-)"
          className={`py-0.5 transition-colors cursor-pointer ${
            fontSize === 'small'
              ? 'font-bold text-white border-b border-white'
              : 'text-white/80 hover:text-white'
          }`}
        >
          A-
        </button>
        <button
          type="button"
          onClick={() => changeSize('normal')}
          title="Ukuran Font Standar (A)"
          aria-label="Ukuran Font Standar (A)"
          className={`py-0.5 transition-colors cursor-pointer ${
            fontSize === 'normal'
              ? 'font-bold text-white border-b border-white'
              : 'text-white/80 hover:text-white'
          }`}
        >
          A
        </button>
        <button
          type="button"
          onClick={() => changeSize('large')}
          title="Perbesar Ukuran Font (A+)"
          aria-label="Perbesar Ukuran Font (A+)"
          className={`py-0.5 transition-colors cursor-pointer ${
            fontSize === 'large'
              ? 'font-bold text-white border-b border-white'
              : 'text-white/80 hover:text-white'
          }`}
        >
          A+
        </button>
      </div>
    </div>
  )
}
