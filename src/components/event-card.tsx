"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, UserPlus } from "lucide-react"

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

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = String(date.getFullYear()).slice(-2)
  return `${day}/${month}/${year}`
}

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      {/* Optional: Ambient glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
      </div>

      {/* Optional: Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

      {/* Image section: show image if available, else show default background */}
      <div className="relative h-40 w-full rounded-t-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 to-background dark:from-primary/20 dark:to-background-dark">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-4xl text-primary/40">
            <Calendar className="w-10 h-10 mx-auto" />
          </span>
        )}
        {event.featured && (
          <span className="absolute top-4 right-4 bg-yellow-400 text-xs px-2 py-1 rounded-full font-semibold text-black shadow z-20">
            FEATURED
          </span>
        )}
      </div>

      <CardContent className="p-5 space-y-3 text-foreground dark:text-white">
        <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-white">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.date)}</span>
          <span>•</span>
          <span>{event.time}</span>
        </div>

        <h3 className="text-lg font-semibold text-foreground dark:text-white">{event.title}</h3>

        <p className="text-sm text-muted-foreground dark:text-white/80 line-clamp-3">{event.description}</p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="dark:text-white dark:border-white/40">{event.type}</Badge>
          <Badge variant="secondary" className="dark:text-white dark:border-white/40">{event.difficulty}</Badge>
          {event.tags.slice(0, 2).map((tag, i) => (
            <Badge key={i} variant="default" className="dark:text-white dark:border-white/40">{tag}</Badge>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground dark:text-white/80">
            <UserPlus className="w-4 h-4" />
            {event.attendees}/{event.maxAttendees}
          </div>
          <Button
            size="sm"
            className="bg-primary/10 hover:bg-primary/20 text-primary dark:text-white border border-primary/30 rounded-lg relative overflow-hidden group"
            onClick={() => {
              if (event.registrationLink)
                window.open(event.registrationLink, "_blank")
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Register
            </span>
          </Button>
        </div>
      </CardContent>

      {/* Optional: Bottom progress bar on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out"></div>
    </Card>
  )
}
