import { connectToMongoDB } from "@/lib/mongoose"
import Post from "@/lib/models/post"
import LatestPosts from "@/components/latest-posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Posts | Inkwell",
  description: "Browse all published posts on Inkwell.",
}

export default async function PostsPage() {
  await connectToMongoDB()
  const posts = await Post.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .populate("author", "name username image")
    .populate("category", "name slug")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">All Posts</h1>
      {posts.length > 0 ? (
        <LatestPosts posts={JSON.parse(JSON.stringify(posts))} />
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No posts found</h2>
          <p className="mb-4 text-muted-foreground">There are no posts yet.</p>
        </div>
      )}
    </div>
  )
} 