'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const FlowbiteHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="bg-white -mt-[4rem] dark:bg-gray-900">
      <div className="grid container py-8 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          {/* Heading and description */}
          {richText && (
            <RichText
              className="mb-6 hero-heading hero-description"
              data={richText}
              enableGutter={false}
            />
          )}
          {/* nav buttons */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className="cta-button" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        {/* image */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          {media && typeof media === 'object' && (
            <Media imgClassName="-z-10 rounded-lg" size="100" priority resource={media} />
          )}
        </div>
      </div>
    </div>
  )
}
