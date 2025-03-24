import { CollectionArchive } from '@/components/CollectionArchive'
import RichText from '@/components/RichText'
import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []
  let totalPages: number = 1

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      where: {
        _status: {
          equals: 'published',
        },
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              categories: {
                in: flattenedCategories,
              },
            }
          : {}),
      },
    })

    posts = fetchedPosts.docs
    totalPages = fetchedPosts.totalPages
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900" id={`block-${id}`}>
      <div className="py-8 lg:py-16 container">
        {introContent && (
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            {/* TODO: Style cho heading va subheading */}
            <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
          </div>
        )}
        <CollectionArchive posts={posts} totalPages={totalPages} />
      </div>
    </section>
  )
}
