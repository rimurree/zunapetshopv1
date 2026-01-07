import { createContext } from 'react'

export type CartItem = {
  productId: string
  quantity: number
}

export type CartContextValue = {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  selectedIds: string[]
  toggleSelected: (productId: string) => void
  clearSelected: () => void
  itemCount: number
  subtotal: number
  selectedItemCount: number
  selectedSubtotal: number
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)
