import React from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { Button } from '../CustomButton'
import { FormSelect } from '../Inputs/FormSelect'
import { FormTextarea } from '../Inputs/FormTextarea'
import { ExclamationIcon } from '@/assets/icons'

// Validation schema
const declineFormSchema = z.object({
  reason: z.string().min(1, 'Please select a reason for declining'),
  additionalNotes: z.string().optional(),
  notifyCustomer: z.boolean().default(true),
})

const DeclineLoanDialog = ({ isOpen, onClose, onConfirm }) => {
  const form = useForm({
    resolver: zodResolver(declineFormSchema),
    defaultValues: {
      reason: '',
      additionalNotes: '',
      notifyCustomer: true,
    },
  })

  const handleSubmit = (data) => {
    onConfirm(data)
    form.reset()
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  if (!isOpen) return null

  // Reason options for the select dropdown
  const reasonOptions = [
    { value: 'insufficient-income', label: 'Insufficient Income' },
    { value: 'poor-credit-history', label: 'Poor Credit History' },
    { value: 'high-debt-burden', label: 'High Debt Burden' },
    { value: 'incomplete-documentation', label: 'Incomplete Documentation' },
    { value: 'suspicious-activity', label: 'Suspicious Activity' },
    { value: 'policy-violation', label: 'Policy Violation' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {/* Header with Close Button */}
        <div className="flex justify-end items-center mb-4">
          <Button
            onClick={handleClose}
            size="sm"
            variant="outline"
            className="border-primary"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Title and Warning */}
        <div className="text-center mb-6">
          <div className="mx-auto w-[113px] h-[113px] bg-red-700 rounded-full flex items-center justify-center mb-4">
            <ExclamationIcon />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Decline Loan Request
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            This action cannot be undone
          </p>
        </div>

        {/* Decline Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Reason Select */}
            <FormSelect
              control={form.control}
              name="reason"
              label="Reason for declining"
              placeholder="Select a reason"
              options={reasonOptions}
            />

            {/* Additional Notes Textarea */}
            <FormTextarea
              control={form.control}
              name="additionalNotes"
              label="Additional notes (optional)"
              placeholder="Add any additional details..."
              minRows={3}
            />

            {/* Notify Customer Checkbox */}
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="notifyCustomer"
                {...form.register('notifyCustomer')}
                className="w-4 h-4 text-primary rounded focus:ring-primary focus:ring-1"
              />
              <label
                htmlFor="notifyCustomer"
                className="text-sm font-medium text-gray-900"
              >
                Notify customer about this decision
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex items-center justify-center gap-2 w-1/2 h-[46px] px-4 py-3 
                  border border-primary text-gray-700 rounded-3xl 
                  font-medium text-base hover:bg-gray-50 transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex items-center justify-center gap-2 w-1/2 h-[46px] px-4 py-3 
              bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
              text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
              >
                Decline Request
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default DeclineLoanDialog
