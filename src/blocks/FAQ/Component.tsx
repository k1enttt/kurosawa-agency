'use client'
import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'

export const FaqBlock: React.FC<FaqBlockProps> = (props) => {
  const { introText, questions } = props

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
        {introText && (
          <RichText
            data={introText}
            enableGutter={false}
            className="[&_h2]:mb-6 [&_h2]:lg:mb-8 [&_h2]:text-3xl [&_h2]:lg:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-center [&_h2]:text-gray-900 [&_h2]:dark:text-white"
          />
        )}
        <h2 className="mb-6 lg:mb-8 text-3xl lg:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white"></h2>

        <div className="mx-auto max-w-screen-md">
          <div
            id="accordion-flush"
            data-accordion="collapse"
            data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            data-inactive-classes="text-gray-500 dark:text-gray-400"
          >
            {questions &&
              questions.length > 0 &&
              questions.map((col, index) => {
                const { question, answer } = col

                return (
                  <Fragment key={index}>
                    <h3 id={`accordion-flush-heading-${index + 1}`}>
                      <button
                        type="button"
                        className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        data-accordion-target={`#accordion-flush-body-${index + 1}`}
                        aria-expanded="true"
                        aria-controls={`accordion-flush-body-${index + 1}`}
                      >
                        <span>{question}</span>
                        <svg
                          data-accordion-icon=""
                          className="w-6 h-6 rotate-180 shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          suppressHydrationWarning
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </h3>

                    {answer && (
                      <div
                        id={`accordion-flush-body-${index + 1}`}
                        className=""
                        aria-labelledby={`accordion-flush-heading-${index + 1}`}
                      >
                        <RichText
                          data={answer}
                          enableGutter={false}
                          className={cn(
                            'py-5 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400',
                            '[&_a]:text-flowbite-primary [&_a]:no-underline [&_a:hover]:underline',
                          )}
                        />
                      </div>
                    )}
                  </Fragment>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
