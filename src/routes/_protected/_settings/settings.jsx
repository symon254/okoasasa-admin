import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_settings/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello!</div>
}
