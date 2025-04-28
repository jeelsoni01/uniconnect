import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { getPostBySlug, createComment, getCommentsByPostId } from "@/lib/models"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { ObjectId } from "mongodb"
import { serializeDocument } from "@/lib/models"

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    const comments = await getCommentsByPostId(post._id.toString())

    return NextResponse.json({ comments: serializeDocument(comments) })
  } catch (error) {
    console.error("Get comments error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions)
    const { slug } = params

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { content } = await req.json()

    if (!content) {
      return NextResponse.json({ message: "Comment content is required" }, { status: 400 })
    }

    const post = await getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 })
    }

    // Create comment
    const comment = await createComment({
      content,
      post: post._id,
      author: session.user.id,
      status: "approved", // Auto-approve for now
    })

    // Get author details
    const commentWithAuthor = {
      ...comment,
      author: {
        _id: new ObjectId(session.user.id),
        name: session.user.name,
        username: session.user.username,
        image: session.user.image,
      },
    }

    return NextResponse.json(
      { message: "Comment added successfully", comment: serializeDocument(commentWithAuthor) },
      { status: 201 },
    )
  } catch (error) {
    console.error("Add comment error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
