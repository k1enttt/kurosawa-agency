import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import CategoriesNavbar from '@/components/CategoriesNavbar'

type Args = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const category = searchParams.category
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      _status: {
        equals: 'published',
      },
      ...(category
        ? {
            'categories.slug': {
              equals: category,
            },
          }
        : {}),
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const existedCategories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none flowbite-h2">
          <h2>News</h2>
        </div>
      </div>

      <div className="mb-8">
        <CategoriesNavbar data={existedCategories.docs} />
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={news.page}
          limit={12}
          totalDocs={news.totalDocs}
        />
      </div>

      <div className="container">
        <CollectionArchive posts={news.docs} />
      </div>

      <div className="container">
        {news.totalPages > 1 && news.page && (
          <Pagination slug="news" page={news.page} totalPages={news.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Kurosawa News`,
  }
}
