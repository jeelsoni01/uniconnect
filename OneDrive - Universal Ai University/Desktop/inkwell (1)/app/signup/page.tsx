import SignupForm from "@/components/auth/signup-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up | Inkwell",
  description: "Create a new Inkwell account",
}

export default function SignupPage() {
  return (
    <div className="container mx-auto flex h-screen max-w-md items-center justify-center px-4 py-8">
      <SignupForm />
    </div>
  )
}
