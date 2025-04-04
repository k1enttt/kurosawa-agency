'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

export const PortoHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="porto-hero-container">
        {/* image */}
        <div className="porto-hero-image">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover" priority resource={media} />
          )}
        </div>
        {/* image text */}
        <div className="porto-hero-text">
          <h3
            className="text-7xl leading-[70px] font-bold tracking-[0] text-white"
            style={{
              WebkitTextFillColor: 'transparent',
              WebkitTextStrokeWidth: '1px',
              WebkitTextStrokeColor: 'white',
            }}
          >
            SOME TEXT
          </h3>
          <h3 className="text-7xl leading-[70px] font-bold tracking-[0]">SOME TEXT</h3>
        </div>
      </div>
    </div>
  )
}
