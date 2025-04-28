export interface Post {
  id: string
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: Category
  tags: string[]
  author: Author
  publishedAt: string
  createdAt?: string
  featured: boolean
  views: number
  readingTime: number
  status: "draft" | "published"
}

export interface Author {
  id: string
  _id?: string
  name: string
  username: string
  email?: string
  image: string
  bio: string
}

export interface Category {
  id: string
  _id?: string
  name: string
  slug: string
  description?: string
  postCount?: number
}

export interface Comment {
  id: string
  _id?: string
  content: string
  post: string
  author: Author
  createdAt: string
  status: "pending" | "approved" | "rejected"
}

export interface SessionUser {
  data: {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  } | null
}
