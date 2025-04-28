"use client"

import { useEffect } from "react"

interface ViewCounterProps {
  slug: string
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`/api/posts/${slug}`, {
          method: "GET",
          cache: "no-store",
        })
      } catch (error) {
        console.error("Error incrementing view count:", error)
      }
    }

    incrementView()
  }, [slug])

  return null
} 