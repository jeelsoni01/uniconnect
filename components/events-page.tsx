"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Trophy, Search, Filter, Plus } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock data for events
const eventsData = [
  {
    id: 1,
    title: "AI Workshop",
    date: "March 25, 2025",
    time: "10:00 AM",
    venue: "Tech Hub",
    mode: "Online",
    priority: "High",
    description:
      "Join us for an exciting AI workshop where you'll learn about the latest developments in artificial intelligence and machine learning. Perfect for beginners and intermediate developers.",
    teamSize: "2-4 members",
    prizeWorth: "25,000 Rs/-",
    image: "/placeholder.svg?height=200&width=350",
    category: "Workshop",
  },
  {
    id: 2,
    title: "Google Hackathon",
    date: "April 10, 2025",
    time: "09:00 AM",
    venue: "Google Office",
    mode: "Hybrid",
    priority: "Medium",
    description:
      "Join the Google Hackathon to solve real-world problems using Google technologies. Great opportunity to showcase your skills and win amazing prizes.",
    teamSize: "3-5 members",
    prizeWorth: "50,000 Rs/-",
    image: "/placeholder.svg?height=200&width=350",
    category: "Hackathon",
  },
  {
    id: 3,
    title: "IIT Jodhpur Hackathon",
    date: "September 15, 2025",
    time: "10:00 AM",
    venue: "IIT Jodhpur",
    mode: "Offline",
    priority: "Medium",
    description: "Registration open till 1st September.",
    teamSize: "3-5 members",
    prizeWorth: "25,000 Rs/-",
    image: "/placeholder.svg?height=200&width=350",
    category: "Hackathon",
  },
  {
    id: 4,
    title: "Healthcare Hackathon with AI",
    date: "May 20, 2025",
    time: "11:00 AM",
    venue: "Virtual Platform",
    mode: "Online",
    priority: "High",
    description:
      "Join us for an exciting hackathon where clinicians, engineers, business leaders, and students collaborate to develop AI-powered solutions that address real-world clinical challenges.",
    teamSize: "2-5 members",
    prizeWorth: "30,000 Rs/-",
    image: "/placeholder.svg?height=200&width=350",
    category: "Hackathon",
  },
  {
    id: 5,
    title: "Game Development Hackathon",
    date: "January 28, 2026",
    time: "10:00 AM",
    venue: "Gaming Arena, Pune",
    mode: "Offline",
    priority: "High",
    description: "Create an innovative game in 48 hours and compete for exciting prizes.",
    teamSize: "4-6 members",
    prizeWorth: "85,000 Rs/-",
    image: "/placeholder.svg?height=200&width=350",
    category: "Hackathon",
  },
  {
    id: 6,
    title: "National Coding Championship",
    date: "August 1, 2025",
    time: "8:00 PM",
    venue: "Virtual Event",
    mode: "Online",
    priority: "Medium",
    description:
      "Join the biggest coding competition of the year. Showcase your programming skills and win exciting prizes.",
    teamSize: "Individual",
    prizeWorth: "1,500 Rs/-",
    image: "/placeholder.svg?height=200&width=350",
    category: "Competition",
  },
]

