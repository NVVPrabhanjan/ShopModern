"use client"

import { useEffect, useState } from "react"

import ProductCard from "./product-card"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch from your API
        // const response = await axios.get(`/api/products/related?id=${currentProductId}&category=${category}`)

        // Mock data for demonstration
        const mockProducts: Product[] = [
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
        ]

        // Filter out current product and limit to same category
        const filteredProducts = mockProducts
          .filter((p) => p.id !== currentProductId)
          .filter((p) => p.category === category)
          .slice(0, 4)

        // Simulate API delay
        setTimeout(() => {
          setProducts(filteredProducts)
          setLoading(false)
        }, 1000)
      } catch (err) {
        setError("Failed to fetch related products")
        setLoading(false)
        console.error(err)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, category])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden border shadow-sm">
            <div className="aspect-square bg-gray-100 animate-pulse"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-100 rounded animate-pulse mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>
  }

  if (products.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">No related products found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

