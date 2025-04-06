"use client"

import { useEffect, useState } from "react"

import ProductCard from "./product-card"
import type { Product } from "@/lib/types"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch from your API
        // const response = await axios.get('/api/products/featured')

        // Mock data for demonstration
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Wireless Headphones",
            description: "Premium sound quality with noise cancellation",
            price: 199.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Electronics",
            stock: 15,
            featured: true,
          },
          {
            id: "2",
            name: "Smart Watch",
            description: "Track your fitness and stay connected",
            price: 249.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Electronics",
            stock: 10,
            featured: true,
          },
          {
            id: "3",
            name: "Premium T-Shirt",
            description: "Comfortable cotton t-shirt for everyday wear",
            price: 29.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Fashion",
            stock: 50,
            featured: true,
          },
          {
            id: "4",
            name: "Leather Wallet",
            description: "Genuine leather wallet with multiple card slots",
            price: 49.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Accessories",
            stock: 25,
            featured: true,
          },
          {
            id: "5",
            name: "Bluetooth Speaker",
            description: "Portable speaker with amazing sound quality",
            price: 79.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Electronics",
            stock: 20,
            featured: true,
          },
          {
            id: "6",
            name: "Running Shoes",
            description: "Lightweight and comfortable running shoes",
            price: 89.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Fashion",
            stock: 30,
            featured: true,
          },
          {
            id: "7",
            name: "Backpack",
            description: "Durable backpack with multiple compartments",
            price: 59.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Accessories",
            stock: 40,
            featured: true,
          },
          {
            id: "8",
            name: "Sunglasses",
            description: "UV protection sunglasses with stylish design",
            price: 39.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Accessories",
            stock: 35,
            featured: true,
          },
        ]

        // Simulate API delay
        setTimeout(() => {
          setProducts(mockProducts)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to fetch products")
        setLoading(false)
        console.error(err)
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

