'use client'
import { cn } from '@/utilities/ui'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const CategoriesNavbar = () => {
  const [categoryParam, setCategoryParam] = useState<string | null>(null)
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params.toString())

  const updateCategoryParam = (category: string) => {
    setCategoryParam(category)
    searchParams.set('category', category)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newUrl)
  }

  useEffect(() => {
    setCategoryParam('all')
    searchParams.set('category', 'all')
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.pushState({}, '', newUrl)
  }, [])

  return (
    <nav className="container py-4 flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => updateCategoryParam('all')}
        className={cn(
          categoryParam == 'all' ? 'category-selected' : 'category-unselected',
          'rounded-full px-6 py-2',
        )}
      >
        All categories
      </button>
      <button
        type="button"
        onClick={() => updateCategoryParam('seminar')}
        className={cn(
          categoryParam == 'seminar' ? 'category-selected' : 'category-unselected',
          'rounded-full px-6 py-2',
        )}
      >
        Seminar
      </button>
      <button
        type="button"
        onClick={() => updateCategoryParam('newsletter')}
        className={cn(
          categoryParam == 'newsletter' ? 'category-selected' : 'category-unselected',
          'rounded-full px-6 py-2',
        )}
      >
        Newsletter
      </button>
      <button
        type="button"
        onClick={() => updateCategoryParam('blog')}
        className={cn(
          categoryParam == 'blog' ? 'category-selected' : 'category-unselected',
          'rounded-full px-6 py-2',
        )}
      >
        Blog
      </button>
      <button
        type="button"
        onClick={() => updateCategoryParam('recruitment')}
        className={cn(
          categoryParam == 'recruitment' ? 'category-selected' : 'category-unselected',
          'rounded-full px-6 py-2',
        )}
      >
        Recruitment
      </button>
    </nav>
  )
}

export default CategoriesNavbar
