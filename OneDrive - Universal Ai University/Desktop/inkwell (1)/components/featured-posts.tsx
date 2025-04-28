"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/lib/utils"
import type { Post } from "@/lib/types"

interface FeaturedPostsProps {
  posts: Post[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const defaultImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=630&q=80"

  const goToNext = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === posts.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, posts.length])

  const goToPrev = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev === 0 ? posts.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, posts.length])

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext])

  if (!posts.length) return null

  return (
    <div className="relative overflow-hidden rounded-xl">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
        onClick={goToPrev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>

      <div
        className="relative h-[400px] w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {posts.map((post, index) => (
          <div
            key={`featured-post-${post.id}`}
            className="absolute left-0 top-0 h-full w-full"
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            <Image
              src={getImageUrl(post.coverImage) || defaultImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority={index === 0}
              quality={90}
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = defaultImage
              }}
              unoptimized={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium">
                {post.category.name}
              </span>
              <h2 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">{post.title}</h2>
              <p className="mb-4 max-w-xl text-sm text-gray-200 md:text-base">{post.excerpt}</p>
              <Link href={`/post/${post.slug}`}>
                <Button>Read More</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {posts.map((_, index) => (
          <button
            key={`slide-indicator-${index}`}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              currentIndex === index ? "bg-primary w-4" : "bg-white/50",
            )}
            onClick={() => {
              setIsAnimating(true)
              setCurrentIndex(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
