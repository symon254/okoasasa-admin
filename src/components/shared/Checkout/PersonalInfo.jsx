import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  EmailIcon,
  PhoneIcon,
  SingleUserIcon,
  UserCardIcon,
  UserFileIcon,
  UserMsgIcon,
} from '@/assets/icons'
import { FormInput } from '../Inputs/FormInputs'
import { FormSelect } from '../Inputs/FormSelect'
import { PhoneInput } from '../Inputs/FormPhone'
import { useStateContext } from '@/context/state-context'
import React from 'react'

const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  nationalId: z
    .string()
    .min(1, 'National ID is required')
    .min(6, 'National ID must be at least 6 digits')
    .max(15, 'National ID must not exceed 15 digits')
    .regex(/^\d+$/, 'National ID must contain only numbers'),
  employer: z.string().min(1, 'Please select an employer'),
  employeeNumber: z.string().min(1, 'Employee number is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (value) => {
        if (!value || value.trim() === '') return false

        const cleaned = value.replace(/\s/g, '')

        if (cleaned.startsWith('+254')) {
          return cleaned.length === 13 && /^\+254\d{9}$/.test(cleaned)
        }

        if (cleaned.startsWith('0')) {
          return cleaned.length === 10 && /^0\d{9}$/.test(cleaned)
        }

        return false
      },
      {
        message: 'Please enter a valid kenyan phone number',
      },
    ),
})

export default function PersonalInfoForm({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData } = useStateContext()

  const savedData = getCheckoutFormData(2)

  // Initialize form with savedData directly in defaultValues
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: React.useMemo(
      () => ({
        fullName: savedData?.fullName || '',
        nationalId: savedData?.nationalId || '',
        employer: savedData?.employer || '',
        employeeNumber: savedData?.employeeNumber || '',
        email: savedData?.email || '',
        phoneNumber: savedData?.phoneNumber || '',
      }),
      [],
    ), // Empty dependency array - only run once on mount
  })

  const companyOptions = [
    { value: 'company1', label: 'Company One' },
    { value: 'company2', label: 'Company Two' },
    { value: 'company3', label: 'Company Three' },
    { value: 'company4', label: 'Company Four' },
  ]

  // Remove the useEffect that was causing the infinite loop
  // If you need to update form when savedData changes, use this instead:
  React.useEffect(() => {
    if (savedData) {
      // Only reset if there are actual changes to avoid unnecessary updates
      const currentValues = form.getValues()
      const hasChanges = Object.keys(savedData).some(
        (key) => savedData[key] !== currentValues[key],
      )

      if (hasChanges) {
        form.reset({
          fullName: savedData.fullName || '',
          nationalId: savedData.nationalId || '',
          employer: savedData.employer || '',
          employeeNumber: savedData.employeeNumber || '',
          email: savedData.email || '',
          phoneNumber: savedData.phoneNumber || '',
        })
      }
    }
  }, [savedData, form])

  const onSubmit = (data) => {
    // console.log('Form data:', data)
    
    // Structure the data according to the customer object requirements
    const customerPayload = {
      customer: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        employer: data.employer,
        employeeNumber: data.employeeNumber
      },
      nationalId: data.nationalId,
      formData: data
    }

   
    saveCheckoutFormData(2, {
      ...data, 
      apiPayload: customerPayload 
    })

    onNext()
  }

  return (
    <div className="flex flex-col items-center justify-center p-0 mb-[50px] sm:p-0 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 w-full">
        <div className="w-full">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
              Personal Info
            </h2>
            <p className="text-gray-500 text-sm">
              Fill in your personal details
            </p>
          </div>

          <div className="h-px bg-gray-300 my-4 sm:my-6"></div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px]">
                <FormInput
                  control={form.control}
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter your Full Name"
                  icon={SingleUserIcon}
                />
                <FormInput
                  control={form.control}
                  name="nationalId"
                  label="National ID Number"
                  placeholder="Enter ID Number (6-15 digits)"
                  type="text"
                  icon={UserFileIcon}
                  numbersOnly={true}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px]">
                <FormSelect
                  control={form.control}
                  name="employer"
                  label="Employer"
                  placeholder="Employer Name"
                  options={companyOptions}
                  icon={UserCardIcon}
                />

                <FormInput
                  control={form.control}
                  name="employeeNumber"
                  label="Employee Number"
                  placeholder="OKOA085"
                  icon={UserMsgIcon}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[50px]">
                <FormInput
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  icon={EmailIcon}
                />

                <PhoneInput
                  control={form.control}
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="+254712345678 or 0712345678"
                  icon={PhoneIcon}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant="outline"
          className="flex justify-center items-center px-4 py-3 w-full sm:w-[193px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLastStep}
          type="button"
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[193px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Delivery Details
        </Button>
      </div>
    </div>
  )
}