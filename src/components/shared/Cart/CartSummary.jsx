import { Button } from '@/components/ui/button'
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
import { formatCurrency } from '@/lib/utils'
import { TrashIconWhite } from '@/assets/icons'

export function CartSummary({
  totalItems = 0,
  shippingCost = 0,
  subtotal = 0,
  onCheckout,
  onClearCart,
}) {
  const grandTotal = subtotal + shippingCost
  const isCartEmpty = totalItems === 0

  return (
    <div className="flex w-full flex-col items-start gap-4 sm:gap-6 rounded-2xl border border-[#E8ECF4] p-4 md:p-6 lg:w-full lg:sticky lg:top-8 lg:self-start">
      {/* Title */}
      <div className="flex flex-col items-start gap-2 sm:gap-3 self-stretch">
        <h2 className="self-stretch text-base sm:text-lg lg:text-xl font-semibold capitalize leading-[140%] text-black">
          Order Summary
        </h2>
      </div>

      <div className="h-px self-stretch bg-[#E8ECF4]"></div>

      {/* Summary Details */}
      <div className="flex flex-col items-start gap-3 sm:gap-4 self-stretch">
        <div className="flex items-center justify-between self-stretch">
          <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-[#676D75]">
            total Items
          </span>
          <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-black">
            {totalItems}
          </span>
        </div>

        <div className="flex items-center justify-between self-stretch">
          <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-[#676D75]">
            Shipping Cost
          </span>
          <span className="text-xs sm:text-sm lg:text-base font-medium capitalize leading-[140%] text-black">
            {formatCurrency(shippingCost)}
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

      {/* Checkout Button */}
      <div className="flex flex-col items-start gap-3 sm:gap-4 self-stretch">
        <Button
          onClick={onCheckout}
          disabled={isCartEmpty}
          variant="gradient"
          className="flex items-center justify-center gap-2 w-full h-[40px] sm:h-[44px] lg:h-[46px] px-4 py-3
             bg-linear-to-b from-[#F8971D] to-[#EE3124] rounded-3xl
             text-white font-medium text-xs sm:text-sm lg:text-base shadow-sm hover:opacity-90 transition-all"
        >
          Proceed to Checkout
        </Button>

        {onClearCart && totalItems > 1 ? (
          <AlertDialog className="max-w-sm">
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isCartEmpty}
                className="flex h-[40px] sm:h-[44px] lg:h-[46px] w-full items-center justify-center gap-2 rounded-3xl border border-[#F25E5E] text-[#F25E5E] font-medium text-xs sm:text-sm lg:text-base transition-all hover:bg-[#FFF5F5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Clear Cart
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-[28px] border-none px-8 py-8 text-center shadow-[0_24px_60px_rgba(9,36,75,0.16)]">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F8971D] to-[#EE3124]">
                <TrashIconWhite className="h-8 w-8 text-white" fill="white" />
              </div>
              <AlertDialogHeader className="gap-2 text-center items-center justify-center">
                <AlertDialogTitle className="text-xl font-bold text-[#252525]">
                  Clear Cart?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-relaxed text-[#676D75] items-center justify-center">
                  This will remove all items from your cart. You won't be able
                  to undo this action.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 flex w-full flex-col gap-3 sm:flex-col sm:items-stretch">
                <AlertDialogAction
                  className="w-full rounded-3xl h-[40px] sm:h-[44px] lg:h-[46px] bg-gradient-to-b from-[#F8971D] to-[#EE3124] px-5 py-3 text-xs sm:text-sm lg:text-base font-medium text-white shadow-sm hover:opacity-90"
                  onClick={onClearCart}
                >
                  Yes, Clear Cart
                </AlertDialogAction>
                <AlertDialogCancel className="w-full h-[40px] sm:h-[44px] lg:h-[46px] rounded-3xl border border-[#F8971D] px-5 py-3 text-xs sm:text-sm lg:text-base font-medium text-[#F47120] hover:bg-[#FFF4EE]">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </div>
    </div>
  )
}

export default CartSummary
