"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(addToCart({ product, quantity: 1 }))

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-lg">
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <p className="text-white font-semibold text-lg">Out of Stock</p>
            </div>
          )}
          <button
            onClick={handleToggleWishlist}
            className="absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur-sm p-2 shadow-sm transition-all hover:bg-white hover:scale-110"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            <span className="sr-only">Add to wishlist</span>
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-base md:text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
            </div>
            <p className="font-semibold text-lg md:text-xl text-purple-600">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-4">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all group-hover:shadow-md"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

