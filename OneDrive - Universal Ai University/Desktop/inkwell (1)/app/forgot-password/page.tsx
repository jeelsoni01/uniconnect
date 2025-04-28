import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Forgot Password | Inkwell",
  description: "Reset your Inkwell account password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto flex h-screen max-w-md items-center justify-center px-4 py-8">
      <ForgotPasswordForm />
    </div>
  )
}
