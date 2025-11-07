import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_request/request')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello!</div>
}
