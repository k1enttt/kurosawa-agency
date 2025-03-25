import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { GalleryContentBlock as GalleryContentBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const GalleryContentBlock: React.FC<GalleryContentBlockProps> = (props) => {
  const { introText, contentCards } = props

  return (
    <div className="bg-flowbite-container dark:bg-gray-900">
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
        <div className="grid gap-6 mt-12 lg:mt-14 lg:gap-12 md:grid-cols-3">
          {contentCards?.map((card, index) => {
            const media = card?.media
            const heading = card?.heading
            const subheading = card?.subheading
            return (
              <article key={index} className={cn('flex mb-2 md:flex-col md:mb-0')}>
                <div className="mr-4">
                  {!media && <div className="">No image</div>}
                  {media && (
                    <Media
                      resource={media}
                      size="33vw"
                      fill
                      className="relative w-36 h-44 md:w-full md:h-60"
                      imgClassName="object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="p-4">
                  {heading && (
                    <h3 className="text-xl font-bold md:mt-4 mb-2.5 text-gray-900 dark:text-white">
                      {heading}
                    </h3>
                  )}
                  {subheading && <p className="text-gray-500 dark:text-gray-400">{subheading}</p>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
