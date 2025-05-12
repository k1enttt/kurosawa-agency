import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { GalleryContentBlock as GalleryContentBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import FeatureCardSlider from '@/components/FeatureCardSlider'

export const GalleryContentBlock: React.FC<GalleryContentBlockProps> = (props) => {
  const { backgroundColor, introText, contentCards } = props

  return (
    <div className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}>
      <div className="container py-8 md:text-center lg:py-16">
        {introText && (
          <div className="mb-16 text-center text-gray-900">
            <RichText
              className="gallery-content-heading gallery-content-subheading"
              data={introText}
              enableGutter={false}
            />
          </div>
        )}
        {/* Desktop feature cards */}
        <div className="hidden md:block">
          <div className="w-full grid grid-cols-3 gap-5">
            {contentCards?.map((card, index) => (
              <div key={index} className="relative rounded-lg h-64 overflow-hidden flex items-end">
                {card.media && (
                  <Media
                    resource={card.media}
                    alt={'Feature image'}
                    fill
                    className="absolute inset-0"
                    imgClassName="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="w-full text-background dark:text-foreground text-lg text-center z-20 mb-7">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile feature cards */}
        <div className="block md:hidden h-64">
          <FeatureCardSlider data={contentCards} />
        </div>
      </div>
    </div>
  )
}
