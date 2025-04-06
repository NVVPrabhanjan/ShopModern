import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"
import RelatedProducts from "@/components/products/related-products"
import AddToCartButton from "@/components/products/add-to-cart-button"

async function getProduct(id: string): Promise<Product | null> {
  // In a real app, you would fetch from your API
  // const response = await fetch(`/api/products/${id}`)
  // return response.json()

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium sound quality with noise cancellation. These headphones feature Bluetooth 5.0 connectivity, 30-hour battery life, and comfortable over-ear design. Perfect for travel, work, or everyday use.",
      price: 199.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "Electronics",
      stock: 15,
      featured: true,
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Track your fitness and stay connected with this premium smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50 meters.",
      price: 249.99,
      image: "/placeholder.svg?height=600&width=600",
      category: "Electronics",
      stock: 10,
      featured: true,
    },
  ]

  const product = mockProducts.find((p) => p.id === id)
  return product || null
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="container px-4 py-12 md:py-16">
      <Link href="/products" className="inline-flex items-center text-sm mb-8 hover:text-purple-600 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative">
          <div className="sticky top-24">
            <div className="aspect-square relative rounded-xl overflow-hidden border shadow-sm">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Only {product.stock} left
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <div className="border rounded-lg p-2 w-24 h-24 cursor-pointer hover:border-purple-500 transition-colors">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="border rounded-lg p-2 w-24 h-24 cursor-pointer hover:border-purple-500 transition-colors">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Product view"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full rounded"
                />
              </div>
              <div className="border rounded-lg p-2 w-24 h-24 cursor-pointer hover:border-purple-500 transition-colors">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Product view"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full rounded"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-3">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
            <p className="text-3xl font-bold text-purple-600 mt-6">${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {product.stock > 0 ? (
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  In stock ({product.stock} available)
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                  Out of stock
                </span>
              )}
            </p>
          </div>

          <AddToCartButton product={product} />

          <div className="mt-10">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full grid grid-cols-3 rounded-lg bg-purple-50 p-1">
                <TabsTrigger
                  value="description"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specifications"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-sm"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="pt-6">
                <div className="space-y-4 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-3">
                    <span className="font-medium">Category</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-3">
                    <span className="font-medium">Brand</span>
                    <span>Premium Brand</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-3">
                    <span className="font-medium">Warranty</span>
                    <span>1 Year</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Shipping</span>
                    <span>Free Shipping</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      <span className="font-medium">JD</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">John Doe</h4>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm">Great product! Exactly as described and arrived quickly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      <span className="font-medium">JS</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Jane Smith</h4>
                        <span className="text-xs text-muted-foreground">1 week ago</span>
                      </div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm">Good quality but a bit pricey. Would recommend on sale.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-10">Related Products</h2>
        <RelatedProducts currentProductId={product.id} category={product.category} />
      </div>
    </main>
  )
}

