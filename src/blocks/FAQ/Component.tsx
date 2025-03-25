import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'
import { ClientFaqSection } from './Component.client'

export const FaqBlock: React.FC<FaqBlockProps> = (props) => {
  const { backgroundColor, introText, questions } = props

  return (
    <ClientFaqSection
      backgroundColor={backgroundColor || 'light'}
      introText={introText}
      questions={questions}
    />
  )
}
