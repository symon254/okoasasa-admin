import { createFileRoute } from '@tanstack/react-router'

function IndexPage() {
  return <div>rr</div>
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
