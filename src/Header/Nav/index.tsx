'use client'

import React, { useEffect, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import BurgerButton from '../BurgerButton'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [isNavOpen, setIsNavOpen] = useState(false)

  const open = () => setIsNavOpen(true)
  const close = () => setIsNavOpen(false)

  const pathname = usePathname()
  useEffect(() => {
    if (isNavOpen) close()
  }, [pathname])

  return (
    <>
      {/* action buttons */}
      <div className="hidden lg:flex items-center lg:order-2 space-x-4">
        {/* Search */}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-gray-400 mr-2" />
        </Link>

        {/* Services */}
        <CMSLink
          url={'/services'}
          label={'Our Services'}
          className="rounded-lg border-b border-b-gray-900 text-primary-foreground bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
        />

        {/* Contact Us */}
        <CMSLink
          url={'/contact'}
          label={'Contact Us'}
          className="rounded-lg border-b border-b-primary-outline text-primary-foreground bg-primary hover:bg-primary/80 focus:ring-4 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none focus:ring-primary/80"
        />
      </div>

      {/* Desktop Navbar */}
      <div className={`justify-between items-center w-full hidden md:flex lg:w-auto lg:order-1`}>
        <div className="flex font-medium flex-row space-x-8 mt-0">
          {navItems.map(({ link }, i) => {
            return (
              <div key={i}>
                <CMSLink
                  {...link}
                  appearance="link"
                  className="block py-2 pr-4 pl-3 rounded-none border-b hover:no-underline border-0 p-0 !text-p-md text-foreground dark:text-background hover:text-link hover:bg-gray-700 hover:bg-transparent border-gray-700"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Burger Button */}
      <div className="absolute right-0 mr-10">
        <div className="w-full flex md:hidden item-center justify-end">
          <BurgerButton onClick={open} />
        </div>
      </div>

      {/* Mobile navbar */}
      <div className={`${isNavOpen ? 'fixed' : 'hidden'} inset-0 bg-black/80`}>
        <button
          onClick={close}
          className="absolute top-0 right-0 mt-10 mr-10 h-8 w-8 p-1 bg-primary/80 rounded-lg"
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
        <div className={`absolute h-full top-0 left-0 w-3/5 bg-white`}>
          <div className="flex flex-col my-6 font-medium">
            {data.navItems?.map(({ link }, i) => {
              return (
                <div key={i}>
                  <CMSLink
                    {...link}
                    appearance="link"
                    className={clsx(
                      i == data.navItems?.length! - 1 && 'border-none',
                      'block py-4 pr-4 pl-3 rounded-none border-b hover:no-underline !text-p-md text-heading hover:bg-gray-700 hover:text-white border-gray-200',
                    )}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
