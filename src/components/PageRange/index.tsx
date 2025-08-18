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

  const pageRangeText = t[locale || 'en'].pageRange

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        locale !== 'ja' &&
        `${pageRangeText.showing} ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} ${pageRangeText.of} ${totalDocs} ${
          totalDocs > 1 ? pageRangeText.posts : pageRangeText.post
        }`}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        locale == 'ja' &&
        `${totalDocs}件中${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''}件${pageRangeText.of}${
          totalDocs > 1 ? pageRangeText.posts : pageRangeText.post
        }を${pageRangeText.showing}`}
    </div>
  )
}
