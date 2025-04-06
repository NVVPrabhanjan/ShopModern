import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedProducts from "@/components/products/featured-products"
import CategoryFilter from "@/components/products/category-filter"
import ProductSkeleton from "@/components/products/product-skeleton"

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative bg-gradient-to-r from-violet-500 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-20"></div>
        </div>
        <div className="container px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-2">
                <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
                Limited Time Offer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Summer Sale <br />
                <span className="text-yellow-300">Up to 50% Off</span>
              </h1>
              <p className="text-xl text-white/80 max-w-[600px]">
                Discover our latest collection of products with amazing discounts. Limited time offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" variant="default" className="bg-white text-purple-700 hover:bg-white/90" asChild>
                  <Link href="/products">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <Link href="/products?category=featured">Explore Featured</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-white/10 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Summer collection"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12">
                  50% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground mt-2">Discover our top picks just for you</p>
          </div>
          <div className="w-full md:w-auto flex items-center gap-3">
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-9 rounded-full border-purple-200 focus-visible:ring-purple-500"
              />
            </div>
            <Link href="/products">
              <Button variant="outline" className="rounded-full">
                View All
              </Button>
            </Link>
          </div>
        </div>

        <CategoryFilter />

        <Suspense fallback={<ProductSkeletonGrid />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">On orders over $50</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
              <p className="text-muted-foreground">Protected by industry standards</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-600 to-violet-600 text-white py-16 md:py-24">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-3">Join Our Newsletter</h2>
              <p className="text-white/80">Stay updated with the latest products and deals</p>
            </div>
            <div className="flex w-full md:w-auto gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/50"
              />
              <Button variant="secondary" className="bg-white text-purple-700 hover:bg-white/90">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
    </div>
  )
}

