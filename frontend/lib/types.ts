export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  featured?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  address?: Address
  avatar?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  createdAt: string
}

export interface Address {
  fullName: string
  streetAddress: string
  city: string
  state: string
  postalCode: string
  country: string
}

