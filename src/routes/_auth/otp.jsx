import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useStateContext } from '@/context/state-context'

export const Route = createFileRoute('/_auth/otp')({
  component: OTPPage,
})

function OTPPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useStateContext()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' })
    } else {
      navigate({ to: '/', search: { auth: 'otp' } })
    }
  }, [isAuthenticated, navigate])

  return null
}
