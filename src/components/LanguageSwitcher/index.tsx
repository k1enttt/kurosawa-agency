'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

const flagIcons: Record<string, string> = {
  en: '🇬🇧', // English
  vi: '🇻🇳', // Vietnamese
  ja: '🇯🇵', // Japanese
}

const languageOrder: Record<string, string[]> = {
  vi: ['ja', 'en'],
  en: ['ja', 'vi'],
  ja: ['en', 'vi'],
}

const LanguageSwitcher = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const langRef = useRef<string>(null)

  const currentLocale = searchParams.get('locale') || 'en'
  const otherLocales = languageOrder[currentLocale] || ['ja', 'vi']

  const handleSwitch = (locale: string) => {
    langRef.current = locale
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('locale', locale)
    const newUrl = `${pathname}?${newSearchParams.toString()}`
    router.replace(newUrl)
    document.cookie = `locale=${locale}; path=/; max-age=31536000`
  }

  return (
    <div className="flex gap-2 items-center">
      {otherLocales.map((locale) => (
        <button
          key={locale}
          className="text-2xl hover:scale-110 transition-transform"
          aria-label={locale}
          onClick={() => handleSwitch(locale)}
        >
          {flagIcons[locale]}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
