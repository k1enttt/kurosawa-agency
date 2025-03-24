import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { introText, members } = props

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 container">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          {introText && (
            <RichText
              className={cn(
                '[&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:dark:text-white',
                'font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400',
              )}
              data={introText}
              enableGutter={false}
            />
          )}
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16">
          {members &&
            members.length > 0 &&
            members.map((member) => (
              <div
                key={member.id}
                className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
              >
                {/* <!-- image --> */}
                <a href="#" className="pl-5">
                  <Media
                    imgClassName="rounded-lg sm:rounded-none sm:rounded-lg object-cover"
                    className="relative w-64 h-64"
                    fill
                    resource={member.avatar}
                    alt={`${member.name} Avatar`}
                  />
                </a>
                {/* <!-- info --> */}
                <div className="p-5">
                  {/* <!-- name --> */}
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#">{member.name}</a>
                  </h3>
                  {/* <!-- role --> */}
                  <span className="text-gray-500 dark:text-gray-400">{member.role}</span>
                  {/* <!-- description --> */}
                  {member.description && (
                    <RichText
                      data={member.description}
                      enableGutter={false}
                      className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400"
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
