import { createRootRoute } from '@tanstack/react-router'
import ErrorPage from '@/container/ErrorPage'
import ProtectedNotFound from '@/container/ProtectedNotFound'
import { RootLayout } from '@/config/route-helpers'

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: ErrorPage,
  notFoundComponent: ProtectedNotFound,
})
