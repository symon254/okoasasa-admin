import { Minus, Plus } from 'lucide-react'
import { TrashIcon, TrashIconWhite } from '@/assets/icons'
import { formatCurrency } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function CartItem({
  id,
  image,
  title,
  name,
  price,
  quantity = 1,
  onQuantityChange,
  onRemove,
}) {
  const navigate = useNavigate()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleIncrement = () => {
    onQuantityChange?.(id, quantity + 1)
  }
  const handleDecrement = () =>
    quantity > 1 && onQuantityChange?.(id, quantity - 1)
  const handleRemoveClick = () => setShowDeleteDialog(true)
  const confirmRemove = () => {
    onRemove?.(id)
    setShowDeleteDialog(false)
  }
  const handleImageClick = () => navigate({ to: `/products/${id}` })

  return (
    <>
      <div className="w-full">
        {/* Desktop Layout - Only show on lg+ screens */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(260px,1fr)_minmax(110px,140px)_minmax(90px,120px)_auto] lg:items-center lg:gap-3 xl:grid-cols-[minmax(320px,1fr)_minmax(140px,180px)_minmax(120px,150px)_auto] xl:gap-4 2xl:grid-cols-[minmax(380px,1fr)_minmax(160px,200px)_minmax(140px,180px)_auto] 2xl:gap-6">
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <div
              onClick={handleImageClick}
              className="flex h-[80px] w-[80px] lg:h-[90px] lg:w-[90px] xl:h-[110px] xl:w-[110px] 2xl:h-[130px] 2xl:w-[139px] shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] p-2 lg:p-3 xl:p-4 2xl:p-[17px] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={image}
                alt={title}
                className="h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-2">
              <h3 className="text-base lg:text-lg font-semibold leading-[140%] text-black truncate">
                {title}
              </h3>
              <p className="text-sm lg:text-base font-normal leading-[140%] text-[#676D75] line-clamp-2 lg:line-clamp-3">
                {name}
              </p>
            </div>
          </div>

          {/* Unified Quantity Controls */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 lg:gap-2 xl:gap-3 h-[40px] sm:h-[44px]">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 rounded-full text-lg flex items-center justify-center mb-0.5"
                onClick={handleDecrement}
              >
                <Minus className="h-3 w-3 lg:h-3 lg:w-3 xl:h-4 xl:w-4 text-[#252525]" strokeWidth={1.75} />
              </Button>

              <span className="flex w-6 lg:w-6 xl:w-8 justify-center text-sm lg:text-sm xl:text-base 2xl:text-lg font-semibold text-[#252525]">
                {quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 rounded-full text-lg flex items-center justify-center"
                onClick={handleIncrement}
              >
                <Plus className="h-3 w-3 lg:h-3 lg:w-3 xl:h-4 xl:w-4 text-[#292D32]" strokeWidth={1.75} />
              </Button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-end">
            <div className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-right text-transparent text-base lg:text-lg xl:text-xl font-semibold capitalize leading-[140%]">
              {formatCurrency(price * quantity)}
            </div>
          </div>

          {/* Remove */}
          <div className="flex justify-end">
            <button
              onClick={handleRemoveClick}
              className="flex h-[30px] w-[30px] items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Remove item"
            >
              <TrashIcon
                className="h-[30px] w-[30px] text-[#F25E5E]"
                fill="#F25E5E"
              />
            </button>
          </div>
        </div>

        {/* Tablet Layout - Optimized for 768px-1023px */}
        <div className="hidden md:flex md:items-center md:justify-between md:gap-4 lg:hidden">
          {/* Product Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              onClick={handleImageClick}
              className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-xl bg-[#F9FAFB] p-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={image}
                alt={title}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h3 className="text-base font-semibold leading-[140%] text-black truncate">
                {title}
              </h3>
              <p className="text-sm font-normal leading-[140%] text-[#676D75] line-clamp-2">
                {name}
              </p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full flex items-center justify-center"
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3 text-[#252525]" strokeWidth={1.75} />
            </Button>
            <span className="flex w-8 justify-center text-sm font-semibold text-[#252525]">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full flex items-center justify-center"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3 text-[#292D32]" strokeWidth={1.75} />
            </Button>
          </div>

          {/* Price & Remove */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent text-lg font-semibold">
              {formatCurrency(price * quantity)}
            </div>
            <button
              onClick={handleRemoveClick}
              className="flex h-8 w-8 items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Remove item"
            >
              <TrashIcon className="h-5 w-5 text-[#F25E5E]" fill="#F25E5E" />
            </button>
          </div>
        </div>

        {/* Mobile Layout - Show only on mobile */}
        <div className="flex flex-col gap-3 sm:gap-4 md:hidden">
          {/* Product Info */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              onClick={handleImageClick}
              className="flex h-[59px] w-[67px] sm:h-[70px] sm:w-[78px] shrink-0 items-center justify-center rounded-[12px] bg-[#F9FAFB] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={image}
                alt={title}
                className="h-[51px] w-[51px] sm:h-[60px] sm:w-[60px] object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[6px] sm:gap-2">
              <h3 className="text-base sm:text-lg font-semibold leading-[140%] text-gray-900">
                {title}
              </h3>
              <p className="text-sm sm:text-base font-normal leading-[140%] text-[#676D75] line-clamp-2">
                {name}
              </p>
            </div>
          </div>

          {/* Quantity Section */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-base sm:text-lg font-semibold leading-[140%] text-black">
              Quantity
            </span>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handleIncrement}
                className="quantity-btn h-8 w-8 sm:h-10 sm:w-10"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-[#292D32]" strokeWidth={1.75} />
              </button>

              <span className="flex w-8 sm:w-10 justify-center text-base sm:text-lg font-semibold text-[#252525]">
                {quantity}
              </span>

              <button
                onClick={handleDecrement}
                className="quantity-btn h-8 w-8 sm:h-10 sm:w-10"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-[#252525]" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Subtotal & Delete */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-base sm:text-lg font-semibold leading-[140%] text-black">
              Subtotal
            </span>
            <div className="flex items-center justify-between">
              <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-lg sm:text-xl font-semibold leading-[140%] text-transparent">
                {formatCurrency(price * quantity)}
              </span>
              <button
                onClick={handleRemoveClick}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Remove item"
              >
                <TrashIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#F25E5E]" fill="#F25E5E" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#F8971D] to-[#EE3124] rounded-full flex items-center justify-center mb-4">
              <TrashIconWhite className="w-8 h-8" fill="white" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Remove Item from Cart?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove "{title}" from your cart?
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={confirmRemove}
                className="w-full h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl text-white font-medium text-base hover:opacity-90 transition-all"
              >
                Remove
              </Button>
              <Button
                onClick={() => setShowDeleteDialog(false)}
                variant="outline"
                className="w-full h-[46px] border border-[#F8971D] text-[#F8971D] rounded-[24px] font-medium text-base hover:bg-[#F8971D]/10 transition-all"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}