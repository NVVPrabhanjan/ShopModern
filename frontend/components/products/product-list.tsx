"use client"

import { useEffect, useState } from "react"

import ProductCard from "./product-card"
import type { Product } from "@/lib/types"

interface ProductListProps {
  category?: string
  sort?: string
}

export default function ProductList({ category, sort = "featured" }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch from your API with query params
        // const response = await axios.get(`/api/products?category=${category}&sort=${sort}`)

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
          {
            id: "9",
            name: "Desk Lamp",
            description: "Adjustable desk lamp with multiple brightness levels",
            price: 34.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Home",
            stock: 45,
            featured: false,
          },
          {
            id: "10",
            name: "Coffee Maker",
            description: "Programmable coffee maker with thermal carafe",
            price: 89.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Home",
            stock: 15,
            featured: false,
          },
          {
            id: "11",
            name: "Yoga Mat",
            description: "Non-slip yoga mat with carrying strap",
            price: 24.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Fitness",
            stock: 50,
            featured: false,
          },
          {
            id: "12",
            name: "Water Bottle",
            description: "Insulated water bottle that keeps drinks cold for 24 hours",
            price: 19.99,
            image: "/placeholder.svg?height=400&width=400",
            category: "Accessories",
            stock: 100,
            featured: false,
          },
        ]

        // Filter by category if provided
        let filteredProducts = mockProducts
        if (category && category !== "all") {
          filteredProducts = mockProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
        }

        // Sort products
        const sortedProducts = [...filteredProducts]
        switch (sort) {
          case "price-asc":
            sortedProducts.sort((a, b) => a.price - b.price)
            break
          case "price-desc":
            sortedProducts.sort((a, b) => b.price - a.price)
            break
          case "newest":
            // In a real app, you would sort by date
            sortedProducts.reverse()
            break
          case "featured":
          default:
            sortedProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
            break
        }

        // Simulate API delay
        setTimeout(() => {
          setProducts(sortedProducts)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to fetch products")
        setLoading(false)
        console.error(err)
      }
    }

    fetchProducts()
  }, [category, sort])

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground">Try changing your filters or search term</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

