import React from 'react'
import { X } from 'lucide-react'
import { QuizIcon } from '@/assets/icons'
import { Button } from '../CustomButton'

const ApproveLoanDialog = ({
  isOpen,
  onClose,
  onConfirm,
  customerName = 'John Kamau',
  loanAmount = 'KSH 15,000',
}) => { 
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
        <div className="flex  justify-end items-end h-6 mb-6">
          <Button onClick={onClose} size='sm' variant='outline' className='border-primary'>
            <X className='w-5 h-5'/>
          </Button>
        </div>
        {/* Header with Icon */}
        <div className="mx-auto w-[113px] h-[113px] bg-green-900 rounded-full flex items-center justify-center mb-4">
          <QuizIcon />
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Approve Loan Request
          </h2>
          <p className="text-sm text-gray-600">
            Approve this request and send to Safaricom?
          </p>
        </div>

        {/* Customer and Amount Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600">Customer</span>
            <span className="text-sm font-semibold text-gray-900">
              {customerName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Amount</span>
            <span className="text-sm font-semibold text-gray-900">
              {loanAmount}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 w-1/2 h-[46px] px-4 py-3 
              bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
              text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
          >
            Confirm & Send
          </Button>
          <Button
                      onClick={onClose}
                      variant="outline"
            className="flex items-center justify-center gap-2 w-1/2 h-[46px] px-4 py-3 
              border border-primary text-gray-700 rounded-3xl 
              font-medium text-base hover:bg-gray-50 transition-all"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApproveLoanDialog
