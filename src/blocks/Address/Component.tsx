import React from 'react'

import type { AddressBlock as AddressBlockProps } from '@/payload-types'
import Link from 'next/link'

export const AddressBlock: React.FC<AddressBlockProps> = ({
  backgroundColor,
  heading,
  addresses,
}) => {
  const extractSrcFromIframe = (iframeString: string): string | undefined => {
    const srcMatch = iframeString.match(/src="([^"]+)"/)
    return srcMatch ? srcMatch[1] || undefined : undefined
  }
  return (
    <div className={`${backgroundColor == 'dark' ? 'bg-muted' : 'bg-white'} dark:bg-gray-900`}>
      <div className="py-8 md:py-16 container">
        <h2 className="text-4xl tracking-tight font-bold divide-line mb-8">{heading}</h2>
        <div className="space-y-8 md:space-y-12 items-start">
          {addresses &&
            addresses.map((address, index) => (
              <div key={index} className="grid md:grid-cols-2 grid-cols-1 gap-8 md:gap-12">
                {/* Bản đồ */}
                {address.googleMapsEmbedHtml && (
                  <iframe
                    src={extractSrcFromIframe(address.googleMapsEmbedHtml)}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full md:aspect-[3/2] aspect-square"
                  ></iframe>
                )}
                {/* Địa chỉ liên lạc */}
                <div className="space-y-6">
                  {/* Heading */}
                  <h2 className="font-semibold text-2xl">{address.heading}</h2>
                  <div className="space-y-4">
                    {/* Office Address */}
                    <div className="flex gap-4 items-start justify-center">
                      <div className="flex-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_436_552)">
                            <path
                              d="M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z"
                              fill="#323232"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_436_552">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="flex-1">{address.officeAddress}</div>
                    </div>
                    {/* Phone Number */}
                    <div className="flex gap-4 items-start justify-center">
                      <div className="flex-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_436_555)">
                            <path
                              d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54ZM16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02ZM7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3Z"
                              fill="#323232"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_436_555">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="flex-1">{address.phone}</div>
                    </div>
                    {/* Email */}
                    <div className="flex gap-4 items-start justify-center">
                      <div className="flex-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_436_559)">
                            <path
                              d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19 18H5C4.45 18 4 17.55 4 17V8L10.94 12.34C11.59 12.75 12.41 12.75 13.06 12.34L20 8V17C20 17.55 19.55 18 19 18ZM12 11L4 6H20L12 11Z"
                              fill="#323232"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_436_559">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`mailto:${address.email}`}
                          className="underline underline-offset-2 text-primary"
                        >
                          {address.email}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
