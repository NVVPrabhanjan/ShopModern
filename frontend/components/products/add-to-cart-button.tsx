"use client"

import { useState } from "react"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }))

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-2">
          Quantity
        </label>
        <Select defaultValue="1" onValueChange={(value) => setQuantity(Number.parseInt(value))}>
          <SelectTrigger className="w-32 rounded-lg">
            <SelectValue placeholder="Quantity" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(Math.min(10, product.stock))].map((_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="sm:flex-1 bg-purple-600 hover:bg-purple-700"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="sm:flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
        >
          <Heart className="mr-2 h-5 w-5" />
          Add to Wishlist
        </Button>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-700">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}

