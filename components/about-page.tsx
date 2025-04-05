import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="UniConnect Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-xl font-bold">UniConnect</span>
          </div>
          <MainNav />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">About UniConnect</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Bridging the gap between academia and industry through innovative events and opportunities
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                UniConnect aims to bridge the gap between academia and industry by providing a central platform for
                university students to discover, register, and participate in hackathons and various campus events. We
                believe in fostering innovation, collaboration, and skill development among students across the nation.
              </p>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=300&width=600"
                  alt="Students collaborating"
                  width={600}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History & Team */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold">Our History</h2>
                <p className="mb-4 text-muted-foreground">
                  Founded in 2023, UniConnect started as a small initiative to help students at a single university find
                  hackathons and tech events. What began as a simple bulletin board quickly evolved into a comprehensive
                  digital platform as we recognized the need for a centralized system that connects students with
                  opportunities.
                </p>
                <p className="text-muted-foreground">
                  Today, we've grown to serve over 1800+ colleges across the country, impacting approximately one
                  million students. Our platform has facilitated thousands of events, helping students showcase their
                  talents, build their portfolios, and connect with industry professionals.
                </p>
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold">Founding Team</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((member) => (
                    <div key={member} className="flex flex-col items-center text-center">
                      <div className="mb-3 overflow-hidden rounded-full">
                        <Image
                          src={`/placeholder.svg?height=100&width=100&text=Team${member}`}
                          alt={`Team Member ${member}`}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-medium">Team Member {member}</h3>
                      <p className="text-sm text-muted-foreground">Co-Founder</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold">Our Impact</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { number: "1800+", label: "Colleges" },
                { number: "1M+", label: "Students" },
                { number: "500+", label: "Events" },
                { number: "50+", label: "Partners" },
              ].map((stat, index) => (
                <div key={index} className="rounded-lg border bg-card p-6 text-center">
                  <p className="mb-2 text-4xl font-bold text-primary">{stat.number}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold">Student Testimonials</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((testimonial) => (
                <div key={testimonial} className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <Image
                      src={`/placeholder.svg?height=60&width=60&text=S${testimonial}`}
                      alt={`Student ${testimonial}`}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">Student Name</h3>
                      <p className="text-sm text-muted-foreground">University Name</p>
                    </div>
                  </div>
                  <p className="italic text-muted-foreground">
                    "UniConnect helped me discover amazing hackathons that aligned with my interests. Through these
                    events, I've built a strong portfolio, learned new skills, and even landed an internship at a top
                    tech company!"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center text-3xl font-bold">Our Partners</h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((partner) => (
                <div key={partner} className="flex items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=80&width=160&text=Partner${partner}`}
                    alt={`Partner ${partner}`}
                    width={160}
                    height={80}
                    className="grayscale transition-all hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="hero-gradient py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Join the UniConnect Community</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Be part of a growing network of students, universities, and industry partners.
            </p>
            <Button size="lg" variant="secondary">
              Register Now
            </Button>
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
                {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                  <Link
                    key={social}
                    href={`https://${social}.com`}
                    className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5" />
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

