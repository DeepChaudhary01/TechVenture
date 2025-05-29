'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, ClockIcon, MapPinIcon, TagIcon, Users2Icon, Sparkles, Code, RocketIcon, LightbulbIcon, Laptop, Gamepad2, BrainCircuit, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Event {
  id: number
  title: string
  type: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  maxAttendees: number
  color: string
  featured: boolean
  tags: string[]
  price: string
  difficulty: string
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: 1,
    title: "NextJS Mastery Workshop",
    type: "Workshop",
    date: "2025-06-15",
    time: "2:00 PM - 6:00 PM",
    location: "Tech Lab A, Engineering Building",
    description: "Deep dive into NextJS with hands-on projects. Build a full-stack application from scratch with authentication, database integration, and deployment strategies.",
    attendees: 45,
    maxAttendees: 60,
    color: "primary",
    featured: true,
    tags: ["React", "NextJS", "Full-Stack", "Beginner-Friendly"],
    price: "Free",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "AI & Machine Learning Bootcamp",
    type: "Bootcamp",  
    date: "2025-06-20",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    description: "Explore the fundamentals of AI and ML with Python. Hands-on experience with TensorFlow, scikit-learn, and real-world datasets to build your first ML models.",
    attendees: 120,
    maxAttendees: 150,
    color: "accent",
    featured: true,
    tags: ["Python", "AI", "Machine Learning", "Data Science"],
    price: "Free",
    difficulty: "Intermediate"
  },
  {
    id: 3,
    title: "48-Hour Innovation Hackathon",
    type: "Hackathon",
    date: "2025-07-05",
    time: "6:00 PM Friday - 6:00 PM Sunday",
    location: "Innovation Hub",
    description: "Team up and build the next big thing! $10,000 in prizes across multiple categories. Mentors from top tech companies will guide you through the journey.",
    attendees: 200,
    maxAttendees: 300,
    color: "secondary",
    featured: true,
    tags: ["Innovation", "Team Building", "Competition", "Prizes"],  
    price: "Free",
    difficulty: "All Levels"
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    type: "Workshop",
    date: "2025-05-25",
    time: "3:00 PM - 5:00 PM", 
    location: "Security Lab, CS Building",
    description: "Learn ethical hacking, penetration testing, and security best practices. Hands-on labs with real-world scenarios and industry-standard tools.",
    attendees: 30,
    maxAttendees: 40,
    color: "primary",
    featured: false,
    tags: ["Security", "Ethical Hacking", "Networking"],
    price: "Free",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    title: "Mobile Development with Flutter",
    type: "Workshop",
    date: "2025-05-20",
    time: "1:00 PM - 5:00 PM",
    location: "Mobile Dev Lab",
    description: "Build cross-platform mobile apps with Flutter and Dart. Create and deploy your first mobile app to both iOS and Android app stores.",
    attendees: 25,
    maxAttendees: 35,
    color: "accent",
    featured: false,
    tags: ["Flutter", "Mobile", "Cross-Platform", "Dart"],
    price: "Free", 
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    type: "Tech Talk",
    date: "2025-05-15",
    time: "4:00 PM - 6:00 PM",
    location: "Cloud Innovation Center",
    description: "Industry experts from AWS will share insights on cloud architecture, serverless computing, and career opportunities in cloud technologies.",
    attendees: 80,
    maxAttendees: 100,
    color: "secondary",
    featured: false,
    tags: ["AWS", "Cloud", "Serverless", "Career"],
    price: "Free",
    difficulty: "All Levels"
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(sampleEvents)
      setLoading(false)
    }, 1000)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const now = new Date()
  const past = events.filter((e) => new Date(e.date) < now)
  const upcoming = events.filter((e) => new Date(e.date) > now)  
  const ongoing = events.filter((e) => {
    const eventDate = new Date(e.date)
    return (
      eventDate.getFullYear() === now.getFullYear() &&
      eventDate.getMonth() === now.getMonth() &&
      eventDate.getDate() === now.getDate()
    )
  })

  const parallaxOffset = (intensity: number) => {
    return {
      transform: `translate(${mousePosition.x / 100 * intensity}px, ${mousePosition.y / 100 * intensity}px)`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black relative overflow-hidden">
      {/* Interactive background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background dark:from-background-dark/50 dark:via-background-dark dark:to-black z-0"></div>
      
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
      </div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(25)].map((_, i) => (
          <div key={i} 
            className="absolute w-2 h-2 rounded-full bg-primary/30 dark:bg-primary/50 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Parallax glow effects */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/30 dark:bg-primary/20 blur-3xl rounded-full"
        style={parallaxOffset(-0.5)}></div>
      <div className="absolute -right-40 bottom-20 w-96 h-96 bg-accent/30 dark:bg-accent/20 blur-3xl rounded-full"
        style={parallaxOffset(0.5)}></div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20" 
            variant="outline">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
              <span className="text-foreground dark:text-foreground-dark">
                Tech Events 2025
              </span>
            </span>
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground dark:text-foreground-dark leading-tight">
            <span className="relative">
              Learn.
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x"> Code.</span> 
            <br />
            <span className="relative">
              Connect.
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
            </span>
          </h1>
          
          {/* Animated glowing line */}
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>
          
          <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[700px] mx-auto leading-relaxed">
            Join our community events designed to accelerate your tech journey with hands-on workshops, hackathons, and networking opportunities.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground animate-pulse">Loading amazing events...</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8 bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl p-1">
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-lg px-6 py-2 transition-all">
                Upcoming ({upcoming.length})
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent rounded-lg px-6 py-2 transition-all">
                Ongoing ({ongoing.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary rounded-lg px-6 py-2 transition-all">
                Past ({past.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {upcoming.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcoming.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      showRegister 
                      isRegistered={registeredEvents.has(event.id)}
                      onRegister={() => setRegisteredEvents(prev => new Set([...prev, event.id]))}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <CalendarIcon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-lg">No upcoming events at the moment.</p>
                    <p className="text-sm text-muted-foreground">Check back soon for exciting new events!</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ongoing" className="space-y-6">
              {ongoing.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {ongoing.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      showRegister 
                      isRegistered={registeredEvents.has(event.id)}
                      onRegister={() => setRegisteredEvents(prev => new Set([...prev, event.id]))}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                      <ClockIcon className="h-8 w-8 text-accent animate-pulse" />
                    </div>
                    <p className="text-muted-foreground text-lg">No ongoing events right now.</p>
                    <p className="text-sm text-muted-foreground">Events will appear here when they're live!</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {past.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {past.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                      <Laptop className="h-8 w-8 text-secondary" />
                    </div>
                    <p className="text-muted-foreground text-lg">No past events to display.</p>
                    <p className="text-sm text-muted-foreground">Past events will be archived here.</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

function EventCard({ 
  event, 
  showRegister = false, 
  isRegistered = false, 
  onRegister 
}: { 
  event: Event
  showRegister?: boolean
  isRegistered?: boolean
  onRegister?: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (isRegistered) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      onRegister?.()
      
      // Show success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right'
      notification.textContent = `Successfully registered for ${event.title}!`
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.remove()
      }, 3000)
    } catch (err) {
      console.error('Registration failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const getEventIcon = () => {
    switch (event.type.toLowerCase()) {
      case 'hackathon': return RocketIcon
      case 'workshop': return Code
      case 'bootcamp': return BrainCircuit
      case 'tech talk': return LightbulbIcon
      default: return Laptop
    }
  }

  const EventIcon = getEventIcon()
  const isUpcoming = new Date(event.date) > new Date()
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100

  return (
    <div className="group relative perspective-1000">
      <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/5 dark:group-hover:shadow-accent/5 h-full flex flex-col">
        {/* Ambient glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br from-${event.color}/10 to-transparent`}></div>
        </div>
        
        {/* Top border glow */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${event.color} via-${event.color}/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
        
        {/* Featured badge */}
        {event.featured && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-gradient-to-r from-accent/90 to-secondary/90 text-white shadow-lg">
              <Sparkles className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}

        <div className="p-6 relative z-10 flex-1">
          {/* Event type and difficulty */}
          <div className="flex items-center justify-between mb-4">
            <Badge className={`bg-${event.color}/10 dark:bg-${event.color}/20 text-${event.color} px-3 py-1 rounded-full text-sm font-medium`}>
              <span className="flex items-center gap-2">
                <EventIcon className="h-3 w-3" />
                {event.type}
              </span>
            </Badge>
            <Badge variant="outline" className="text-xs">
              {event.difficulty}
            </Badge>
          </div>

          <h3 className={`text-xl font-bold mb-3 text-foreground dark:text-foreground-dark group-hover:text-${event.color} transition-colors`}>
            {event.title}
          </h3>
          
          <p className="text-muted dark:text-muted-dark mb-4 line-clamp-3">
            {event.description}
          </p>

          {/* Event details */}
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users2Icon className="h-4 w-4" />
              <span>{event.attendees}/{event.maxAttendees} attendees</span>
              <div className="flex-1 bg-muted rounded-full h-1.5 ml-2">
                <div 
                  className={`h-full bg-${event.color} rounded-full transition-all duration-500`}
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {event.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs flex items-center gap-1">
                <TagIcon className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{event.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-muted-foreground">Price:</span>
            <span className={`font-semibold ${event.price === 'Free' ? 'text-green-500' : 'text-foreground'}`}>
              {event.price}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        {showRegister && isUpcoming && (
          <div className="p-6 pt-0 relative z-10">
            <Button 
              className={`w-full ${isRegistered 
                ? 'bg-green-500/20 hover:bg-green-500/30 text-green-500 border border-green-500/30' 
                : `bg-${event.color}/10 hover:bg-${event.color}/20 text-${event.color} border border-${event.color}/30`
              } rounded-lg relative overflow-hidden group transition-all duration-300`}
              onClick={handleRegister}
              disabled={loading || isRegistered}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Registering...
                  </>
                ) : isRegistered ? (
                  'Registered ✓'
                ) : (
                  <>
                    Register Now
                    <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </Button>
          </div>
        )}
        
        {/* Bottom progress bar that fills on hover */}
        <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${event.color} group-hover:w-full transition-all duration-700 ease-out`}></div>
      </div>
    </div>
  )
}