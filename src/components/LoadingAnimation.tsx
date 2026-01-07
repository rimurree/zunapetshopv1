import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { cn } from '@/lib/utils'

type LoadingAnimationProps = {
  className?: string
  label?: string
}

function LoadingAnimation({
  className,
  label = 'Loading products...',
}: LoadingAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    fetch('/loading.json')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setAnimationData(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-3xl border border-border/60 bg-card/70 p-8 text-center',
        className,
      )}
    >
      {animationData && !hasError ? (
        <Lottie animationData={animationData} className="h-36 w-36" />
      ) : (
        <div className="h-24 w-24 animate-pulse rounded-full bg-muted" />
      )}
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default LoadingAnimation
