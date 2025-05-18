import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const search = searchParams.get("search")
  const timeframe = searchParams.get("timeframe") || "upcoming" // Default to upcoming events

  try {
    const whereClause: any = {}

    if (type && type !== "all") {
      whereClause.type = {
        equals: type,
        mode: "insensitive",
      }
    }

    if (search) {
      whereClause.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            some: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ]
    }

    // Get current date for comparison
    const currentDate = new Date()

    // Parse dates for comparison
    // This is a simple implementation - in a real app, you'd want more robust date parsing
    function parseEventDate(dateStr: string) {
      // Handle date ranges like "July 5-7, 2025"
      const mainDate = dateStr.split("-")[0].trim()
      const parts = mainDate.split(", ")
      const year = Number.parseInt(parts[1])
      const monthDay = parts[0].split(" ")
      const month = getMonthNumber(monthDay[0])
      const day = Number.parseInt(monthDay[1])
      return new Date(year, month, day)
    }

    function getMonthNumber(month: string) {
      const months = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      }
      return months[month as keyof typeof months] || 0
    }

    // Get all events first
    const allEvents = await prisma.event.findMany({
      where: whereClause,
      include: {
        tags: true,
        registrations: true,
      },
      orderBy: {
        date: "asc",
      },
    })

    // Filter based on timeframe
    let filteredEvents = allEvents
    if (timeframe === "upcoming") {
      filteredEvents = allEvents.filter((event) => {
        try {
          const eventDate = parseEventDate(event.date)
          return eventDate >= currentDate
        } catch (e) {
          console.error("Error parsing date:", event.date, e)
          return true // Include if we can't parse the date
        }
      })
    } else if (timeframe === "past") {
      filteredEvents = allEvents.filter((event) => {
        try {
          const eventDate = parseEventDate(event.date)
          return eventDate < currentDate
        } catch (e) {
          console.error("Error parsing date:", event.date, e)
          return false // Exclude if we can't parse the date
        }
      })
    }

    // Transform the data to match the frontend structure
    const formattedEvents = filteredEvents.map((event) => ({
      id: event.id,
      type: event.type,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      desc: event.description,
      color: event.color,
      attendees: event.registrations.length,
      tags: event.tags.map((tag) => tag.name),
      featured: event.featured,
      image: event.image || "/placeholder.svg?height=400&width=600",
    }))

    return NextResponse.json(formattedEvents)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}
