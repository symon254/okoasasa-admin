import { createRootRoute } from '@tanstack/react-router'
import Layout from '@/container/Layout'
import ErrorPage from '@/container/ErrorPage'
import ProtectedNotFound from '@/container/ProtectedNotFound'

export const Route = createRootRoute({
  component: Layout,
  errorComponent: ErrorPage,
  notFoundComponent: ProtectedNotFound,
})
