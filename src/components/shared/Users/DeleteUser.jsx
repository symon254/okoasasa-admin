// DeleteUserDialog.jsx
import { UserDelIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const DeleteUserDialog = ({ open, onOpenChange, user, onConfirm }) => {
  const handleClose = () => {
    onOpenChange(false)
  }

  const handleConfirm = () => {
    onConfirm(user)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
        <div className="flex  justify-end items-end h-6 mb-6">
          <Button
            onClick={handleClose}
            size="sm"
            variant="outline"
            className="border-primary"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        {/* Warning Icon */}
        <div className="mx-auto w-[113px] h-[113px] bg-red-500 rounded-full flex items-center justify-center mb-4">
          <UserDelIcon />
        </div>

        <h2 className="text-xl font-bold mb-2 text-gray-900">Delete User</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete {user?.name}? This action cannot be
          undone and all their data will be permanently removed.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={handleClose}
            variant="outline"
            className="flex items-center justify-center gap-2 w-1/2 h-[46px] px-4 py-3 
                            border border-primary text-gray-700 rounded-3xl 
                            font-medium text-base hover:bg-gray-50 transition-all"
          >
            Cancel
          </Button>{' '}
          <Button
            onClick={handleConfirm}
            className="flex items-center justify-center gap-2 w-1/2 h-[46px] px-4 py-3 
                            bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                            text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserDialog
