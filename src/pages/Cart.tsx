import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Card, CardContent } from '@/components/ui/card'
import OrderSummary from '@/components/OrderSummary'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { products } from '@/data/products'
import { useCart } from '@/context/useCart'
import { cn } from '@/lib/utils'

function Cart() {
  const navigate = useNavigate()
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false)
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    selectedIds,
    toggleSelected,
    selectedItemCount,
    selectedSubtotal,
  } = useCart()

  const cartItems = items
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product)

  const hasSelection = selectedItemCount > 0
  const shipping = hasSelection ? 120 : 0
  const tax = hasSelection ? selectedSubtotal * 0.12 : 0
  const total = selectedSubtotal + shipping + tax

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">
          Shopping cart
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-amber-300 bg-amber-50 p-10 text-center">
          <p className="text-sm text-amber-900">
            Your cart is empty. Explore essentials to get started.
          </p>
          <Link
            to="/products"
            className={cn(buttonVariants(), 'mt-4 inline-flex')}
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.productId}>
                <CardContent className="flex flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.productId)}
                      onChange={() => toggleSelected(item.productId)}
                      className="h-5 w-5 shrink-0 rounded border border-border text-amber-600 accent-amber-500"
                      aria-label={`Select ${item.product?.name} for checkout`}
                    />
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-foreground">
                        {item.product?.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Php {item.product?.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 rounded-full border border-input bg-card/80 px-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <OrderSummary
            itemCount={selectedItemCount}
            subtotal={selectedSubtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            contentClassName="space-y-5 px-6 py-6"
            primaryActionLabel="Proceed to checkout"
            onPrimaryAction={() => navigate('/checkout')}
            primaryActionDisabled={!hasSelection}
            helperText={
              hasSelection ? undefined : 'Select at least one item to continue.'
            }
            secondaryActionLabel="Clear cart"
            onSecondaryAction={() => {
              setIsClearDialogOpen(true)
            }}
          />
          <AlertDialog
            open={isClearDialogOpen}
            onOpenChange={setIsClearDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear your cart?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes all items from your cart. You can still add them
                  again later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    clearCart()
                    setIsClearDialogOpen(false)
                  }}
                >
                  Yes, clear cart
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}

export default Cart
