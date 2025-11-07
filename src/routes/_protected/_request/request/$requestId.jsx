import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_request/request/$requestId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/_request/$requestId"!</div>
}
