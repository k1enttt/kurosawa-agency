import { cn } from '@/utilities/ui'
import React from 'react'

import type { CustomerBlock as CustomerBlockProps } from '@/payload-types'

export const CustomerBlock: React.FC<CustomerBlockProps> = (props) => {
  const { backgroundColor, sectionLabel, heading, customer1, customer2, customer3 } = props

  return (
    <div className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}>
      <div className="container py-8 lg:py-16">
        <div className="space-y-2 mb-9 flex flex-col items-center gap-1 text-center">
          <div className="h-2 w-12 bg-primary rounded-sm"></div>
          <div className="text-muted-foreground font-semibold">{sectionLabel}</div>
          <div className="text-2xl font-bold">{heading}</div>
        </div>

        {/* TODO: Giảm chiều rộng của các cột  */}
        <div className="grid grid-cols-3 gap-4">
          <div className="w-full text-center">
            <div className="text-[50px] leading-[50px] font-bold">{customer1?.textLarge}</div>
            <div className="text-muted-foreground font-semibold">{customer1?.textSmall}</div>
          </div>
          <div className="w-full text-center">
            <div className="text-[50px] leading-[50px] font-bold">{customer2?.textLarge}</div>
            <div className="text-muted-foreground font-semibold">{customer2?.textSmall}</div>
          </div>
          <div className="w-full text-center">
            <div className="text-[50px] leading-[50px] font-bold">{customer3?.textLarge}</div>
            <div className="text-muted-foreground font-semibold">{customer3?.textSmall}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
