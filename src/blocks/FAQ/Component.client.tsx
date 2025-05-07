import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import FaqLine from './FaqLine'

export const ClientFaqSection = ({
  backgroundColor,
  introText,
  questions,
}: {
  backgroundColor: string
  introText:
    | {
        [k: string]: unknown
        root: {
          type: string
          children: { type: string; version: number; [k: string]: unknown }[]
          direction: ('ltr' | 'rtl') | null
          format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
          indent: number
          version: number
        }
      }
    | null
    | undefined
  questions:
    | {
        question: string
        answer?: {
          root: {
            type: string
            children: { type: string; version: number; [k: string]: unknown }[]
            direction: ('ltr' | 'rtl') | null
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
            indent: number
            version: number
          }
          [k: string]: unknown
        } | null
        id?: string | null
      }[]
    | null
    | undefined
}): React.ReactNode => {
  return (
    <section
      className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}
    >
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
                  <FaqLine key={index} index={index} question={question} answer={answer || null} />
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
