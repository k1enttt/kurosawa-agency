'use client'

import 'flag-icons/css/flag-icons.min.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef } from 'react'

const flagIcons: Record<string, string> = {
  en: 'gb', // English
  vi: 'vn', // Vietnamese
  ja: 'jp', // Japanese
  zh: 'cn',
}

const languageOrder: Record<string, string[]> = {
  vi: ['ja', 'en', 'zh'],
  en: ['ja', 'vi', 'zh'],
  ja: ['en', 'vi', 'zh'],
  zh: ['vi', 'en', 'ja'],
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
          <span
            className={`fi fi-${flagIcons[locale]} inline-block w-8 h-6 rounded shadow-md`}
          ></span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
