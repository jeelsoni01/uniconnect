import LoginForm from "@/components/auth/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Inkwell",
  description: "Login to your Inkwell account",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen max-w-md items-center justify-center px-4 py-8">
      <LoginForm />
    </div>
  )
}
