/* eslint-disable react-refresh/only-export-components */
import { useCallback, useMemo, useState, useEffect } from 'react'
import { products } from '@/data/products'
import { CartContext, type CartContextValue, type CartItem } from '@/context/cartStore'

const productMap = Object.fromEntries(
  products.map((product) => [product.id, product])
)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }
    try {
      const stored = window.localStorage.getItem('zuna-cart')
      return stored ? (JSON.parse(stored) as CartItem[]) : []
    } catch {
      return []
    }
  })
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }
    try {
      const stored = window.localStorage.getItem('zuna-cart-selected')
      return stored ? (JSON.parse(stored) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem('zuna-cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.localStorage.setItem('zuna-cart-selected', JSON.stringify(selectedIds))
  }, [selectedIds])

  const addItem = useCallback((productId: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId)
      if (!existing) {
        return [...current, { productId, quantity }]
      }
      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) =>
        current.filter((item) => item.productId !== productId)
      )
      setSelectedIds((current) => current.filter((id) => id !== productId))
      return
    }
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId)
    )
    setSelectedIds((current) => current.filter((id) => id !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setSelectedIds([])
  }, [])

  const toggleSelected = useCallback((productId: string) => {
    setSelectedIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }, [])

  const clearSelected = useCallback(() => {
    setSelectedIds([])
  }, [])

  const { itemCount, subtotal, selectedItemCount, selectedSubtotal } = useMemo(
    () => {
      let count = 0
      let total = 0
      let selectedCount = 0
      let selectedTotal = 0
      for (const item of items) {
        const product = productMap[item.productId]
        if (!product) {
          continue
        }
        count += item.quantity
        total += item.quantity * product.price
        if (selectedIds.includes(item.productId)) {
          selectedCount += item.quantity
          selectedTotal += item.quantity * product.price
        }
      }
      return {
        itemCount: count,
        subtotal: total,
        selectedItemCount: selectedCount,
        selectedSubtotal: selectedTotal,
      }
    },
    [items, selectedIds],
  )

  const value: CartContextValue = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      selectedIds,
      toggleSelected,
      clearSelected,
      itemCount,
      subtotal,
      selectedItemCount,
      selectedSubtotal,
    }),
    [
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      selectedIds,
      toggleSelected,
      clearSelected,
      itemCount,
      subtotal,
      selectedItemCount,
      selectedSubtotal,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { useCart } from '@/context/useCart'
