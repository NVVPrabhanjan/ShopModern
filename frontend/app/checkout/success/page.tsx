import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, Package, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Order Confirmation | Modern E-Commerce Store",
  description: "Your order has been placed successfully",
}

export default function OrderSuccessPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully. We've sent a confirmation email with all the details.
        </p>

        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Order #ORD-12347</h2>
            <span className="text-sm text-muted-foreground">April 2, 2023</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-purple-600" />
              <span>Your order is being processed</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-purple-600" />
              <span>Estimated delivery: April 5-7, 2023</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/profile/orders">View Order</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

