import { useState } from 'react'
import { Box, ChevronDown, ChevronUp, List, User } from 'lucide-react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { useStateContext } from '@/context/state-context'
import { useAccountStore } from '@/data/accountStore'
import { AuthDialog } from '@/components/shared/AuthDialog'
import { Button } from '@/components/ui/button'
import { BoxWhiteIcon, ProfileIcon, LogoutIcon, ListIcon } from '@/assets/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import logo from '@/assets/images/primaryLogoHorizontal.png'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const MobileSeparatedMenuItems = ({ onLogout }) => {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const listItems = [
    { path: '/orders', label: 'Order History', icon: BoxWhiteIcon },
    { path: '/profile', label: 'My Account', icon: ProfileIcon },
  ]

  const isActivePath = (path) =>
    currentPath === path || currentPath.startsWith(`${path}/`)

  return (
    <>
      {listItems.map(({ path, label, icon: Icon }, index) => {
        const isActive = isActivePath(path)
        const isFirst = index === 0

        return (
          <div key={path} className={cn('flex flex-col', isFirst && '-mt-4')}>
            {/* Separator only between items (not above first, not below last) */}
            {index > 0 && <Separator className="bg-gray-200 my-1 " />}

            <SheetClose asChild>
              <Link
                to={path}
                className={cn(
                  'group flex w-full items-center gap-3 px-4 py-2 font-sans text-base font-medium leading-[140%] rounded-lg transition-colors duration-150 h-auto justify-start',
                  isActive
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-[#252525] hover:bg-orange-50 hover:text-orange-600',
                )}
              >
                <Icon
                  className={cn(
                    'h-5 w-5 flex-shrink-0 transition-colors duration-150',
                    isActive
                      ? 'text-orange-600'
                      : 'text-[#252525] group-hover:text-orange-600',
                  )}
                />
                <span className="truncate">{label}</span>
              </Link>
            </SheetClose>
          </div>
        )
      })}

      {/* Separator before Log Out */}
      <Separator className="bg-gray-200 my-1 " />

      {/* Log Out */}
      <Button
        onClick={onLogout}
        variant="ghost"
        className={cn(
          'group mt-4 flex w-full items-center gap-3 px-4 py-2 font-sans text-base font-medium leading-[140%] text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 h-auto justify-start',
        )}
      >
        <LogoutIcon className="h-5 w-5 group-hover:scale-105 transition-transform" />
        <span>Log Out</span>
      </Button>
    </>
  )
}

export const MenuItems = ({ onLogout, onNavigate }) => {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const listItems = [
    { path: '/orders', label: 'Order History', icon: BoxWhiteIcon },
    { path: '/profile', label: 'My Account', icon: ProfileIcon },
  ]

  const isActivePath = (path) =>
    currentPath === path || currentPath.startsWith(`${path}/`)

  return (
    <nav className="flex flex-col w-full gap-1">
      {listItems.map(({ path, label, icon: Icon }) => {
        const isActive = isActivePath(path)
        return (
          <Link
            key={path}
            to={path}
            onClick={onNavigate}
            className={cn(
              'group flex w-full items-center gap-2 px-3 py-2 rounded-lg font-sans text-base font-medium leading-[140%] transition-colors duration-150 h-auto justify-start',
              isActive
                ? 'bg-orange-50 text-orange-600'
                : 'text-black hover:bg-orange-50 hover:text-orange-600',
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5 flex-shrink-0 transition-colors duration-150',
                isActive
                  ? 'text-orange-600'
                  : 'text-black group-hover:text-orange-600',
              )}
            />
            <span className="truncate">{label}</span>
          </Link>
        )
      })}

      <DropdownMenuSeparator className="my-2" />

      <Button
        onClick={onLogout}
        variant="ghost"
        className={cn(
          'group flex w-full items-center gap-2 px-3 py-2 rounded-lg font-sans text-base font-medium leading-[140%] transition-colors duration-150 h-auto justify-start mt-2',
          'text-red-600 hover:bg-red-50 active:scale-[0.98]',
        )}
      >
        <LogoutIcon className="h-5 w-5 group-hover:scale-105 transition-transform" />
        <span>Log Out</span>
      </Button>
    </nav>
  )
}

