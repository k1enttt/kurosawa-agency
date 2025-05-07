'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import ServiceCard from '@/components/ServiceCard'

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
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 relative top-0">
      <div className="porto-hero-container">
        {/* image */}
        <div className="porto-hero-image">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="object-cover" priority resource={media} />
          )}
        </div>
        {/* image text */}
        <div className="porto-hero-text">
          <h3 className="text-7xl leading-[70px] font-bold tracking-[0]">{mediaText}</h3>
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
        </div>
      </div>
      <div className="porto-hero-slider">
        {/* Slider heading */}
        <div className="hero-slider-heading">
          <div className="hero-slider-heading-background">
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
        </div>
        {/* Services list */}
        <div ref={sliderRef} className="hero-slider-items-container">
          <div className="hero-slider-items">
            {servicesSlider?.servicesList?.map((service, index) => (
              <div key={index}>
                <ServiceCard data={service} />
              </div>
            ))}
          </div>
        </div>
        {/* Mobile slider navigator */}
        <div className="md:hidden fixed bottom-0 left-0 p-4 md:min-w-[420px] min-w-full h-4/5 flex justify-between items-center border-none pointer-events-none">
          <div className="bg-white/50 cursor-pointer pointer-events-auto" onClick={scrollLeft}>
            <svg
              className="w-12 h-12 text-black"
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
          <div className="bg-white/50 cursor-pointer pointer-events-auto" onClick={scrollRight}>
            <svg
              className="w-12 h-12 text-black"
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
  )
}
