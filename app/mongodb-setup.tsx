"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Database, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MongoDBSetup() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Checking MongoDB connection...")
  const [details, setDetails] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  useEffect(() => {
    async function checkConnection() {
      try {
        const response = await fetch("/api/seed")
        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage("MongoDB connection successful!")
          setDetails(`Connected to database: uniconnect\nCollections: ${data.collections.join(", ")}`)
        } else {
          setStatus("error")
          setMessage("Failed to connect to MongoDB")
          setDetails(data.error || "Unknown error")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Failed to connect to MongoDB")
        setDetails(error instanceof Error ? error.message : "Unknown error")
      }
    }

    checkConnection()
  }, [])

  const handleRetry = () => {
    setStatus("loading")
    setMessage("Retrying MongoDB connection...")
    setDetails(null)

    // Trigger the effect again
    fetch("/api/seed")
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setStatus("success")
          setMessage("MongoDB connection successful!")
          setDetails(`Connected to database: uniconnect\nCollections: ${data.collections.join(", ")}`)
        } else {
          throw new Error(data.error || "Unknown error")
        }
      })
      .catch((error) => {
        setStatus("error")
        setMessage("Failed to connect to MongoDB")
        setDetails(error instanceof Error ? error.message : "Unknown error")
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary">UniConnect Setup</h1>
          <p className="text-muted-foreground">Connect your application to MongoDB Compass</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted"></div>
            <ol className="relative flex justify-between">
              <li
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 1 ? "border-primary bg-primary text-white" : "border-muted-foreground bg-background text-muted-foreground"}`}
              >
                1
              </li>
              <li
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 2 ? "border-primary bg-primary text-white" : "border-muted-foreground bg-background text-muted-foreground"}`}
              >
                2
              </li>
              <li
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step >= 3 ? "border-primary bg-primary text-white" : "border-muted-foreground bg-background text-muted-foreground"}`}
              >
                3
              </li>
            </ol>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className={step >= 1 ? "text-primary" : "text-muted-foreground"}>Connect to MongoDB</span>
            <span className={step >= 2 ? "text-primary" : "text-muted-foreground"}>Seed Database</span>
            <span className={step >= 3 ? "text-primary" : "text-muted-foreground"}>Ready to Use</span>
          </div>
        </div>

        {step === 1 && (
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  MongoDB Connection
                </CardTitle>
                <CardDescription>Connect to your MongoDB Compass database</CardDescription>
              </CardHeader>
              <CardContent>
                {status === "loading" && (
                  <Alert>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <AlertTitle>Connecting...</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                {status === "success" && (
                  <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-500">Connected!</AlertTitle>
                    <AlertDescription>
                      {message}
                      {details && <pre className="mt-2 rounded bg-black/10 p-2 text-xs">{details}</pre>}
                    </AlertDescription>
                  </Alert>
                )}

                {status === "error" && (
                  <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <AlertTitle className="text-red-500">Connection Failed</AlertTitle>
                    <AlertDescription>
                      {message}
                      {details && <pre className="mt-2 rounded bg-black/10 p-2 text-xs">{details}</pre>}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => (window.location.href = "/")}>
                  Go to Home
                </Button>
                {status === "error" && <Button onClick={handleRetry}>Retry Connection</Button>}
                {status === "success" && (
                  <Button onClick={() => setStep(2)}>
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>MongoDB Compass Setup</CardTitle>
                  <CardDescription>Follow these steps to set up your MongoDB Compass connection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">1. Install MongoDB Compass</h3>
                    <p className="text-sm text-muted-foreground">
                      Download and install MongoDB Compass from the official website if you haven't already.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">2. Create a Database</h3>
                    <p className="text-sm text-muted-foreground">
                      Open MongoDB Compass and create a database named "uniconnect".
                    </p>
                    <div className="mt-2 overflow-hidden rounded-md border">
                      <Image
                        src="/placeholder.svg?height=200&width=400&text=MongoDB+Compass+Screenshot"
                        alt="MongoDB Compass Create Database"
                        width={400}
                        height={200}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">3. Set Environment Variable</h3>
                    <p className="text-sm text-muted-foreground">Add the following to your .env.local file:</p>
                    <pre className="mt-2 rounded bg-muted p-2 text-xs">
                      MONGODB_URI=mongodb://localhost:27017/uniconnect
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Seed Database</CardTitle>
                <CardDescription>Initialize your database with sample data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950">
                    <AlertTitle className="text-blue-500">Database Structure</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">The following collections will be created:</p>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        <li>
                          <strong>users</strong> - User accounts and profiles
                        </li>
                        <li>
                          <strong>events</strong> - Event listings and details
                        </li>
                        <li>
                          <strong>sessions</strong> - Authentication sessions
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle className="text-green-500">Sample Data</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">The following sample data will be created:</p>
                      <ul className="list-inside list-disc space-y-1 text-sm">
                        <li>
                          <strong>Test User</strong> - Email: test@example.com, Password: password123
                        </li>
                        <li>
                          <strong>Sample Events</strong> - 3 example events
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => {
                    fetch("/api/seed")
                      .then((response) => response.json())
                      .then(() => setStep(3))
                      .catch((error) => console.error("Error seeding database:", error))
                  }}
                >
                  Seed Database <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Database Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-md border">
                    <Image
                      src="/placeholder.svg?height=300&width=400&text=MongoDB+Collections"
                      alt="MongoDB Collections"
                      width={400}
                      height={300}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 3 && (
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Setup Complete!</CardTitle>
              <CardDescription>Your UniConnect application is now connected to MongoDB Compass</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-md space-y-4">
                <p>You can now use all features of the application. The database has been seeded with sample data.</p>
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium">Test User Credentials</h3>
                  <p className="text-sm text-muted-foreground">Email: test@example.com</p>
                  <p className="text-sm text-muted-foreground">Password: password123</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/">Go to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

