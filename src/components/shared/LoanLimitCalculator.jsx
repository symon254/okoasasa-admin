import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, XIcon } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const TENURE_MIN = 6
const TENURE_MAX = 24
const DEFAULT_TENURE = 13
const MIN_PAY_AMOUNT = 1000
const MAX_PAY_AMOUNT = 10000000

const parseCurrencyValue = (value) => {
  if (!value) return 0
  const numericValue = Number(value.toString().replace(/[^\d]/g, ''))
  return Number.isNaN(numericValue) ? 0 : numericValue
}

const formatCurrencyInputValue = (value) => {
  const numericString = value.replace(/[^\d]/g, '')
  if (!numericString) return ''
  const numericValue = Number(numericString)
  return Number.isNaN(numericValue)
    ? ''
    : new Intl.NumberFormat('en-KE').format(numericValue)
}

const loanCalculatorSchema = z
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
    months: z
      .number()
      .int('Tenure must be a whole number of months')
      .min(TENURE_MIN, `Minimum tenure is ${TENURE_MIN} months`)
      .max(TENURE_MAX, `Maximum tenure is ${TENURE_MAX} months`),
  })
  .superRefine((values, ctx) => {
    const basicPayValue = parseCurrencyValue(values.basicPay)
    const netPayValue = parseCurrencyValue(values.netPay)

    if (basicPayValue > 0 && basicPayValue < MIN_PAY_AMOUNT) {
      ctx.addIssue({
        path: ['basicPay'],
        code: z.ZodIssueCode.custom,
        message: `Basic pay must be at least KES ${MIN_PAY_AMOUNT.toLocaleString(
          'en-KE',
        )}`,
      })
    }

    if (basicPayValue > MAX_PAY_AMOUNT) {
      ctx.addIssue({
        path: ['basicPay'],
        code: z.ZodIssueCode.custom,
        message: `Basic pay cannot exceed KES ${MAX_PAY_AMOUNT.toLocaleString(
          'en-KE',
        )}`,
      })
    }

    if (netPayValue > 0 && netPayValue < MIN_PAY_AMOUNT) {
      ctx.addIssue({
        path: ['netPay'],
        code: z.ZodIssueCode.custom,
        message: `Net pay must be at least KES ${MIN_PAY_AMOUNT.toLocaleString(
          'en-KE',
        )}`,
      })
    }

    if (netPayValue > MAX_PAY_AMOUNT) {
      ctx.addIssue({
        path: ['netPay'],
        code: z.ZodIssueCode.custom,
        message: `Net pay cannot exceed KES ${MAX_PAY_AMOUNT.toLocaleString(
          'en-KE',
        )}`,
      })
    }

    if (basicPayValue > 0 && netPayValue > basicPayValue) {
      ctx.addIssue({
        path: ['netPay'],
        code: z.ZodIssueCode.custom,
        message: 'Net pay cannot exceed basic pay',
      })
    }
  })

