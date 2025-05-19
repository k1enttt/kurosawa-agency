import { cn } from '@/utilities/ui'
import React, { useMemo } from 'react'

import type { TableBlock as TableBlockProps } from '@/payload-types'

import Table from '@/components/Table'

export const TableBlock: React.FC<TableBlockProps> = (props) => {
  const { backgroundColor, heading, columns, hasHeader } = props

  const headingId = useMemo(
    () =>
      heading
        ?.replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase() || '',
    [heading],
  )

  const tableData =
    columns?.map((col) => {
      return { header: col.headerText || '', value: col.valueText || null }
    }) || []

  return (
    <section
      className={cn(backgroundColor == 'dark' ? 'bg-muted' : 'bg-white', 'dark:bg-gray-900')}
    >
      <div className="py-8 lg:py-16 container">
        <div className="mb-8 lg:mb-16">
          {heading && (
            <h2
              id={headingId}
              className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white divide-line"
            >
              {heading}
            </h2>
          )}
        </div>

        <Table data={tableData} hasHeader={hasHeader == 'yes'} />
      </div>
    </section>
  )
}
