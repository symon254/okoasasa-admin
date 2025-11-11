// Users page component
import { createFileRoute } from '@tanstack/react-router'
import { AddFillIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import UsersTable from '@/components/shared/Users/UsersTable'
import { useState } from 'react'
import AddUserDialog from '@/components/shared/Users/AddUser'

export const Route = createFileRoute('/_protected/Users/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newUsers, setNewUsers] = useState([])

  const handleAddUser = (userData) => {
    // Generate a new user with ID and default values
    const newUser = {
      id: Math.floor(Math.random() * 1000) + 7, // Generate unique ID
      ...userData,
      lastActive: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      status: 'Active'
    }
    
    // Add to new users array (this will be passed to UsersTable)
    setNewUsers(prev => [...prev, newUser])
    setShowAddDialog(false)
  }

  return (
    <div className='space-y-8'>
      <div className="w-full flex justify-end items-end">
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="flex cursor-pointer flex-row justify-center items-center px-4 py-3 gap-2.5 w-[132px] h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl flex-none order-1 grow-0"
        >
          <AddFillIcon />{' '}
          <span className="w-[70px] h-[22px] font-medium text-base leading-[140%] capitalize text-white flex-none order-1 grow-0">
            Add User
          </span>
        </Button>
      </div>
      <div>
        <UsersTable newUsers={newUsers} />
      </div>

      {/* Add User Dialog */}
      <AddUserDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleAddUser}
      />
    </div>
  )
}