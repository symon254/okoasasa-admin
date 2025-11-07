import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  LinkIcon,
  FacebookIcon,
  XIcon,
  InstagramIcon,
  WhatsAppIcon,
  TikTokIcon,
  AddIcon,
  MinusIcon,
  BoxIcon,
  TruckIcon,
  VerifyIcon,
  CartIcon,
} from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { useStateContext } from '@/context/state-context'

export function ProductInfo({ product }) {
  const navigate = useNavigate()
  const { addToCart, updateCartQuantity, cart } = useStateContext()

  // Local quantity state (separate from cart)
  const [quantity, setQuantity] = useState(1)

  const cartItem = useMemo(() => {
    if (!product?.id) return null
    return cart?.find((item) => item.productId === product.id)
  }, [cart, product?.id])

  const existingQuantity = cartItem?.quantity ?? 0
  const isInCart = existingQuantity > 0

  // Reset local quantity when product changes
  useEffect(() => {
    setQuantity(1)
  }, [product?.id])

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (!product?.id) return

    if (isInCart) {
      // Update cart with new total quantity
      updateCartQuantity(product.id, existingQuantity + quantity)
    } else {
      // Add to cart with selected quantity
      addToCart(product.id, quantity)
    }

    // Reset quantity to 1 after adding
    setQuantity(1)
  }

  const handleBuyNow = () => {
    if (!product?.id) return

    // Add current quantity to cart if needed
    if (isInCart) {
      updateCartQuantity(product.id, existingQuantity + quantity)
    } else {
      addToCart(product.id, quantity)
    }

    navigate({ to: '/checkout/' })
  }

  return (
    <div className="flex flex-col gap-5 md:gap-5">
      {/* Share With Others */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-[10px] font-normal leading-[150%] text-black md:text-xs md:font-medium">
          Share With Others
        </p>
        <div className="flex items-center gap-2">
          {[
            { Icon: LinkIcon, label: 'Copy link', size: 22 },
            { Icon: FacebookIcon, label: 'Facebook', size: 24 },
            { Icon: XIcon, label: 'Twitter', size: 20 },
            { Icon: InstagramIcon, label: 'Instagram', size: 24 },
            { Icon: WhatsAppIcon, label: 'WhatsApp', size: 24 },
            { Icon: TikTokIcon, label: 'TikTok', size: 20 },
          ].map(({ Icon, label, size }, i) => (
            <button
              key={i}
              className="flex size-8 items-center justify-center rounded-full bg-[#F9FAFB] transition-colors hover:bg-gray-200 md:h-10 md:w-10"
              aria-label={label}
            >
              <Icon size={size} />
            </button>
          ))}
        </div>
      </div>

      {/* Product Title */}
      <h1 className="text-xl font-bold capitalize leading-[140%] text-black md:text-[28px]">
        {product.name}
      </h1>

      {/* Product Description */}
      <p className="text-sm font-normal leading-[140%] text-[#676D75] md:text-base md:font-medium">
        {product?.description?.trim() ||
          product?.descriptionText?.trim() ||
          'Detailed product information will be available shortly.'}
      </p>

      {/* Divider */}
      <div className="h-px bg-[#E8ECF4]" />

      {/* Price and Stock */}
      <div className="flex items-center justify-between">
        <p
          className="text-lg font-bold capitalize leading-[140%] md:text-2xl"
          style={{
            background: 'linear-gradient(180deg, #F8971D 0%, #EE3124 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {product.price}
        </p>
        <div className="rounded-3xl bg-[rgba(244,113,32,0.12)] px-4 py-2">
          <span className="text-xs font-bold capitalize leading-[140%] text-[#F47120] md:text-sm">
            {product.stock}
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex w-[250px] items-center justify-between rounded-3xl bg-[#F9FAFB] px-4 py-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full text-lg flex items-center justify-center disabled:opacity-30 transition-all hover:border-[#F8971D]"
            onClick={handleDecrease}
            disabled={quantity <= 1}
          >
            <MinusIcon size={18} />
          </Button>
          <span className="min-w-[30px] text-center text-sm font-bold capitalize leading-[140%] text-[#252525] md:text-lg">
            {quantity}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full text-lg flex items-center justify-center disabled:opacity-30 transition-all hover:border-[#F8971D]"
            onClick={handleIncrease}
          >
            <AddIcon size={18} />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          variant={'outlineGradient'}
          className="flex h-11 w-full items-center justify-center gap-2.5 self-stretch rounded-3xl px-4 py-3 text-base font-medium capitalize leading-[140%]"
          size="lg"
        >
          <CartIcon />
          Add {quantity} to Cart
        </Button>

        {/* Buy Now Button */}
        <Button
          variant="gradient"
          className="rounded-3xl px-4 md:px-6 py-3 h-auto text-base font-medium"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-2 rounded-2xl bg-[#F9FAFB] p-3 md:p-4">
        {[
          {
            Icon: BoxIcon,
            text: '15GB + 500 Mins + Unlimited SMS at KES 1,000/Month',
          },
          { Icon: TruckIcon, text: 'Country Wide Delivery' },
          { Icon: VerifyIcon, text: 'Warranty on all mobile phone' },
        ].map(({ Icon, text }, i) => (
          <div
            key={i}
            className="flex items-start gap-2 md:items-center md:gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(244,113,32,0.12)]">
              <Icon size={20} />
            </div>
            <p className="flex-1 text-sm font-medium leading-[140%] text-black md:text-base md:font-semibold">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
