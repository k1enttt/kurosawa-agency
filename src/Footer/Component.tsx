import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        {/* logo */}
        <div className="flex justify-center items-center ">
          <Link className="w-fit" href="/">
            <Logo />
          </Link>
        </div>

        {/* description */}
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Open-source library of over 400+ web components and interactive elements built for better
          web.
        </p>

        <div className="flex justify-center items-center text-gray-500 dark:text-gray-400 mb-6">
          <ThemeSelector />
        </div>

        {/* nav buttons */}
        <nav className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          {navItems.map(({ link }, i) => {
            return <CMSLink className="mr-4 hover:underline md:mr-6 " key={i} {...link} />
          })}
        </nav>

        {/* copyright */}
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021-2022{' '}
          <a href="#" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
