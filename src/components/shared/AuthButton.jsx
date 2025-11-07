import { useState } from 'react'
import { User } from 'lucide-react'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { useStateContext } from '@/context/state-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

export function AuthButton() {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user, isAuthenticated, logout } = useStateContext()

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1 rounded-3xl px-2 py-2 transition-colors hover:bg-gray-50 md:gap-2 md:px-4">
            <div className="flex items-center gap-1">
              <User className="h-5 w-5 md:h-6 md:w-6" />
              <span className="hidden text-base md:inline">Account</span>
            </div>
            <ChevronDown className="h-4 w-4 md:h-6 md:w-6" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">
                {user?.email || user?.phoneNumber || 'user@example.com'}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/orders" className="cursor-pointer">
              My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/change-password" className="cursor-pointer">
              Change Password
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-destructive"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowAuthDialog(true)}
        className="flex items-center gap-1 rounded-full px-2 py-2 transition-colors hover:bg-gray-50 md:px-3"
      >
        <User className="h-5 w-5 md:h-6 md:w-6" />
        <span className="hidden text-base md:inline">Account</span>
      </button>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </>
  )
}
