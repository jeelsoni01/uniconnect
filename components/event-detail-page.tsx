"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Share2, Download, MessageSquare, UserPlus, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// Mock data for event details
const eventsData = [
  {
    id: "1",
    title: "AI Workshop",
    date: "March 25, 2025",
    time: "10:00 AM",
    venue: "Tech Hub",
    mode: "Online",
    priority: "High",
    description:
      "Join us for an exciting AI workshop where you'll learn about the latest developments in artificial intelligence and machine learning. Perfect for beginners and intermediate developers.",
    longDescription: `
      <p>This comprehensive AI workshop is designed to introduce participants to the fundamentals of artificial intelligence and machine learning. Whether you're a beginner curious about AI or an intermediate developer looking to enhance your skills, this workshop offers valuable insights and hands-on experience.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Fundamentals of AI and machine learning</li>
        <li>Python programming for AI applications</li>
        <li>Building and training neural networks</li>
        <li>Natural language processing techniques</li>
        <li>Computer vision applications</li>
      </ul>
      
      <h3>Workshop Schedule:</h3>
      <p>10:00 AM - 11:30 AM: Introduction to AI concepts</p>
      <p>11:30 AM - 12:30 PM: Python for AI - Practical session</p>
      <p>12:30 PM - 1:30 PM: Lunch break</p>
      <p>1:30 PM - 3:00 PM: Building neural networks</p>
      <p>3:00 PM - 4:30 PM: Hands-on project work</p>
      <p>4:30 PM - 5:00 PM: Q&A and closing remarks</p>
      
      <h3>Requirements:</h3>
      <p>Participants should have basic programming knowledge. Bring your laptop with Python installed. All necessary libraries and tools will be provided during the workshop.</p>
    `,
    teamSize: "2-4 members",
    prizeWorth: "25,000 Rs/-",
    image: "/placeholder.svg?height=400&width=800",
    category: "Workshop",
    organizer: "Tech Innovators Association",
    registrationDeadline: "March 20, 2025",
    speakers: [
      {
        name: "Dr. Aisha Patel",
        role: "AI Research Scientist",
        image: "/placeholder.svg?height=100&width=100&text=AP",
      },
      { name: "Prof. Raj Kumar", role: "ML Engineer", image: "/placeholder.svg?height=100&width=100&text=RK" },
    ],
    faqs: [
      {
        question: "Is this workshop suitable for beginners?",
        answer: "Yes, the workshop is designed for both beginners and intermediate developers.",
      },
      { question: "Do I need to bring my own laptop?", answer: "Yes, please bring your laptop with Python installed." },
      {
        question: "Will certificates be provided?",
        answer: "Yes, all participants will receive a certificate of completion.",
      },
    ],
  },
  {
    id: "2",
    title: "Google Hackathon",
    date: "April 10, 2025",
    time: "09:00 AM",
    venue: "Google Office",
    mode: "Hybrid",
    priority: "Medium",
    description:
      "Join the Google Hackathon to solve real-world problems using Google technologies. Great opportunity to showcase your skills and win amazing prizes.",
    longDescription: `
      <p>Google Hackathon is a premier coding competition where participants solve real-world problems using Google technologies. This is your chance to showcase your coding skills, collaborate with like-minded individuals, and win amazing prizes!</p>
      
      <h3>Hackathon Themes:</h3>
      <ul>
        <li>Sustainable Development</li>
        <li>Education Technology</li>
        <li>Healthcare Innovation</li>
        <li>Smart Cities</li>
      </ul>
      
      <h3>Technologies:</h3>
      <p>Participants are encouraged to use Google technologies such as:</p>
      <ul>
        <li>Google Cloud Platform</li>
        <li>TensorFlow</li>
        <li>Firebase</li>
        <li>Flutter</li>
        <li>Google Maps API</li>
      </ul>
      
      <h3>Schedule:</h3>
      <p>Day 1:</p>
      <p>9:00 AM - 10:00 AM: Registration and team formation</p>
      <p>10:00 AM - 11:00 AM: Opening ceremony and problem statements</p>
      <p>11:00 AM - 8:00 PM: Hacking begins</p>
      
      <p>Day 2:</p>
      <p>9:00 AM - 4:00 PM: Continued hacking</p>
      <p>4:00 PM - 6:00 PM: Project submissions</p>
      <p>6:00 PM - 8:00 PM: Presentations and judging</p>
      <p>8:00 PM - 9:00 PM: Awards ceremony</p>
    `,
    teamSize: "3-5 members",
    prizeWorth: "50,000 Rs/-",
    image: "/placeholder.svg?height=400&width=800",
    category: "Hackathon",
    organizer: "Google Developer Group",
    registrationDeadline: "April 1, 2025",
    speakers: [
      { name: "Sundar Pichai", role: "CEO, Google", image: "/placeholder.svg?height=100&width=100&text=SP" },
      { name: "Fiona Cicconi", role: "Chief People Officer", image: "/placeholder.svg?height=100&width=100&text=FC" },
    ],
    faqs: [
      {
        question: "Can I participate remotely?",
        answer: "Yes, this is a hybrid event. You can participate either in-person or remotely.",
      },
      {
        question: "Do I need to have a team before registering?",
        answer: "No, you can register individually and form teams during the event.",
      },
      {
        question: "What are the judging criteria?",
        answer: "Projects will be judged based on innovation, technical complexity, practicality, and presentation.",
      },
    ],
  },
]

