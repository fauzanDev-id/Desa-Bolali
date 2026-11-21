import { Plus_Jakarta_Sans, Allura, Kaushan_Script } from 'next/font/google'

export const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'optional',
  weight: ['400', '500', '600', '700', '800'],
})

export const allura = Allura({
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
  weight: ['400'],
})

export const kaushan = Kaushan_Script({
  subsets: ['latin'],
  variable: '--font-kaushan',
  display: 'swap',
  weight: ['400'],
})
