import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="rounded py-10 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div className="max-w-[48rem] flex items-center">
            {richText && (
              <RichText
                className="mb-0 text-lg text-primary-foreground"
                data={richText}
                enableProse={false}
                enableGutter={false}
              />
            )}
          </div>
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  size="lg"
                  {...link}
                  className="font-bold text-foreground bg-primary-foreground hover:bg-primary-foreground"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
