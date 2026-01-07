import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import LoadingAnimation from '@/components/LoadingAnimation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function Products() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category')
  const query = params.get('query') ?? ''
  const [isLoading, setIsLoading] = useState(true)
  const previousFilters = useRef({ category: activeCategory, query })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory
        ? product.categoryId === activeCategory
        : true
      const matchesQuery = query
        ? `${product.name} ${product.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const updateParams = (next: URLSearchParams) => {
    setParams(next, { replace: true })
  }

  useEffect(() => {
    const previous = previousFilters.current
    const categoryChanged = previous.category !== activeCategory
    const queryChanged = previous.query !== query
    previousFilters.current = { category: activeCategory, query }

    const shouldDelay = !(categoryChanged && !queryChanged)
    const startTimer = window.setTimeout(() => {
      setIsLoading(shouldDelay)
    }, 0)

    let endTimer: number | undefined
    if (shouldDelay) {
      endTimer = window.setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }

    return () => {
      window.clearTimeout(startTimer)
      if (endTimer) {
        window.clearTimeout(endTimer)
      }
    }
  }, [activeCategory, query])

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-foreground">All products</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse essentials with clear filters for quick decision-making.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Input
            value={query}
            placeholder="Filter by keyword"
            onChange={(event) => {
              const value = event.target.value
              const next = new URLSearchParams(params)
              if (value) {
                next.set('query', value)
              } else {
                next.delete('query')
              }
              updateParams(next)
            }}
            aria-label="Filter products by keyword"
            className="max-w-xs"
          />
          <Button
            variant="outline"
            onClick={() => {
              const next = new URLSearchParams(params)
              next.delete('category')
              next.delete('query')
              updateParams(next)
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>

      <section id="categories" className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Categories</h2>
          <p className="text-sm text-muted-foreground">
            Select a category for focused browsing.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory ? 'outline' : 'default'}
            onClick={() => {
              const next = new URLSearchParams(params)
              next.delete('category')
              updateParams(next)
            }}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => {
                const next = new URLSearchParams(params)
                next.set('category', category.id)
                updateParams(next)
              }}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {isLoading ? (
        <LoadingAnimation
          label={
            activeCategory || query
              ? 'Updating results...'
              : 'Loading products...'
          }
        />
      ) : (
        <>
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-8 text-center">
              <p className="text-sm text-amber-900">
                No products match your search. Try a new keyword or category.
              </p>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Products
