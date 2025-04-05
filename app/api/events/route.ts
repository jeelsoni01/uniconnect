import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const mode = searchParams.get("mode")
    const priority = searchParams.get("priority")

    // Build query based on filters
    const query: any = {}

    if (category) {
      query.category = category
    }

    if (mode) {
      query.mode = mode
    }

    if (priority) {
      query.priority = priority
    }

    // Get events collection
    const eventsCollection = await getCollection("events")

    // Get events from database
    const events = await eventsCollection.find(query).toArray()

    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "title",
      "date",
      "time",
      "venue",
      "mode",
      "description",
      "teamSize",
      "prizeWorth",
      "category",
    ]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Get events collection
    const eventsCollection = await getCollection("events")

    // Add timestamp
    const eventData = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert event into database
    const result = await eventsCollection.insertOne(eventData)

    return NextResponse.json(
      {
        message: "Event created successfully",
        eventId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

