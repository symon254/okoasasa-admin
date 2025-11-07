import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '@/components/shared/Dashboard/Dashboard'

export const Route = createFileRoute('/_protected/_dashboard/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <Dashboard />

  )
}
