"use client"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { closeCart, removeFromCart, updateQuantity } from "@/lib/redux/slices/cartSlice"

export default function CartDrawer() {
  const dispatch = useAppDispatch()
  const { items, isOpen } = useAppSelector((state) => state.cart)

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId))
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return

    const item = items.find((item) => item.productId === productId)
    if (item && quantity > item.product.stock) return

    dispatch(updateQuantity({ productId, quantity }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && dispatch(closeCart())}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart ({items.reduce((total, item) => total + item.quantity, 0)} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative w-24 h-24 text-muted-foreground">
              <ShoppingCart className="w-full h-full" strokeWidth={1} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-medium text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Button onClick={() => dispatch(closeCart())} asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-6">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.productId} className="flex gap-4">
                    <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <div className="ml-auto font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <SheetFooter className="mt-6">
                <div className="grid w-full gap-4">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link href="/checkout" onClick={() => dispatch(closeCart())}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={() => dispatch(closeCart())}>
                    Continue Shopping
                  </Button>
                </div>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

