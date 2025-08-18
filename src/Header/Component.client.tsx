'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SearchButton from '@/components/SearchButton'
import BurgerButton from './BurgerButton'
import clsx from 'clsx'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const { logo, navItems } = data

  const [isNavOpen, setIsNavOpen] = useState(false)

  const close = () => setIsNavOpen(false)

  useEffect(() => {
    if (isNavOpen) close()
  }, [pathname])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const getPageNameFromPath = (path: string): string => {
    const segments = path.split('/').filter(Boolean)
    return segments.length > 0 ? segments[0] || '' : ''
  }

  const path = usePathname()
  const pageName = getPageNameFromPath(path)

  return (
    <header
      className="relative top-0 z-20 w-full lg:sticky"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="header flex items-center justify-between w-full">
        {/* Logo */}
        <Link href={'/'} className="header-logo-container">
          {logo ? (
            <Media alt="Logo cong ty" resource={logo} className="logo" size="100" />
          ) : (
            <div className="text-2xl font-bold">KCV</div>
          )}
        </Link>
        {/* Desktop Navigation buttons */}
        <nav className="header-nav">
          {(navItems ?? []).map(({ link }, i) => {
            let linkLabel = link.url ? link.url.split('/').filter(Boolean)[0] || '' : ''
            if (link.reference && link.reference.relationTo == 'pages') {
              if (typeof link.reference.value !== 'number' && link.reference.value.slug) {
                linkLabel = link.reference.value.slug
              }
            }
            const isSelected = pageName === linkLabel || (pageName === '' && linkLabel === 'home')
            return (
              <div
                key={i}
                className={i === 0 ? 'ml-0' : i === (navItems?.length ?? 0) - 1 ? 'mr-0' : ''}
              >
                <CMSLink
                  {...link}
                  appearance="link"
                  className={`${isSelected ? 'text-primary' : 'text-foreground dark:text-background'} font-semibold block py-2 pr-4 pl-3 rounded-none border-b hover:no-underline border-0 p-0 !text-p-md hover:text-link hover:bg-gray-700 hover:bg-transparent border-gray-700`}
                />
              </div>
            )
          })}
        </nav>
        {/* Mobile Navigation buttons */}
        <div className={clsx(isNavOpen ? 'fixed' : 'hidden', 'inset-0 bg-black/80 lg:hidden z-50')}>
          <button
            onClick={close}
            className="absolute top-0 right-0 mt-10 mr-10 p-2 bg-primary/80 rounded-lg"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
          <div className="absolute h-full top-0 left-0 w-3/5 bg-white">
            <div className="flex flex-col my-6">
              {(navItems ?? []).map(({ link }, i) => {
                let borderStyle = ''
                if (navItems && navItems.length > 0) {
                  borderStyle = i == navItems.length - 1 ? 'border-none' : ''
                }
                let linkLabel = link.url ? link.url.split('/').filter(Boolean)[0] || '' : ''
                if (link.reference && link.reference.relationTo == 'pages') {
                  if (typeof link.reference.value !== 'number' && link.reference.value.slug) {
                    linkLabel = link.reference.value.slug
                  }
                }
                const isSelected =
                  pageName === linkLabel || (pageName === '' && linkLabel === 'home')
                return (
                  <div key={i}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className={clsx(
                        borderStyle,
                        'font-semibold block py-4 pr-4 pl-3 rounded-none border-b hover:no-underline !text-p-md text-foreground dark:text-background hover:bg-gray-700 hover:text-white border-gray-200',
                        isSelected ? 'text-primary' : '',
                      )}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="header-actions">
          <div className="z-40">
            <LanguageSwitcher />
          </div>
          <div className="pl-2">
            <SearchButton />
          </div>
          <div className="pl-2 lg:hidden">
            <BurgerButton onClick={() => setIsNavOpen((open) => !open)} />
          </div>
          <Link
            href="/contact"
            className="px-2 ml-2 py-2 bg-primary text-white rounded hover:bg-primary-dark transition whitespace-nowrap"
          >
            Liên hệ
          </Link>
        </div>
      </div>
    </header>
  )
}
