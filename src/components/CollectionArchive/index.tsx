import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('grid gap-8 sm:grid-cols-2 lg:grid-cols-3')}>
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            // TODO: Style the image when media is not uploaded
            <Card
              key={index}
              className={cn(
                'blog-image blog-title blog-subtitle blog-no-padding',
                'p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700',
              )}
              doc={result}
              relationTo="posts"
              showCategories
            />
          )
        }

        return null
      })}
    </div>
  )
}
