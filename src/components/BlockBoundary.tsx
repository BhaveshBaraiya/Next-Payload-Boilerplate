import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function BlockBoundary({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <ErrorBoundary fallback={<div className="p-8 border border-red-200 bg-red-50 text-red-700">Failed to load: {title}</div>}>
      <Suspense fallback={<div className="animate-pulse h-64 bg-slate-100" />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}