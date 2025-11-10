import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { LoginLogo } from '@/assets/icons'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel as FormFieldLabel,
  FormMessage,
} from '@/components/ui/form'
import { normalizeOtpValue } from '@/lib/validation'
import { cn } from '@/lib/utils'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useStateContext } from '@/context/state-context'

// OTP validation schema
const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
})

function OtpPage() {
  const navigate = useNavigate()
  const { login } = useStateContext()
  const [countdown, setCountdown] = React.useState(60)
  const [isResending, setIsResending] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  })

  const { control, formState } = form

  // Countdown timer effect
  React.useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const onSubmit = async (data) => {
    try {
      console.log('OTP verification attempted', data)

      // Handle OTP verification logic here
      // Example: Make API call to verify OTP
      // const response = await verifyOTP(data.otp)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // If successful, log the user in
      // Replace this with actual user data from your API response
      const userData = {
        id: '12345',
        email: 'usmanj***@gmail.com',
        name: 'User Name',
        // Add any other user fields you need
      }

      // Call login to update auth state
      login(userData)

      // Then redirect to dashboard
      navigate({ to: '/dashboard' })
    } catch (error) {
      console.error('OTP verification failed:', error)
      // You can show an error toast here
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)

    try {
      // Make API call to resend OTP
      console.log('Resending OTP...')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset countdown after successful resend
      setCountdown(60)

      // Clear the OTP input
      form.setValue('otp', '')

      console.log('OTP resent successfully')
    } catch (error) {
      console.error('Failed to resend OTP:', error)
      // You can show an error toast here
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="w-full space-x-6 flex justify-between p-6 min-h-screen bg-linear-to-br from-orange-500/8 to-white/8">
      <div className="w-full h-[745px] items-center flex justify-center">
        <div className="flex flex-col items-center space-y-2">
          <LoginLogo size={160} />
          <div className="w-[306px] space-y-2 h-[69px]">
            <div className="h-[39px]">
              <label className="text-[28px] leading-[140%] font-semibold text-[#252525] capitalize text-center font-['Public_Sans']">
                Back-Office Dashboard
              </label>
            </div>
            <div className="h-[22px]">
              <label className="text-base leading-[140%] font-normal text-[#676D75] text-center font-['Public_Sans']">
                Internal access for authorized staff only.
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[745px]">
        <div className="bg-white flex flex-col justify-between h-full rounded-3xl p-6">
          <div className="w-full h-[396px] space-y-8">
            <div className="h-20 space-y-2">
              <div className="h-[50px]">
                <label className="text-4xl leading-[140%] font-semibold text-[#252525] capitalize font-['Public_Sans']">
                  Verify OTP
                </label>
              </div>
              <div className="h-[22px]">
                <label className="text-base leading-[140%] font-medium text-[#676D75] font-['Public_Sans']">
                  Please verify the OTP code sent at usmanj***@gmail.com
                </label>
              </div>
            </div>
            <div className="h-[284px] space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="flex justify-center items-center my-8">
                    <FormField
                      control={control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-[344px]">
                          <FormControl>
                            <InputOTP
                              inputMode="numeric"
                              pattern="[0-9]*"
                              autoComplete="one-time-code"
                              maxLength={6}
                              value={field.value}
                              onChange={(value) =>
                                field.onChange(normalizeOtpValue(value))
                              }
                              className="w-full max-w-none"
                            >
                              <InputOTPGroup className="w-full justify-between gap-1 sm:gap-2 md:gap-3 flex-nowrap">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                  <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className={cn(
                                      'flex h-11 w-11  items-center justify-center rounded-[12px] sm:rounded-[10px] md:rounded-[12px]',
                                      'shrink-0 first:rounded-[12px] first:rounded-l-[12px] last:rounded-[12px] last:rounded-r-[12px]',
                                      'flex-1 max-w-11 sm:max-w-11 md:max-w-none',
                                      'border border-[#E8ECF4] bg-[#F9FAFB] text-base sm:text-lg font-medium leading-[1.4] font-["Public_Sans"] text-[#252525]',
                                      'placeholder:text-[#A0A4AC] transition-colors focus:border-[#F8971D] focus:ring-2 focus:ring-[#F8971D]/20 focus:outline-none',
                                    )}
                                  />
                                ))}
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage className="text-sm font-medium text-[#EE3124]" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full rounded-4xl"
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  </div>
                  <div>
                    <div className="flex items-center justify-center my-6 gap-3 w-full flex-wrap">
                      <span className="text-[#252525] text-sm font-normal leading-[140%] font-['Public_Sans']">
                        Didn't Receive the code?
                      </span>
                      {countdown > 0 ? (
                        <span className="text-sm font-medium leading-[140%] capitalize font-['Public_Sans'] bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                          Resend In
                          <span className="font-bold"> {countdown}</span>s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isResending || formState.isSubmitting}
                          className="text-sm font-semibold leading-[140%] capitalize font-['Public_Sans'] bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                          {isResending ? 'Resending...' : 'Resend Code'}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-3 w-full flex-wrap">
                      <Link to="/">
                        <span className="text-sm cursor-pointer font-medium leading-[140%] capitalize font-['Public_Sans'] bg-linear-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent">
                          Back to Login
                        </span>
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between text-center">
              <p className="text-xs text-gray-400">
                © Okoa Sasa 2025 - Internal Use Only
              </p>
              <div className="flex items-center justify-center gap-3">
                <button className="text-xs text-gray-400 hover:text-primary cursor-pointer transition underline">
                  Terms & Conditions
                </button>
                <button className="text-xs text-gray-400 hover:text-primary cursor-pointer transition underline">
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/otpPage')({
  component: OtpPage,
})
