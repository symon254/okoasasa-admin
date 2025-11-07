import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import React, { useState, useMemo } from 'react'
import { ErrorAlertDialog } from '../Dialog'
import { useStateContext } from '@/context/state-context'
import { AmountInput, parseCurrencyValue } from '../Inputs/FormAmount'
import { RepaymentPeriodSlider } from '../Inputs/FormSlider'
import { FileUpload } from '../Inputs/FormUpload'

const DEFAULT_TENURE = 13

const loanLimitSchema = z
  .object({
    basicPay: z
      .string()
      .min(1, 'Basic pay is required')
      .refine((value) => parseCurrencyValue(value) > 0, {
        message: 'Basic pay must be greater than zero',
      }),
    netPay: z
      .string()
      .min(1, 'Net pay is required')
      .refine((value) => parseCurrencyValue(value) > 0, {
        message: 'Net pay must be greater than zero',
      }),
    tenure: z.preprocess(
      (val) => val ?? DEFAULT_TENURE,
      z
        .number()
        .min(6, 'Minimum repayment period is 6 months')
        .max(24, 'Maximum repayment period is 24 months'),
    ),
    payslip: z.any().refine((file) => file !== null && file !== undefined, {
      message: 'Please upload your latest payslip',
    }),
  })
  .refine(
    (data) => {
      const basicPay = parseCurrencyValue(data.basicPay)
      const netPay = parseCurrencyValue(data.netPay)
      return netPay <= basicPay
    },
    {
      message: 'Net pay cannot be greater than basic pay',
      path: ['netPay'],
    },
  )

