import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About | Inkwell",
  description: "Learn more about Inkwell, a modern blogging platform.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">About Inkwell</h1>

        <div className="mb-12 overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80"
            alt="Inkwell"
            width={1200}
            height={400}
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none dark:prose-invert">
          <p className="lead">
            Inkwell is a modern blogging platform designed for creators to share their stories with the world. Our
            mission is to provide a seamless and beautiful writing experience that helps you focus on what matters most:
            your content.
          </p>

          <h2>Our Story</h2>
          <p>
            Founded in 2023, Inkwell was born out of a passion for great writing and beautiful design. We believe that
            everyone has a story to tell, and we want to make it as easy as possible for you to share yours.
          </p>

          <h2>Our Features</h2>
          <ul>
            <li>
              <strong>Rich Text Editor</strong> - A beautiful, distraction-free writing experience
            </li>
            <li>
              <strong>Categories and Tags</strong> - Organize your content for easy discovery
            </li>
            <li>
              <strong>Responsive Design</strong> - Your blog looks great on any device
            </li>
            <li>
              <strong>Dark Mode</strong> - Easy on the eyes, day or night
            </li>
            <li>
              <strong>Social Sharing</strong> - Spread your ideas across the web
            </li>
            <li>
              <strong>SEO Optimized</strong> - Get discovered by readers around the world
            </li>
          </ul>

          <h2>Join Our Community</h2>
          <p>
            Inkwell is more than just a blogging platform—it's a community of writers, thinkers, and creators. Join us
            today and start sharing your voice with the world.
          </p>

          <div className="not-prose mt-8 flex justify-center">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
