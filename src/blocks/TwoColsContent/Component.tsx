import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { TwoColsContentBlock as TwoColsContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const TwoColsContentBlock: React.FC<TwoColsContentBlockProps> = (props) => {
  const { backgroundColor, introText, enableLink, link, secondColumnContent } = props

  return (
    <div
      className={cn(
        backgroundColor == 'dark' ? 'bg-flowbite-container' : 'bg-white',
        'dark:bg-gray-900',
      )}
    >
      <div className="gap-16 items-center py-8 lg:grid lg:grid-cols-2 lg:py-16 container">
        <div>
          {introText && (
            <RichText
              data={introText}
              enableGutter={false}
              className={cn(
                'font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-4',
                'flowbite-h2',
              )}
            />
          )}
          {enableLink && <CMSLink {...link} />}
        </div>

        <div className="mt-4 lg:mt-0 ">
          {secondColumnContent && (
            <RichText
              data={secondColumnContent}
              enableGutter={false}
              className="font-light text-gray-500 sm:text-lg dark:text-gray-400"
            />
          )}
        </div>
      </div>
    </div>
  )
}
