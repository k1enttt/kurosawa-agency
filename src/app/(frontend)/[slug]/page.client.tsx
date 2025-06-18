'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import localFont from 'next/font/local'
import { Poppins, Be_Vietnam_Pro } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  fallback: ['sans-serif'],
  display: 'swap',
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
  weight: ['400', '500', '600', '700'],
  fallback: ['sans-serif'],
  display: 'swap',
  preload: false,
})

const Meiryo = localFont({
  src: '../../../../public/fonts/meiryo.otf',
  variable: '--font-meiryo',
  fallback: [
    'hiragino kaku gothic pro',
    'Noto Sans JP',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'sans-serif',
  ],
  display: 'swap',
})

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale') || 'en'

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  useEffect(() => {
    const html = document.documentElement

    // Remove all font classes first
    html.classList.remove(poppins.className, beVietnamPro.className, Meiryo.className)

    // Add the appropriate font class based on locale
    if (locale === 'vi') {
      html.classList.add(beVietnamPro.className)
    } else if (locale === 'ja') {
      html.classList.add(Meiryo.className)
    } else {
      html.classList.add(poppins.className)
    }
  }, [locale])
  return <React.Fragment />
}

export default PageClient
