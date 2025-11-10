import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { z } from 'zod'

const editRequestSchema = z.object({
  id: z.string().min(1, 'Request ID is required'),
  name: z.string().min(1, 'Name is required'),
  employer: z.string().min(1, 'Employer is required'),
  device: z.string().min(1, 'Device is required'),
  loanAmount: z.string().min(1, 'Loan amount is required'),
  loanAmountNumeric: z.number().min(0, 'Loan amount must be positive'),
  status: z.enum(['Pending', 'Approved', 'Fulfilled', 'Declined'], {
    required_error: 'Status is required',
  }),
  createdDate: z.string().min(1, 'Created date is required'),
})

const EditRequestDialog = ({ open, onOpenChange, request, onSave }) => {
  const form = useForm({
    resolver: zodResolver(editRequestSchema),
    defaultValues: request || {
      id: '',
      name: '',
      employer: '',
      device: '',
      loanAmount: '',
      loanAmountNumeric: 0,
      status: 'Pending',
      createdDate: '',
    },
  })

  React.useEffect(() => {
    if (request && open) {
      form.reset({
        id: request.id,
        name: request.name,
        employer: request.employer,
        device: request.device,
        loanAmount: request.loanAmount,
        loanAmountNumeric: request.loanAmountNumeric,
        status: request.status,
        createdDate: request.createdDate,
      })
    }
  }, [request, open, form])

  const handleSubmit = (data) => {
    onSave({
      ...request,
      ...data,
    })
    onOpenChange(false)
  }

  const handleLoanAmountChange = (value) => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
    form.setValue('loanAmount', `${numericValue.toLocaleString()}`)
    form.setValue('loanAmountNumeric', numericValue)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Edit Request
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Request ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        placeholder="#REQ-00000"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="createdDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Created Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Customer Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter customer name"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Employer
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter employer name"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="device"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Device
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter device name"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="loanAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Loan Amount (KES)
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => handleLoanAmountChange(e.target.value)}
                        className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        placeholder="0 KES"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                        <SelectItem value="Declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 h-12 border border-orange-500 text-orange-500 rounded-2xl hover:bg-orange-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-b from-[#F8971D] to-[#EE3124] text-white rounded-2xl hover:opacity-90 transition-opacity"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditRequestDialog
