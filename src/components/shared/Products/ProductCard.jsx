import { ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCartIcon } from '@/assets/icons'

export function ProductCard({
  id = '1',
  title,
  price,
  oldPrice,
  image,
  hasCartButton = false,
}) {
  const fallbackImage = '/product.png'
  const imageSrc =
    typeof image === 'string' && image.trim().length > 0
      ? image.trim()
      : fallbackImage

  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardContent className="p-0">
        <Link to={`/products/${id}`} className="flex flex-col gap-4 group">
          <div className="relative flex items-center justify-center rounded-2xl bg-[#F9FAFB] p-7 h-[280px] group-hover:bg-gray-100 transition-colors">
            <img
              src={imageSrc}
              srcSet={`${imageSrc} 1x, ${imageSrc} 2x`}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-56 h-56 object-contain"
              onError={(event) => {
                if (event.currentTarget.src !== fallbackImage) {
                  event.currentTarget.src = fallbackImage
                  event.currentTarget.srcSet = `${fallbackImage} 1x, ${fallbackImage} 2x`
                }
              }}
            />
            {hasCartButton && (
              <Button
                size="icon"
                className="absolute right-4 top-4 h-12 w-12 rounded-full bg-gradient-to-b from-[#F8971D] to-[#EE3124] hover:opacity-90 transition-opacity"
              >
                <ShoppingCartIcon className="w-6 h-6 text-white" />
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium leading-[140%] line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-base font-bold capitalize">{price}</span>
              <span className="text-xs font-medium text-[#A0A4AC] line-through">
                {oldPrice}
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

export default ProductCard
