import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_Users/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello !

    <Link to="/users/123" params={{ id: '123' }} className="text-blue-500 underline">
  Test Route
</Link>
  </div>
}
