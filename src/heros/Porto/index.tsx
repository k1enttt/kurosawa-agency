'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

type PortoHeroType =
  | {
      children?: React.ReactNode
      media?: never
      mediaText?: never
      servicesSlider?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      media?: Page['hero']['media']
      mediaText?: Page['hero']['mediaText']
      servicesSlider?: Page['hero']['servicesSlider']
    })

export const PortoHero: React.FC<PortoHeroType> = ({ media, mediaText, servicesSlider }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('light')
  })

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

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
            {mediaText}
          </h3>
          <h3 className="text-7xl leading-[70px] font-bold tracking-[0]">{mediaText}</h3>
        </div>
      </div>
      <div className="porto-hero-slider">
        {/* Slider heading */}
        <div className="hero-slider-heading">
          <div className="hero-slider-heading-content">
            {/* Slider heading text */}
            <h2>{servicesSlider?.sliderHeading}</h2>
            {/* Slider navigators */}
            <div className="hero-slider-navigator">
              <div className="hero-slider-left-btn" onClick={scrollLeft}>
                <svg
                  className="w-12 h-12 text-white"
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
                    d="m14 8-4 4 4 4"
                  />
                </svg>
              </div>
              <div className="hero-slider-right-btn" onClick={scrollRight}>
                <svg
                  className="w-12 h-12 text-white"
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
                    d="m10 16 4-4-4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Services list */}
        <div ref={sliderRef} className="hero-slider-items">
          {servicesSlider?.servicesList?.map((service, index) => (
            <div key={index} className="flex w-full gap-4 p-4 rounded-lg bg-white shadow-md">
              {/* Left column with icon */}
              <div className="w-1/4 flex items-start justify-center">
                {service.serviceIcon && (
                  <Media
                    resource={service.serviceIcon}
                    imgClassName="w-20 h-20 object-contain"
                    alt={service.serviceTitle || 'Service Icon'}
                  />
                )}
              </div>
              {/* Right column with title, description, and link */}
              <div className="w-3/4">
                <h4 className="text-lg font-bold mb-2">{service.serviceTitle}</h4>
                <p className="text-sm text-gray-600 mb-2">{service.serviceDescription}</p>
                {service.serviceLink && (
                  <a
                    href={service.serviceLink}
                    className="text-blue-500 hover:underline text-sm"
                    target="_self"
                  >
                    Read more
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
