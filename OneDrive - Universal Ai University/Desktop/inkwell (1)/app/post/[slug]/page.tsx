import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/models"
import PostDetail from "@/components/post-detail"
import CommentSection from "@/components/comment-section"
import ViewCounter from "@/components/view-counter"

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params
  console.log("Loading post page for slug:", slug)

  try {
    const post = await getPostBySlug(slug)

    if (!post) {
      console.error(`Post not found for slug: ${slug}`)
      return notFound()
    }

    if (post.status !== "published") {
      console.error(`Post is not published: ${slug}. Current status: ${post.status}`)
      return notFound()
    }

    console.log("Successfully loaded post:", post.title)
    return (
      <div className="container mx-auto px-4 py-8">
        <ViewCounter slug={slug} />
        <PostDetail post={post} />
        <CommentSection postSlug={slug} />
      </div>
    )
  } catch (error) {
    console.error("Error loading post:", error)
    return notFound()
  }
}
