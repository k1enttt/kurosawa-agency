'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import Breadcrumb from '@/components/Breadcrumb'

export const HighImpactHero: React.FC<Page['hero']> = ({ media, heading }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div className="relative flex items-center justify-center text-white py-16" data-theme="light">
      <div className="container z-10 relative flex items-center justify-start">
        <div className="max-w-146 space-y-2">
          <Breadcrumb />
          {heading && <h1 className="text-4xl font-semibold text-dark">{heading}</h1>}
        </div>
      </div>
      <div className="absolute inset-0 select-none bg-white/90">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} loading="eager" />
        )}
      </div>
    </div>
  )
}
