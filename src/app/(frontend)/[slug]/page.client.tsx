'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const searchParams = useSearchParams()
  const locale = searchParams.get('locale') || 'en'

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  useEffect(() => {
    if (locale != 'ja') {
      document.body.style.fontFamily = 'var(--font-tahoma)'
    } else {
      document.body.style.fontFamily = 'var(--font-meiryo)'
    }
  }, [searchParams])
  return <React.Fragment />
}

export default PageClient
