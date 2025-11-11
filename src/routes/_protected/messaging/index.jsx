import { createFileRoute } from '@tanstack/react-router'
import MessagingInterface from '@/components/shared/messaging/Message'

export const Route = createFileRoute('/_protected/messaging/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='-mx-6 -my-6'><MessagingInterface/></div>
}
