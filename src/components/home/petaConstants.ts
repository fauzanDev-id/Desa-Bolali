export const PETA_CATEGORIES = [
  { key: 'fasilitas', label: 'Fasilitas Umum', color: '#2F80ED' },
  { key: 'sekolah', label: 'Sekolah', color: '#E8B923' },
  { key: 'ibadah', label: 'Tempat Ibadah', color: '#B3261E' },
  { key: 'umkm', label: 'UMKM', color: '#2E9B3E' },
  { key: 'publik', label: 'Area Publik', color: '#17A2B8' },
] as const

export type PetaCategoryKey = typeof PETA_CATEGORIES[number]['key']
