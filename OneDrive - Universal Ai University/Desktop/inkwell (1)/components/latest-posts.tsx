"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import type { Post } from "@/lib/types"

interface LatestPostsProps {
  posts: Post[]
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const [page, setPage] = useState(1)
  const postsPerPage = 6
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const defaultImage = "/placeholder.jpg"

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <Link href="/posts">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, page * postsPerPage).map((post) => (
          <Card key={`post-${post.id}`} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage || defaultImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority={page === 1}
                quality={85}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
                unoptimized={false}
              />
            </div>
            <CardContent className="p-4">
              {post.category && (
                <Link
                  href={`/category/${post.category.slug}`}
                  className="mb-2 block text-xs font-medium text-primary"
                >
                  {post.category.name}
                </Link>
              )}
              <Link href={`/post/${post.slug}`}>
                <h3 className="mb-2 line-clamp-2 text-xl font-bold hover:text-primary">
                  {post.title}
                </h3>
              </Link>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </CardContent>
            <CardFooter className="border-t bg-muted/40 p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.author.image || defaultImage} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <Link
                    href={`/author/${post.author.username}`}
                    className="font-medium hover:text-primary"
                  >
                    {post.author.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {page < totalPages && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setPage((prev) => prev + 1)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
