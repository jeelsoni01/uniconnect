import mongoose from "mongoose"
import { Db } from "mongoose/node_modules/mongodb"

// Import models to ensure they are registered
import "./models/user"
import "./models/post"
import "./models/category"

let isConnected = false
let db: Db | null = null

export const connectToMongoDB = async () => {
  if (isConnected && db) {
    return { db }
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    isConnected = true
    db = connection.connection.db
    console.log("MongoDB connected")
    return { db }
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
