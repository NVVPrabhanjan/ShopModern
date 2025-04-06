"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, CreditCard, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { clearCart } from "@/lib/redux/slices/cartSlice"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }),
  streetAddress: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  paymentMethod: z.enum(["credit", "paypal", "apple"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const { items } = useAppSelector((state) => state.cart)
  const { currentUser } = useAppSelector((state) => state.user)

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: "",
      streetAddress: currentUser?.address?.streetAddress || "",
      city: currentUser?.address?.city || "",
      state: currentUser?.address?.state || "",
      postalCode: currentUser?.address?.postalCode || "",
      country: currentUser?.address?.country || "USA",
      paymentMethod: "credit",
    },
  })

  const paymentMethod = watch("paymentMethod")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // In a real app, you would make an API call here
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, items }),
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      dispatch(clearCart())

      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      })

      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {step === 1 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="fullName" {...register("fullName")} className={errors.fullName ? "border-red-500" : ""} />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="streetAddress" className="text-sm font-medium">
                  Street Address
                </label>
                <Input
                  id="streetAddress"
                  {...register("streetAddress")}
                  className={errors.streetAddress ? "border-red-500" : ""}
                />
                {errors.streetAddress && <p className="text-sm text-red-500">{errors.streetAddress.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  City
                </label>
                <Input id="city" {...register("city")} className={errors.city ? "border-red-500" : ""} />
                {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">
                  State / Province
                </label>
                <Input id="state" {...register("state")} className={errors.state ? "border-red-500" : ""} />
                {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium">
                  Postal Code
                </label>
                <Input
                  id="postalCode"
                  {...register("postalCode")}
                  className={errors.postalCode ? "border-red-500" : ""}
                />
                {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">
                  Country
                </label>
                <Select
                  defaultValue="USA"
                  onValueChange={(value) => {
                    // @ts-ignore - react-hook-form doesn't handle this well
                    register("country").onChange({ target: { value } })
                  }}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="CAN">Canada</SelectItem>
                    <SelectItem value="GBR">United Kingdom</SelectItem>
                    <SelectItem value="AUS">Australia</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button type="button" className="bg-purple-600 hover:bg-purple-700" onClick={() => setStep(2)}>
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

            <RadioGroup
              defaultValue="credit"
              className="space-y-4"
              onValueChange={(value) => {
                // @ts-ignore - react-hook-form doesn't handle this well
                register("paymentMethod").onChange({ target: { value } })
              }}
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-colors">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-5 w-5" />
                  Credit / Debit Card
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-colors">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.5 8.25H4.5C3.67157 8.25 3 8.92157 3 9.75V18.75C3 19.5784 3.67157 20.25 4.5 20.25H19.5C20.3284 20.25 21 19.5784 21 18.75V9.75C21 8.92157 20.3284 8.25 19.5 8.25Z"
                      fill="#0070BA"
                    />
                    <path
                      d="M7.5 15.75C7.5 15.3358 7.83579 15 8.25 15H9.75C10.1642 15 10.5 15.3358 10.5 15.75C10.5 16.1642 10.1642 16.5 9.75 16.5H8.25C7.83579 16.5 7.5 16.1642 7.5 15.75Z"
                      fill="#0070BA"
                    />
                    <path
                      d="M12 15.75C12 15.3358 12.3358 15 12.75 15H14.25C14.6642 15 15 15.3358 15 15.75C15 16.1642 14.6642 16.5 14.25 16.5H12.75C12.3358 16.5 12 16.1642 12 15.75Z"
                      fill="#0070BA"
                    />
                  </svg>
                  PayPal
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:border-purple-500 transition-colors">
                <RadioGroupItem value="apple" id="apple" />
                <Label htmlFor="apple" className="flex items-center gap-2 cursor-pointer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.0415 11.3605C17.0195 9.52346 18.4415 8.50346 18.5055 8.46146C17.6535 7.19946 16.3335 7.04346 15.8655 7.02946C14.7975 6.92346 13.7655 7.67546 13.2215 7.67546C12.6615 7.67546 11.8335 7.04346 10.9335 7.06146C9.75747 7.07946 8.66347 7.74146 8.06347 8.78346C6.82347 10.8895 7.73947 14.0055 8.91747 15.8275C9.49947 16.7215 10.1895 17.7255 11.0975 17.6915C11.9815 17.6535 12.3255 17.1135 13.3895 17.1135C14.4375 17.1135 14.7615 17.6915 15.6855 17.6695C16.6335 17.6535 17.2335 16.7635 17.7935 15.8635C18.4615 14.8355 18.7335 13.8195 18.7455 13.7655C18.7215 13.7575 17.0655 13.1055 17.0415 11.3605Z"
                      fill="black"
                    />
                    <path
                      d="M15.4294 6.05999C15.9014 5.47199 16.2134 4.65599 16.1214 3.82799C15.4174 3.85799 14.5374 4.29599 14.0414 4.86599C13.6014 5.36999 13.2174 6.21599 13.3214 7.01999C14.1174 7.07999 14.9334 6.63599 15.4294 6.05999Z"
                      fill="black"
                    />
                  </svg>
                  Apple Pay
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "credit" && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number
                  </label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" {...register("cardNumber")} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cardExpiry" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <Input id="cardExpiry" placeholder="MM/YY" {...register("cardExpiry")} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cardCvc" className="text-sm font-medium">
                      CVC
                    </label>
                    <Input id="cardCvc" placeholder="123" {...register("cardCvc")} />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>

              <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.product.name}</h4>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Check className="h-4 w-4" />
              <span className="font-medium">Secure Checkout</span>
            </div>
            <p className="text-muted-foreground">
              Your payment information is processed securely. We do not store credit card details.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}

