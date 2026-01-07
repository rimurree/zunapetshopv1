import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

type RatingStarsProps = {
  rating: number
  className?: string
}

function RatingStars({ rating, className }: RatingStarsProps) {
  const rounded = Math.round(rating * 10) / 10
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            'h-4 w-4',
            index + 1 <= Math.round(rounded)
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground/50',
          )}
        />
      ))}
      <span className="text-xs text-muted-foreground/80">{rounded.toFixed(1)}</span>
    </div>
  )
}

export default RatingStars
