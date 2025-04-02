'use client'
import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Args = {
  data: {
    id: number
    title: string
    slug?: string | null | undefined
  }[]
}

const CategoriesNavbar: React.FC<Args> = ({ data }: Args) => {
  const [categoryParam, setCategoryParam] = useState<string | null>(null)
  const router = useRouter()

  const updateCategoryParam = (category: string) => {
    setCategoryParam(category)
  }

  useEffect(() => {
    router.push(`${window.location.pathname}${categoryParam ? `?category=${categoryParam}` : ''}`)
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

          {data.map((category) => (
            <button
              key={category.id}
              onClick={() => updateCategoryParam(category.slug || '')}
              className={cn(
                categoryParam === category.slug ? 'category-selected' : 'category-unselected',
                'rounded-full px-6 py-2',
              )}
            >
              {category.title}
            </button>
          ))}
        </nav>
      </form>
    </div>
  )
}

export default CategoriesNavbar
