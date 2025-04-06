"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/redux/slices/cartSlice"
import type { Product } from "@/lib/types"

export default function WishlistItems() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      description: "Premium sound quality with noise cancellation",
      price: 199.99,
      image: "/placeholder.svg?height=80&width=80",
      category: "Electronics",
      stock: 15,
    },
    {
      id: "5",
      name: "Bluetooth Speaker",
      description: "Portable speaker with amazing sound quality",
      price: 79.99,
      image: "/placeholder.svg?height=80&width=80",
      category: "Electronics",
      stock: 20,
    },
    {
      id: "8",
      name: "Sunglasses",
      description: "UV protection sunglasses with stylish design",
      price: 39.99,
      image: "/placeholder.svg?height=80&width=80",
      category: "Accessories",
      stock: 35,
    },
  ])

  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId))

    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    })
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }))

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
        <CardDescription>Items you've saved for later</CardDescription>
      </CardHeader>
      <CardContent>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-muted-foreground">Save items you like for future reference.</p>
            <Button className="mt-6 bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-start gap-4 border-b pb-6">
                <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">
                        <Link href={`/products/${item.id}`} className="hover:text-purple-600">
                          {item.name}
                        </Link>
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </>
  )
}

