import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'
import CategoriesNavbar from '@/components/CategoriesNavbar'
import Breadcrumb from '@/components/Breadcrumb'
import { Media } from '@/components/Media'
import HandshakeImage from '@/components/Images'
import { customTranslations } from 'custom-translations'
import { Config } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  const category = searchParams.category
  const locale = searchParams.locale as Config['locale'] | undefined
  const payload = await getPayload({ config: configPromise })

  const news = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    where: {
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
    locale,
  })

  const existedCategories = await payload.find({
    collection: 'categories',
    depth: 1,
    overrideAccess: false,
    where: {
      parent: {
        exists: false,
      },
    },
    select: {
      title: true,
      slug: true,
    },
    locale,
  })

  const t = customTranslations

  return (
    <div>
      <PageClient />

      <div
        className="relative flex items-center justify-center text-white py-20 mb-8"
        data-theme="light"
      >
        <div className="container z-10 relative flex items-center justify-start">
          <div className="max-w-[36.5rem] space-y-2">
            <Breadcrumb />
            <h1 className="text-4xl font-semibold text-dark">
              {t[(locale as 'en' | 'ja' | 'vi') || 'en'].news}
            </h1>
          </div>
        </div>
        <div className="absolute inset-0 select-none bg-white/90">
          <Media fill imgClassName="-z-10 object-cover" priority src={HandshakeImage} />
        </div>
      </div>

      <div className="mb-8">
        <Suspense>
          <CategoriesNavbar data={existedCategories.docs} />
        </Suspense>
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
          <Suspense>
            <Pagination slug="news" page={news.page} totalPages={news.totalPages} />
          </Suspense>
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
