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

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let isDragging = false
    let startX = 0
    let scrollLeft = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      slider.classList.add('cursor-grabbing')
      slider.classList.remove('cursor-grab')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = x - startX // Adjust scroll speed
      slider.scrollLeft = scrollLeft - walk
    }

    const handleMouseUpOrLeave = () => {
      isDragging = false
      slider.classList.remove('cursor-grabbing')
      slider.classList.add('cursor-grab')
    }

    slider.addEventListener('mousedown', handleMouseDown)
    slider.addEventListener('mousemove', handleMouseMove)
    slider.addEventListener('mouseup', handleMouseUpOrLeave)
    slider.addEventListener('mouseleave', handleMouseUpOrLeave)

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown)
      slider.removeEventListener('mousemove', handleMouseMove)
      slider.removeEventListener('mouseup', handleMouseUpOrLeave)
      slider.removeEventListener('mouseleave', handleMouseUpOrLeave)
    }
  }, [])

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
      <div className="flex">
        {/* Slider heading */}
        <div className="hero-slider-heading">
          <div className="hero-slider-heading-content">{servicesSlider?.sliderHeading}</div>
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
