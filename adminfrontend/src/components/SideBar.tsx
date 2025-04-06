'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Box, LayoutDashboard, LogOut, Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-white border-r">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <Box className="h-6 w-6" />
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 flex flex-col py-4 px-4 space-y-1">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            pathname === "/admin/dashboard" ? "bg-gray-100 text-primary" : "text-muted-foreground",
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/products"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            pathname.startsWith("/admin/products") ? "bg-gray-100 text-primary" : "text-muted-foreground",
          )}
        >
          <Package className="h-4 w-4" />
          Products
        </Link>
        <Link
          href="/orders"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            pathname === "/admin/orders" ? "bg-gray-100 text-primary" : "text-muted-foreground",
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          Orders
        </Link>
        <Link
          href="/customers"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
            pathname === "/admin/customers" ? "bg-gray-100 text-primary" : "text-muted-foreground",
          )}
        >
          <Users className="h-4 w-4" />
          Customers
        </Link>
      </div>
      <div className="border-t p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
