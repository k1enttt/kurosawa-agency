'use client'

import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'

import type { FeaturesBlock } from '@/payload-types'
import CardFeature from '../CardFeature'

export default function FeatureCardSlider({ data }: { data: FeaturesBlock['columns'] }) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <CardFeature data={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  )
}
