import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import PostEditor from "@/components/post-editor"

export const metadata: Metadata = {
  title: "Create Post | Inkwell",
  description: "Create a new blog post on Inkwell",
}

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PostEditor />
    </div>
  )
}
