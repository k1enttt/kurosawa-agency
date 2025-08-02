import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="rounded py-10 flex flex-col md:gap-8 gap-4 md:flex-row md:justify-between md:items-center">
          <div className="max-w-3xl flex items-center">
            {richText && (
              <RichText
                className="mb-0 text-lg text-primary-foreground md:text-left text-center"
                data={richText}
                enableProse={false}
                enableGutter={false}
              />
            )}
          </div>
          <div className="flex flex-col gap-8">
            {/* TODO: Điều chỉnh kích thước của CTA Button ở Mobile */}
            {(links || []).map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  size="lg"
                  type={'custom'}
                  {...link}
                  className="font-bold text-foreground dark:text-background bg-primary-foreground hover:bg-primary-foreground px-10 py-3"
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
