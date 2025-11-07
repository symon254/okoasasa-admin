// src/components/Header.jsx
import { Link } from '@tanstack/react-router'
import { Search, X } from 'lucide-react'
import { useStateContext } from '@/context/state-context'
import { cn } from '@/lib/utils'
import { HomeCartIcon, NotificationIcon } from '@/assets/icons'
import { UserDropdown } from '@/components/shared/UserDropdown'
import { Button } from '@/components/ui/button'
import logo from '@/assets/images/primaryLogoHorizontal.png'

export function Header() {
  const { activeItem, cartCount, getCartCount, searchTerm, setSearchTerm } =
    useStateContext()

  const cartItems = typeof cartCount === 'number' ? cartCount : getCartCount()

  const clearSearch = () => {
    if (!searchTerm) return
    setSearchTerm('')
  }

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

      {/* === MOBILE HEADER === */}

      <div className="flex lg:hidden items-center justify-between mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-3">
        <Link to="/" className="flex h-[35px] w-[130px] shrink-0">
          <img
            src={logo}
            srcSet={`${logo} 1x, ${logo} 2x`}
            alt="Okoa Sasa Logo"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </Link>

        <div className="flex items-center gap-5">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <div className="h-9 w-9 rounded-full flex items-center justify-center border-2 border-gray-200">
              <HomeCartIcon
                className="h-5 w-5 items-center"
                strokeWidth={1.5}
              />
            </div>
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                {cartItems}
              </span>
            )}
          </Link>

          <UserDropdown isMobile />
        </div>
      </div>

      {/* === MOBILE SEARCH BAR === */}
      <div className="border-t border-[#E8ECF4] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-3 lg:hidden">
        <div className="group relative flex items-center gap-3 rounded-3xl bg-[#F9FAFB] px-4 py-3 border transition-all duration-200 focus-within:border-[#F8971D] focus-within:ring-3 focus-within:ring-[#F8971D]/20 focus-within:bg-white">
          {/* Search Icon */}
          <Search className="h-5 w-5 text-[#A0A4AC] transition-colors group-focus-within:text-primary" />

          {/* Input Field */}
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search for Devices"
            className="flex-1 bg-transparent text-base text-[#111111] placeholder:text-[#A0A4AC] outline-none caret-primary"
          />

          {/* Clear Button */}
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-transparent bg-transparent text-[#A0A4AC] transition-all duration-200',
              searchTerm
                ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 hover:shadow-sm'
                : 'pointer-events-none opacity-0',
            )}
          >
            <X className="h-4" />
          </button>

          {/* Animated focus underline */}
          <div className="absolute inset-x-4 bottom-0 h-0.5 scale-x-0 bg-primary transition-transform duration-200 focus-within:scale-x-100 origin-left" />
        </div>
      </div>
    </header>
  )
}
