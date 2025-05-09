'use client'

import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const getPageNameFromUrl = () => {
    const path = usePathname()
    return path.substring(path.lastIndexOf('/') + 1)
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
      <div>Home</div>
      <div>/</div>
      {pageName && <div>{formatPageName(pageName)}</div>}
    </div>
  )
}

export default Breadcrumb
