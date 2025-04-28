import type { Metadata } from "next"
import { connectToMongoDB } from "@/lib/mongoose"
import Post from "@/lib/models/post"
import LatestPosts from "@/components/latest-posts"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const { q } = searchParams

  return {
    title: `Search: ${q || "All Posts"} | Inkwell`,
    description: `Search results for "${q}" on Inkwell.`,
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = searchParams
  const query = q || ""

  await connectToMongoDB()

  let posts = []

  if (query) {
    posts = await Post.find({
      $and: [
        { status: "published" },
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { excerpt: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
            { tags: { $in: [new RegExp(query, "i")] } },
          ],
        },
      ],
    })
      .sort({ publishedAt: -1 })
      .populate("author", "name username image")
      .populate("category", "name slug")
  } else {
    posts = await Post.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(12)
      .populate("author", "name username image")
      .populate("category", "name slug")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{query ? `Search results for "${query}"` : "All Posts"}</h1>
        <p className="mt-2 text-muted-foreground">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </div>

      {posts.length > 0 ? (
        <LatestPosts posts={JSON.parse(JSON.stringify(posts))} />
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No posts found</h2>
          <p className="text-muted-foreground">
            We couldn&apos;t find any posts matching your search. Try using different keywords.
          </p>
        </div>
      )}
    </div>
  )
}
