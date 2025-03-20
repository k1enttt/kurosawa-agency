import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'

import type { GalleryContentBlock as GalleryContentBlockProps } from '@/payload-types'
import { Card } from '@/components/Card'
import { Media } from '@/components/Media'
import Link from 'next/link'

export const GalleryContentBlock: React.FC<GalleryContentBlockProps> = (props) => {
  const { introText, images } = props

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
          {images?.map((result, index) => {
            const media = result?.media
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
                  <div className="prose">
                    <h3>This is title</h3>
                  </div>
                  <div className="mt-2">
                    <p>This is description</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
