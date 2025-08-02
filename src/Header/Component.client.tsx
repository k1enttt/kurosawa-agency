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

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const { logo, navItems } = data

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="top-0 z-20 w-full" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="header flex items-center justify-between w-full">
        <Link href={'/'} className="header-logo-container">
          {logo ? (
            <Media alt="Logo cong ty" resource={logo} className="logo" size="100" />
          ) : (
            <div className="text-2xl font-bold">KCV</div>
          )}
        </Link>
        <nav className="header-nav">
          {(navItems ?? []).map(({ link }, i) => {
            let linkLabel = link.url ? link.url.split('/').filter(Boolean)[0] || '' : ''
            if (link.reference && link.reference.relationTo == 'pages') {
              if (typeof link.reference.value !== 'number' && link.reference.value.slug) {
                linkLabel = link.reference.value.slug
              }
            }
            const pageName = '' // Nếu cần, truyền từ props hoặc lấy từ usePathname
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
        <div className="header-actions">
          <LanguageSwitcher />
          <SearchButton />
          <Link
            href="/contact"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Liên hệ
          </Link>
        </div>
      </div>
    </header>
  )
}
