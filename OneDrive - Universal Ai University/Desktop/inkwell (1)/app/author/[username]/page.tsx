import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { connectToMongoDB } from "@/lib/mongoose"
import User from "@/lib/models/user"
import Post from "@/lib/models/post"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LatestPosts from "@/components/latest-posts"

interface AuthorPageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { username } = params

  await connectToMongoDB()
  const user = await User.findOne({ username })

  if (!user) {
    return {
      title: "Author Not Found | Inkwell",
      description: "The requested author could not be found.",
    }
  }

  return {
    title: `${user.name} | Inkwell`,
    description: user.bio || `Articles written by ${user.name}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { username } = params

  await connectToMongoDB()
  const user = await User.findOne({ username })

  if (!user) {
    notFound()
  }

  const posts = await Post.find({
    author: user._id,
    status: "published",
  })
    .sort({ publishedAt: -1 })
    .populate("author", "name username image")
    .populate("category", "name slug")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:ml-6 md:mt-0">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            {user.bio && <p className="mt-2 text-muted-foreground">{user.bio}</p>}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold">Articles by {user.name}</h2>
      </div>

      {posts.length > 0 ? (
        <LatestPosts posts={JSON.parse(JSON.stringify(posts))} />
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold">No posts found</h2>
          <p className="text-muted-foreground">This author hasn&apos;t published any posts yet.</p>
        </div>
      )}
    </div>
  )
}
