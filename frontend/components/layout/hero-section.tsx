import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
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
  )
}

