"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/main-nav"
import { UserAuthNav } from "@/components/user-auth-nav"
import { FeaturedEvents } from "@/components/featured-events"
import {
  Search,
  ChevronRight,
  Users,
  Calendar,
  Award,
  BookOpen,
  Code,
  Laptop,
  Briefcase,
  CheckCircle,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function LandingPage() {
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
    })
    setEmail("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32&text=UC"
              alt="UniConnect Logo"
              width={32}
              height={32}
              className="rounded-md bg-primary text-white"
            />
            <span className="text-xl font-bold">UniConnect</span>
          </div>
          <MainNav />
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]"
              />
            </div>
            <ModeToggle />
            <UserAuthNav />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <Image
                src="/placeholder.svg?height=80&width=80&text=UC"
                alt="App Logo"
                width={80}
                height={80}
                className="mx-auto mb-6 rounded-xl bg-white/20"
              />
              <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">One Nation, One App for Education</h1>
              <p className="mb-8 text-lg md:text-xl">
                Discover, register, and participate in hackathons and campus events. Connect with a network of over
                1800+ colleges impacting approximately one million students.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/events">Explore Events</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/login?tab=register">Register</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold">Explore Event Categories</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  icon: <Code className="h-8 w-8" />,
                  name: "Hackathons",
                  image: "/placeholder.svg?height=60&width=60&text=🏆",
                },
                {
                  icon: <Laptop className="h-8 w-8" />,
                  name: "Workshops",
                  image: "/placeholder.svg?height=60&width=60&text=💻",
                },
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  name: "Seminars",
                  image: "/placeholder.svg?height=60&width=60&text=📚",
                },
                {
                  icon: <Briefcase className="h-8 w-8" />,
                  name: "Career Fairs",
                  image: "/placeholder.svg?height=60&width=60&text=💼",
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  name: "Networking",
                  image: "/placeholder.svg?height=60&width=60&text=🤝",
                },
                {
                  icon: <Award className="h-8 w-8" />,
                  name: "Competitions",
                  image: "/placeholder.svg?height=60&width=60&text=🥇",
                },
                {
                  icon: <Calendar className="h-8 w-8" />,
                  name: "Cultural Events",
                  image: "/placeholder.svg?height=60&width=60&text=🎭",
                },
                {
                  icon: <CheckCircle className="h-8 w-8" />,
                  name: "Skill Development",
                  image: "/placeholder.svg?height=60&width=60&text=🚀",
                },
              ].map((category, index) => (
                <Link
                  key={index}
                  href={`/events?category=${category.name.toLowerCase()}`}
                  className="group flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mb-3 overflow-hidden rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={60}
                      height={60}
                      className="h-8 w-8"
                    />
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Featured Events</h2>
              <Button variant="outline" asChild>
                <Link href="/events" className="flex items-center gap-2">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <FeaturedEvents />
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold">Our Impact</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { number: "1800+", label: "Colleges", icon: "/placeholder.svg?height=40&width=40&text=🏫" },
                { number: "1M+", label: "Students", icon: "/placeholder.svg?height=40&width=40&text=👨‍🎓" },
                { number: "500+", label: "Events", icon: "/placeholder.svg?height=40&width=40&text=🎪" },
                { number: "50+", label: "Partners", icon: "/placeholder.svg?height=40&width=40&text=🤝" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Image
                      src={stat.icon || "/placeholder.svg"}
                      alt={stat.label}
                      width={40}
                      height={40}
                      className="h-8 w-8"
                    />
                  </div>
                  <p className="mb-2 text-4xl font-bold text-primary">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Subscribe to our newsletter to get the latest updates on upcoming events and opportunities.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 text-white placeholder:text-white/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="secondary" className="whitespace-nowrap" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">UniConnect</h3>
              <p className="mb-4 text-muted-foreground">Connect, Collaborate, Conquer</p>
              <div className="flex gap-4">
                {[
                  { name: "twitter", icon: "/placeholder.svg?height=20&width=20&text=𝕏" },
                  { name: "facebook", icon: "/placeholder.svg?height=20&width=20&text=f" },
                  { name: "instagram", icon: "/placeholder.svg?height=20&width=20&text=📷" },
                  { name: "linkedin", icon: "/placeholder.svg?height=20&width=20&text=in" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={`https://${social.name}.com`}
                    className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-white"
                  >
                    <span className="sr-only">{social.name}</span>
                    <Image
                      src={social.icon || "/placeholder.svg"}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                {["Home", "Events", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Resources</h3>
              <ul className="space-y-2">
                {["FAQ", "Privacy Policy", "Terms of Service", "Help Center"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(" ", "-")}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
              <address className="not-italic text-muted-foreground">
                <p>Email: info@uniconnect.edu</p>
                <p>Phone: +91 1234567890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} UniConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