export function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    mode: [],
    priority: [],
    category: [],
    dateRange: { start: null, end: null },
  })
  const [sortBy, setSortBy] = useState("dateAsc")

  // Filter events based on search term and active filters
  const filteredEvents = eventsData.filter((event) => {
    // Search filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase())

    // Mode filter
    const matchesMode = activeFilters.mode.length === 0 || activeFilters.mode.includes(event.mode.toLowerCase())

    // Priority filter
    const matchesPriority =
      activeFilters.priority.length === 0 || activeFilters.priority.includes(event.priority.toLowerCase())

    // Category filter
    const matchesCategory =
      activeFilters.category.length === 0 || activeFilters.category.includes(event.category.toLowerCase())

    // Date range filter
    let matchesDateRange = true
    if (activeFilters.dateRange.start) {
      const eventDate = new Date(event.date)
      matchesDateRange = eventDate >= activeFilters.dateRange.start
    }
    if (activeFilters.dateRange.end) {
      const eventDate = new Date(event.date)
      matchesDateRange = matchesDateRange && eventDate <= activeFilters.dateRange.end
    }

    return matchesSearch && matchesMode && matchesPriority && matchesCategory && matchesDateRange
  })

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === "dateAsc") {
      return new Date(a.date) - new Date(b.date)
    } else if (sortBy === "dateDesc") {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === "prizeDesc") {
      const prizeA = Number.parseInt(a.prizeWorth.replace(/[^0-9]/g, "")) || 0
      const prizeB = Number.parseInt(b.prizeWorth.replace(/[^0-9]/g, "")) || 0
      return prizeB - prizeA
    }
    return 0
  })

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev }

      if (filterType === "mode" || filterType === "priority" || filterType === "category") {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter((item) => item !== value)
        } else {
          newFilters[filterType] = [...newFilters[filterType], value]
        }
      } else if (filterType === "dateStart") {
        newFilters.dateRange.start = value ? new Date(value) : null
      } else if (filterType === "dateEnd") {
        newFilters.dateRange.end = value ? new Date(value) : null
      }

      return newFilters
    })
  }

  // Reset filters
  const resetFilters = () => {
    setActiveFilters({
      mode: [],
      priority: [],
      category: [],
      dateRange: { start: null, end: null },
    })
    setSortBy("dateAsc")
  }

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
        <section className="hero-gradient py-12 text-white md:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Discover Events</h1>
              <p className="mb-6 text-lg">
                Find hackathons, workshops, and competitions to showcase your skills and build your network
              </p>
              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/70" />
                <Input
                  type="search"
                  placeholder="Search events by name, description, or location..."
                  className="border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/60"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Tabs defaultValue="all" className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                  <TabsTrigger value="workshops">Workshops</TabsTrigger>
                  <TabsTrigger value="competitions">Competitions</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex w-full gap-2 sm:w-auto">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter & Sort Events</SheetTitle>
                      <SheetDescription>Customize your event search with these filters</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* Mode Filter */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium">Event Mode</h3>
                        <div className="space-y-2">
                          {["Online", "Offline", "Hybrid"].map((mode) => (
                            <div key={mode} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mode-${mode}`}
                                checked={activeFilters.mode.includes(mode.toLowerCase())}
                                onCheckedChange={(checked) => {
                                  handleFilterChange("mode", mode.toLowerCase())
                                }}
                              />
                              <Label htmlFor={`mode-${mode}`}>{mode}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Priority Filter */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium">Priority Level</h3>
                        <div className="space-y-2">
                          {["High", "Medium", "Low"].map((priority) => (
                            <div key={priority} className="flex items-center space-x-2">
                              <Checkbox
                                id={`priority-${priority}`}
                                checked={activeFilters.priority.includes(priority.toLowerCase())}
                                onCheckedChange={(checked) => {
                                  handleFilterChange("priority", priority.toLowerCase())
                                }}
                              />
                              <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Category Filter */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium">Event Category</h3>
                        <div className="space-y-2">
                          {["Hackathon", "Workshop", "Competition", "Seminar"].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category}`}
                                checked={activeFilters.category.includes(category.toLowerCase())}
                                onCheckedChange={(checked) => {
                                  handleFilterChange("category", category.toLowerCase())
                                }}
                              />
                              <Label htmlFor={`category-${category}`}>{category}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Date Range */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium">Date Range</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="start-date">From</Label>
                            <Input
                              id="start-date"
                              type="date"
                              onChange={(e) => handleFilterChange("dateStart", e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="end-date">To</Label>
                            <Input
                              id="end-date"
                              type="date"
                              onChange={(e) => handleFilterChange("dateEnd", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sort By */}
                      <div>
                        <h3 className="mb-3 text-sm font-medium">Sort By</h3>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sort option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dateAsc">Date (Earliest First)</SelectItem>
                            <SelectItem value="dateDesc">Date (Latest First)</SelectItem>
                            <SelectItem value="prizeDesc">Prize (Highest First)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={resetFilters}>
                          Reset Filters
                        </Button>
                        <Button>Apply Filters</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {(activeFilters.mode.length > 0 ||
              activeFilters.priority.length > 0 ||
              activeFilters.category.length > 0 ||
              activeFilters.dateRange.start ||
              activeFilters.dateRange.end) && (
              <div className="mb-6 rounded-lg border bg-card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium">Active Filters:</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.mode.map((mode) => (
                    <Badge key={`mode-${mode}`} variant="secondary" className="flex items-center gap-1">
                      Mode: {mode}
                      <button
                        className="ml-1 rounded-full hover:bg-muted"
                        onClick={() => handleFilterChange("mode", mode)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {activeFilters.priority.map((priority) => (
                    <Badge key={`priority-${priority}`} variant="secondary" className="flex items-center gap-1">
                      Priority: {priority}
                      <button
                        className="ml-1 rounded-full hover:bg-muted"
                        onClick={() => handleFilterChange("priority", priority)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {activeFilters.category.map((category) => (
                    <Badge key={`category-${category}`} variant="secondary" className="flex items-center gap-1">
                      Category: {category}
                      <button
                        className="ml-1 rounded-full hover:bg-muted"
                        onClick={() => handleFilterChange("category", category)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {activeFilters.dateRange.start && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      From: {activeFilters.dateRange.start.toLocaleDateString()}
                      <button
                        className="ml-1 rounded-full hover:bg-muted"
                        onClick={() => handleFilterChange("dateStart", null)}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {activeFilters.dateRange.end && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      To: {activeFilters.dateRange.end.toLocaleDateString()}
                      <button
                        className="ml-1 rounded-full hover:bg-muted"
                        onClick={() => handleFilterChange("dateEnd", null)}
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Events Grid */}
            {sortedEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={350}
                        height={200}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <Badge
                          className={`
                          ${event.mode === "Online" ? "bg-blue-500" : ""}
                          ${event.mode === "Offline" ? "bg-green-500" : ""}
                          ${event.mode === "Hybrid" ? "bg-yellow-500 text-black" : ""}
                          text-white
                        `}
                        >
                          {event.mode}
                        </Badge>
                      </div>
                      <div className="absolute right-3 top-3">
                        <Badge
                          className={`
                          ${event.priority === "High" ? "bg-red-500" : ""}
                          ${event.priority === "Medium" ? "bg-yellow-500 text-black" : ""}
                          ${event.priority === "Low" ? "bg-green-500" : ""}
                          text-white
                        `}
                        >
                          {event.priority} Priority
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
                      <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{event.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span>{event.prizeWorth}</span>
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-12 text-center">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-medium">No events found</h3>
                <p className="mb-6 text-muted-foreground">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
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

