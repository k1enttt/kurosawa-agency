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
import { Category, Config } from '@/payload-types'
import { customTranslations as t } from 'custom-translations'
import { useSearchParams } from 'next/navigation'

const BlogGrid = ({ posts, categories }: { posts: CardPostData[]; categories: Category[] }) => {
  const limit = 3
  const [postsState, setPostsState] = useState<CardPostData[]>(posts)
  const [totalPosts, setTotalPosts] = useState<number>(posts.length)
  const [currentPosts, setCurrentPosts] = useState<CardPostData[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(posts.length / limit))
  const [currentCategory, setCurrentCategory] = useState<number | null>(null)
  const locale = useSearchParams().get('locale') as Config['locale'] | undefined

  const getPostId = (post: CardPostData): number[] | undefined => {
    return post?.categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })
  }

  const filterPostsByCategory = (posts: CardPostData[], categoryId: number | null) => {
    let filtedPosts = posts
    let totalPages = Math.ceil(posts.length / limit)

    if (categoryId) {
      filtedPosts = posts.filter((post) => {
        const postCategoryIds = getPostId(post)
        return postCategoryIds?.includes(categoryId)
      })
      totalPages = Math.ceil(filtedPosts.length / limit)
    }

    return {
      posts: filtedPosts,
      totalPages,
    }
  }

  const paginatePosts = (posts: CardPostData[], postsPerPage: number, currentPage: number) => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return posts.slice(startIndex, endIndex)
  }

  useEffect(() => {
    setPostsState(posts)
  }, [posts])

  useEffect(() => {
    // Khi page thay đổi -> chuyển đến trang được yêu cầu
    const filteredPosts = filterPostsByCategory(postsState, currentCategory)
    setCurrentPosts(paginatePosts(filteredPosts.posts, limit, page))
  }, [page, postsState])

  useEffect(() => {
    // Khi category thanh đổi -> chuyển về trang 1
    const filteredPosts = filterPostsByCategory(postsState, currentCategory)
    setCurrentPosts(paginatePosts(filteredPosts.posts, limit, 1))
    setPage(1)
    setTotalPages(filteredPosts.totalPages)
    setTotalPosts(filteredPosts.posts.length)
  }, [currentCategory, postsState])

  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  return (
    <>
      {/* Categories Navbar */}
      <div className="mb-8">
        <nav className="py-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => setCurrentCategory(null)}
            className={cn(
              currentCategory == null ? 'category-selected' : 'category-unselected',
              'rounded-full px-6 py-2',
            )}
          >
            {t[locale || 'en'].allCategories}
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={cn(
                currentCategory === category.id ? 'category-selected' : 'category-unselected',
                'rounded-full px-6 py-2',
              )}
            >
              {category.title}
            </button>
          ))}
        </nav>
      </div>
      {/* Page range */}
      <div className="mb-8">
        <PageRange collection="posts" currentPage={page} limit={limit} totalDocs={totalPosts} />
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
