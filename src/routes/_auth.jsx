import { createFileRoute } from '@tanstack/react-router'
import { AuthLayout } from '@/config/route-helpers'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})
