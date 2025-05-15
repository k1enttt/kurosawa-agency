'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const getPageNameFromUrl = () => {
    const path = usePathname()
    const segments = path.split('/').filter(Boolean)
    return segments.length > 0 ? segments[0] : ''
  }

  const formatPageName = (text: string) => {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const pageName = getPageNameFromUrl()
  return (
    <div className="text-xs font-semibold text-primary flex gap-1">
      <Link href="/">Home</Link>
      <div>/</div>
      {pageName && <div>{formatPageName(pageName)}</div>}
    </div>
  )
}

export default Breadcrumb
