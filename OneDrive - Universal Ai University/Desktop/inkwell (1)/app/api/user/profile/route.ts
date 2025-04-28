import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToMongoDB } from "@/lib/mongoose"
import User from "@/lib/models/user"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectToMongoDB()

    const user = await User.findById(session.user.id).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { name, username, bio, image } = await req.json()

    if (!name || !username) {
      return NextResponse.json({ message: "Name and username are required" }, { status: 400 })
    }

    await connectToMongoDB()

    // Check if username is already taken by another user
    const existingUser = await User.findOne({
      username,
      _id: { $ne: session.user.id },
    })

    if (existingUser) {
      return NextResponse.json({ message: "Username is already taken" }, { status: 409 })
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name,
        username,
        bio,
        image,
      },
      { new: true },
    ).select("-password")

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}
