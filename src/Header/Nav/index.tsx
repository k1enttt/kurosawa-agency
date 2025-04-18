'use client'

import React, { Suspense } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import BurgerButton from '../BurgerButton'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <>
      {/* action buttons */}
      <div className="flex items-center lg:order-2">
        <div className="mr-4">
          <CMSLink label="Let's talk" appearance="default" url="/contact" />
        </div>
        <div className="mr-4">
          <Suspense>
            <LanguageSwitcher className="bg-black text-white dark:bg-white dark:text-black" />
          </Suspense>
        </div>

        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-gray-400 mr-2" />
        </Link>
        <BurgerButton onClick={toggleNav} />
      </div>

      {/* nav buttons */}
      <div
        className={`${!isNavOpen && 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
        id="mobile-menu-2"
      >
        <div className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          {navItems.map(({ link }, i) => {
            return (
              <div key={i}>
                <CMSLink
                  {...link}
                  appearance="link"
                  className="block py-2 pr-4 pl-3 rounded-none border-b hover:no-underline lg:border-0 lg:p-0 !text-p-md text-heading lg:hover:text-link hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
