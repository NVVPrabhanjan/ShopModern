"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { logout } from "@/lib/redux/slices/userSlice"
import ProfileInfo from "./profile-info"
import OrderHistory from "./order-history"
import AddressBook from "./address-book"
import WishlistItems from "./wishlist-items"

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("profile")
  const router = useRouter()
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { isAuthenticated, currentUser } = useAppSelector((state) => state.user)

  if (!isAuthenticated || !currentUser) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    dispatch(logout())

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })

    router.push("/")
  }

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList className="grid grid-cols-4 w-[600px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <Button variant="outline" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          Logout
        </Button>
      </div>

      <TabsContent value="profile">
        <Card>
          <ProfileInfo user={currentUser} />
        </Card>
      </TabsContent>

      <TabsContent value="orders">
        <Card>
          <OrderHistory />
        </Card>
      </TabsContent>

      <TabsContent value="addresses">
        <Card>
          <AddressBook />
        </Card>
      </TabsContent>

      <TabsContent value="wishlist">
        <Card>
          <WishlistItems />
        </Card>
      </TabsContent>
    </Tabs>
  )
}

