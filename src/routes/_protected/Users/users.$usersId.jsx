import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/Users/users/$usersId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/_Users/users/$usersId"!</div>
}
