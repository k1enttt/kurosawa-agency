import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import Breadcrumb from '@/components/Breadcrumb'
import { Media } from '@/components/Media'
import { FaqBlock } from '@/blocks/FAQ/Component'

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
      <div
        className="relative -mt-[6rem] flex items-center justify-center text-white py-20"
        data-theme="light"
      >
        <div className="container z-10 relative flex items-center justify-start">
          <div className="max-w-[36.5rem] space-y-2">
            <Breadcrumb />
            <h1 className="text-4xl font-semibold text-dark">Recruitment</h1>
          </div>
        </div>
        <div className="absolute inset-0 select-none bg-white/90">
          {/* <Media fill imgClassName="-z-10 object-cover" priority resource={media} /> */}
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

      <FaqBlock
        blockType="faq"
        questions={[
          {
            question: 'What is this?',
            answer: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'text',
                    text: 'A website for Kurosawa',
                    version: 1,
                  },
                ],
                direction: null,
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ]}
      />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Kurosawa Recruitment`,
  }
}
