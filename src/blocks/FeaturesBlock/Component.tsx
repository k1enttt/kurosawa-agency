import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const FeaturesBlock: React.FC<FeaturesBlockProps> = (props) => {
  const { introText, columns } = props

  return (
    <div className="container bg-white dark:bg-gray-900">
      <div className="py-8 text-center sm:py-16 container">
        {introText && (
          <RichText
            data={introText}
            enableGutter={false}
            className={cn(
              '[&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:dark:text-white',
              '[&_p]:font-light [&_p]:text-gray-500 [&_p]:lg:mb-16 [&_p]:sm:text-xl [&_p]:dark:text-gray-400',
            )}
          />
        )}
        <div className="mt-8 lg:mt-12 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText } = col

              return (
                <div key={index}>
                  {richText && (
                    <RichText
                      data={richText}
                      enableGutter={false}
                      className={cn(
                        '[&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:dark:text-white',
                        '[&_p]:mb-4 [&_p]:text-gray-500 [&_p]:dark:text-gray-400',
                      )}
                    />
                  )}

                  {enableLink && <CMSLink {...link} />}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
