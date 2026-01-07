import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, Heart, ShoppingBag } from 'lucide-react'
import { productLookup, products } from '@/data/products'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Badge } from '@/components/ui/badge'
import RatingStars from '@/components/RatingStars'
import { useCart } from '@/context/useCart'
import ProductCard from '@/components/ProductCard'
import { cn } from '@/lib/utils'

function ProductDetails() {
  const { productId } = useParams()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const product = productId ? productLookup[productId] : undefined

  const recommendations = useMemo(
    () => products.filter((item) => item.id !== productId).slice(0, 3),
    [productId],
  )

  if (!product) {
    return (
      <div className="rounded-3xl border border-border/60 bg-card/80 p-10 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The item you are looking for is unavailable.
        </p>
        <Link to="/products" className={cn(buttonVariants(), 'mt-6 inline-flex')}>
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground/80">
        <Link to="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/80 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <Badge variant="accent">{product.tags[0]}</Badge>
            <h1 className="mt-3 text-3xl font-semibold text-foreground">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-2xl font-semibold text-foreground">
              Php {product.price.toFixed(2)}
            </p>
            <RatingStars rating={product.rating} />
            <span className="text-xs text-muted-foreground/80">
              {product.reviewCount} reviews
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground/80">Highlights</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-400" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => {
                addItem(product.id, 1)
                setAdded(true)
                window.setTimeout(() => setAdded(false), 2000)
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </Button>
            <Link
              to="/cart"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Go to cart
            </Link>
            {added ? (
              <span className="text-sm font-semibold text-emerald-600">
                Added to cart
              </span>
            ) : null}
          </div>
          <div className="rounded-3xl border border-border/60 bg-card/80 p-4 text-sm text-muted-foreground">
            {product.inStock
              ? 'In stock · Ships in 1-2 business days.'
              : 'Currently out of stock. Check back soon.'}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Recommended for you
            </h2>
            <p className="text-sm text-muted-foreground">
              Products that pair well with this essential.
            </p>
          </div>
          <Link to="/products" className={cn(buttonVariants({ variant: 'ghost' }))}>
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductDetails

