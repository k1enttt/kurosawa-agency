import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container py-8 lg:py-16 h-full">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            This page could not be found.
          </p>
          <Button asChild variant="default">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
