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
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">{address.officeAddress}</div>
                    </div>
                    {/* Phone Number */}
                    <div className="flex gap-4 items-start justify-center">
                      <div className="flex-0">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">{address.phone}</div>
                    </div>
                    {/* Email */}
                    <div className="flex gap-4 items-start justify-center">
                      <div className="flex-0">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"
                          />
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
