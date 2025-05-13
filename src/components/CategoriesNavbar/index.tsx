'use client'
import { cn } from '@/utilities/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Args = {
  data: {
    id: number
    title: string
    slug?: string | null | undefined
  }[]
}

const CategoriesNavbar: React.FC<Args> = ({ data }: Args) => {
  const searchParams = useSearchParams()
  const [categoryParam, setCategoryParam] = useState<string | null>(searchParams.get('category'))
  const router = useRouter()

  const updateCategoryParam = (category: string | null) => {
    setCategoryParam(category)
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    const locale = url.searchParams.get('locale')
    let categories = url.searchParams.get('category')
    let newPathname = url.pathname

    // Chỉ chuyển đến trang 1 khi category thay đổi, nếu không thay đổi thì giữ nguyên số thứ tự trang
    if (categories !== categoryParam) {
      newPathname = url.pathname.replace(/\/page\/\d+/, '/page/1')
      categories = categoryParam
    }

    const newSearchParams = new URLSearchParams()

    if (categories) {
      newSearchParams.set('category', categories)
    }

    if (locale) {
      newSearchParams.set('locale', locale)
    }

    router.push(`${newPathname}?${newSearchParams.toString()}`)
  }, [categoryParam, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="container py-4 flex flex-col md:flex-row gap-y-8 justify-between items-start"
      >
        <nav className="flex flex-wrap items-center gap-4 order-2 md:order-1">
          <button
            onClick={() => updateCategoryParam(null)}
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
              onClick={() => updateCategoryParam(category.slug || null)}
              className={cn(
                categoryParam === category.slug ? 'category-selected' : 'category-unselected',
                'rounded-full px-6 py-2',
              )}
            >
              {category.title}
            </button>
          ))}
        </nav>
        <div className="relative w-full md:w-1/4 md:order-2 order-1">
          <input
            id="searchInput"
            className="w-full bg-transparent rounded-sm border border-border text-border"
            type="text"
            placeholder="Search"
          />
          <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center">
            <button
              onClick={() => {
                const inputElement = document.getElementById('searchInput') as HTMLInputElement
                const query = inputElement?.value || ''
                const url = new URL(window.location.href)
                const newSearchParams = new URLSearchParams(url.search)
                newSearchParams.set('q', query)
                router.push(`/search?${newSearchParams.toString()}`)
              }}
              className="h-8 w-8 flex justify-center items-center bg-primary rounded-sm"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1998 15.2L11.9998 12M11.9998 6.39999C11.9998 7.8852 11.4098 9.30958 10.3596 10.3598C9.3094 11.41 7.88502 12 6.3998 12C4.91459 12 3.49021 11.41 2.44001 10.3598C1.3898 9.30958 0.799805 7.8852 0.799805 6.39999C0.799805 4.91478 1.3898 3.49039 2.44001 2.44019C3.49021 1.38999 4.91459 0.799988 6.3998 0.799988C7.88502 0.799988 9.3094 1.38999 10.3596 2.44019C11.4098 3.49039 11.9998 4.91478 11.9998 6.39999Z"
                  stroke="#F2F2F2"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CategoriesNavbar
