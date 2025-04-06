"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Eye, Package } from "lucide-react"

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Order } from "@/lib/types"

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-12345",
      userId: "1",
      items: [
        {
          productId: "1",
          quantity: 1,
          product: {
            id: "1",
            name: "Wireless Headphones",
            description: "Premium sound quality with noise cancellation",
            price: 199.99,
            image: "/placeholder.svg?height=80&width=80",
            category: "Electronics",
            stock: 15,
          },
        },
        {
          productId: "2",
          quantity: 1,
          product: {
            id: "2",
            name: "Smart Watch",
            description: "Track your fitness and stay connected",
            price: 249.99,
            image: "/placeholder.svg?height=80&width=80",
            category: "Electronics",
            stock: 10,
          },
        },
      ],
      total: 449.98,
      status: "delivered",
      shippingAddress: {
        fullName: "John Doe",
        streetAddress: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
      createdAt: "2023-04-15T10:30:00Z",
    },
    {
      id: "ORD-12346",
      userId: "1",
      items: [
        {
          productId: "3",
          quantity: 2,
          product: {
            id: "3",
            name: "Premium T-Shirt",
            description: "Comfortable cotton t-shirt for everyday wear",
            price: 29.99,
            image: "/placeholder.svg?height=80&width=80",
            category: "Fashion",
            stock: 50,
          },
        },
      ],
      total: 59.98,
      status: "processing",
      shippingAddress: {
        fullName: "John Doe",
        streetAddress: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "USA",
      },
      createdAt: "2023-05-20T14:45:00Z",
    },
  ])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">When you place orders, they will appear here.</p>
                <Button className="mt-6 bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/profile/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded overflow-hidden border">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="font-medium">${(item.quantity * item.product.price).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="processing">
            <div className="space-y-6">
              {orders
                .filter((order) => order.status === "processing")
                .map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/profile/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded overflow-hidden border">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="font-medium">${(item.quantity * item.product.price).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="shipped">
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No shipped orders</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You don't have any orders that are currently being shipped.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="delivered">
            <div className="space-y-6">
              {orders
                .filter((order) => order.status === "delivered")
                .map((order) => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Placed on {format(new Date(order.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/profile/orders/${order.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded overflow-hidden border">
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="font-medium">${(item.quantity * item.product.price).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  )
}

