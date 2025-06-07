'use server'
import FeatureCardSlider from '@/components/FeatureCardSlider'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { CardGridBlock as CardGridBlockProps, Config } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { customTranslations as t } from 'custom-translations'
import { cookies } from 'next/headers'

import React from 'react'

export const CardGridBlock: React.FC<
  CardGridBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, richText, cards, features } = props

  const locale = (await cookies()).get('locale')?.value
  const typedLocale = locale as Config['locale'] | undefined

  return (
    <section className="bg-white dark:bg-gray-900" id={`block-${id}`}>
      <div className="py-8 lg:py-16 container">
        {richText && (
          <div className="text-justify mb-8 lg:mb-16">
            <RichText
              className={cn(
                '[&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:dark:text-white',
                '[&_p]:font-medium [&_p]:text-gray-500 [&_p]:sm:text-xl [&_p]:dark:text-gray-400',
              )}
              data={richText}
              enableGutter={false}
            />
          </div>
        )}
        <div className={cn('grid gap-6 grid-cols-1 lg:grid-cols-2 mb-8 lg:mb-16')}>
          {cards &&
            cards.map((card, index) => {
              const { media, title, description, link } = card
              return (
                <article key={index} className="flex gap-6 p-10 border border-muted rounded-lg">
                  <div id="media" className="flex-0 w-16">
                    {!media && (
                      <div className="flex items-center justify-center h-full rounded-lg">
                        No image
                      </div>
                    )}
                    {media && (
                      <Media resource={media} imgClassName="object-contain w-full aspect-square" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    {title && <h3 className="font-semibold text-xl">{title}</h3>}
                    {description && (
                      <p className="line-clamp-2 text-sm font-medium text-muted-foreground">
                        {description}
                      </p>
                    )}
                    {link && (
                      <CMSLink
                        {...link}
                        label={t[typedLocale || 'en'].readMore}
                        className="p-0 h-min text-primary font-semibold text-sm bg-transparent hover:bg-transparent underline uppercase"
                      />
                    )}
                  </div>
                </article>
              )
            })}
        </div>
        {/* Desktop feature cards */}
        <div className="hidden md:block">
          <div className="w-full grid grid-cols-3 gap-5">
            {features?.map((feature, index) => (
              <div key={index} className="relative rounded-lg h-64 overflow-hidden flex items-end">
                {feature.media && (
                  <Media
                    resource={feature.media}
                    alt={'Feature image'}
                    className="absolute object-cover inset-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="w-full text-background dark:text-foreground text-lg text-center z-20 mb-7">
                  {feature.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile feature cards */}
        <div className="block md:hidden h-64">
          <FeatureCardSlider data={features} />
        </div>
      </div>
    </section>
  )
}
