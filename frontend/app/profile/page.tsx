import type { Metadata } from "next"
import ProfileTabs from "@/components/profile/profile-tabs"

export const metadata: Metadata = {
  title: "Profile | Modern E-Commerce Store",
  description: "Manage your profile and orders",
}

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        <ProfileTabs />
      </div>
    </div>
  )
}

