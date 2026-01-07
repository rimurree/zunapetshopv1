import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type OrderItem = {
  id: string
  name: string
  quantity: number
  total: number
}

type OrderSummaryProps = {
  items?: OrderItem[]
  emptyMessage?: string
  itemCount: number
  subtotal: number
  shipping: number
  tax: number
  total: number
  cardClassName?: string
  contentClassName?: string
  primaryActionLabel: string
  onPrimaryAction: () => void
  primaryActionDisabled?: boolean
  secondaryActionLabel?: string
  secondaryActionTo?: string
  onSecondaryAction?: () => void
  helperText?: string
}

function OrderSummary({
  items,
  emptyMessage,
  itemCount,
  subtotal,
  shipping,
  tax,
  total,
  cardClassName,
  contentClassName,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionDisabled,
  secondaryActionLabel,
  secondaryActionTo,
  onSecondaryAction,
  helperText,
}: OrderSummaryProps) {
  return (
    <Card className={cn('h-fit', cardClassName)}>
      <CardContent className={cn('space-y-4', contentClassName)}>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Order summary
        </h2>
        {items ? (
          items.length === 0 ? (
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          ) : (
            <div className="space-y-3 text-sm text-muted-foreground">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Php {item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )
        ) : null}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Selected items ({itemCount})</span>
            <span>Php {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>Php {shipping.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Estimated tax</span>
            <span>Php {tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4 text-base font-semibold">
          <span>Total</span>
          <span>Php {total.toFixed(2)}</span>
        </div>
        <Button
          size="lg"
          className="w-full"
          onClick={onPrimaryAction}
          disabled={primaryActionDisabled}
        >
          {primaryActionLabel}
        </Button>
        {helperText ? (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        ) : null}
        {secondaryActionLabel && onSecondaryAction ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onSecondaryAction}
          >
            {secondaryActionLabel}
          </Button>
        ) : secondaryActionLabel && secondaryActionTo ? (
          <Link
            to={secondaryActionTo}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'w-full justify-center'
            )}
          >
            {secondaryActionLabel}
          </Link>
        ) : null}
      </CardContent>
    </Card>
  )
}

export default OrderSummary
