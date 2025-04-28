import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import ProfileForm from "@/components/profile-form"

export const metadata: Metadata = {
  title: "Profile | Inkwell",
  description: "Update your profile information",
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileForm />
    </div>
  )
}
