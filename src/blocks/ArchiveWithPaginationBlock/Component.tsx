import RichText from '@/components/RichText'
import type {
  Post,
  ArchiveWithPaginationBlock as ArchiveWithPaginationBlockProps,
} from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import BlogGrid from './BlogGrid'

export const ArchiveWithPaginationBlock: React.FC<
  ArchiveWithPaginationBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, populateBy, selectedDocs } = props

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
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
        {/* TODO: Đổi introContent thành Heading-text */}
        {introContent && (
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <RichText
              className="ms-0 max-w-[48rem] archieve-heading archieve-subheading"
              data={introContent}
              enableGutter={false}
            />
          </div>
        )}

        {/* BLog grid và Pagination */}
        <BlogGrid posts={posts} />
      </div>
    </section>
  )
}
