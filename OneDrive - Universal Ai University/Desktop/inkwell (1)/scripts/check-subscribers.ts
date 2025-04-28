import { connectToMongoDB } from '../lib/mongoose'

async function checkSubscribers() {
  try {
    const { db } = await connectToMongoDB()
    if (!db) {
      throw new Error("Database connection failed")
    }

    const subscribers = await db.collection("newsletter_subscribers").find({}).toArray()
    console.log('Subscribers in database:', subscribers)
  } catch (error) {
    console.error('Error checking subscribers:', error)
  }
}

checkSubscribers() 