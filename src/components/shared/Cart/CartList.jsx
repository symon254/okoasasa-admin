import { CartItem } from './CartItem'
import { ShoppingCart } from 'lucide-react'

export function CartList({ items = [], onQuantityChange, onRemove }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-[#E8ECF4] p-12 md:p-24 w-full">
        <div className="flex flex-col items-center gap-4">
          <ShoppingCart className="h-16 w-16 text-[#A0A4AC] md:h-24 md:w-24" strokeWidth={1.5} />
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-semibold text-[#252525] md:text-2xl">
              Your cart is empty
            </h3>
            <p className="text-sm text-[#676D75] md:text-base">
              Add some products to get started
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-1 flex-col items-start gap-6 rounded-2xl border border-[#E8ECF4] p-4 md:p-6">
      {/* Table Header - Desktop Only (lg+ screens) */}
      <div className="hidden w-full lg:grid lg:grid-cols-[minmax(260px,1fr)_minmax(110px,140px)_minmax(90px,120px)_auto] lg:items-start lg:gap-3 xl:grid-cols-[minmax(320px,1fr)_minmax(140px,180px)_minmax(120px,150px)_auto] xl:gap-4 2xl:grid-cols-[minmax(380px,1fr)_minmax(160px,200px)_minmax(140px,180px)_auto] 2xl:gap-6">
        <div className="text-sm lg:text-base xl:text-lg font-semibold leading-[1.4] text-black">Item</div>
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
        <h3 className="text-base sm:text-lg font-semibold text-black">Items</h3>
        <span className="text-xs sm:text-sm text-[#676D75]">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="h-px self-stretch bg-[#E8ECF4]"></div>

      {/* Cart Items */}
      <div className="flex w-full flex-col items-center justify-center gap-3 lg:gap-4 self-stretch">
        {items.map((item, index) => (
          <div key={item.id || index} className="w-full">
            <CartItem
              {...item}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
            {index < items.length - 1 && (
              <div className="my-3 lg:my-4 h-px w-full bg-[#E8ECF4]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CartList
