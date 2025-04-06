"use client"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const categories = [
    { id: "all", name: "All Products" },
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "accessories", name: "Accessories" },
    { id: "home", name: "Home & Living" },
  ]

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={currentCategory === category.id ? "default" : "outline"}
          onClick={() => handleCategoryChange(category.id)}
          className={`rounded-full px-5 transition-all ${
            currentCategory === category.id
              ? "bg-purple-600 hover:bg-purple-700"
              : "hover:border-purple-300 hover:text-purple-700"
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}

