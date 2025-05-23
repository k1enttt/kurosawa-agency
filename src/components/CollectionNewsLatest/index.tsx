import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import Link from 'next/link'
import { customTranslations as t } from 'custom-translations'

export type Props = {
  posts: CardPostData[]
  locale: 'en' | 'vi' | 'ja' | undefined
}

export const CollectionNewsLatest: React.FC<Props> = (props) => {
  const { posts, locale } = props

  return (
    <div className={cn('grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8')}>
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <div key={index}>
              <Card
                className={cn(
                  'blog-image news-title blog-subtitle blog-no-padding blog-category mb-2 pointer-events-none',
                  'relative bg-transparent border-none',
                )}
                doc={result}
                relationTo="posts"
                showCategories={false}
                hasPublishedDate={true}
                hasAuthors={true}
              />

              <Link
                href={`/posts/${result.slug}`}
                className="text-primary text-sm font-semibold underline uppercase"
              >
                {t[locale || 'en'].readMore}
              </Link>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
