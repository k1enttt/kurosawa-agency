'use client'
import { Config } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { customTranslations as t } from 'custom-translations'

const defaultLabels = {
  plural: 'Docs',
  singular: 'Doc',
}

const defaultCollectionLabels = {
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: keyof typeof defaultCollectionLabels
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural: _plural, singular: _singular } =
    collectionLabelsFromProps ||
    (collection ? defaultCollectionLabels[collection] : undefined) ||
    defaultLabels ||
    {}

  const locale = useSearchParams().get('locale') as Config['locale'] | undefined

  const traslations = t[locale || 'en'].pageRange
  const pageRangeString = `${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''}`

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {/* Tiếng Anh, Tiếng Việt */}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        locale !== 'ja' &&
        locale !== 'zh' &&
        `${traslations.showing} ${pageRangeString} ${traslations.of} ${totalDocs} ${
          totalDocs > 1 ? traslations.posts : traslations.post
        }`}
      {/* Tiếng Nhật */}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        locale == 'ja' &&
        `${totalDocs}件中${pageRangeString}件${traslations.of}${
          totalDocs > 1 ? traslations.posts : traslations.post
        }を${traslations.showing}`}
      {/* Tiếng Trung */}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        locale == 'zh' &&
        `${traslations.showing}第 ${pageRangeString} 条, ${traslations.of} ${totalDocs} ${
          totalDocs > 1 ? traslations.posts : traslations.post
        } 条${traslations.posts}`}
    </div>
  )
}
