import { useEffect, useState } from 'react'
import { BadgeCheck, Truck } from 'lucide-react'
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
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import OrderSummary from '@/components/OrderSummary'
import { products } from '@/data/products'
import { useCart } from '@/context/useCart'

function Checkout() {
  const {
    items,
    selectedIds,
    selectedSubtotal,
    selectedItemCount,
    clearSelected,
  } = useCart()
  const initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    productNotes: '',
  }
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isPlaceDialogOpen, setIsPlaceDialogOpen] = useState(false)
  const [formValues, setFormValues] = useState(() => {
    if (typeof window === 'undefined') {
      return initialFormValues
    }
    const stored = window.sessionStorage.getItem('zuna-checkout-form')
    if (!stored) {
      return initialFormValues
    }
    try {
      return {
        ...initialFormValues,
        ...(JSON.parse(stored) as typeof initialFormValues),
      }
    } catch {
      return initialFormValues
    }
  })
  const cartItems = items
    .map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.productId),
    }))
    .filter((item) => item.product && selectedIds.includes(item.productId))

  const hasSelection = selectedItemCount > 0
  const requiredFields = { ...formValues, productNotes: 'optional' }
  const isFormComplete = Object.entries(requiredFields).every(([key, value]) =>
    key === 'productNotes' ? true : value.trim().length > 0
  )
  const shipping = hasSelection ? 120 : 0
  const tax = hasSelection ? selectedSubtotal * 0.12 : 0
  const total = selectedSubtotal + shipping + tax
  const handleFieldChange = (field: keyof typeof initialFormValues) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (orderPlaced) {
        setOrderPlaced(false)
      }
      const nextValue = event.target.value
      setFormValues((current) => ({
        ...current,
        [field]: nextValue,
      }))
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.sessionStorage.setItem(
      'zuna-checkout-form',
      JSON.stringify(formValues)
    )
  }, [formValues])

  useEffect(() => {
    if (!orderPlaced) {
      return
    }
    const timer = window.setTimeout(() => {
      setOrderPlaced(false)
    }, 10000)
    return () => window.clearTimeout(timer)
  }, [orderPlaced])

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
          Checkout
        </p>
        <h1 className="text-3xl font-semibold text-foreground">
          Secure your essentials
        </h1>
      </div>
      {orderPlaced ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <span className="inline-flex items-center gap-2 font-semibold">
            <BadgeCheck className="h-4 w-4" />
            Order confirmed
          </span>
          <p className="mt-1 text-xs text-emerald-700">
            Thanks for your order. We will send a confirmation to your email.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardContent className="space-y-6">
            <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              <span className="inline-flex items-center gap-2 font-semibold">
                <BadgeCheck className="h-4 w-4" />
                Secure checkout
              </span>
              <p className="mt-1 text-xs text-emerald-700">
                Your information is protected. Payment integration is disabled
                for demo.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Contact information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    First name
                  </label>
                  <Input
                    placeholder="Zuna"
                    className="mt-2"
                    value={formValues.firstName}
                    onChange={handleFieldChange('firstName')}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    Last name
                  </label>
                  <Input
                    placeholder="Cakes"
                    className="mt-2"
                    value={formValues.lastName}
                    onChange={handleFieldChange('lastName')}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="zunacakes@gmail.com"
                    className="mt-2"
                    value={formValues.email}
                    onChange={handleFieldChange('email')}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="+63 9xx xxx xxxx"
                    className="mt-2"
                    value={formValues.phone}
                    onChange={handleFieldChange('phone')}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Delivery details
              </h2>
              <div>
                <label className="text-sm font-semibold text-foreground/80">
                  Address
                </label>
                <Input
                  placeholder="Street address"
                  className="mt-2"
                  value={formValues.address}
                  onChange={handleFieldChange('address')}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    City
                  </label>
                  <Input
                    placeholder="City"
                    className="mt-2"
                    value={formValues.city}
                    onChange={handleFieldChange('city')}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground/80">
                    Postal code
                  </label>
                  <Input
                    placeholder="8600"
                    className="mt-2"
                    value={formValues.postalCode}
                    onChange={handleFieldChange('postalCode')}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">
                Product notes
              </label>
              <Input
                placeholder="Preferred color, size, or special requests. Specify the product name."
                className="mt-2"
                value={formValues.productNotes}
                onChange={handleFieldChange('productNotes')}
              />
            </div>
            <div className="flex items-center gap-2 rounded-3xl border border-border bg-muted p-4 text-sm text-muted-foreground">
              <Truck className="h-4 w-4" />
              Delivery arrives in 2-3 business days once checkout is complete.
            </div>
          </CardContent>
        </Card>
        <OrderSummary
          items={cartItems.map((item) => ({
            id: item.productId,
            name: item.product?.name ?? 'Item',
            quantity: item.quantity,
            total: (item.product?.price ?? 0) * item.quantity,
          }))}
          emptyMessage="No items selected for checkout. Return to your cart to choose items."
          itemCount={selectedItemCount}
          subtotal={selectedSubtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          primaryActionLabel={orderPlaced ? 'Order placed' : 'Place order'}
          onPrimaryAction={() => {
            if (orderPlaced) {
              return
            }
            setIsPlaceDialogOpen(true)
          }}
          primaryActionDisabled={
            !hasSelection || !isFormComplete || orderPlaced
          }
          secondaryActionLabel="Edit cart"
          secondaryActionTo="/cart"
        />
        <AlertDialog
          open={isPlaceDialogOpen}
          onOpenChange={setIsPlaceDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Place this order?</AlertDialogTitle>
              <AlertDialogDescription>
                Please confirm you want to place this order. You can edit your
                cart if you need to make changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setOrderPlaced(true)
                  setFormValues(initialFormValues)
                  clearSelected()
                  if (typeof window !== 'undefined') {
                    window.sessionStorage.removeItem('zuna-checkout-form')
                  }
                  setIsPlaceDialogOpen(false)
                }}
              >
                Yes, place order
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default Checkout
