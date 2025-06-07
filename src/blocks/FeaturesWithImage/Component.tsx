import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { FeaturesWithImage as FeaturesWithImageProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const FeaturesWithImageBlock: React.FC<FeaturesWithImageProps> = (props) => {
  const { backgroundColor, introText, media, columns } = props

  return (
    <div
      className={cn(
        backgroundColor == 'dark' ? 'bg-muted' : 'bg-white',
        'relative dark:bg-gray-900',
      )}
    >
      <div className="grid md:grid-cols-2 grid-cols-1 gap-20 container">
        {/* Text */}
        <div className="py-8 md:py-16 flex flex-col gap-12">
          {introText && (
            <RichText
              data={introText}
              className="font-medium text-3xl text-justify"
              enableGutter={false}
            />
          )}
          <div className="flex flex-col gap-4">
            {columns?.map((column, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col gap-y-4">
                  <div className="flex-0 h-14 aspect-square rounded-full bg-dark text-light font-bold text-xl flex items-center justify-center">
                    {index + 1}
                  </div>
                  {index < columns.length - 1 && (
                    <div className="flex-1 w-1 min-h-10 bg-muted rounded-sm mx-auto"></div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{column.title}</div>
                  <div className="font-medium text-muted-foreground">{column.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Image */}
        <div className="hidden md:flex">
          <div className="absolute w-1/2 h-full left-1/2">
            {media && (
              <Media
                alt="Big Feature Image"
                resource={media}
                imgClassName="absolute inset-0 object-cover h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="relative md:hidden block w-full h-72">
        {media && (
          <Media
            alt="Big Feature Image"
            resource={media}
            fill
            imgClassName="object-cover"
            className="h-full w-full"
          />
        )}
      </div>
    </div>
  )
}
