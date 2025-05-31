'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import CardService from '@/components/CardService'

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'
import Link from 'next/link'

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
  const swiperRef = useRef<SwiperRef>(null)

  useEffect(() => {
    setHeaderTheme('light')
  })

  const scrollLeft = () => {
    swiperRef.current?.swiper.slidePrev()
  }

  const scrollRight = () => {
    swiperRef.current?.swiper.slideNext()
  }

  return (
    <div className="bg-white dark:bg-gray-900 relative top-0">
      <div className="porto-hero-container">
        {/* image */}
        <div className="porto-hero-image">
          {media && typeof media === 'object' && (
            <Media
              fill
              imgClassName="object-cover"
              className="relative h-[28rem] md:h-[45rem]"
              priority
              loading="eager"
              resource={media}
            />
          )}
        </div>
        {/* image text */}
        <div className="porto-hero-text">
          <h3
            className="leading-[70px] tracking-[0]"
            style={{ textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
          >
            {mediaText}
          </h3>
          <h3
            className="leading-[70px] tracking-[0] text-white"
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
        {/* Desktop Services list */}
        <div className="hero-slider-items-container">
          {servicesSlider && servicesSlider.servicesList && (
            <Swiper
              ref={swiperRef}
              slidesPerView={3}
              spaceBetween={16}
              loop={true}
              navigation={false}
              modules={[Navigation]}
              className="mySwiper"
            >
              {servicesSlider.servicesList.map((item, index) => (
                <SwiperSlide key={index}>
                  <CardService data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        {/* Mobile services list */}
        <div className="block md:hidden container py-4">
          <div className="space-y-4 mb-4">
            {servicesSlider &&
              servicesSlider.servicesList &&
              servicesSlider.servicesList.length > 0 &&
              servicesSlider.servicesList.map((service, index) => {
                if (index <= 2) return <CardService key={index} data={service} />
              })}
          </div>
          <Link href={'/services'}>
            <button className="p-3 w-full bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 font-semibold">
              EXPLORE MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
