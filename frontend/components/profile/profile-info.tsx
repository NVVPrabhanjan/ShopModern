"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, User, Camera } from "lucide-react"

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAppDispatch } from "@/lib/hooks"
import { updateProfile } from "@/lib/redux/slices/userSlice"
import type { User as UserType } from "@/lib/types"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormData = z.infer<typeof formSchema>

interface ProfileInfoProps {
  user: UserType
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      // In a real app, you would make an API call here
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      dispatch(updateProfile(data))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="profile-form">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border">
                {user.avatar ? (
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full hover:bg-purple-700 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change avatar</span>
              </button>
            </div>

            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>
                <div className="px-3 py-2 rounded-md bg-gray-50 text-sm">
                  {user.role === "admin" ? "Administrator" : "Customer"}
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          form="profile-form"
          disabled={isLoading || !isDirty}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </>
  )
}

