import FeaturedPosts from "@/components/featured-posts"
import CategoryNav from "@/components/category-nav"
import LatestPosts from "@/components/latest-posts"
import NewsletterForm from "@/components/newsletter-form"
import SearchBar from "@/components/search-bar"
import { getPosts, getCategories } from "@/lib/data"

export default async function Home() {
  // In a real app, these would fetch from your API
  const featuredPosts = await getPosts({ featured: true, limit: 5 })
  const latestPosts = await getPosts({ limit: 6, page: 1 })
  const categories = await getCategories()

  return (
    <div key="home-page" className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <section className="mb-12">
        <FeaturedPosts posts={featuredPosts} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CategoryNav categories={categories} />
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>

        <div className="lg:col-span-3">
          <LatestPosts posts={latestPosts} />
        </div>
      </div>
    </div>
  )
}
