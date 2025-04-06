import { Suspense } from "react"
import { Filter, SlidersHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductList from "@/components/products/product-list"
import ProductSkeleton from "@/components/products/product-skeleton"
import CategoryFilter from "@/components/products/category-filter"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "featured"

  return (
    <main className="container px-4 py-12 md:py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2">Browse our collection of products</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-9 rounded-full border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          <Select defaultValue={sort}>
            <SelectTrigger className="w-full sm:w-[180px] rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="sm:hidden rounded-full">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div className="hidden md:block space-y-8">
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h3 className="font-semibold mb-6 flex items-center text-lg">
              <SlidersHorizontal className="mr-2 h-5 w-5 text-purple-600" />
              Filters
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                <div className="flex flex-col gap-2">
                  <CategoryFilter />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="Min" className="rounded-lg" />
                  <Input type="number" placeholder="Max" className="rounded-lg" />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-sm font-medium mb-3">Availability</h4>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" />
                    Out of Stock
                  </label>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">Apply Filters</Button>
          </div>
        </div>

        <div>
          <Suspense fallback={<ProductSkeletonGrid />}>
            <ProductList category={category} sort={sort} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
    </div>
  )
}

