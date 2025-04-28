import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Dashboard | Inkwell",
  description: "Manage your blog posts and account",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Dashboard />
    </div>
  )
}
