import React from 'react'

import type { CallToActionWithImageBlock as CTAWithImageBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const CallToActionWithImageBlock: React.FC<CTAWithImageBlockProps> = ({
  links,
  richText,
  direction,
  media,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 -mt-[4rem]">
      <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <Media resource={media} imgClassName="w-full" />
        <div className="mt-4 md:mt-0">
          {richText && (
            <RichText
              className="mb-0 cta-heading cta-description"
              data={richText}
              enableGutter={false}
            />
          )}

          <div className="mt-4">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  size="lg"
                  {...link}
                  className="inline-flex items-center text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
