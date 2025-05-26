import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
      'categories.slug': {
        equals: 'blog',
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blogs</h1>
        </div>
      </div>

      <div className="container mb-8">
        <Suspense fallback={<div>Loading...</div>}>
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </Suspense>
      </div>

      <div className="container">
        <CollectionArchive posts={posts.docs} />
      </div>

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Suspense>
            <Pagination slug="posts" page={posts.page} totalPages={posts.totalPages} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Kurosawa Posts`,
  }
}
