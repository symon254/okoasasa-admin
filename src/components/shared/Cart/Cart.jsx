import { useMemo } from 'react'
import { BreadCrumbs } from '../BreadCrumbs'
import { CartList } from './CartList'
import { CartSummary } from './CartSummary'
import { useStateContext } from '@/context/state-context'

export function Cart({ onCheckout }) {
  const { cartProducts, updateCartQuantity, removeFromCart, clearCart } =
    useStateContext()

  const cartItems = useMemo(() => cartProducts ?? [], [cartProducts])

  const handleQuantityChange = (id, newQuantity) => {
    const clampedQuantity = Math.max(1, newQuantity)
    updateCartQuantity?.(id, clampedQuantity)
  }

  const handleRemove = (id) => {
    removeFromCart?.(id)
  }

  const handleClearCart = () => {
    clearCart?.()
  }

  const { totalItems, subtotal } = useMemo(() => {
    const totals = cartItems.reduce(
      (acc, item) => {
        const quantity = Math.max(1, item.quantity || item.cartQuantity || 1)
        return {
          totalItems: acc.totalItems + quantity,
          subtotal: acc.subtotal + item.price * quantity,
        }
      },
      { totalItems: 0, subtotal: 0 },
    )

    return totals
  }, [cartItems])

  return (
    <div className="flex w-full flex-col items-start gap-6 md:gap-[30px]">
      {/* Breadcrumbs */}
      <BreadCrumbs
        items={[
          { path: '/', label: 'Home' },
          { path: '/cart', label: 'My Cart', isCurrent: true },
        ]}
      />

      {/* Page Header */}
      <div className="flex w-full flex-col items-start gap-2 md:h-20 md:max-w-[536px]">
        <h1 className="self-stretch text-2xl font-semibold capitalize leading-[140%] text-[#252525] md:text-4xl">
          My Cart
        </h1>
        <p className="self-stretch text-sm font-medium leading-[140%] text-[#676D75] md:text-base">
          Almost there! Ready to place your order?
        </p>
      </div>

      {/* Cart Content - Responsive Layout */}
      <div className="flex w-full flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] lg:items-start lg:gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] xl:gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(380px,420px)] 2xl:gap-8">
        <CartList
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />

        <CartSummary
          totalItems={totalItems}
          shippingCost={0}
          subtotal={subtotal}
          onCheckout={onCheckout}
          onClearCart={cartItems.length ? handleClearCart : undefined}
        />
      </div>
    </div>
  )
}

export default Cart
