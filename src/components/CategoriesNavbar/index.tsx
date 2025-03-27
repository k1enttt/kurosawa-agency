'use client'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CategoriesNavbar: React.FC = () => {
  const [categoryParam, setCategoryParam] = useState<string | null>(null)
  const router = useRouter()

  const updateCategoryParam = (category: string) => {
    setCategoryParam(category)
  }

  useEffect(() => {
    router.push(`/news${categoryParam ? `?category=${categoryParam}` : ''}`)
  }, [categoryParam, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <nav className="container py-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => updateCategoryParam('')}
            className={cn(
              !!categoryParam == false ? 'category-selected' : 'category-unselected',
              'rounded-full px-6 py-2',
            )}
          >
            All categories
          </button>
          <button
            onClick={() => updateCategoryParam('seminar')}
            className={cn(
              categoryParam == 'seminar' ? 'category-selected' : 'category-unselected',
              'rounded-full px-6 py-2',
            )}
          >
            Seminar
          </button>
          <button
            onClick={() => updateCategoryParam('newsletter')}
            className={cn(
              categoryParam == 'newsletter' ? 'category-selected' : 'category-unselected',
              'rounded-full px-6 py-2',
            )}
          >
            Newsletter
          </button>
          <button
            onClick={() => updateCategoryParam('blog')}
            className={cn(
              categoryParam == 'blog' ? 'category-selected' : 'category-unselected',
              'rounded-full px-6 py-2',
            )}
          >
            Blog
          </button>
          <button
            onClick={() => updateCategoryParam('recruitment')}
            className={cn(
              categoryParam == 'recruitment' ? 'category-selected' : 'category-unselected',
              'rounded-full px-6 py-2',
            )}
          >
            Recruitment
          </button>
        </nav>
      </form>
    </div>
  )
}

export default CategoriesNavbar