export function LoanLimitCalculator({ open, onOpenChange, onProceed }) {
  const form = useForm({
    resolver: zodResolver(loanCalculatorSchema),
    defaultValues: {
      basicPay: '',
      netPay: '',
      months: DEFAULT_TENURE,
    },
  })
  const { reset } = form
  const watchedBasicPay = form.watch('basicPay')
  const watchedNetPay = form.watch('netPay')
  const watchedMonths = form.watch('months')
  const loanAmount = useMemo(() => {
    const tenure = watchedMonths ?? 0
    if (tenure <= 0) return 0

    const parsedBasicPay = parseCurrencyValue(watchedBasicPay)
    const parsedNetPay = parseCurrencyValue(watchedNetPay)
    const eligibleIncome = Math.min(parsedBasicPay, parsedNetPay)

    if (eligibleIncome <= 0) return 0

    const monthlyAllocation = eligibleIncome * 0.3
    const calculatedAmount = monthlyAllocation * tenure

    const roundedToNearestThousand = Math.round(calculatedAmount / 1000) * 1000
    return Math.max(0, roundedToNearestThousand)
  }, [watchedBasicPay, watchedNetPay, watchedMonths])

  const currentTenure = watchedMonths ?? DEFAULT_TENURE

  const handleInputChange = (value, onChange) => {
    onChange(formatCurrencyInputValue(value))
  }

  const onSubmit = () => {
    if (loanAmount > 0) {
      onProceed?.(loanAmount)
    }
    onOpenChange?.(false)
    reset()
  }

  const handleSliderChange = (value, onChange) => {
    const [selectedValue] = value
    onChange(selectedValue ?? DEFAULT_TENURE)
  }

  const handleCancel = () => {
    reset()
    onOpenChange?.(false)
  }

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#252525]/20 backdrop-blur-[4px]" />
        <DialogPrimitive.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-6 rounded-3xl border bg-white px-[30px] pb-[34px] pt-8 shadow-lg duration-200">
          <DialogPrimitive.Close
            onClick={handleCancel}
            className="cursor-pointer absolute right-6 top-10 inline-flex h-5 w-5 md:right-[30px] md:top-[30px] opacity-70 items-center justify-center rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          >
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          <div className="flex flex-col gap-2">
            <DialogPrimitive.Title className="text-2xl font-semibold leading-[140%] capitalize text-[#252525]">
              Loan Limit Calculator
            </DialogPrimitive.Title>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex items-start gap-4">
                <FormField
                  control={form.control}
                  name="basicPay"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormLabel className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                        Basic Pay
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Basic Pay"
                          value={field.value ?? ''}
                          onChange={(event) =>
                            handleInputChange(
                              event.target.value ?? '',
                              field.onChange,
                            )
                          }
                          onBlur={field.onBlur}
                          fieldState={fieldState}
                          className={cn(
                            'h-10 rounded-xl bg-[#F9FAFB] px-4 py-3 text-sm leading-[140%] placeholder:text-[#A0A4AC] focus-visible:ring-0 focus-visible:ring-offset-0',
                            fieldState.error
                              ? 'border-destructive'
                              : 'border-[#E8ECF4]',
                          )}
                        />
                      </FormControl>
                      <div className="min-h-5 mt-1">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="netPay"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormLabel className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                        Net Pay
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your Net Pay"
                          value={field.value ?? ''}
                          onChange={(event) =>
                            handleInputChange(
                              event.target.value ?? '',
                              field.onChange,
                            )
                          }
                          onBlur={field.onBlur}
                          fieldState={fieldState}
                          className={cn(
                            'h-10 rounded-xl bg-[#F9FAFB] px-4 py-3 text-sm leading-[140%] placeholder:text-[#A0A4AC] focus-visible:ring-0 focus-visible:ring-offset-0',
                            fieldState.error
                              ? 'border-destructive'
                              : 'border-[#E8ECF4]',
                          )}
                        />
                      </FormControl>
                      <div className="min-h-5 mt-1">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="months"
                render={({ field, fieldState }) => (
                  <FormItem className="relative flex flex-col gap-3">
                    {/* Centered month badge with Loan Tenure label */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-base font-medium text-gray-900">
                        Loan Tenure
                      </p>
                      <div className="flex flex-row justify-center items-center px-3.5 py-2.5 gap-2.5 w-[104px] h-[38px] border border-[#F47120] rounded-full">
                        <p className="text-sm font-normal text-center text-[#333333]">
                          {field.value ?? DEFAULT_TENURE} Months
                        </p>
                      </div>
                      <div className="w-[104px]"></div>
                    </div>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <span className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                          Min {TENURE_MIN}
                        </span>
                        <div className="relative mt-0.5 w-full max-w-[307px]">
                          <Slider
                            value={[field.value ?? DEFAULT_TENURE]}
                            onValueChange={(value) =>
                              handleSliderChange(value, field.onChange)
                            }
                            min={TENURE_MIN}
                            max={TENURE_MAX}
                            step={1}
                            aria-invalid={fieldState.error ? 'true' : undefined}
                            className={cn(
                              'w-full [&_[data-slot=slider-track]]:h-3.5 [&_[data-slot=slider-track]]:rounded-full [&_[data-slot=slider-track]]:border [&_[data-slot=slider-track]]:border-black/[0.06] [&_[data-slot=slider-track]]:bg-[#F5F5F5] [&_[data-slot=slider-range]]:bg-gradient-to-b [&_[data-slot=slider-range]]:from-[#F8971D] [&_[data-slot=slider-range]]:to-[#EE3124] [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border [&_[data-slot=slider-thumb]]:border-black/15 [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:shadow-[0_6px_14px_0_rgba(0,0,0,0.15)]',
                              fieldState.error &&
                                '[&_[data-slot=slider-track]]:border-destructive [&_[data-slot=slider-thumb]]:border-destructive [&_[data-slot=slider-thumb]]:ring-destructive/20',
                            )}
                          />
                        </div>
                        <span className="text-base font-normal leading-[140%] capitalize text-[#252525]">
                          Max {TENURE_MAX}
                        </span>
                      </div>
                    </FormControl>
                    <div className="mt-1 min-h-5">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2 rounded-xl border border-[#F47120] bg-[#F47120]/8 p-3">
                <div className="flex flex-col items-start justify-center gap-1">
                  <p className="text-center text-sm font-normal leading-[140%] text-[#0D0B26]">
                    You qualify for a loan of KES {loanAmount.toLocaleString()},
                    payable within {currentTenure} months.
                  </p>
                </div>
              </div>

              <p className="text-center text-base font-medium leading-[140%] text-[#676D75]">
                Would you like to see devices within your loan limit range (Max.
                KES {loanAmount.toLocaleString()})?
              </p>

              <div className="flex items-start gap-6">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant={'outlineGradient'}
                  className="flex-1 rounded-3xl px-4 py-3 text-base font-medium leading-[140%] capitalize hover:opacity-90"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loanAmount <= 0}
                  className="flex-1 rounded-3xl border border-[#F8971D] bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-4 py-3 text-base font-medium leading-[140%] capitalize text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Proceed to devices
                </Button>
              </div>
            </form>
          </Form>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

export default LoanLimitCalculator
