'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Media } from '@/components/Media'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const { logo, contactInformation, navItems } = data

  const phoneNumber: string | null = contactInformation?.phone ?? null
  const email: string | null = contactInformation?.email ?? null
  const workTime: string | null = contactInformation?.workTime ?? null

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="top-0 z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="header">
        <Link href={'/'} className="header-logo-container">
          {logo ? (
            <Media alt="Logo cong ty" resource={logo} className="logo" size="100" />
          ) : (
            <div className="text-2xl font-bold">KCV</div>
          )}
        </Link>
        <div className="header-content">
          <div className="header-row-1">
            <div className="flex-1 basis-2/3 flex justify-start">
              {phoneNumber && (
                <div className="phone">
                  <a href={`tel:${phoneNumber}`} className="hover:opacity-80">
                    {phoneNumber}
                  </a>
                </div>
              )}
              {email && (
                <div className="email">
                  <a href={`mailto:${email}`} className="hover:opacity-80">
                    {email}
                  </a>
                </div>
              )}
              {workTime && <div className="workTime">{workTime}</div>}
            </div>
            <div className="flex-1 basis-1/3 flex justify-end">
              <div className="language">
                <LanguageSwitcher />
              </div>

              {/* Social media */}
              <div className="social-media">
                <Link href={'#'}>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.5957 10.5697C20.5957 5.04967 16.1157 0.569672 10.5957 0.569672C5.0757 0.569672 0.595703 5.04967 0.595703 10.5697C0.595703 15.4097 4.0357 19.4397 8.5957 20.3697V13.5697H6.5957V10.5697H8.5957V8.06967C8.5957 6.13967 10.1657 4.56967 12.0957 4.56967H14.5957V7.56967H12.5957C12.0457 7.56967 11.5957 8.01967 11.5957 8.56967V10.5697H14.5957V13.5697H11.5957V20.5197C16.6457 20.0197 20.5957 15.7597 20.5957 10.5697Z"
                      fill="#777777"
                    />
                  </svg>
                </Link>
                <Link href={'#'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0,0,28,28"
                  >
                    <g fill="#777777">
                      <g>
                        <path d="M6,4c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM8.64844,9h4.61133l2.69141,3.84766l3.33008,-3.84766h1.45117l-4.12891,4.78125l5.05078,7.21875h-4.61133l-2.98633,-4.26953l-3.6875,4.26953h-1.47461l4.50586,-5.20508zM10.87891,10.18359l6.75391,9.62695h1.78906l-6.75586,-9.62695z"></path>
                      </g>
                    </g>
                  </svg>
                </Link>
                <Link href={'#'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 28 28"
                  >
                    <g fill="#777777">
                      <g>
                        <path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM10.954,22h-2.95v-9.492h2.95zM9.449,11.151c-0.951,0 -1.72,-0.771 -1.72,-1.72c0,-0.949 0.77,-1.719 1.72,-1.719c0.948,0 1.719,0.771 1.719,1.719c0,0.949 -0.771,1.72 -1.719,1.72zM22.004,22h-2.948v-4.616c0,-1.101 -0.02,-2.517 -1.533,-2.517c-1.535,0 -1.771,1.199 -1.771,2.437v4.696h-2.948v-9.492h2.83v1.297h0.04c0.394,-0.746 1.356,-1.533 2.791,-1.533c2.987,0 3.539,1.966 3.539,4.522z"></path>
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="header-row-2">
            {/* Navigation bar */}
            <HeaderNav data={{ navItems, id: data.id }} />
          </div>
        </div>
      </div>
    </header>
  )
}
