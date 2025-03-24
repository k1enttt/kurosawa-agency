import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const introText = footerData?.description
  const copyright = footerData?.copyright

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
        {introText && <p className="my-6 text-gray-500 dark:text-gray-400">{introText}</p>}

        {/* nav buttons */}
        <nav className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          {navItems.map(({ link }, i) => {
            return <CMSLink className="mr-4 hover:underline md:mr-6 " key={i} {...link} />
          })}
        </nav>

        {/* copyright */}
        {copyright && (
          <RichText
            data={copyright}
            enableGutter={false}
            className={cn(
              'text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-6',
              '[&_a:hover]:underline [&_a]:text-inherit [&_a]:no-underline',
            )}
          />
        )}
        <div className="flex justify-center items-center text-gray-500 dark:text-gray-400">
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
