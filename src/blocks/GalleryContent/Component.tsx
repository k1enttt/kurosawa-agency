import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { GalleryContentBlock as GalleryContentBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const GalleryContentBlock: React.FC<GalleryContentBlockProps> = (props) => {
  const { introText, contentCards } = props

  return (
    <div className="bg-white dark:bg-gray-900 -mt-[4rem]">
      <div className="container py-8 sm:text-center lg:py-16">
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
              <article
                className={cn(
                  'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
                )}
              >
                <div className="relative w-full ">
                  {!media && <div className="">No image</div>}
                  {media && <Media resource={media} size="33vw" />}
                </div>
                <div className="p-4">
                  {heading && (
                    <div className="prose">
                      <h3>{heading}</h3>
                    </div>
                  )}
                  {subheading && (
                    <div className="mt-2">
                      <p>{subheading}</p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
