import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToMongoDB } from "@/lib/mongoose"
import Post from "@/lib/models/post"
import Category from "@/lib/models/category"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(req.url)
    const categorySlug = url.searchParams.get("category")

    if (!categorySlug) {
      return NextResponse.json({ message: "Category is required" }, { status: 400 })
    }

    await connectToMongoDB()

    // Find the category
    const category = await Category.findOne({ slug: categorySlug.toLowerCase() })
    
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 })
    }

    // Delete all posts in the category
    const result = await Post.deleteMany({ category: category._id })

    return NextResponse.json({ 
      message: `Successfully deleted ${result.deletedCount} posts from category ${categorySlug}`,
      deletedCount: result.deletedCount 
    })

  } catch (error) {
    console.error("Delete posts error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
} 