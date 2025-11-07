import React, { useState, useEffect } from 'react'
import { Minus, Plus } from 'lucide-react'
import { TrashIcon, TrashIconWhite } from '@/assets/icons'
import { useStateContext } from '@/context/state-context'
import { useNavigate } from '@tanstack/react-router'
import { ErrorAlertDialog } from '../Dialog'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function OrderSummaryPage({
  onNext,
  onPrevious,
  isFirstStep,
  isLastStep,
}) {
  const navigate = useNavigate()
  const {
    cartProducts,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    resetCheckout,
    getCheckoutFormData,
    saveCheckoutFormData,
  } = useStateContext()
  const cartItems = cartProducts ?? []

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [errorModalOpen, setErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Fixed shipping fee
  const shippingFee = 100

  // Get loan limit data from checkout form
  const loanData = getCheckoutFormData(1)
  const loanLimit = loanData?.calculatedLoanAmount || 0

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
    return total + item.price * quantity
  }, 0)

  const grandTotal = subtotal + shippingFee

  // Check if cart exceeds loan limit
  const exceedsLoanLimit = grandTotal > loanLimit

  // Prepare orderLines payload
  const orderLines = cartItems.map((item) => {
    const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
    return {
      name: item.title || item.name || 'Product',
      sku: item.id.toString(),
      quantity: quantity,
      unitPrice: item.price,
    }
  })

  // Watch for empty cart and redirect to home
  useEffect(() => {
    if (cartItems.length === 0) {
      resetCheckout()
      navigate({ to: '/' })
    }
  }, [cartItems.length, navigate, resetCheckout])

  const handleImageClick = (productId) => {
    navigate({ to: `/products/${productId}` })
  }

  const handleIncrement = (productId, currentQuantity) => {
    updateCartQuantity?.(productId, currentQuantity + 1)
  }

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCartQuantity?.(productId, currentQuantity - 1)
    }
  }

  const handleDeleteClick = (item) => {
    setItemToDelete(item)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id)
      setShowDeleteDialog(false)
      setItemToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setItemToDelete(null)
  }

  const handleNext = () => {
    if (exceedsLoanLimit) {
      setErrorMessage(
        `Your order total (KES ${grandTotal.toLocaleString()}) exceeds your loan limit (KES ${loanLimit.toLocaleString()}). Please adjust your cart or update your loan details.`,
      )
      setErrorModalOpen(true)
      return
    }

    const orderPayload = {
      orderLines: orderLines,
      totals: {
        subtotal: subtotal,
        shippingFee: shippingFee,
        grandTotal: grandTotal,
      },
      cartItems: cartItems,
    }

    console.log('Order payload:', orderPayload)

    saveCheckoutFormData(4, {
      orderPayload: orderPayload,
      apiPayload: orderPayload,
      cartSummary: {
        subtotal,
        shippingFee,
        grandTotal,
        itemCount: cartItems.length,
      },
    })

    onNext()
  }

  // Cart Item Component (similar to your CartItem)
  const OrderItem = ({ product }) => {
    const quantity = Math.max(1, product.quantity || product.cartQuantity || 1)

    return (
      <div className="w-full">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[minmax(260px,1fr)_minmax(110px,140px)_minmax(90px,120px)_auto] lg:items-center lg:gap-3 xl:grid-cols-[minmax(320px,1fr)_minmax(140px,180px)_minmax(120px,150px)_auto] xl:gap-4 2xl:grid-cols-[minmax(380px,1fr)_minmax(160px,200px)_minmax(140px,180px)_auto] 2xl:gap-6">
          {/* Product Info */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleImageClick(product.id)}
              className="flex h-[80px] w-[80px] lg:h-[90px] lg:w-[90px] xl:h-[110px] xl:w-[110px] 2xl:h-[130px] 2xl:w-[139px] shrink-0 items-center justify-center rounded-2xl bg-[#F9FAFB] p-2 lg:p-3 xl:p-4 2xl:p-[17px] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={product.image}
                alt={product.title || product.name}
                className="h-14 w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-2">
              <h3 className="text-base lg:text-lg font-semibold leading-[140%] text-black truncate">
                {product.title || product.name}
              </h3>
              <p className="text-sm lg:text-base font-normal leading-[140%] text-[#676D75] line-clamp-2 lg:line-clamp-3">
                {product.specs || product.name}
              </p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 lg:gap-2 xl:gap-3 h-[40px] sm:h-[44px]">
              <button
                onClick={() => handleDecrement(product.id, quantity)}
                className="flex cursor-pointer h-7 w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
                aria-label="Decrease quantity"
                type="button"
              >
                <Minus
                  className="h-3 w-3 lg:h-3 lg:w-3 xl:h-4 xl:w-4 text-[#252525]"
                  strokeWidth={1.75}
                />
              </button>

              <span className="flex w-6 lg:w-6 xl:w-8 justify-center text-sm lg:text-sm xl:text-base 2xl:text-lg font-semibold text-[#252525]">
                {quantity}
              </span>

              <button
                onClick={() => handleIncrement(product.id, quantity)}
                className="flex cursor-pointer h-7 w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
                aria-label="Increase quantity"
                type="button"
              >
                <Plus
                  className="h-3 w-3 lg:h-3 lg:w-3 xl:h-4 xl:w-4 text-[#292D32]"
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex justify-end">
            <div className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-right text-transparent text-base lg:text-lg xl:text-xl font-semibold capitalize leading-[140%]">
              {formatCurrency(product.price * quantity)}
            </div>
          </div>

          {/* Remove */}
          <div className="flex justify-end">
            <button
              onClick={() => handleDeleteClick(product)}
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

        {/* Tablet Layout */}
        <div className="hidden md:flex md:items-center md:justify-between md:gap-4 lg:hidden">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              onClick={() => handleImageClick(product.id)}
              className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-xl bg-[#F9FAFB] p-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={product.image}
                alt={product.title || product.name}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h3 className="text-base font-semibold leading-[140%] text-black truncate">
                {product.title || product.name}
              </h3>
              <p className="text-sm font-normal leading-[140%] text-[#676D75] line-clamp-2">
                {product.specs || product.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDecrement(product.id, quantity)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
            >
              <Minus className="h-3 w-3 text-[#252525]" strokeWidth={1.75} />
            </button>
            <span className="flex w-8 justify-center text-sm font-semibold text-[#252525]">
              {quantity}
            </span>
            <button
              onClick={() => handleIncrement(product.id, quantity)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
            >
              <Plus className="h-3 w-3 text-[#292D32]" strokeWidth={1.75} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-transparent text-lg font-semibold">
              {formatCurrency(product.price * quantity)}
            </div>
            <button
              onClick={() => handleDeleteClick(product)}
              className="flex h-8 w-8 items-center justify-center hover:opacity-80 transition-opacity"
            >
              <TrashIcon className="h-5 w-5 text-[#F25E5E]" fill="#F25E5E" />
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-3 sm:gap-4 md:hidden">
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              onClick={() => handleImageClick(product.id)}
              className="flex h-[59px] w-[67px] sm:h-[70px] sm:w-[78px] shrink-0 items-center justify-center rounded-[12px] bg-[#F9FAFB] cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={product.image}
                alt={product.title || product.name}
                className="h-[51px] w-[51px] sm:h-[60px] sm:w-[60px] object-contain"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-[6px] sm:gap-2">
              <h3 className="text-base sm:text-lg font-semibold leading-[140%] text-gray-900">
                {product.title || product.name}
              </h3>
              <p className="text-sm sm:text-base font-normal leading-[140%] text-[#676D75] line-clamp-2">
                {product.specs || product.name}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-base sm:text-lg font-semibold leading-[140%] text-black">
              Quantity
            </span>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => handleIncrement(product.id, quantity)}
                className="flex cursor-pointer h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
              >
                <Plus
                  className="h-3 w-3 sm:h-4 sm:w-4 text-[#292D32]"
                  strokeWidth={1.75}
                />
              </button>

              <span className="flex w-8 sm:w-10 justify-center text-base sm:text-lg font-semibold text-[#252525]">
                {quantity}
              </span>

              <button
                onClick={() => handleDecrement(product.id, quantity)}
                className="flex cursor-pointer h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#E8ECF4] bg-white transition-colors hover:bg-gray-50"
              >
                <Minus
                  className="h-3 w-3 sm:h-4 sm:w-4 text-[#252525]"
                  strokeWidth={1.75}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <span className="text-base sm:text-lg font-semibold leading-[140%] text-black">
              Subtotal
            </span>
            <div className="flex items-center justify-between">
              <span className="bg-gradient-to-b from-[#F8971D] to-[#EE3124] bg-clip-text text-lg sm:text-xl font-semibold leading-[140%] text-transparent">
                {formatCurrency(product.price * quantity)}
              </span>
              <button
                onClick={() => handleDeleteClick(product)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center hover:opacity-80 transition-opacity"
              >
                <TrashIcon
                  className="h-5 w-5 sm:h-6 sm:w-6 text-[#F25E5E]"
                  fill="#F25E5E"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-start mb-[50px] p-0 sm:p-0 gap-6 w-full">
      {/* Two Separate Cards Layout */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
        {/* First Card - Order Items */}
        <div className="flex-1">
          <div className="bg-white w-full h-auto rounded-4xl border border-gray-200 p-6 sm:p-8">
            {/* Header with Clear Cart Button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="w-full text-xl sm:text-2xl font-semibold leading-[1.4] capitalize text-[#252525] mb-2">
                  Order Details
                </h1>
                <p className="w-full text-sm sm:text-base font-medium leading-[1.4] text-[#676D75]">
                  Confirm your order details
                </p>
              </div>

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex h-[40px] items-center justify-center gap-2 rounded-3xl border border-[#F25E5E] text-[#F25E5E] font-medium text-sm transition-all hover:bg-[#FFF5F5]"
                    >
                      Remove All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-[28px] border-none px-8 py-8 text-center shadow-[0_24px_60px_rgba(9,36,75,0.16)]">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F8971D] to-[#EE3124]">
                      <TrashIconWhite
                        className="h-8 w-8 text-white"
                        fill="white"
                      />
                    </div>
                    <AlertDialogHeader className="gap-2 text-center items-center justify-center">
                      <AlertDialogTitle className="text-xl font-bold text-[#252525]">
                        Clear Cart?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm leading-relaxed text-[#676D75] items-center justify-center">
                        This will remove all items from your cart. You won't be
                        able to undo this action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 flex w-full flex-col gap-3 sm:flex-col sm:items-stretch">
                      <AlertDialogAction
                        className="w-full rounded-3xl h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-5 py-3 text-base font-medium text-white shadow-sm hover:opacity-90"
                        onClick={() => clearCart?.()}
                      >
                        Yes, Clear Cart
                      </AlertDialogAction>
                      <AlertDialogCancel className="w-full h-[46px] rounded-3xl border border-[#F8971D] px-5 py-3 text-base font-medium text-[#F47120] hover:bg-[#FFF4EE]">
                        Cancel
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            <div className="h-px bg-gray-200 my-6"></div>

            {/* Items List */}
            <div className="w-full flex flex-1 flex-col items-start gap-6">
              {/* Table Header - Desktop Only */}
              <div className="hidden w-full lg:grid lg:grid-cols-[minmax(260px,1fr)_minmax(110px,140px)_minmax(90px,120px)_auto] lg:items-start lg:gap-3 xl:grid-cols-[minmax(320px,1fr)_minmax(140px,180px)_minmax(120px,150px)_auto] xl:gap-4 2xl:grid-cols-[minmax(380px,1fr)_minmax(160px,200px)_minmax(140px,180px)_auto] 2xl:gap-6">
                <div className="text-sm lg:text-base xl:text-lg font-semibold leading-[1.4] text-black">
                  Item
                </div>
                <div className="text-center text-sm lg:text-base xl:text-lg font-semibold leading-[1.4] text-black">
                  Quantity
                </div>
                <div className="text-right text-sm lg:text-base xl:text-lg font-semibold leading-[1.4] text-black">
                  Subtotal
                </div>
                <span className="text-right text-sm lg:text-base xl:text-lg font-semibold leading-[1.4] text-black opacity-0">
                  Remove
                </span>
              </div>

              {/* Mobile & Tablet Header */}
              <div className="flex items-center justify-between self-stretch lg:hidden">
                <h3 className="text-base sm:text-lg font-semibold text-black">
                  Items
                </h3>
                <span className="text-xs sm:text-sm text-[#676D75]">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="h-px self-stretch bg-[#E8ECF4] lg:hidden"></div>

              {/* Cart Items */}
              <div className="flex w-full flex-col items-center justify-center gap-3 lg:gap-4 self-stretch">
                {cartItems.map((item, index) => (
                  <div key={item.id || index} className="w-full">
                    <OrderItem product={item} />
                    {index < cartItems.length - 1 && (
                      <div className="my-3 lg:my-4 h-px w-full bg-[#E8ECF4]"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - Payment Summary (Sticky) */}
        <div className="lg:w-[400px] xl:w-[450px] 2xl:w-[500px] lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white w-full h-auto rounded-4xl border border-gray-200 p-6 sm:p-8">
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex flex-col items-start gap-2 sm:gap-3 self-stretch">
                <h2 className="self-stretch text-base sm:text-lg lg:text-xl font-semibold capitalize leading-[140%] text-black">
                  Order Summary
                </h2>
              </div>

              <div className="h-px self-stretch bg-[#E8ECF4]"></div>

              {/* Summary Details */}
              <div className="flex flex-col items-start gap-3 sm:gap-4 self-stretch">
                {/* Loan Limit */}
                {loanLimit > 0 && (
                  <div className="flex items-center justify-between self-stretch">
                    <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-[#676D75]">
                      Loan Limit
                    </span>
                    <span
                      className={`text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] ${
                        exceedsLoanLimit ? 'text-orange-500' : 'text-green-600'
                      }`}
                    >
                      {formatCurrency(loanLimit)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between self-stretch">
                  <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-[#676D75]">
                    Total Items
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-black">
                    {cartItems.reduce(
                      (total, item) =>
                        total +
                        Math.max(1, item.quantity || item.cartQuantity || 1),
                      0,
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between self-stretch">
                  <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-[#676D75]">
                    Shipping Cost
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-black">
                    {formatCurrency(shippingFee)}
                  </span>
                </div>

                <div className="flex items-center justify-between self-stretch">
                  <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-[#676D75]">
                    Subtotal
                  </span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-black">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <div className="h-px self-stretch bg-[#E8ECF4]"></div>

              {/* Grand Total */}
              <div className="flex items-center justify-between self-stretch">
                <span className="text-sm sm:text-base lg:text-lg font-semibold capitalize leading-[140%] text-[#676D75]">
                  Grand Total
                </span>
                <span className="text-sm sm:text-base lg:text-lg font-semibold capitalize leading-[140%] text-black">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              {/* Buttons Container - Reversed Order */}
              <div className="flex flex-col sm:flex-row-reverse md:flex-row-reverse lg:flex-col xl:flex-col gap-3 sm:gap-4 w-full max-w-full mt-4">
                {/* Next Button - Comes First in DOM */}
                <Button
                  onClick={handleNext}
                  type="button"
                  className="px-8 py-3 h-12 text-white rounded-full font-medium hover:opacity-90 transition-opacity w-full sm:w-1/2 md:w-1/2 lg:w-full xl:w-full"
                  style={{
                    background: 'linear-gradient(to right, #F97316, #EF4444)',
                  }}
                >
                  Next: Terms & Condition
                </Button>

                {/* Back Button - Comes Second in DOM */}
                <Button
                  onClick={onPrevious}
                  disabled={isFirstStep}
                  type="button"
                  variant={'outline'}
                  className="flex justify-center items-center px-4 py-3 w-full sm:w-1/2 md:w-1/2 lg:w-full xl:w-full h-[46px] rounded-3xl border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium disabled:opacity-50"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteDialog && itemToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#F8971D] to-[#EE3124] rounded-full flex items-center justify-center mb-4">
              <TrashIconWhite className="w-8 h-8" fill="white" />
            </div>

            <h2 className="text-xl font-bold mb-2 text-gray-900">
              Remove Item from Cart?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove "
              {itemToDelete.title || itemToDelete.name}" from your cart?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
                  bg-gradient-to-b from-[#F8971D] to-[#EE3124] rounded-3xl 
                  text-white font-medium text-base shadow-sm hover:opacity-90 transition-all"
              >
                Remove
              </button>
              <button
                onClick={cancelDelete}
                className="flex items-center justify-center gap-2 w-full h-[46px] px-4 py-3 
                  border border-[#F8971D] text-[#F8971D] rounded-[24px] 
                  font-medium text-base hover:bg-[#F8971D]/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loan Limit Error Modal */}
      <ErrorAlertDialog
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        message={errorMessage}
        primaryAction={{
          label: 'Adjust Order',
          onClick: () => {
            setErrorModalOpen(false)
          },
        }}
      />
    </div>
  )
}
