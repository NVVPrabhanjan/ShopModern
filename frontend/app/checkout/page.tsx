import type { Metadata } from "next"
import CheckoutForm from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Checkout | Modern E-Commerce Store",
  description: "Complete your purchase",
}

export default function CheckoutPage() {
  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  )
}

