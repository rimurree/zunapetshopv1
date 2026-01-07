import { ArrowRight, Heart, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProductCard from '@/components/ProductCard'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { cn } from '@/lib/utils'
import doggosImageCover from '@/assets/3doggos.png'

const featuredProducts = products.slice(0, 4)

function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
            Zuna Pet Essentials
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
            Everyday care that keeps pets safe, calm, and joyful.
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Thoughtfully curated essentials, from chew toys to gentle grooming,
            designed for clarity, comfort, and calm routines.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 flex-col sm:flex-row">
            <Link to="/products" className={cn(buttonVariants({ size: 'lg' }))}>
              Shop essentials
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products#categories"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Browse categories
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground/80">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Safety-first materials
            </span>
            <span className="inline-flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Comfort-focused choices
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-amber-200/50 blur-2xl" />
          <span className="hidden lg:inline">
            <img
              src={doggosImageCover}
              alt="Playful dogs with pet toys"
              className="relative mx-auto w-full max-w-md rounded-[2.5rem] border border-border/60 bg-card/80 object-cover shadow-lg"
            />
          </span>
        </div>
      </section>

      <section className="mt-7 sm:mt-0">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Featured essentials
            </h2>
          </div>
          <Link
            to="/products"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="categories" className="mt-7 sm:mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Shop by category
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`bg-linear-to-br text-slate-900 ${category.tone}`}
            >
              <CardHeader>
                <CardTitle className="text-slate-900">
                  {category.name}
                </CardTitle>
                <p className="text-sm text-slate-700">{category.description}</p>
              </CardHeader>
              <CardContent>
                <Link
                  to={`/products?category=${category.id}`}
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  Browse
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
