import { MongoClient, ObjectId } from "mongodb"
import { hash, compare } from "bcryptjs"

// Types
export interface Post {
  _id?: ObjectId
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: ObjectId | string
  tags: string[]
  author: ObjectId | string
  publishedAt?: Date
  createdAt?: Date
  featured?: boolean
  views?: number
  readingTime?: number
  status: "draft" | "published"
}

export interface User {
  _id?: ObjectId
  name: string
  username: string
  email: string
  password: string
  image?: string
  bio?: string
  role: "user" | "admin"
  createdAt?: Date
}

export interface Category {
  _id?: ObjectId
  name: string
  slug: string
  description?: string
}

export interface Comment {
  _id?: ObjectId
  postId: ObjectId
  author: ObjectId
  content: string
  createdAt?: Date
}

// Database connection
export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!)
  const db = client.db(process.env.MONGODB_DB)
  return { client, db }
}

// Helper function to serialize MongoDB documents
export function serializeDocument(doc: any) {
  return JSON.parse(JSON.stringify(doc))
}

// Post operations
export async function createPost(postData: Omit<Post, "_id">) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  // Check if slug already exists
  const existingPost = await db.collection("posts").findOne({ slug: postData.slug })
  if (existingPost) {
    throw new Error("A post with this slug already exists")
  }

  // Find or create category
  let categoryId = postData.category
  if (typeof categoryId === "string" && !ObjectId.isValid(categoryId)) {
    const categorySlug = categoryId
    const existingCategory = await db.collection("categories").findOne({ slug: categorySlug })

    if (existingCategory) {
      categoryId = existingCategory._id
    } else {
      const categoryName = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)
      const newCategory = {
        name: categoryName,
        slug: categorySlug,
        description: "",
      }
      const result = await db.collection("categories").insertOne(newCategory)
      categoryId = result.insertedId
    }
  }

  // Calculate reading time (rough estimate)
  const wordsPerMinute = 200
  const wordCount = postData.content.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  // Create post
  const newPost = {
    ...postData,
    category: typeof categoryId === "string" ? new ObjectId(categoryId) : categoryId,
    author: typeof postData.author === "string" ? new ObjectId(postData.author) : postData.author,
    publishedAt: postData.status === "published" ? new Date() : null,
    createdAt: new Date(),
    featured: postData.featured || false,
    views: postData.views || 0,
    readingTime,
  }

  const result = await db.collection("posts").insertOne(newPost)
  return { ...newPost, _id: result.insertedId }
}

export async function getPostBySlug(slug: string) {
  let client;
  try {
    // Decode the URL-encoded slug
    const decodedSlug = decodeURIComponent(slug)
    console.log("Decoded slug:", decodedSlug)

    const { client: dbClient, db } = await connectToDatabase()
    client = dbClient
    
    if (!db) {
      console.error("Database connection failed")
      return null
    }

    console.log("Searching for post with slug:", decodedSlug)
    const post = await db.collection("posts").findOne({ slug: decodedSlug })
    
    if (!post) {
      console.log("Post not found for slug:", decodedSlug)
      return null
    }

    console.log("Found post:", post._id)
    
    // Get author and category details
    const [author, category] = await Promise.all([
      db.collection("users").findOne({ _id: post.author }),
      db.collection("categories").findOne({ _id: post.category })
    ])

    if (!author) {
      console.error("Author not found for post:", decodedSlug, "Author ID:", post.author)
      return null
    }

    if (!category) {
      console.error("Category not found for post:", decodedSlug, "Category ID:", post.category)
      return null
    }

    const result = {
      ...post,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      status: post.status,
      author: {
        _id: author._id,
        name: author.name,
        username: author.username,
        image: author.image,
        bio: author.bio,
      },
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
    }

    console.log("Successfully retrieved post with details")
    return result
  } catch (error) {
    console.error("Error in getPostBySlug:", error)
    return null
  } finally {
    if (client) {
      await client.close()
    }
  }
}

export async function getPosts(
  options: {
    featured?: boolean
    limit?: number
    page?: number
    category?: string
    author?: string
    status?: "draft" | "published"
  } = {},
) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  const { featured, limit = 10, page = 1, category, author, status = "published" } = options

  const query: any = { status }

  if (featured) {
    query.featured = true
  }

  if (category) {
    const categoryDoc = await db.collection("categories").findOne({ slug: category })
    if (categoryDoc) {
      query.category = categoryDoc._id
    }
  }

  if (author) {
    if (ObjectId.isValid(author)) {
      query.author = new ObjectId(author)
    } else {
      const authorDoc = await db.collection("users").findOne({ username: author })
      if (authorDoc) {
        query.author = authorDoc._id
      }
    }
  }

  const skip = (page - 1) * limit

  const posts = await db.collection("posts").find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit).toArray()

  const total = await db.collection("posts").countDocuments(query)

  // Get author and category details for each post
  const postsWithDetails = await Promise.all(
    posts.map(async (post) => {
      const author = await db.collection("users").findOne({ _id: post.author })
      const category = await db.collection("categories").findOne({ _id: post.category })

      if (!author || !category) {
        throw new Error("Author or category not found")
      }

      return {
        ...post,
        author: {
          _id: author._id,
          name: author.name,
          username: author.username,
          image: author.image,
        },
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug,
        },
      }
    }),
  )

  return {
    posts: postsWithDetails,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  }
}

