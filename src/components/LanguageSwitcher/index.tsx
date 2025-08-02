'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { locales } from '@/middleware'

const mapLanguageString: Record<string, string> = {
  en: 'English',
  vi: 'Vietnamese',
  ja: 'Japanese',
}

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const langRef = useRef<string>(null)

  useEffect(() => {
    if (langRef.current) {
      // Update locale search param with the selected locale
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('locale', langRef.current)
      const newUrl = `${pathname}?${newSearchParams.toString()}`
      router.replace(newUrl)

      // Save to the cookie
      document.cookie = `locale=${langRef.current}; path=/; max-age=31536000`
    }
  }, [pathname, router, searchParams])

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => open()}
      onMouseLeave={() => close()}
    >
      <button
        className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {mapLanguageString[searchParams.get('locale') || ''] || 'Unknown'}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen ? (
        <div
          className="origin-top-right absolute right-0 mt-0 w-fit rounded-md  bg-white shadow-2xl focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {locales.map(
              (locale) =>
                Object.keys(mapLanguageString).includes(locale) && (
                  <button
                    key={locale}
                    className="text-gray-700 block w-full px-4 py-2 text-sm hover:bg-gray-100"
                    role="menuitem"
                    onClick={() => {
                      langRef.current = locale
                      setIsOpen(false)
                    }}
                  >
                    {mapLanguageString[locale] || 'Unknown'}
                  </button>
                ),
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default LanguageSwitcher
