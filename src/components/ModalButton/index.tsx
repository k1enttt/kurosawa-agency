'use client'

import React, { useEffect } from 'react'
import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import { Media } from '../Media'
import RichText from '../RichText'
import { initFlowbite } from 'flowbite'

const ModalButton = ({
  children,
  className,
  data,
}: {
  children: React.ReactNode
  className: string
  data: Exclude<TeamBlockProps['members'], null | undefined>[number]
}) => {
  const { avatar, name: authorName, role: authorRole, description } = data

  useEffect(() => {
    // Dòng này để đảm bảo code js của Flowbite luôn hoạt động
    initFlowbite()
  })

  return (
    <>
      {/* Modal toggle */}
      <button
        data-modal-target={`default-modal-${data.id}`}
        data-modal-toggle={`default-modal-${data.id}`}
        className={className}
        type="button"
      >
        {children}
      </button>

      {/* Main modal */}
      <div
        id={`default-modal-${data.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {avatar && (
                <div className="w-full flex justify-center">
                  <Media
                    imgClassName="w-40 aspect-square rounded-lg object-cover"
                    resource={data.avatar}
                  />
                </div>
              )}
              <div>
                {authorName && <h2 className="text-dark text-xl font-bold">{authorName}</h2>}
                {authorRole && <p className="text-dark text-base font-medium">{authorRole}</p>}
              </div>

              {description && (
                <RichText
                  className="text-muted-foreground leading-relaxed text-left md:text-justify"
                  data={description}
                  enableGutter={false}
                />
              )}
            </div>
            <div className="absolute top-0 right-0">
              <button
                data-modal-hide={`default-modal-${data.id}`}
                type="button"
                className="p-1 bg-primary rounded-sm mt-4 mr-4"
              >
                <svg
                  className="w-6 h-6 text-white"
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
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalButton
