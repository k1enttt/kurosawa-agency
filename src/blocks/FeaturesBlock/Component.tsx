import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'

import Link from 'next/link'
import { Media } from '@/components/Media'
import FeatureCardSlider from '@/components/FeatureCardSlider'

export const FeaturesBlock: React.FC<FeaturesBlockProps> = (props) => {
  const { backgroundColor, yearsInBusiness, paragraphSmall, link, paragraphLarge, columns } = props

  return (
    <div className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}>
      <div className="py-8 sm:py-16 container">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-10">
          {/* Năm kinh doanh và mô tả công ty */}
          <div className="flex-1 space-y-5">
            <div className="flex gap-4">
              <div className="text-[90px] leading-[90px] font-bold">{yearsInBusiness}</div>
              {paragraphSmall && (
                <RichText
                  className="font-medium text-muted-foreground"
                  data={paragraphSmall}
                  enableProse={false}
                  enableGutter={false}
                />
              )}
            </div>
            {link && link.label && (
              <Link
                href={link.url || '#'}
                className="text-primary font-semibold underline underline-offset-2"
              >
                {link.label}
              </Link>
            )}
          </div>

          <div className="flex-0 h-16 w-2 rounded bg-primary hidden md:block"></div>
          {/* Cam kết chất lượng dịch vụ */}
          {paragraphLarge && (
            <RichText
              className="flex-1 font-medium text-3xl text-justify"
              data={paragraphLarge}
              enableProse={false}
              enableGutter={false}
            />
          )}
        </div>
        {/* Desktop feature cards */}
        <div className="hidden md:block">
          <div className="w-full grid grid-cols-3 gap-5">
            {columns?.map((column, index) => (
              <div key={index} className="relative rounded-lg h-64 overflow-hidden flex items-end">
                {column.media && (
                  <Media
                    resource={column.media}
                    alt={'Feature image'}
                    fill
                    className="absolute inset-0"
                    imgClassName="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="w-full text-background dark:text-foreground text-lg text-center z-20 mb-7">
                  {column.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile feature cards */}
        <div className="block md:hidden h-64">
          <FeatureCardSlider data={columns} />
        </div>
      </div>
    </div>
  )
}
