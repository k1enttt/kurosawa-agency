import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import CategoriesNavbar from '@/components/CategoriesNavbar'
import Breadcrumb from '@/components/Breadcrumb'
import { Media } from '@/components/Media'
import HandshakeImage from '@/components/Images'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { pageNumber } = await paramsPromise
  const { category } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const news = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 6,
    page: sanitizedPageNumber,
    overrideAccess: false,
    where: {
      ...(category && category != 'all'
        ? {
            'categories.slug': {
              equals: category,
            },
          }
        : {}),
    },
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
  })

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
            <h1 className="text-4xl font-semibold text-dark">News</h1>
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
        {news?.page && news?.totalPages > 1 && (
          <Suspense>
            <Pagination slug="news" page={news.page} totalPages={news.totalPages} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Kurosawa News Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
