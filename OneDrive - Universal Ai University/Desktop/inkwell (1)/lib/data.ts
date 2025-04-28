import { connectToMongoDB } from "./mongoose"
import Post from "./models/post"
import Category from "./models/category"
import User from "./models/user"

// Initialize models
import "./models/user"
import "./models/post"
import "./models/category"

export async function getPosts({
  featured = false,
  limit = 10,
  page = 1,
  category = "",
}: {
  featured?: boolean
  limit?: number
  page?: number
  category?: string
} = {}) {
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

  const skip = (page - 1) * limit

  const posts = await Post.find(query)
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "name username image")
    .populate("category", "name slug")

  return JSON.parse(JSON.stringify(posts))
}

export async function getCategories() {
  await connectToMongoDB()

  const categories = await Category.find()

  // Get post count for each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const postCount = await Post.countDocuments({
        category: category._id,
        status: "published",
      })
      return {
        ...category.toObject(),
        postCount,
      }
    }),
  )

  return JSON.parse(JSON.stringify(categoriesWithCount))
}

export async function searchPosts(query: string) {
  await connectToMongoDB()

  if (!query || query.trim().length < 2) {
    return []
  }

  const posts = await Post.find({
    $and: [
      { status: "published" },
      {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { excerpt: { $regex: query, $options: "i" } },
          { tags: { $in: [new RegExp(query, "i")] } },
        ],
      },
    ],
  })
    .sort({ publishedAt: -1 })
    .limit(5)
    .populate("author", "name username image")
    .populate("category", "name slug")

  return JSON.parse(JSON.stringify(posts))
}
