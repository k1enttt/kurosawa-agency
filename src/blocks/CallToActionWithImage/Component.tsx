import React from 'react'

import type { CallToActionWithImageBlock as CTAWithImageBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const CallToActionWithImageBlock: React.FC<CTAWithImageBlockProps> = ({
  backgroundColor,
  links,
  richText,
  direction,
  media,
}) => {
  return (
    <div className={`${backgroundColor == 'dark' ? 'bg-muted' : 'bg-white'} dark:bg-gray-900`}>
      <div className="gap-8 items-center py-8 xl:gap-16 md:grid md:grid-cols-2 sm:py-16 container">
        <Media
          resource={media}
          imgClassName="w-full rounded-lg"
          className={direction == 'rtl' ? 'lg:order-2' : ''}
        />
        <div className={`mt-4 md:mt-0 ${direction == 'rtl' && 'lg:order-1 '}`}>
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
                  className="inline-flex items-center font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
