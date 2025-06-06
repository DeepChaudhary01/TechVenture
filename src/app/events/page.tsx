"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { EventCard } from "@/components/event-card"
import { EventsLoading } from "@/components/events-loading"
import { Calendar, Clock, TrendingUp, Sparkles } from "lucide-react"

interface Event {
  id: string
  title: string
  type: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  color: string
  featured: boolean
  tags: string[]
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  price: number
  registrationLink?: string
  imageUrl?: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [particles, setParticles] = useState<
    { left: number; top: number; delay: number; duration: number }[]
  >([])

  useEffect(() => {
    fetchEvents()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const newParticles = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 10,
    }))
    setParticles(newParticles)

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      if (!response.ok) throw new Error("Failed to load events")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const parallaxOffset = (intensity: number) => {
    return {
      transform: `translate(${(mousePosition.x / 100) * intensity}px, ${(mousePosition.y / 100) * intensity}px)`,
    }
  }

  const categorizeEvents = (events: Event[]) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const upcoming = events.filter((event) => new Date(event.date) > today)
    const ongoing = events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === today.toDateString()
    })
    const past = events.filter((event) => new Date(event.date) < today)

    return { upcoming, ongoing, past }
  }

  const { upcoming, ongoing, past } = categorizeEvents(events)

  if (loading) return <EventsLoading />

  return (
    <div className="flex flex-col gap-0 bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background dark:from-background-dark/50 dark:via-background-dark dark:to-black z-0" />

        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
        </div>

        {/* Hydration-safe animated particles */}
        <div className="absolute inset-0 z-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/50 animate-float"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Parallax glow */}
        <div
          className="absolute -left-40 top-20 w-96 h-96 bg-primary/30 dark:bg-primary/20 blur-3xl rounded-full"
          style={parallaxOffset(-0.5)}
        />
        <div
          className="absolute -right-40 bottom-20 w-96 h-96 bg-accent/30 dark:bg-accent/20 blur-3xl rounded-full"
          style={parallaxOffset(0.5)}
        />

        {/* Hero content */}
        <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
          <div className="space-y-8 max-w-4xl">
            <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-primary/20 dark:border-accent/20">
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Tech Club Events 2025
              </span>
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground dark:text-foreground-dark leading-tight">
              <span className="relative">Discover</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
                Amazing
              </span>{" "}
              <br />
              <span className="relative">Tech Events</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse" />
            <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[700px] mx-auto leading-relaxed">
              Join workshops, hackathons, and tech talks designed to elevate your skills and expand your network in the tech community.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background to-background/90 dark:from-background-dark/80 dark:via-background-dark dark:to-background-dark/90 z-0" />
        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z- " />

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList
                className="
        flex 
        justify-center 
        bg-background/70 dark:bg-background-dark/70 
        backdrop-blur-lg 
        border border-primary/20 dark:border-primary/10 
        rounded-full 
        p-2
        shadow-lg
        gap-2
        max-w-fit
        mx-auto
      "
              >
                <TabsTrigger
                  value="upcoming"
                  className="
          data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-primary 
          data-[state=active]:to-accent 
          data-[state=active]:text-white
          rounded-full 
          px-8 py-3 
          font-semibold
          transition
        "
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming ({upcoming.length})
                </TabsTrigger>
                <TabsTrigger
                  value="ongoing"
                  className="
          data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-primary 
          data-[state=active]:to-accent 
          data-[state=active]:text-white
          rounded-full 
          px-8 py-3 
          font-semibold
          transition
        "
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Ongoing ({ongoing.length})
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="
          data-[state=active]:bg-gradient-to-r 
          data-[state=active]:from-primary 
          data-[state=active]:to-accent 
          data-[state=active]:text-white
          rounded-full 
          px-8 py-3 
          font-semibold
          transition
        "
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Past ({past.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              <EventGrid events={upcoming} category="upcoming" />
            </TabsContent>
            <TabsContent value="ongoing">
              <EventGrid events={ongoing} category="ongoing" />
            </TabsContent>
            <TabsContent value="past">
              <EventGrid events={past} category="past" />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

function EventGrid({ events, category }: { events: Event[]; category: string }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 text-muted dark:text-muted-dark">
        No {category} events to show.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
