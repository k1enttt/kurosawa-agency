'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import { customTranslations as t } from 'custom-translations'
import { Config } from '@/payload-types'

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q'))
  const router = useRouter()
  const locale = useSearchParams().get('locale') as Config['locale'] | undefined

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <div className="border border-muted-foreground rounded-sm">
            <Input
              id="search"
              className="ps-10 bg-transparent"
              value={value ?? ''}
              onChange={(event) => {
                setValue(event.target.value)
              }}
              placeholder={t[locale || 'en'].search}
            />
          </div>
          <button type="submit" className="sr-only">
            submit
          </button>
        </div>
      </form>
    </div>
  )
}
