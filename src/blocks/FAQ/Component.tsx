import React from 'react'

import type { FaqBlock as FaqBlockProps } from '@/payload-types'
import { ClientFaqSection } from './Component.client'

export const FaqBlock: React.FC<FaqBlockProps> = (props) => {
  const { introText, questions } = props

  return <ClientFaqSection introText={introText} questions={questions} />
}
