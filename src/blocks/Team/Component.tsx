import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { Config, TeamBlock as TeamBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import ModalButton from '../../components/ModalButton'
import { customTranslations as t } from 'custom-translations'
import { cookies } from 'next/headers'

export const TeamBlock: React.FC<TeamBlockProps> = async (props) => {
  const { backgroundColor, introText, members } = props

  const locale = (await cookies()).get('locale')?.value || 'en'
  const typedLocale = locale as Config['locale'] | undefined

  return (
    <section
      className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}
    >
      <div className="py-8 lg:py-16 container">
        <div className="mb-8 lg:mb-16">
          {introText && (
            <RichText
              className={cn(
                '[&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:dark:text-white [&_h2]:divide-line',
                'font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400',
              )}
              data={introText}
              enableGutter={false}
            />
          )}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6 lg:mb-16">
          {members &&
            members.length > 0 &&
            members.map((member) => (
              // Member Card
              <div
                key={member.id}
                className="items-start grid grid-cols-3 gap-4 p-4 bg-gray-50 h-fit rounded-lg shadow-md dark:bg-gray-800"
              >
                {/* image */}
                <Media
                  imgClassName="rounded-lg sm:rounded-none sm:rounded-lg object-cover"
                  className="relative w-full aspect-square"
                  fill
                  resource={member.avatar}
                  alt={`${member.name} Avatar`}
                />

                {/* info */}
                <div className="col-span-2 space-y-2">
                  {/* name */}
                  <h3 className="text-xl font-bold tracking-tight text-dark dark:text-white">
                    <a href="#">{member.name}</a>
                  </h3>

                  {/* role */}
                  <span className="text-dark font-medium">{member.role}</span>

                  {/* description */}
                  {member.description && (
                    <div className="hidden md:block">
                      <RichText
                        data={member.description}
                        enableGutter={false}
                        enableProse={false}
                        className="font-light text-gray-500 dark:text-gray-400 line-clamp-3"
                      />
                    </div>
                  )}

                  {/* Read more button */}
                  <ModalButton
                    data={member}
                    className="block text-sm font-semibold text-primary underline underline-offset-1 uppercase"
                  >
                    {t[typedLocale || 'en'].readMore}
                  </ModalButton>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
