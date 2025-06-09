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
    if (locale === 'vi') {
      document.body.classList.remove('font-meiryo', 'font-poppins')
      document.body.classList.add('font-beVietnamPro')
    } else if (locale === 'ja') {
      document.body.classList.remove('font-poppins', 'font-beVietnamPro')
      document.body.classList.add('font-meiryo')
    } else {
      document.body.classList.remove('font-meiryo', 'font-beVietnamPro')
      document.body.classList.add('font-poppins')
    }
  }, [locale])
  return <React.Fragment />
}

export default PageClient
