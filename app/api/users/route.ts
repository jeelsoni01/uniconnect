import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { hash } from "bcrypt"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, university } = body

    // Validate required fields
    if (!name || !email || !password || !university) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get users collection
    const usersCollection = await getCollection("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // For demo purposes, create a test user if it doesn't exist
    if (email === "test@example.com") {
      const testUser = await usersCollection.findOne({ email: "test@example.com" })
      if (!testUser) {
        await usersCollection.insertOne({
          name: "Test User",
          email: "test@example.com",
          password: await hash("password123", 10),
          university: "Test University",
          createdAt: new Date(),
          updatedAt: new Date(),
          skills: ["React", "Node.js", "MongoDB"],
          bio: "This is a test user account for demonstration purposes.",
          social: {
            github: "github.com/testuser",
            linkedin: "linkedin.com/in/testuser",
          },
        })
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      university,
      createdAt: new Date(),
      updatedAt: new Date(),
      skills: [],
      bio: "",
      social: {
        github: "",
        linkedin: "",
      },
    }

    // Insert user into database
    const result = await usersCollection.insertOne(userData)

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get users collection
    const usersCollection = await getCollection("users")

    // Create a test user if it doesn't exist
    const testUser = await usersCollection.findOne({ email: "test@example.com" })
    if (!testUser) {
      await usersCollection.insertOne({
        name: "Test User",
        email: "test@example.com",
        password: await hash("password123", 10),
        university: "Test University",
        createdAt: new Date(),
        updatedAt: new Date(),
        skills: ["React", "Node.js", "MongoDB"],
        bio: "This is a test user account for demonstration purposes.",
        social: {
          github: "github.com/testuser",
          linkedin: "linkedin.com/in/testuser",
        },
      })
    }

    // Return success message
    return NextResponse.json({
      message: "Test user created or verified",
    })
  } catch (error) {
    console.error("Error in GET /api/users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

