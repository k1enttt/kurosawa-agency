import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'
import { ClientFaqSection } from './Component.client'

export const FaqBlock: React.FC<FaqBlockProps> = (props) => {
  const { backgroundColor, heading, questions } = props

  return (
    <ClientFaqSection
      backgroundColor={backgroundColor || 'light'}
      heading={heading || ''}
      questions={questions}
    />
  )
}
