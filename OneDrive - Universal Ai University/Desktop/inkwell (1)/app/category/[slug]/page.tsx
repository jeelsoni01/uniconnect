import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { connectToMongoDB } from "@/lib/mongoose"
import Category from "@/lib/models/category"
import Post from "@/lib/models/post"
import LatestPosts from "@/components/latest-posts"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = params

  await connectToMongoDB()
  const category = await Category.findOne({ slug })

  if (!category) {
    return {
      title: "Category Not Found | Inkwell",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.name} | Inkwell`,
    description: `Browse all posts in the ${category.name} category.`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params

  await connectToMongoDB()
  const category = await Category.findOne({ slug })

  if (!category) {
    notFound()
  }

  const posts = await Post.find({
    category: category._id,
    status: "published",
  })
    .sort({ publishedAt: -1 })
    .populate("author", "name username image")
    .populate("category", "name slug")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        {category.description && <p className="mt-2 text-muted-foreground">{category.description}</p>}
      </div>

      {posts.length > 0 ? (
        <LatestPosts posts={JSON.parse(JSON.stringify(posts))} />
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No posts found</h2>
          <p className="mb-4 text-muted-foreground">There are no posts in this category yet.</p>
          <Link href="/">
            <Button>Browse other categories</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
