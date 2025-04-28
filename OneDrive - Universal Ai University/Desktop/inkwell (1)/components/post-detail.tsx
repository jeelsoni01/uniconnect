"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Facebook, Linkedin, Twitter } from "lucide-react"
import { useState } from "react"
import { getImageUrl } from "@/lib/utils"

interface PostDetailProps {
  post: any
}

export default function PostDetail({ post }: PostDetailProps) {
  const defaultImage = "/placeholder.jpg"
  const [imgSrc, setImgSrc] = useState(getImageUrl(post.coverImage) || defaultImage)

  return (
    <article className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Link href={`/category/${post.category.slug}`}>
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {post.category.name}
            </Badge>
          </Link>
        </div>
        <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
        <p className="mb-6 text-xl text-muted-foreground">{post.excerpt}</p>
        <div className="flex items-center gap-4">
          <Link href={`/author/${post.author.username}`} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={getImageUrl(post.author.image) || defaultImage} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{post.views} views</span>
          </div>
        </div>
      </div>

      <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={imgSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          className="object-cover"
          priority
          quality={90}
          onError={() => {
            setImgSrc(defaultImage)
          }}
          unoptimized={false}
        />
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <Badge variant="outline">{tag}</Badge>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold">Share</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    `${process.env.NEXT_PUBLIC_APP_URL}/post/${post.slug}`,
                  )}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={getImageUrl(post.author.image) || defaultImage} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.author.bio || "Author at Inkwell"}</p>
              <div className="mt-4">
                <Link href={`/author/${post.author.username}`}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  )
}