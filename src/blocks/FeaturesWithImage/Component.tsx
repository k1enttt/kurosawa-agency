import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { FeaturesWithImage as FeaturesWithImageProps } from '@/payload-types'

import Link from 'next/link'
import { Media } from '@/components/Media'
import CardSlider from '@/components/CardSlider'
import Image from 'next/image'

export const FeaturesWithImageBlock: React.FC<FeaturesWithImageProps> = (props) => {
  const { backgroundColor } = props

  return (
    <div
      className={cn(
        backgroundColor == 'dark' ? 'bg-muted' : 'bg-white',
        'relative dark:bg-gray-900',
      )}
    >
      <div className="bg-blue-400 grid md:grid-cols-2 grid-cols-1 gap-4 container">
        {/* Text */}
        <div className="py-8 sm:py-16">
          <div>
            Our approach is a key factor that makes us highly competitive in the consulting
            industry.
          </div>
          <div>
            <div>
              <div>Japanese and Vietnamese expert team</div>
              <div>
                Highly experienced in accounting, tax, legal services, and customer support.
              </div>
            </div>
            <div>
              <div>Professionally competent employees</div>
              <div>
                Fluent in Japanese, with extensive practical experience and in-depth knowledge of
                accounting and legal regulations.
              </div>
            </div>
            <div>
              <div>Trusted by over 250 companies</div>
              <div>
                Supporting over 70 companies with a wide range of legal, tax, and accounting
                consulting services.
              </div>
            </div>
          </div>
        </div>
        {/* Image */}
        <div className="hidden md:block">
          <div className="absolute w-1/2 h-full left-1/2 bg-red-400/30">
            <Image
              alt="Big Feature Image"
              src="https://images.unsplash.com/photo-1556742208-999815fca738?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="relative md:hidden block w-full h-64 bg-red-400/30">
        <Image
          alt="Big Feature Image"
          src="https://images.unsplash.com/photo-1556742208-999815fca738?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
