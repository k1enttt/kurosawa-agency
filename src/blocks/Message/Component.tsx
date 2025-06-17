import React from 'react'

import type { Message as MessageProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const MessageBlock: React.FC<MessageProps> = ({
  backgroundColor,
  heading,
  message,
  author,
  media,
}) => {
  return (
    <div className={`${backgroundColor == 'dark' ? 'bg-muted' : 'bg-white'} dark:bg-gray-900`}>
      <div className="py-8 sm:py-16 container">
        <h2 className="mb-8 text-4xl tracking-tight font-bold divide-line">{heading}</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 items-start">
          <div className="w-full">
            <Media resource={media} imgClassName="md:w-full w-1/3 rounded-lg" />
          </div>

          <div className="mt-4 md:mt-0 col-span-1 md:col-span-2">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
              >
                <g clipPath="url(#clip0_539_533)">
                  <path
                    d="M18.6893 24.0656V14.1571C18.6893 6.51019 23.664 1.32735 30.6667 -0.0655518L31.9933 2.81812C28.7507 4.04747 26.6667 7.69529 26.6667 10.6594H32V24.0656H18.6893ZM0 24.0656V14.1571C0 6.51019 4.99733 1.32601 12 -0.0655518L13.328 2.81812C10.084 4.04747 8 7.69529 8 10.6594H13.3107V24.0656H0Z"
                    fill="#86AD53"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_539_533">
                    <rect width="32" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {message && (
              <RichText
                className="mb-6 cta-heading cta-description md:text-justify text-left"
                data={message}
                enableGutter={false}
              />
            )}
            <div className="">
              <div className="font-bold text-2xl">{author?.name}</div>
              <div className="font-semibold text-sm text-muted-foreground">{author?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
