"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AddProductPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setIsSaving(true);

  try {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      throw new Error("No token is provided");
    }

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.image
    ) {
      throw new Error("Please fill in all required fields");
    }

    const response = await fetch("http://localhost:4000/api/v1/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        image: product.image
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create product");
    }

    toast("Product created", {
      description: `${product.name} has been added to your inventory.`,
    });

    router.push("/products");
  } catch (error) {
    console.error("Error creating product:", error);
    toast("Error", {
      description:
        error instanceof Error ? error.message : "Failed to create product",
    });
  } finally {
    setIsSaving(false);
  }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Detailed product description"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">
                    Image URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    placeholder="Product image URL"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price ($) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">
                      Stock <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={product.stock}
                      onChange={handleChange}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Product...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Product
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}