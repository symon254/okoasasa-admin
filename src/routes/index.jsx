import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoginLogo } from '@/assets/icons'
import { FormInput } from '@/components/shared/Inputs/FormInputs'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import React from 'react'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

function IndexPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      console.log('Login attempted', { ...data, rememberMe })

      // Handle login logic here
      // Example: Make API call to authenticate user
      // const response = await loginUser(data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // If successful, redirect to OTP page
      navigate({ to: '/otpPage' })
    } catch (error) {
      console.error('Login failed:', error)
      // You can show an error toast here
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-between gap-6 p-6 bg-linear-to-br from-orange-500/8 to-white/8">
      {/* Left Section - Logo and Description */}
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <LoginLogo size={160} />
          <div className="max-w-[306px] space-y-2">
            <div>
              <label className="block text-[28px] leading-[140%] font-semibold text-[#252525] capitalize text-center font-['Public_Sans']">
                Back-Office Dashboard
              </label>
            </div>
            <div>
              <label className="block text-base leading-[140%] font-normal text-[#676D75] text-center font-['Public_Sans']">
                Internal access for authorized staff only.
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full flex items-stretch">
        <div className="bg-white flex flex-col justify-between w-full rounded-3xl p-6 min-h-[745px]">
          {/* Form Content */}
          <div className="w-full space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div>
                <label className="block text-4xl leading-[140%] font-semibold text-[#252525] capitalize font-['Public_Sans']">
                  Login
                </label>
              </div>
              <div>
                <label className="block text-base leading-[140%] font-medium text-[#676D75] font-['Public_Sans']">
                  Login now to access the dashboard
                </label>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div>
                    <FormInput
                      control={form.control}
                      labelClassName={`mb-[9px]`}
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                      icon={Mail}
                    />
                  </div>
                  <div>
                    <div className="relative">
                      <FormInput
                        control={form.control}
                        name="password"
                        labelClassName={`mb-[9px]`}
                        label="Password"
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        icon={Lock}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[32px] text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? (
                          <EyeOff className="w-6 h-6" />
                        ) : (
                          <Eye className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          Remember Me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-sm cursor-pointer text-black hover:text-primary font-medium transition"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full rounded-4xl"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full mt-8">
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

export const Route = createFileRoute('/')({
  component: IndexPage,
})