export function EventDetailPage({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [comment, setComment] = useState("")

  // Find the event by ID
  const event = eventsData.find((e) => e.id === id) || eventsData[0]

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
        {/* Event Hero */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover opacity-30" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex flex-wrap gap-2">
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
                <Badge variant="outline">{event.category}</Badge>
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">{event.title}</h1>
              <p className="mb-6 text-lg text-muted-foreground">{event.description}</p>
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Team Size</p>
                    <p className="font-medium">{event.teamSize}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Register Now</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="outline">
                      Find Team Members
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Find Team Members</DialogTitle>
                      <DialogDescription>
                        Connect with other participants looking to form a team for this event.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Available Participants</h3>
                        <div className="space-y-3">
                          {[1, 2, 3].map((user) => (
                            <div key={user} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${user}`} />
                                  <AvatarFallback>U{user}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">User {user}</p>
                                  <p className="text-xs text-muted-foreground">Skills: React, Node.js, UI/UX</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Connect
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Post Your Profile</h3>
                        <Textarea
                          placeholder="Describe your skills and what you're looking for in teammates..."
                          className="min-h-[100px]"
                        />
                        <Button className="w-full">Post Profile</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="faqs">FAQs</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                  <div className="rounded-lg border bg-card p-6">
                    <div
                      className="prose max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: event.longDescription }}
                    />

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="rounded-lg border bg-muted p-4">
                        <h3 className="mb-2 text-lg font-medium">Prize Details</h3>
                        <p className="text-3xl font-bold text-primary">{event.prizeWorth}</p>
                        <p className="text-sm text-muted-foreground">
                          Additional prizes include internship opportunities and mentorship sessions.
                        </p>
                      </div>
                      <div className="rounded-lg border bg-muted p-4">
                        <h3 className="mb-2 text-lg font-medium">Registration Deadline</h3>
                        <p className="text-3xl font-bold text-primary">{event.registrationDeadline}</p>
                        <p className="text-sm text-muted-foreground">
                          Register early to secure your spot as seats are limited.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="mb-4 text-lg font-medium">Organized By</h3>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-lg">
                          <Image
                            src="/placeholder.svg?height=64&width=64&text=Org"
                            alt={event.organizer}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{event.organizer}</p>
                          <p className="text-sm text-muted-foreground">Leading technology community</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Event
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download Details
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="schedule" className="mt-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 text-xl font-medium">Event Schedule</h3>
                    <div className="space-y-6">
                      {[1, 2, 3, 4].map((session) => (
                        <div key={session} className="rounded-lg border p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium">Session {session}: Introduction to AI concepts</h4>
                              <p className="text-sm text-muted-foreground">
                                Learn the fundamentals of artificial intelligence and its applications.
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-primary">10:00 AM - 11:30 AM</p>
                              <p className="text-sm text-muted-foreground">Main Hall</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24&text=S1" />
                              <AvatarFallback>S1</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Dr. Aisha Patel</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="speakers" className="mt-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-6 text-xl font-medium">Event Speakers</h3>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex flex-col items-center rounded-lg border p-6 text-center">
                          <Avatar className="mb-4 h-24 w-24">
                            <AvatarImage src={speaker.image} />
                            <AvatarFallback>
                              {speaker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h4 className="text-lg font-medium">{speaker.name}</h4>
                          <p className="text-sm text-muted-foreground">{speaker.role}</p>
                          <div className="mt-4 flex gap-2">
                            {["twitter", "linkedin"].map((social) => (
                              <Link
                                key={social}
                                href="#"
                                className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary hover:text-white"
                              >
                                <span className="sr-only">{social}</span>
                                <div className="h-4 w-4" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="faqs" className="mt-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-6 text-xl font-medium">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {event.faqs.map((faq, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <h4 className="mb-2 font-medium">{faq.question}</h4>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Comments Section */}
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-medium">Discussion</h3>
                <div className="mb-6 rounded-lg border bg-card p-6">
                  <Textarea
                    placeholder="Ask a question or share your thoughts about this event..."
                    className="mb-4 min-h-[100px]"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button disabled={!comment.trim()}>Post Comment</Button>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((commentId) => (
                    <div key={commentId} className="rounded-lg border bg-card p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${commentId}`} />
                          <AvatarFallback>U{commentId}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">User {commentId}</p>
                          <p className="text-xs text-muted-foreground">Posted 2 days ago</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        This looks like an amazing event! I'm excited to participate and learn new skills. Does anyone
                        know if the recordings will be available after the event?
                      </p>
                      <div className="mt-3 flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                          <MessageSquare className="h-4 w-4" />
                          Reply
                        </button>
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                          <Star className="h-4 w-4" />
                          Like
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Events */}
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-medium">Similar Events</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {eventsData
                    .filter((e) => e.id !== id)
                    .slice(0, 2)
                    .map((similarEvent) => (
                      <Card key={similarEvent.id} className="overflow-hidden">
                        <div className="relative">
                          <Image
                            src={similarEvent.image || "/placeholder.svg"}
                            alt={similarEvent.title}
                            width={350}
                            height={200}
                            className="h-40 w-full object-cover"
                          />
                          <div className="absolute left-3 top-3">
                            <Badge
                              className={`
                            ${similarEvent.mode === "Online" ? "bg-blue-500" : ""}
                            ${similarEvent.mode === "Offline" ? "bg-green-500" : ""}
                            ${similarEvent.mode === "Hybrid" ? "bg-yellow-500 text-black" : ""}
                            text-white
                          `}
                            >
                              {similarEvent.mode}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="mb-2 text-lg font-medium">{similarEvent.title}</h3>
                          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{similarEvent.date}</span>
                          </div>
                          <Button asChild className="w-full">
                            <Link href={`/events/${similarEvent.id}`}>View Details</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
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