export async function updatePost(slug: string, postData: Partial<Post>) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  // Check if new slug already exists
  if (postData.slug && postData.slug !== slug) {
    const existingPost = await db.collection("posts").findOne({
      slug: postData.slug,
      _id: { $ne: new ObjectId(slug) },
    })

    if (existingPost) {
      throw new Error("A post with this slug already exists")
    }
  }

  // If status changed to published, update publishedAt
  if (postData.status === "published") {
    const post = await db.collection("posts").findOne({ slug })
    if (post && post.status !== "published") {
      postData.publishedAt = new Date()
    }
  }

  const result = await db.collection("posts").updateOne({ slug }, { $set: postData })

  return result.modifiedCount > 0
}

export async function deletePost(slug: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  const result = await db.collection("posts").deleteOne({ slug })
  return result.deletedCount > 0
}

export async function incrementPostViews(slug: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  await db.collection("posts").updateOne({ slug }, { $inc: { views: 1 } })
}

export async function searchPosts(query: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  if (!query || query.trim().length < 2) {
    return []
  }

  const posts = await db
    .collection("posts")
    .find({
      status: "published",
      $or: [
        { title: { $regex: query, $options: "i" } },
        { excerpt: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    })
    .sort({ publishedAt: -1 })
    .limit(5)
    .toArray()

  // Get author and category details for each post
  const postsWithDetails = await Promise.all(
    posts.map(async (post) => {
      const author = await db.collection("users").findOne({ _id: post.author })
      const category = await db.collection("categories").findOne({ _id: post.category })

      if (!author || !category) {
        throw new Error("Author or category not found")
      }

      return {
        ...post,
        author: {
          _id: author._id,
          name: author.name,
          username: author.username,
          image: author.image,
        },
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug,
        },
      }
    }),
  )

  return postsWithDetails
}

// Comment operations
export async function createComment(commentData: Omit<Comment, "_id">) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  const newComment = {
    ...commentData,
    createdAt: new Date(),
  }

  const result = await db.collection("comments").insertOne(newComment)
  return { ...newComment, _id: result.insertedId }
}

export async function getCommentsByPostId(postId: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  const comments = await db
    .collection("comments")
    .find({ postId: new ObjectId(postId) })
    .sort({ createdAt: -1 })
    .toArray()

  // Get author details for each comment
  const commentsWithDetails = await Promise.all(
    comments.map(async (comment) => {
      const author = await db.collection("users").findOne({ _id: comment.author })

      if (!author) {
        throw new Error("Author not found")
      }

      return {
        ...comment,
        author: {
          _id: author._id,
          name: author.name,
          username: author.username,
          image: author.image,
        },
      }
    }),
  )

  return commentsWithDetails
}

// User operations
export async function createUser(userData: Omit<User, "_id">) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  // Check if username or email already exists
  const existingUser = await db.collection("users").findOne({
    $or: [{ username: userData.username }, { email: userData.email }],
  })

  if (existingUser) {
    throw new Error("Username or email already exists")
  }

  // Hash password
  const hashedPassword = await hash(userData.password, 12)

  const newUser = {
    ...userData,
    password: hashedPassword,
    createdAt: new Date(),
  }

  const result = await db.collection("users").insertOne(newUser)
  return { ...newUser, _id: result.insertedId }
}

export async function getUserByEmail(email: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  return db.collection("users").findOne({ email })
}

export async function getUserByUsername(username: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  return db.collection("users").findOne({ username })
}

export async function verifyPassword(hashedPassword: string, password: string) {
  return compare(password, hashedPassword)
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null

  const isValid = await verifyPassword(user.password, password)
  if (!isValid) return null

  return user
}

// Category operations
export async function createCategory(categoryData: Omit<Category, "_id">) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  // Check if slug already exists
  const existingCategory = await db.collection("categories").findOne({ slug: categoryData.slug })
  if (existingCategory) {
    throw new Error("A category with this slug already exists")
  }

  const result = await db.collection("categories").insertOne(categoryData)
  return { ...categoryData, _id: result.insertedId }
}

export async function getCategories() {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  return db.collection("categories").find().sort({ name: 1 }).toArray()
}

export async function getCategoryBySlug(slug: string) {
  const { db } = await connectToDatabase()
  if (!db) {
    throw new Error("Database connection failed")
  }

  return db.collection("categories").findOne({ slug })
}
