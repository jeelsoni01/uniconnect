import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToMongoDB } from "@/lib/mongoose"
import Post from "@/lib/models/post"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToMongoDB()

    const posts = await Post.find({ author: session.user.id })
      .sort({ createdAt: -1 })
      .populate("author", "name username image")
      .populate("category", "name slug")

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Get user posts error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
