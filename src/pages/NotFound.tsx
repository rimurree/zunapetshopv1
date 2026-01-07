import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { cn } from '@/lib/utils'

function NotFound() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 p-12 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This page is unavailable. Use the navigation to continue.
      </p>
      <Link to="/" className={cn(buttonVariants(), 'mt-6 inline-flex')}>
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
