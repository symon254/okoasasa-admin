import React, { lazy, Suspense } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { ThemedSuspense, LoadingSpinner } from '@/components/shared/Loading'
import { useStateContext } from '@/context/state-context'
import Layout from '@/container/Layout'

/**
 * Lazy load helper with suspense fallback
 * Usage: const MyPage = lazyLoad(() => import('@/pages/MyPage'))
 */
export const lazyLoad = (fn) => (props) => (
  <Suspense fallback={<ThemedSuspense />}>
    {React.createElement(lazy(fn), props)}
  </Suspense>
)

/**
 * Protected Route Wrapper - Redirects to login if not authenticated
 */
export function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [isChecking, setIsChecking] = React.useState(true)

  React.useEffect(() => {
    setIsChecking(true)
    if (!isAuthenticated) {
      navigate({ to: '/' })
    }
    setIsChecking(false)
  }, [isAuthenticated, navigate])

  // Show loading spinner while checking auth status
  if (isChecking) {
    return <LoadingSpinner />
  }

  // If not authenticated, return null (navigation will happen in useEffect)
  if (!isAuthenticated) {
    return null
  }

  return children
}

/**
 * Root Layout - Simple outlet wrapper for top-level routes
 */
export function RootLayout() {
  return <Outlet />
}

/**
 * Protected Layout - Wraps authenticated routes with auth guard only (Layout comes from root)
 */
export function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  )
}

/**
 * Auth Layout - Simple outlet wrapper for authentication pages
 */
export function AuthLayout() {
  return <Outlet />
}

/** Public Layout (for /) */
export function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}