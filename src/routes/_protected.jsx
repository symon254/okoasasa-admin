import { createFileRoute } from '@tanstack/react-router'
import { ProtectedLayout } from '@/config/route-helpers'
import ProtectedNotFound from '@/container/ProtectedNotFound'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
  notFoundComponent: ProtectedNotFound,
})
