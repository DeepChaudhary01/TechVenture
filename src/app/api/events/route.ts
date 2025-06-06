import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    })

    // Transform the data to match the frontend interface
    const transformedEvents = events.map((event) => ({
      ...event,
      date: event.date.toISOString().split("T")[0], // Convert to YYYY-MM-DD format
    }))

    return NextResponse.json(transformedEvents)
  } catch (error) {
    console.error("Failed to fetch events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const event = await prisma.event.create({
      data: {
        title: body.title,
        type: body.type,
        description: body.description,
        date: new Date(body.date),
        time: body.time,
        location: body.location,
        maxAttendees: body.maxAttendees,
        color: body.color || "#8B5CF6",
        featured: body.featured || false,
        tags: body.tags || [],
        difficulty: body.difficulty,
        price: body.price || 0,
        registrationLink: body.registrationLink,
         imageUrl: body.imageUrl,
      },
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error("Failed to create event:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
