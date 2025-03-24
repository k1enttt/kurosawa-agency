import { cn } from '@/utilities/ui'
import React from 'react'

import type { TableBlock as TableBlockProps } from '@/payload-types'

import Table from '@/components/Table'
import RichText from '@/components/RichText'

export const TableBlock: React.FC<TableBlockProps> = (props) => {
  const { introText, columns } = props

  const tableData =
    columns?.map((col) => {
      return { header: col.headerText || '', value: col.valueText || '' }
    }) || []

  return (
    <div className="container my-16">
      <div className="">
        {introText && (
          <RichText
            data={introText}
            enableGutter={false}
            className={cn(
              '[&_h2]:mb-4 [&_h2]:text-4xl [&_h2]:tracking-tight [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:dark:text-white',
              'font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400',
            )}
          />
        )}
        <Table data={tableData} />
      </div>
    </div>
  )
}
