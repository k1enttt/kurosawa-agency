import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16"></div>
    </div>
  )
}
