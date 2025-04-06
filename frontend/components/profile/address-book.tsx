"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Plus, MapPin, Edit, Trash } from "lucide-react"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppDispatch } from "@/lib/hooks"
import { updateAddress } from "@/lib/redux/slices/userSlice"
import type { Address } from "@/lib/types"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  streetAddress: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  postalCode: z.string().min(5, { message: "Postal code must be at least 5 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
})

type FormData = z.infer<typeof formSchema>

export default function AddressBook() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([
    {
      fullName: "John Doe",
      streetAddress: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
  ])

  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // In a real app, you would make an API call here
      // const response = await fetch('/api/user/addresses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAddresses([...addresses, data])
      dispatch(updateAddress(data))

      toast({
        title: "Address added",
        description: "Your address has been added successfully",
      })

      reset()
      setIsDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAddress = (index: number) => {
    const newAddresses = [...addresses]
    newAddresses.splice(index, 1)
    setAddresses(newAddresses)

    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully",
    })
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Address Book</CardTitle>
        <CardDescription>Manage your shipping addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                  <DialogDescription>Add a new shipping address to your account</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} id="address-form" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                  </div>

                  <div className="space-y-2">
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

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                </form>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="address-form"
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Address"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No addresses yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add a shipping address to make checkout faster.</p>
              <Button className="mt-6 bg-purple-600 hover:bg-purple-700" onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Address
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address, index) => (
                <div key={index} className="border rounded-lg p-4 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteAddress(index)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>

                  <div className="space-y-1 pr-16">
                    <h3 className="font-medium">{address.fullName}</h3>
                    <p className="text-sm text-muted-foreground">{address.streetAddress}</p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{address.country}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </>
  )
}

