'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Card, CardPostData } from '@/components/Card'
import { cn } from '@/utilities/ui'
import { useEffect, useState } from 'react'
import { PageRange } from '@/components/PageRange'

const BlogGrid = ({ posts }: { posts: CardPostData[] }) => {
  const limit = 3
  const [currentPosts, setCurrentPosts] = useState<CardPostData[]>([])
  const [page, setPage] = useState<number>(1)
  let totalPages = Math.ceil(posts.length / limit)

  const paginatePosts = (posts: CardPostData[], postsPerPage: number, currentPage: number) => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return posts.slice(startIndex, endIndex)
  }

  useEffect(() => {
    setCurrentPosts(paginatePosts(posts, limit, page))
  }, [page])

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <>
      {/* Page range */}
      <div className="container mb-8">
        <PageRange collection="posts" currentPage={page} limit={limit} totalDocs={posts.length} />
      </div>
      {/* Post grid */}
      <div className={cn('grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8')}>
        {currentPosts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <Card
                key={index}
                className={cn(
                  'blog-image blog-title blog-subtitle blog-no-padding blog-category ',
                  'relative p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700',
                )}
                doc={result}
                relationTo="posts"
                showCategories
              />
            )
          }
          return null
        })}
      </div>
      <div className="container">
        {totalPages > 1 && page && (
          <div className={cn('mt-12')}>
            <PaginationComponent>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious disabled={!hasPrevPage} onClick={() => setPage(page - 1)} />
                </PaginationItem>

                {hasExtraPrevPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {hasPrevPage && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(page - 1)}>{page - 1}</PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                {hasNextPage && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(page + 1)}>{page + 1}</PaginationLink>
                  </PaginationItem>
                )}

                {hasExtraNextPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext disabled={!hasNextPage} onClick={() => setPage(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </PaginationComponent>
          </div>
        )}
      </div>
    </>
  )
}

export default BlogGrid
