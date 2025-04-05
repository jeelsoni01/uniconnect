"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Trophy, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Event type definition
interface Event {
  _id: string
  title: string
  date: string
  time: string
  venue: string
  mode: string
  priority: string
  description: string
  teamSize: string
  prizeWorth: string
  image: string
  category: string
}

export function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events")

        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }

        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error("Error fetching events:", error)
        setError("Failed to load events. Using fallback data.")

        // Use fallback data
        setEvents([
          {
            _id: "1",
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
            _id: "2",
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
            _id: "3",
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
        ])

        // Show toast with error
        toast({
          title: "Connection issue",
          description: "Using fallback event data. Check your MongoDB connection.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event._id} className="overflow-hidden">
          <div className="relative">
            <Image
              src={event.image || "/placeholder.svg?height=200&width=350"}
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
              <Link href={`/events/${event._id}`}>View Details</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

