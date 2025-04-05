"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Linkedin, Loader2, AlertCircle } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    university: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  // Check if we should redirect to a specific tab
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "register") {
      setActiveTab("register")
    }

    // Check for error in URL
    const errorMsg = searchParams.get("error")
    if (errorMsg) {
      setError(
        errorMsg === "CredentialsSignin" ? "Invalid email or password" : "An error occurred during authentication",
      )
    }
  }, [searchParams])

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile")
    }
  }, [status, router])

  // Handle login form change
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle register form change
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      })

      if (result?.error) {
        setError("Invalid email or password")
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back to UniConnect!",
        })
        router.push("/profile")
      }
    } catch (error) {
      setError("An error occurred. Please try again later.")
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords don't match")
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate terms acceptance
    if (!registerData.terms) {
      setError("You must accept the Terms of Service and Privacy Policy")
      toast({
        title: "Terms not accepted",
        description: "You must accept the Terms of Service and Privacy Policy to register.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Register the user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${registerData.firstName} ${registerData.lastName}`,
          email: registerData.email,
          password: registerData.password,
          university: registerData.university,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Show success message
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
        action: (
          <ToastAction altText="Login" onClick={() => setActiveTab("login")}>
            Login
          </ToastAction>
        ),
      })

      // Clear form and switch to login tab
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        university: "",
        password: "",
        confirmPassword: "",
        terms: false,
      })
      setActiveTab("login")
    } catch (error) {
      setError(error.message || "Registration failed")
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle social login
  const handleSocialLogin = async (provider) => {
    setIsLoading(true)
    setError(null)
    try {
      await signIn(provider, { callbackUrl: "/profile" })
    } catch (error) {
      setError(`${provider} login failed`)
      toast({
        title: `${provider} login failed`,
        description: "Please try again later.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Demo login
  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "password123",
      })

      if (result?.error) {
        setError("Demo login failed")
        toast({
          title: "Demo login failed",
          description: "Please try again later.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Demo login successful",
          description: "Welcome to UniConnect!",
        })
        router.push("/profile")
      }
    } catch (error) {
      setError("An error occurred. Please try again later.")
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-xl border bg-card shadow-lg md:grid-cols-2">
          {/* Left Side - Form */}
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
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
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Back to Home
              </Link>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6 space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
                        Forgot Password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={loginData.remember}
                      onCheckedChange={(checked) => setLoginData({ ...loginData, remember: checked })}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isLoading}
                  >
                    <Github className="h-4 w-4" />
                    Github
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleSocialLogin("linkedin")}
                    disabled={isLoading}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>

                <div className="mt-4 rounded-md border border-dashed border-primary/50 bg-primary/5 p-4">
                  <h3 className="mb-2 text-sm font-medium">Quick Demo Access</h3>
                  <p className="mb-3 text-xs text-muted-foreground">
                    Use the demo account to explore all features without registration.
                  </p>
                  <Button variant="secondary" className="w-full" onClick={handleDemoLogin} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading demo...
                      </>
                    ) : (
                      "Try Demo Account"
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="mt-6 space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input
                      id="email-register"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      name="university"
                      placeholder="Enter your university"
                      value={registerData.university}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Password</Label>
                    <Input
                      id="password-register"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      name="terms"
                      checked={registerData.terms}
                      onCheckedChange={(checked) => setRegisterData({ ...registerData, terms: checked })}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isLoading}
                  >
                    <Github className="h-4 w-4" />
                    Github
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleSocialLogin("linkedin")}
                    disabled={isLoading}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side - Image */}
          <div className="relative hidden md:block">
            <Image
              src="/placeholder.svg?height=600&width=500&text=UniConnect"
              alt="Login"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center p-8 text-white">
                <h2 className="mb-4 text-3xl font-bold">Welcome to UniConnect</h2>
                <p className="mb-6 text-center">
                  One Nation, One App for Education. Connect with events, build your network, and showcase your skills.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold">1800+</p>
                    <p className="text-sm">Colleges</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">1M+</p>
                    <p className="text-sm">Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

