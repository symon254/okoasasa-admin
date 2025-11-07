import React, { lazy, Suspense } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import { ThemedSuspense, LoadingSpinner } from '@/components/shared/Loading'
import { useStateContext } from '@/context/state-context'
import Layout from '@/container/Layout'
import { AuthDialog } from '@/components/shared'

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
 * Protected Route Wrapper - Shows auth dialog if not authenticated
 */
export function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()
  const [showAuthDialog, setShowAuthDialog] = React.useState(false)
  const [isChecking, setIsChecking] = React.useState(true)

  React.useEffect(() => {
    setIsChecking(true)
    if (!isAuthenticated) {
      setShowAuthDialog(true)
    }
    setIsChecking(false)
  }, [isAuthenticated])

  const handleAuthDialogClose = (open) => {
    setShowAuthDialog(open)
    if (!open && !isAuthenticated) {
      navigate({ to: '/' })
    }
  }

  // Show loading spinner while checking auth status
  if (isChecking) {
    return <LoadingSpinner />
  }

  // If not authenticated, show auth dialog with backdrop over home page
  if (!isAuthenticated) {
    return (
      <>
        <AuthDialogWrapper open={showAuthDialog} onOpenChange={handleAuthDialogClose} />
      </>
    )
  }

  return children
}

// Lazy load AuthDialog to avoid circular dependencies
function AuthDialogWrapper({ open, onOpenChange }) {
  return <AuthDialog open={open} onOpenChange={onOpenChange} />
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
      <Outlet />
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
