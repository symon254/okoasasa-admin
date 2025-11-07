import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useStateContext } from '@/context/state-context'

export const Route = createFileRoute('/_auth/signin')({
  component: SigninPage,
})

function SigninPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' })
    } else {
      navigate({ to: '/', search: { auth: 'login' } })
    }
  }, [isAuthenticated, navigate])

  return null
}
