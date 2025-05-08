'use client'

import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'

import type { FeaturesBlock } from '@/payload-types'
import { Media } from '../Media'

export default function CardSlider({ data }: { data: FeaturesBlock['columns'] }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={{
          enabled: true,
          // nextEl: 'h-2',
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <div key={index} className="relative rounded-lg h-64 overflow-hidden flex items-end">
                {item.media && (
                  <Media
                    resource={item.media}
                    alt={'Feature image'}
                    fill
                    className="absolute inset-0"
                    imgClassName="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="w-full text-background dark:text-foreground text-lg text-center z-20 mb-7">
                  {item.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
