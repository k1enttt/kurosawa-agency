import { cn } from '@/utilities/ui'
import FaqLine from './FaqLine'

export const ClientFaqSection = ({
  backgroundColor,
  heading,
  questions,
}: {
  backgroundColor: string
  heading: string
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
      <div className="py-8 sm:py-16 container">
        <h2 className="mb-6 lg:mb-8 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white divide-line">
          {heading}
        </h2>

        <div
          id="accordion-flush"
          data-accordion="collapse"
          data-active-classes="bg-primary text-white dark:bg-primary text-white"
          data-inactive-classes="bg-white text-secondary"
          className="space-y-4"
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
    </section>
  )
}
