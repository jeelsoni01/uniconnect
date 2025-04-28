import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToMongoDB } from "@/lib/mongoose"
import Post from "@/lib/models/post"
import Category from "@/lib/models/category"
import User from "@/lib/models/user"
import { authOptions } from "../auth/[...nextauth]/route"
import { sendNewPostEmail } from "@/lib/email"
import { Db } from "mongodb"
import { Session } from "next-auth"

interface NewsletterSubscriber {
  email: string
  subscribedAt: Date
}

interface CustomSession extends Session {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions) as CustomSession

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, slug, excerpt, content, category, tags, coverImage, status } = await req.json()

    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToMongoDB()
    if (!db) {
      throw new Error("Database connection failed")
    }

    // Ensure User and Category models are registered
    await User.findById(session.user.id).exec()

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug })
    if (existingPost) {
      return NextResponse.json({ message: "A post with this slug already exists" }, { status: 409 })
    }

    // Find or create category
    let categoryDoc = await Category.findOne({ slug: category })
    if (!categoryDoc) {
      categoryDoc = await Category.create({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        slug: category,
      })
    }

    // Calculate reading time (rough estimate)
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)

    // Create post
    const post = await Post.create({
      title,
      slug,
      excerpt,
      content,
      category: categoryDoc._id,
      tags,
      coverImage,
      author: session.user.id,
      status,
      readingTime,
      publishedAt: status === "published" ? new Date() : null,
    })

    // Populate author and category
    await post.populate("author", "name username image")
    await post.populate("category", "name slug")

    // If post is published, send email to subscribers
    if (status === "published") {
      console.log('Post is published, attempting to send emails...');
      try {
        // Get all newsletter subscribers
        const subscribers = await db.collection<NewsletterSubscriber>("newsletter_subscribers").find({}).toArray()
        console.log('Found subscribers:', subscribers);
        const subscriberEmails = subscribers.map((subscriber: NewsletterSubscriber) => subscriber.email)

        // Send email to subscribers
        if (subscriberEmails.length > 0) {
          console.log('Sending emails to subscribers:', subscriberEmails);
          await sendNewPostEmail(subscriberEmails, post)
        } else {
          console.log('No subscribers found to send emails to');
        }
      } catch (error) {
        console.error("Error sending email notifications:", error)
        // Don't fail the post creation if email sending fails
      }
    } else {
      console.log('Post is not published, skipping email sending');
    }

    return NextResponse.json({ message: "Post created successfully", post }, { status: 201 })
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const featured = url.searchParams.get("featured") === "true"
    const category = url.searchParams.get("category")
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    await connectToMongoDB()

    const query: any = { status: "published" }

    if (featured) {
      query.featured = true
    }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }

    const posts = await Post.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name username image")
      .populate("category", "name slug")

    const total = await Post.countDocuments(query)

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get posts error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
