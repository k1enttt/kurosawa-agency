import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { TwoColsContentBlock as TwoColsContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import Link from 'next/link'

export const TwoColsContentBlock: React.FC<TwoColsContentBlockProps> = (props) => {
  const { introText, enableLink, link, secondColumnContent } = props

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 lg:grid lg:grid-cols-2 lg:py-16 container">
        <div>
          {introText && (
            <RichText
              data={introText}
              enableGutter={false}
              className={cn(
                'font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-4',
                '[&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:dark:text-white',
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
