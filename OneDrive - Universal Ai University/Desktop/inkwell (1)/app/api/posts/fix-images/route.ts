import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToMongoDB } from "@/lib/mongoose"
import Post from "@/lib/models/post"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToMongoDB()

    // Find all posts
    const posts = await Post.find({})

    // Update each post's coverImage if it's a valid URL
    for (const post of posts) {
      if (post.coverImage) {
        // Check if it's already a valid URL
        if (!post.coverImage.startsWith('http://') && !post.coverImage.startsWith('https://')) {
          // If not a valid URL, update with default placeholder
          post.coverImage = '/placeholder.jpg'
          await post.save()
        }
      } else {
        // If no cover image, set default placeholder
        post.coverImage = '/placeholder.jpg'
        await post.save()
      }
    }

    return NextResponse.json({ 
      message: `Successfully updated ${posts.length} posts`,
      updatedCount: posts.length 
    })

  } catch (error) {
    console.error("Fix post images error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
} 