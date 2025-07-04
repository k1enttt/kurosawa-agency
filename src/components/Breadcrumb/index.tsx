/**
 * Breadcrumb component
 *
 * Hiển thị đường dẫn điều hướng (breadcrumb) cho trang web.
 * - Luôn hiển thị "Home" với link về trang chủ.
 * - Hiển thị tên trang hiện tại dựa trên segment đầu tiên của URL.
 * - Tự động format tên trang (chuyển từ dạng 'about-us' thành 'About Us').
 * - Sử dụng Next.js Link để điều hướng.
 *
 * Ví dụ:
 *   URL: /about-us => Home / About Us
 *   URL: /services/web-development => Home / Services
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const path = usePathname()
  const getPageNameFromUrl = (): string => {
    const segments = path.split('/').filter(Boolean)
    return segments.length > 0 ? segments[0] || '' : ''
  }

  const formatPageName = (text: string) => {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const pageName = getPageNameFromUrl()
  return (
    <div className="text-base font-semibold text-primary flex gap-1">
      <Link href="/">Home</Link>
      <div>/</div>
      {pageName && <div>{formatPageName(pageName)}</div>}
    </div>
  )
}

export default Breadcrumb
