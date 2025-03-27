import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const recruitments = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
      'categories.slug': {
        equals: 'recruitment',
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
        <div className="prose dark:prose-invert max-w-none flowbite-h2">
          <h2>Recruitment</h2>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={recruitments.page}
          limit={12}
          totalDocs={recruitments.totalDocs}
        />
      </div>

      <div className="container">
        <CollectionArchive posts={recruitments.docs} />
      </div>

      <div className="container">
        {recruitments.totalPages > 1 && recruitments.page && (
          <Pagination
            slug="recruitments"
            page={recruitments.page}
            totalPages={recruitments.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Kurosawa Recruitment`,
  }
}
