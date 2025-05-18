import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { userId, eventId } = await request.json()

    if (!userId || !eventId) {
      return NextResponse.json({ error: "User ID and Event ID are required" }, { status: 400 })
    }

    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Check if the user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId: Number(eventId),
        },
      },
    })

    if (existingRegistration) {
      return NextResponse.json({ error: "User already registered for this event" }, { status: 400 })
    }

    // Create the registration
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId: Number(eventId),
      },
    })

    return NextResponse.json({ success: true, registration })
  } catch (error) {
    console.error("Error registering for event:", error)
    return NextResponse.json({ error: "Failed to register for event" }, { status: 500 })
  }
}