const MobileSheet = ({ trigger, onLogout }) => {
  const { personalInfo } = useAccountStore()

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent
        side="right"
        className="w-[300px] p-0 bg-white flex flex-col"
        hideCloseButton
      >
        {/* Your Custom Close Button */}
        <SheetClose asChild>
          <button
            className="absolute right-5 top-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 z-10"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-[#09244B]" />
            <span className="sr-only">Close</span>
          </button>
        </SheetClose>

        {/* Logo */}
        <div className="p-6 pb-4">
          <img
            className="h-7 w-auto"
            src={logo}
            srcSet={`${logo} 1x, ${logo} 2x`}
            alt="Okoa Sasa Logo"
            loading="lazy"
            decoding="async"
          />
        </div>
        <Separator className="bg-gray-200" />

        {/* User Info */}
        <div className="px-6 py-5 flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
            <AvatarImage
              src={personalInfo.avatar || '/avator.png'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="bg-brand-bg-2 text-sm font-medium">
              {personalInfo.firstName?.[0]}
              {personalInfo.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-sans text-base font-medium leading-[140%] text-[#252525]">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
            <p className="font-sans text-sm font-normal leading-[140%] text-[#252525]">
              {personalInfo.email}
            </p>
          </div>
        </div>
        <Separator className="bg-gray-200" />

        {/* Menu Items */}
        <div className="px-2 py-2 space-y-0 flex-1 overflow-y-auto">
          <MobileSeparatedMenuItems onLogout={onLogout} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function UserDropdown({ isMobile = false }) {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const { user, isAuthenticated, logout } = useStateContext()
  const { personalInfo } = useAccountStore()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/' })
  }

  /* ---------- NOT LOGGED IN mobile ---------- */
  if (!isAuthenticated || !user) {
    if (isMobile) {
      return (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="p-0"
            onClick={() => setShowAuthDialog(true)}
          >
            <Avatar className="h-9 w-9 ring-2 ring-white ">
              <AvatarFallback className="bg-brand-bg-2  text-sm font-medium">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
        </>
      )
    }

    return (
      <>
        <button
          onClick={() => setShowAuthDialog(true)}
          className="flex items-center gap-1 md:gap-2"
        >
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand-bg-2">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden text-base leading-[140%] md:inline">
            Account
          </span>
          <ChevronDown className="hidden h-4 w-4 md:inline" />
        </button>
        <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      </>
    )
  }

  /* ---------- LOGGED IN ---------- */
  const avatar = (
    <Avatar
      className={
        isMobile ? 'h-9 w-9 ring-2 ring-white ' : 'h-8 w-8 ring-2 ring-white'
      }
    >
      <AvatarImage src={personalInfo.avatar || '/avator.png'} />
      <AvatarFallback className="bg-brand-bg-2 text-sm font-medium">
        {personalInfo.firstName?.[0]}
        {personalInfo.lastName?.[0]}
      </AvatarFallback>
    </Avatar>
  )

  /* ----- MOBILE ----- */
  if (isMobile) {
    return <MobileSheet trigger={avatar} onLogout={handleLogout} />
  }

  /* ----- DESKTOP ----- */
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200 cursor-pointer">
          <div className="overflow-hidden rounded-full">{avatar}</div>
          <div className="hidden md:flex flex-col items-start">
            <span className="font-sans text-base font-medium leading-[140%] text-[#252525]">
              {personalInfo.firstName}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 p-3 mt-2 rounded-2xl shadow-lg border border-gray-100 bg-white"
      >
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm overflow-hidden">
            <img
              src={personalInfo.avatar || '/avator.png'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-base font-medium leading-[140%] text-[#252525]">
              {personalInfo.firstName} {personalInfo.lastName}
            </span>
            <span className="font-sans text-sm font-normal leading-[140%] text-[#252525]">
              {personalInfo.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1" />
        <div className="space-y-1 px-1">
          <MenuItems onLogout={handleLogout} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
