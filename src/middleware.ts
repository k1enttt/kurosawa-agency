// src/middleware.ts

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

export const locales = ['en', 'vi', 'ja'] // Change this line based on your need
export const defaultLocale = 'en'

export function getLocale(req: NextRequest) {
  const negotiator = new Negotiator({ headers: Object.fromEntries(req.headers.entries()) })
  const languages = negotiator
    .languages()
    .map((language) => (language == '*' ? defaultLocale : language))
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the search params
  const { searchParams } = request.nextUrl
  const searchParamsHasLocale = locales.some((locale) => searchParams.get('locale') === locale)

  // If the locale exists in the search params then do nothing
  if (searchParamsHasLocale) return

  // Redirect if there is no locale in the search params
  let lastLocale: string | null
  const cookieLocale = request.cookies.get('locale')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    // Get locale from the cookie
    lastLocale = cookieLocale
  } else {
    // Get locale from the request
    const locale = getLocale(request)
    lastLocale = locale
  }

  searchParams.set('locale', lastLocale)
  request.nextUrl.search = searchParams.toString()
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and admin paths
    '/((?!_next|admin|api).*)',
    // Optional: only run on root (/) URL
    // '/',
  ],
}
