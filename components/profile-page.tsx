"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, Edit, Settings, Github, Linkedin, Mail, Phone, MapPin, FileText } from "lucide-react"

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock user data
  const user = {
    name: "Rahul Sharma",
    university: "Indian Institute of Technology, Delhi",
    bio: "Computer Science student passionate about AI, web development, and hackathons. Looking to collaborate on innovative projects.",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    location: "New Delhi, India",
    skills: ["React", "Node.js", "Python", "Machine Learning", "UI/UX Design", "MongoDB"],
    social: {
      github: "github.com/rahulsharma",
      linkedin: "linkedin.com/in/rahulsharma",
    },
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "Indian Institute of Technology, Delhi",
        year: "2022 - 2026",
      },
      {
        degree: "Higher Secondary Education",
        institution: "Delhi Public School",
        year: "2020 - 2022",
      },
    ],
    achievements: [
      {
        title: "First Prize - Google Hackathon 2024",
        description: "Developed an AI-powered solution for healthcare management",
      },
      {
        title: "Best UI/UX Design - CodeFest 2023",
        description: "Created an intuitive interface for an educational platform",
      },
      {
        title: "Scholarship Recipient - Microsoft Learn Student Ambassador",
        description: "Selected for leadership and technical skills",
      },
    ],
  }

  // Mock registered events
  const registeredEvents = [
    {
      id: 1,
      title: "AI Workshop",
      date: "March 25, 2025",
      status: "Upcoming",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Google Hackathon",
      date: "April 10, 2025",
      status: "Upcoming",
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  // Mock past events
  const pastEvents = [
    {
      id: 3,
      title: "Web Development Bootcamp",
      date: "January 15, 2025",
      status: "Completed",
      certificate: true,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      title: "Data Science Workshop",
      date: "November 20, 2024",
      status: "Completed",
      certificate: true,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      title: "UI/UX Design Challenge",
      date: "October 5, 2024",
      status: "Completed",
      certificate: true,
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  // Mock projects
  const projects = [
    {
      id: 1,
      title: "AI-Powered Healthcare Assistant",
      description:
        "A machine learning solution that helps predict patient diagnoses based on symptoms and medical history.",
      technologies: ["Python", "TensorFlow", "Flask", "React"],
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      id: 2,
      title: "Educational Platform UI",
      description: "A modern, accessible user interface for an online learning platform targeting K-12 students.",
      technologies: ["React", "Tailwind CSS", "Figma"],
      image: "/placeholder.svg?height=150&width=300",
    },
  ]

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
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=RS" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            {/* Profile Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96&text=RS" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">{user.university}</p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="w-full">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://${user.social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {user.social.github}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`https://${user.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {user.social.linkedin}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-medium">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-medium">Education</h3>
                  <div className="space-y-4">
                    {user.education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Upcoming Events</h3>
                          <Badge variant="outline">{registeredEvents.length}</Badge>
                        </div>
                        <div className="mt-4 space-y-4">
                          {registeredEvents.map((event) => (
                            <div key={event.id} className="flex items-center gap-4">
                              <div className="h-12 w-12 overflow-hidden rounded-md">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-xs text-muted-foreground">{event.date}</p>
                              </div>
                              <Badge>{event.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Achievements</h3>
                          <Badge variant="outline">{user.achievements.length}</Badge>
                        </div>
                        <div className="mt-4 space-y-4">
                          {user.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="rounded-full bg-primary/10 p-2 text-primary">
                                <Trophy className="h-4 w-4" />
                              </div>
                              <div>
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-lg font-medium">Skill Progress</h3>
                        <div className="space-y-4">
                          {user.skills.slice(0, 4).map((skill, index) => (
                            <div key={index}>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium">{skill}</span>
                                <span className="text-sm text-muted-foreground">{70 + index * 5}%</span>
                              </div>
                              <Progress value={70 + index * 5} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-4 text-lg font-medium">Registered Events</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {registeredEvents.map((event) => (
                          <Card key={event.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-md">
                                  <Image
                                    src={event.image || "/placeholder.svg"}
                                    alt={event.title}
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">{event.date}</p>
                                  <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="outline">{event.status}</Badge>
                                    <Button size="sm" variant="outline" asChild>
                                      <Link href={`/events/${event.id}`}>View Details</Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 text-lg font-medium">Past Events</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {pastEvents.map((event) => (
                          <Card key={event.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-md">
                                  <Image
                                    src={event.image || "/placeholder.svg"}
                                    alt={event.title}
                                    width={64}
                                    height={64}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">{event.date}</p>
                                  <div className="mt-2 flex items-center gap-2">
                                    <Badge variant="secondary">{event.status}</Badge>
                                    {event.certificate && (
                                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                                        <Award className="h-3 w-3" />
                                        Certificate
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portfolio" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Projects</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                          <div className="aspect-video w-full overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={300}
                              height={150}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="mb-2 text-lg font-medium">{project.title}</h4>
                            <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                            <div className="mb-4 flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                              </Button>
                              <Button size="sm">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Demo
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resume" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-medium">AI-Generated Resume</h3>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Resume
                          </Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-6">
                        <div className="mb-6 text-center">
                          <h2 className="text-2xl font-bold">{user.name}</h2>
                          <p className="text-muted-foreground">
                            {user.location} | {user.email} | {user.phone}
                          </p>
                        </div>

                        <div className="mb-6">
                          <h3 className="mb-2 text-lg font-medium">Summary</h3>
                          <p className="text-muted-foreground">{user.bio}</p>
                        </div>

                        <div className="mb-6">
                          <h3 className="mb-2 text-lg font-medium">Education</h3>
                          {user.education.map((edu, index) => (
                            <div key={index} className="mb-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{edu.degree}</h4>
                                <span className="text-sm text-muted-foreground">{edu.year}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mb-6">
                          <h3 className="mb-2 text-lg font-medium">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {user.skills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h3 className="mb-2 text-lg font-medium">Projects</h3>
                          {projects.map((project, index) => (
                            <div key={index} className="mb-4">
                              <h4 className="font-medium">{project.title}</h4>
                              <p className="text-sm text-muted-foreground">{project.description}</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {project.technologies.map((tech, i) => (
                                  <span key={i} className="text-xs text-primary">
                                    {tech}
                                    {i < project.technologies.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h3 className="mb-2 text-lg font-medium">Achievements</h3>
                          {user.achievements.map((achievement, index) => (
                            <div key={index} className="mb-2">
                              <h4 className="font-medium">{achievement.title}</h4>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} UniConnect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Missing component definition
function ExternalLink(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  )
}

function Plus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

