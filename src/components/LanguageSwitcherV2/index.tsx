'use client'

import { useState } from 'react'
import { useEffect } from 'react'

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('English')

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const locale = params.get('locale')
    if (locale) {
      switch (locale) {
        case 'en':
          setLanguage('English')
          break
        case 'ja':
          setLanguage('Japanese')
          break
        case 'vi':
          setLanguage('Vietnamese')
          break
        default:
          setLanguage('Unknown')
      }
    }
  }, [])

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
        {language}
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
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                setLanguage('English')
                setIsOpen(false)
              }}
            >
              English
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                setLanguage('Spanish')
                setIsOpen(false)
              }}
            >
              Spanish
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                setLanguage('French')
                setIsOpen(false)
              }}
            >
              French
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default LanguageSwitcher
