"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, X, Maximize, Minimize, Loader2 } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function MitraAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm MITRA, your AI assistant. How can I help you find events or answer questions about UniConnect?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response = ""

      if (input.toLowerCase().includes("event") || input.toLowerCase().includes("hackathon")) {
        response =
          "We have several upcoming events! You can check the Events page for a complete list. Would you like me to recommend some based on your interests?"
      } else if (input.toLowerCase().includes("team") || input.toLowerCase().includes("partner")) {
        response =
          'Looking for team members? You can use our "Find Team" feature on any event page to connect with other participants who are looking to form a team.'
      } else if (input.toLowerCase().includes("register") || input.toLowerCase().includes("sign up")) {
        response =
          'To register for an event, navigate to the event details page and click the "Register Now" button. You\'ll need to be logged in to complete registration.'
      } else if (input.toLowerCase().includes("mongodb") || input.toLowerCase().includes("database")) {
        response =
          'UniConnect uses MongoDB Compass for data storage. You can set up the connection by visiting the /mongodb-setup page. Make sure your database is named "uniconnect".'
      } else {
        response =
          "I'm here to help you navigate UniConnect! You can ask me about events, finding team members, registration processes, or any other questions you might have."
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        aria-label="Open AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-80 rounded-lg shadow-lg transition-all duration-300 md:w-96 ${isMinimized ? "h-14" : "h-[500px]"}`}
    >
      <Card className="flex h-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            MITRA AI Assistant
          </CardTitle>
          <div className="flex gap-1">
            {isMinimized ? (
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(false)} className="h-8 w-8">
                <Maximize className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8">
                <Minimize className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex max-w-[80%] flex-col">
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                      <span className="mt-1 text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[80%] flex-col">
                      <div className="rounded-lg bg-muted px-3 py-2">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-primary"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-primary"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={isTyping || !input.trim()}>
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  )
}

