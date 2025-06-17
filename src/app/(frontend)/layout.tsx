import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import localFont from 'next/font/local'
import { Poppins } from 'next/font/google'
import { Be_Vietnam_Pro } from 'next/font/google'
import CookieConsentPopup from '@/components/CookieConsentPopup'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  fallback: ['sans-serif'],
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-be-vietnam-pro',
  weight: ['400', '500', '600', '700'],
  fallback: ['sans-serif'],
})

const Meiryo = localFont({
  src: '../../../public/fonts/meiryo.otf',
  variable: '--font-meiryo',
  fallback: [
    'hiragino kaku gothic pro',
    'Noto Sans JP',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'sans-serif',
  ],
  preload: false,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(poppins.className, beVietnamPro.className, Meiryo.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/android-chrome-512x512.png" rel="icon" type="image/png" />
      </head>
      <body className="bg-white dark:bg-gray-900" suppressHydrationWarning>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <Header />
          {children}
          <Footer />
        </Providers>

        <CookieConsentPopup />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
