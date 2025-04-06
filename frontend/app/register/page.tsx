import Link from "next/link"
import type { Metadata } from "next"
import RegisterForm from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Modern E-Commerce Store",
  description: "Create a new account",
}

export default function RegisterPage() {
  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-700" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">ShopModern</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Joining ShopModern was one of the best decisions I've made. The exclusive deals and personalized
              recommendations are spot on!"
            </p>
            <footer className="text-sm">Michael Thompson</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-8 lg:p-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

