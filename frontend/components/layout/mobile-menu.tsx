"use client"

import { useState } from "react"
import Link from "next/link"
import { User, ShoppingBag, Heart, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { logout } from "@/lib/redux/slices/userSlice"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {isAuthenticated && currentUser && (
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Navigation</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/products" onClick={() => setOpen(false)}>
                  Products
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/categories" onClick={() => setOpen(false)}>
                  Categories
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/about" onClick={() => setOpen(false)}>
                  About
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Account</h3>
            <div className="space-y-1">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile" onClick={() => setOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile/orders" onClick={() => setOpen(false)}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      My Orders
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/profile/wishlist" onClick={() => setOpen(false)}>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Create Account
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

