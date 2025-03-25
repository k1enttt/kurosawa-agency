'use client'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Fragment, useEffect } from 'react'
import { initAccordions } from 'flowbite'

const FaqLine = ({
  index,
  question,
  answer,
}: {
  index: number
  question: string
  answer: DefaultTypedEditorState | null
}) => {
  useEffect(() => {
    initAccordions()
  })

  return (
    <Fragment>
      <h3 id={`accordion-flush-heading-${index + 1}`}>
        <button
          className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          data-accordion-target={`#accordion-flush-body-${index + 1}`}
          aria-expanded="true"
          aria-controls={`accordion-flush-body-${index + 1}`}
          suppressHydrationWarning
        >
          <span>{question}</span>
          <svg
            data-accordion-icon=""
            className="w-6 h-6 shrink-0"
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
          suppressHydrationWarning
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
}

export default FaqLine
