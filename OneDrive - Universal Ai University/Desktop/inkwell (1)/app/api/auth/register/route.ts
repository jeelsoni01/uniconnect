import { NextResponse } from "next/server"
import { createUser } from "@/lib/models"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Name, email, and password are required" }, { status: 400 })
    }

    // Generate username from email
    const username = email.split("@")[0] + Math.floor(Math.random() * 1000)

    // Create new user
    const user = await createUser({
      name,
      email,
      password,
      username,
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ message: "User registered successfully", user: userWithoutPassword }, { status: 201 })
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.message === "User already exists") {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
