// src/components/Header.jsx
import { Link, useLocation } from '@tanstack/react-router'
import { HomeCartIcon, NotificationIcon } from '@/assets/icons'
import { UserDropdown } from '@/components/shared/UserDropdown'

export function Header() {
  const location = useLocation()

  // Get the active item from the URL pathname
  const getActiveItem = () => {
    const pathname = location.pathname

    // Remove leading slash and get first segment
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) return 'Dashboard'

    // Get first segment and format it
    const firstSegment = segments[0]

    // Capitalize first letter of each word (handle kebab-case)
    return firstSegment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const activeItem = getActiveItem()

  return (
    <header className="w-full h-20 px-6 py-6 border-b border-[#E8ECF4] bg-white">
      {/* === DESKTOP HEADER === */}
      <div className="hidden lg:flex items-center justify-between ">
        <div>
          <label className="text-2xl font-semibold leading-[140%] capitalize text-black font-['Public_Sans']">
            {activeItem}
          </label>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 lg:mx-6 xl:mx-8 max-w-[500px] lg:max-w-[600px] xl:max-w-[690px]"></div>

        {/* Cart + User */}
        <div className="flex items-center gap-4 lg:gap-4 xl:gap-4">
          <div className=" cursor-pointer w-11 h-11 p-3 border rounded-full bg-brand-bg-2">
            <NotificationIcon className="h-5 w-5" strokeWidth={1.5} />
          </div>

          {/* Desktop */}
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
