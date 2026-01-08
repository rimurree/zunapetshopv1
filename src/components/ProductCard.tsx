import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import type { Product } from '@/data/products'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import RatingStars from '@/components/RatingStars'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-full object-cover object-[70%_70%]"
        />
        <Badge variant="accent" className="absolute left-4 top-4">
          {product.tags[0]}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mt-auto">
          <RatingStars rating={product.rating} />
          <div className="flex items-center justify-between gap-2">
            <p className="whitespace-nowrap text-sm font-semibold text-foreground">
              ₱ {product.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addItem(product.id, 1)}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingBag className="h-4 w-4" />
                Add
              </Button>
              <Link
                to={`/products/${product.id}`}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'text-muted-foreground mr-0.5'
                )}
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
