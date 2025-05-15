import { CollectionNewsLatest } from '@/components/CollectionNewsLatest'
import type { Post, LastestNews as LastestNewsProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const LastestNewsBlock: React.FC<
  LastestNewsProps & {
    id?: string
  }
> = async (props) => {
  const { id, sectionHeading } = props

  const limit = 3

  let posts: Post[] = []

  const payload = await getPayload({ config: configPromise })

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit,
    sort: '-createdAt',
    where: {
      _status: {
        equals: 'published',
      },
      'categories.slug': {
        equals: 'newsletter',
      },
    },
  })

  posts = fetchedPosts.docs

  return (
    <section className="bg-white dark:bg-gray-900" id={`block-${id}`}>
      <div className="py-8 lg:py-16 container space-y-7">
        <h2 className="text-3xl font-semibold">{sectionHeading}</h2>
        <div className="h-1 w-12 rounded-sm bg-primary"></div>
        <CollectionNewsLatest posts={posts} />
      </div>
    </section>
  )
}
