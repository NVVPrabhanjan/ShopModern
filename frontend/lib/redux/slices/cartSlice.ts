import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find((item) => item.productId === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({
          productId: product.id,
          quantity,
          product,
        })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload
      const item = state.items.find((item) => item.productId === productId)

      if (item) {
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    closeCart: (state) => {
      state.isOpen = false
    },
    openCart: (state) => {
      state.isOpen = true
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, closeCart, openCart } =
  cartSlice.actions

export default cartSlice.reducer

