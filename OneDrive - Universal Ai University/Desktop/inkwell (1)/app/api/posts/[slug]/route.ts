import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { getPostBySlug, updatePost, deletePost, incrementPostViews } from "@/lib/models"
import { authOptions } from "../../auth/[...nextauth]/route"
import { serializeDocument } from "@/lib/models"

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Increment view count
    await incrementPostViews(slug)

    return NextResponse.json({ post: serializeDocument(post) })
  } catch (error) {
    console.error("Get post error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const { slug } = params

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, newSlug, excerpt, content, category, tags, coverImage, status } = await req.json()

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Check if user is the author
    if (post.author._id.toString() !== session.user.id) {
      return NextResponse.json({ message: "You are not authorized to edit this post" }, { status: 403 })
    }

    // Update post
    const updateData: any = {}
    if (title) updateData.title = title
    if (newSlug) updateData.slug = newSlug
    if (excerpt) updateData.excerpt = excerpt
    if (content) updateData.content = content
    if (category) updateData.category = category
    if (tags) updateData.tags = tags
    if (coverImage) updateData.coverImage = coverImage
    if (status) updateData.status = status

    await updatePost(slug, updateData)

    const updatedPost = await getPostBySlug(newSlug || slug)

    return NextResponse.json({ post: serializeDocument(updatedPost) })
  } catch (error) {
    console.error("Update post error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const { slug } = params

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Check if user is the author
    if (post.author._id.toString() !== session.user.id) {
      return NextResponse.json({ message: "You are not authorized to delete this post" }, { status: 403 })
    }

    await deletePost(slug)

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Delete post error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
