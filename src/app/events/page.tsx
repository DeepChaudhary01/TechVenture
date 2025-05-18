"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  TagIcon,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Filter,
  Search,
  ChevronDown,
  Share2,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Define the Event type
interface Event {
  id: number
  type: string
  title: string
  date: string
  time: string
  location: string
  desc: string
  color: string
  attendees: number
  tags: string[]
  featured: boolean
  image: string
}

export default function EventsPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState<number | null>(null)
  const { toast } = useToast()

  // Fetch events from the API
  const fetchEvents = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeFilter !== "all") {
        params.append("type", activeFilter)
      }
      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const response = await fetch(`/api/events?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch events")
      }

      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
      toast({
        title: "Error",
        description: "Failed to load events. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Register for an event
  const registerForEvent = async (eventId: number) => {
    setRegistering(eventId)
    try {
      // In a real app, you would get the actual user ID from your auth system
      const userId = "user1"

      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, eventId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to register for event")
      }

      toast({
        title: "Success!",
        description: "You have successfully registered for this event.",
      })

      // Refresh events to update attendee count
      fetchEvents()
    } catch (error: any) {
      console.error("Error registering for event:", error)
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register for this event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setRegistering(null)
    }
  }

  // Seed the database with initial data (for development purposes)
  const seedDatabase = async () => {
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to seed database")
      }

      toast({
        title: "Database Seeded",
        description: "Sample events have been added to the database.",
      })

      // Refresh events
      fetchEvents()
    } catch (error: any) {
      console.error("Error seeding database:", error)
      toast({
        title: "Seeding Failed",
        description: error.message || "Failed to seed the database. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Fetch events on initial load
    fetchEvents()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Refetch events when filters change
  useEffect(() => {
    fetchEvents()
  }, [activeFilter, searchQuery])

  const parallaxOffset = (intensity: number) => {
    return {
      transform: `translate(${(mousePosition.x / 100) * intensity}px, ${(mousePosition.y / 100) * intensity}px)`,
    }
  }

  // Filter events for featured section
  const featuredEvents = events.filter((event) => event.featured)

  return (
    <div className="flex flex-col gap-0 bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        {/* Interactive background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background dark:from-background-dark/50 dark:via-background-dark dark:to-black z-0"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/50 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Parallax glow effects */}
        <div
          className="absolute -left-40 top-20 w-96 h-96 bg-primary/30 dark:bg-primary/20 blur-3xl rounded-full"
          style={parallaxOffset(-0.5)}
        ></div>
        <div
          className="absolute -right-40 bottom-20 w-96 h-96 bg-accent/30 dark:bg-accent/20 blur-3xl rounded-full"
          style={parallaxOffset(0.5)}
        ></div>

        {/* 3D floating elements */}
        <div className="absolute right-20 top-40 w-64 h-64 opacity-20 dark:opacity-30" style={parallaxOffset(2)}>
          <div className="w-full h-full border-4 border-primary/50 rounded-xl transform rotate-12 animate-float"></div>
        </div>
        <div className="absolute left-20 bottom-40 w-48 h-48 opacity-20 dark:opacity-30" style={parallaxOffset(1.5)}>
          <div className="w-full h-full border-4 border-accent/50 rounded-full transform -rotate-12 animate-float"></div>
        </div>

        {/* Hero content */}
        <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
          <div className="space-y-8 max-w-3xl">
            <div className="flex justify-center">
              <Badge
                className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20"
                variant="outline"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
                  <span className="text-foreground dark:text-foreground-dark">Tech Club Events Calendar</span>
                </span>
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground dark:text-foreground-dark leading-tight">
              <span className="relative">
                Discover
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
                {" "}
                & Join
              </span>
              <br />
              <span className="relative">
                Tech Events
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
              </span>
            </h1>

            {/* Animated glowing line */}
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>

            <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[700px] mx-auto leading-relaxed">
              Workshops, hackathons, tech talks, and networking events to boost your skills and connect with the tech
              community.
            </p>

            {/* Development only: Seed database button */}
            {process.env.NODE_ENV !== "production" && (
              <Button onClick={seedDatabase} variant="outline" className="mt-4">
                Seed Database with Sample Events
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Events Filter Section */}
      <section className="py-8 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="bg-background/70 dark:bg-background-dark/70 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, topics, or tags..."
                  className="pl-10 bg-background/50 dark:bg-background-dark/50 border-primary/10 dark:border-primary/5"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 md:gap-4">
                <Select value={activeFilter} onValueChange={setActiveFilter}>
                  <SelectTrigger className="w-[180px] bg-background/50 dark:bg-background-dark/50 border-primary/10 dark:border-primary/5">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Filter by type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="Workshop">Workshops</SelectItem>
                    <SelectItem value="Hackathon">Hackathons</SelectItem>
                    <SelectItem value="Tech Talk">Tech Talks</SelectItem>
                    <SelectItem value="Networking">Networking</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="border-primary/10 dark:border-primary/5 bg-background/50 dark:bg-background-dark/50"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Date</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </div>
      )}

      {/* Featured Events Section */}
      {!loading && featuredEvents.length > 0 && (
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background to-background/90 dark:from-background-dark/80 dark:via-background-dark dark:to-background-dark/90 z-0"></div>

          {/* Animated grid continuation */}
          <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background dark:to-background-dark"></div>
          </div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-start mb-10">
              <Badge
                className="mb-4 bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-secondary dark:text-secondary backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-secondary/10 dark:shadow-primary/10 border border-secondary/20 dark:border-primary/20"
                variant="outline"
              >
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-secondary dark:text-secondary animate-pulse" />
                  <span className="text-foreground dark:text-foreground-dark">Featured Events</span>
                </span>
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground dark:text-foreground-dark mb-4">
                <span className="relative">
                  Don't Miss These
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent"></span>
                </span>
              </h2>

              <p className="text-lg text-muted dark:text-muted-dark max-w-[700px]">
                Our most anticipated events of the semester - register early to secure your spot!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <div key={event.id} className="group relative perspective-1000">
                  <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-secondary/10 dark:border-accent/5 rounded-xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-secondary/5 dark:group-hover:shadow-accent/5 h-full flex flex-col">
                    {/* Event image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <Badge className={`bg-${event.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {event.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 relative z-10 flex-1">
                      <h3
                        className={`text-xl font-bold mb-3 text-foreground dark:text-foreground-dark group-hover:text-${event.color} transition-colors`}
                      >
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {event.date}
                        </div>

                        <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                          <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {event.time}
                        </div>

                        <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                          <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {event.location}
                        </div>

                        <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                          <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          {event.attendees} attending
                        </div>
                      </div>

                      <p className="text-muted dark:text-muted-dark text-sm line-clamp-3 mb-4">{event.desc}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="bg-background/50 dark:bg-background-dark/50">
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 pt-0 relative z-10 mt-auto">
                      <div className="flex gap-2">
                        <Button
                          className={`flex-1 bg-${event.color} hover:bg-${event.color}/90 text-white rounded-lg relative overflow-hidden group`}
                          onClick={() => registerForEvent(event.id)}
                          disabled={registering === event.id}
                        >
                          {registering === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Zap className="h-4 w-4" />
                              Register
                            </span>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          className="border-primary/10 dark:border-primary/5 bg-background/50 dark:bg-background-dark/50 rounded-lg"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Bottom progress bar that fills on hover */}
                    <div
                      className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${event.color} group-hover:w-full transition-all duration-700 ease-out`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events Section */}
      {!loading && (
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90 z-0"></div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-start mb-10">
              <Badge
                className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20"
                variant="outline"
              >
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
                  <span className="text-foreground dark:text-foreground-dark">Upcoming Events</span>
                </span>
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground dark:text-foreground-dark mb-4">
                <span className="relative">
                  All Events
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
                </span>
              </h2>

              <p className="text-lg text-muted dark:text-muted-dark max-w-[700px]">
                Browse our complete calendar of tech events for the semester
              </p>
            </div>

            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="group relative">
                    <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl overflow-hidden transform transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5 dark:group-hover:shadow-accent/5 h-full flex flex-col">
                      <div className="p-6 relative z-10 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <Badge
                            className={`bg-${event.color}/10 dark:bg-${event.color}/20 text-${event.color} px-3 py-1 rounded-full text-sm font-medium`}
                          >
                            {event.type}
                          </Badge>

                          <div className="flex items-center text-muted-foreground text-sm">
                            <UsersIcon className="h-3 w-3 mr-1" />
                            {event.attendees}
                          </div>
                        </div>

                        <h3
                          className={`text-lg font-bold mb-3 text-foreground dark:text-foreground-dark group-hover:text-${event.color} transition-colors`}
                        >
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            {event.date}
                          </div>

                          <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                            <ClockIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            {event.time}
                          </div>

                          <div className="flex items-center text-muted dark:text-muted-dark text-sm">
                            <MapPinIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            {event.location}
                          </div>
                        </div>

                        <p className="text-muted dark:text-muted-dark text-sm line-clamp-2 mb-4">{event.desc}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {event.tags.slice(0, 2).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-background/50 dark:bg-background-dark/50 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {event.tags.length > 2 && (
                            <Badge variant="outline" className="bg-background/50 dark:bg-background-dark/50 text-xs">
                              +{event.tags.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="p-6 pt-0 relative z-10 mt-auto">
                        <Button
                          className={`w-full bg-${event.color}/10 hover:bg-${event.color}/20 text-${event.color} border border-${event.color}/30 rounded-lg relative overflow-hidden group`}
                          onClick={() => registerForEvent(event.id)}
                          disabled={registering === event.id}
                        >
                          {registering === event.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              Register Now
                              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          )}
                        </Button>
                      </div>

                      {/* Left border accent */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[3px] bg-${event.color} opacity-50 group-hover:opacity-100 transition-opacity`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground" />
                  <h3 className="text-xl font-bold text-foreground dark:text-foreground-dark">No events found</h3>
                  <p className="text-muted dark:text-muted-dark max-w-[500px]">
                    We couldn't find any events matching your search criteria. Try adjusting your filters or check back
                    later.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setActiveFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            {events.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    View Full Calendar
                  </span>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black z-0"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
        </div>

        {/* Parallax glow effects */}
        <div
          className="absolute left-20 top-40 w-80 h-80 bg-accent/20 dark:bg-accent/10 blur-3xl rounded-full opacity-70"
          style={parallaxOffset(0.5)}
        ></div>
        <div
          className="absolute right-10 bottom-60 w-96 h-96 bg-primary/20 dark:bg-primary/10 blur-3xl rounded-full opacity-60"
          style={parallaxOffset(-0.5)}
        ></div>

        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="bg-background/30 dark:bg-background-dark/30 backdrop-blur-xl border border-primary/10 dark:border-primary/5 rounded-2xl p-8 md:p-12 overflow-hidden relative">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
              <div className="space-y-6">
                <Badge
                  className="bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
                    <span className="text-foreground dark:text-foreground-dark">Get Involved</span>
                  </span>
                </Badge>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground dark:text-foreground-dark">
                  <span className="relative">
                    Host Your Own
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
                    Tech Event
                  </span>
                </h2>

                <p className="text-lg text-muted dark:text-muted-dark">
                  Have an idea for a workshop, hackathon, or tech talk? We provide resources, space, and promotion to
                  help you bring your event to life.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <Zap className="h-5 w-5 animate-pulse" />
                      Submit Event Proposal
                    </span>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-accent text-accent hover:bg-accent/10 rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-0 bg-accent/10 group-hover:w-full transition-all duration-300"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Event Guidelines
                    </span>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-sm border border-primary/10 dark:border-primary/5 rounded-xl p-6 overflow-hidden">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground dark:text-foreground-dark">Event Resources</h3>

                    <ul className="space-y-3">
                      {[
                        "Venue booking assistance",
                        "Promotional support",
                        "Technical equipment",
                        "Funding opportunities",
                        "Mentorship connections",
                        "Attendee registration system",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                            <Star className="h-3 w-3 text-primary dark:text-accent" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
