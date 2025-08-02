import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { customTranslations } from 'custom-translations'
import { Config } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    q: string
    locale: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query, locale } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
  const typedLocale = locale as Config['locale'] | undefined

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    locale: typedLocale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  const t = customTranslations

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center flowbite-h2">
          <h2 className="mb-8 lg:mb-16">{t[(locale as 'en' | 'ja' | 'vi') || 'en'].search}</h2>

          <div className="max-w-200 mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <Search />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="container">
        {posts.totalDocs > 0 ? (
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        ) : (
          <div className="container">No results found.</div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Kurosawa Search`,
  }
}
