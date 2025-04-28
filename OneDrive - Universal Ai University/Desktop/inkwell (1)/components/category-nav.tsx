import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"

interface CategoryNavProps {
  categories: Category[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-4 text-lg font-semibold">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={`category-${category.id}`}
            href={`/category/${category.slug}`}
            className="block"
          >
            <Button variant="ghost" className="w-full justify-start text-left">
              {category.name}
              <span className="ml-auto text-xs text-muted-foreground">
                ({category.postCount})
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