export default function CheckLoanLimitPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const { saveCheckoutFormData, getCheckoutFormData, cartProducts } =
    useStateContext()

  const savedData = getCheckoutFormData(1)

  const [open, setOpen] = useState(false)
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Calculate cart grand total
  const cartItems = cartProducts ?? []
  const grandTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
      return total + item.price * quantity
    }, 0)
  }, [cartItems])

  // Prepare default values
  const defaultValues = useMemo(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      return {
        basicPay: savedData.basicPay?.toString() || '',
        netPay: savedData.netPay?.toString() || '',
        tenure: savedData.tenure ?? DEFAULT_TENURE,
        payslip: savedData.payslip || null,
      }
    }
    return {
      basicPay: '',
      netPay: '',
      tenure: DEFAULT_TENURE,
      payslip: null,
    }
  }, [savedData])

  const form = useForm({
    resolver: zodResolver(loanLimitSchema),
    defaultValues,
  })

  // Reset form with saved data when component mounts
  React.useEffect(() => {
    if (savedData && Object.keys(savedData).length > 0) {
      form.reset({
        basicPay: savedData.basicPay?.toString() || '',
        netPay: savedData.netPay?.toString() || '',
        tenure: savedData.tenure ?? DEFAULT_TENURE,
        payslip: savedData.payslip || null,
      })
    }
  }, [savedData, form])

  // Get the current values for calculations
  const currentRepaymentPeriod = form.watch('tenure') ?? DEFAULT_TENURE
  const watchedBasicPay = form.watch('basicPay')
  const watchedNetPay = form.watch('netPay')

  const loanAmount = useMemo(() => {
    const tenure = currentRepaymentPeriod
    if (tenure <= 0) return 0

    const parsedBasicPay = parseCurrencyValue(watchedBasicPay)
    const parsedNetPay = parseCurrencyValue(watchedNetPay)
    const eligibleIncome = Math.min(parsedBasicPay, parsedNetPay)

    if (eligibleIncome <= 0) return 0

    const monthlyAllocation = eligibleIncome * 0.3
    const calculatedAmount = monthlyAllocation * tenure

    const roundedToNearestThousand = Math.round(calculatedAmount / 1000) * 1000
    return Math.max(0, roundedToNearestThousand)
  }, [watchedBasicPay, watchedNetPay, currentRepaymentPeriod])

  // Helper function to get file information
  const getFileInfo = (file) => {
    if (!file) return null
    
    // If file is already an object with the required structure, return it
    if (file.name && file.type && file.format && file.url) {
      return file
    }
    
    // If it's a File object, extract information
    if (file instanceof File) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
      const formatMap = {
        'pdf': 'pdf',
        'jpg': 'image',
        'jpeg': 'image',
        'png': 'image',
        'doc': 'document',
        'docx': 'document'
      }
      
      return {
        name: file.name,
        type: 'payslip', // or you can make this dynamic based on your needs
        format: formatMap[fileExtension] || 'document',
        url: URL.createObjectURL(file) // This creates a temporary blob URL
      }
    }
    
    return null
  }

  const onSubmit = async (data) => {
    // console.log('Form data:', data)

    try {
      // Prepare the document payload
      const documentPayload = []
      const payslipDocument = getFileInfo(data.payslip)
      
      if (payslipDocument) {
        documentPayload.push(payslipDocument)
      }

      // Prepare credit data
      const creditData = {
        basicSalary: parseCurrencyValue(data.basicPay),
        netSalary: parseCurrencyValue(data.netPay),
        tenure: data.tenure
      }

      // Prepare the complete payload
      const completePayload = {
        documents: documentPayload,
        creditData: creditData,
        calculatedLoanAmount: loanAmount,
        formData: data // Keep the original form data if needed
      }

      // Save form data with the complete payload
      saveCheckoutFormData(1, {
        ...data,
        calculatedLoanAmount: loanAmount,
        apiPayload: completePayload 
      })

      // Check if cart total exceeds loan limit
      if (grandTotal > loanAmount) {
        setErrorMessage(
          `Your cart total (KES ${grandTotal.toLocaleString()}) exceeds your loan limit (KES ${loanAmount.toLocaleString()}). Please adjust your cart or loan tenure.`,
        )
        setErrorModalOpen(true)
        return
      }

      // Proceed to next step
      onNext()

    } catch (error) {
      console.error('Error processing form submission:', error)
      setErrorMessage('An error occurred while processing your request. Please try again.')
      setErrorModalOpen(true)
    }
  }

  return (
    <div className="flex flex-col mb-[50px] items-center justify-center p-0 sm:p-0 gap-6">
      {/* Form Container */}
      <div className="bg-white w-full h-full rounded-4xl border border-gray-200 p-6 ">
        <div className="">
          <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
            Check Your Loan Limit
          </h1>
          <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
            Enter your details to check your loan eligibility.
          </p>
        </div>

        <div className="h-px bg-gray-300 my-4 sm:my-6"></div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Basic Pay and Net Pay */}
            <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 gap-4 sm:gap-[50px]">
              <AmountInput
                control={form.control}
                name="basicPay"
                label="Basic Pay"
                placeholder="Enter your Basic Pay"
              />

              <AmountInput
                control={form.control}
                name="netPay"
                label="Net Pay"
                placeholder="Enter your Net Pay"
              />
            </div>

            {/* Repayment Period Slider */}
            <RepaymentPeriodSlider
              control={form.control}
              name="tenure"
              label="Loan Tenure"
              min={6}
              max={24}
              defaultValue={DEFAULT_TENURE}
            />

            {/* Loan Qualification Info */}
            {loanAmount > 0 && (
              <div className="flex items-center gap-2 rounded-xl border border-[#F47120] bg-[#F47120]/8 p-3">
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-center text-sm font-normal leading-[140%] text-[#0D0B26]">
                    You qualify for a loan of KES {loanAmount.toLocaleString()},
                    payable within {currentRepaymentPeriod} months.
                  </p>
                  <p className="text-center text-xs font-normal leading-[140%] text-[#676D75]">
                    Cart Total:{' '}
                    <span
                      className={
                        grandTotal <= loanAmount
                          ? 'text-green-600'
                          : 'text-orange-500'
                      }
                    >
                      KES {grandTotal.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Upload Payslip */}
            <FileUpload
              control={form.control}
              name="payslip"
              label="Upload Latest Payslip"
              accept=".pdf,.jpg,.jpeg,.png"
              placeholder="Document Type"
            />
          </form>
        </Form>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 w-full max-w-full">
        <Button
          onClick={onPrevious}
          disabled={isFirstStep}
          type="button"
          variant={'outline'}
          className="flex justify-center items-center px-4 py-3 w-full sm:w-[146px] h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
        >
          Back
        </Button>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type="button"
          className="flex flex-row justify-center items-center px-4 py-3 gap-2.5 w-full sm:w-[193px] h-[46px] bg-linear-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 text-white rounded-3xl font-medium disabled:opacity-50"
        >
          Next: Personal Info
        </Button>
      </div>
      <ErrorAlertDialog
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
        primLink={'/cart'}
        primaryAction={{
          label: 'Adjust Cart',
          onClick: () => {
            setErrorModalOpen(false)
            onPrevious()
          },
        }}
        secondaryAction={{
          label: 'Adjust Tenure',
          onClick: () => {
            setErrorModalOpen(false)
          },
        }}
      />
    </div>
  )
}