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
      document.body.classList.remove('font-meiryo')
      document.body.classList.add('font-inter')
    } else {
      document.body.classList.remove('font-inter')
      document.body.classList.add('font-meiryo')
    }
  }, [locale])
  return <React.Fragment />
}

export default PageClient
