"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { toggleCart } from "@/lib/redux/slices/cartSlice"

export default function HeaderActions() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const { isAuthenticated } = useAppSelector((state) => state.user)

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="hidden md:flex">
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      <Button variant="ghost" size="icon" className="relative">
        <Heart className="h-5 w-5" />
        <span className="sr-only">Wishlist</span>
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
          3
        </span>
      </Button>

      <Button variant="ghost" size="icon" className="relative" onClick={handleCartClick}>
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Cart</span>
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">
            {cartItemsCount}
          </span>
        )}
      </Button>

      {isAuthenticated ? (
        <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
          <Link href="/profile">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
      ) : (
        <Button variant="ghost" className="hidden md:flex" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      )}

      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Menu</span>
      </Button>
    </div>
  )
}

