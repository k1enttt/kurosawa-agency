'use client'

import React from 'react'
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'

import CardService from '../CardService'
import { Config } from '@/payload-types'

export default function ServiceCardSlider({
  data,
  slidesPerView = 1,
  navigation = true,
}: {
  data: NonNullable<Config['collections']['pages']['hero']['servicesSlider']>['servicesList']

  slidesPerView?: number
  navigation?: boolean
  ref?: SwiperRef
}) {
  if (!data) return null
  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={30}
        loop={true}
        navigation={navigation}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <CardService data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
