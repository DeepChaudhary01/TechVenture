import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function EventsLoading() {
  return (
    <div className="flex flex-col gap-0 bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        {/* Interactive background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background dark:from-background-dark/50 dark:via-background-dark dark:to-black z-0"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
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

        {/* Hero content skeleton */}
        <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
          <div className="space-y-8 max-w-4xl">
            <div className="flex justify-center">
              <Badge
                className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20"
                variant="outline"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
                  <span className="text-foreground dark:text-foreground-dark">Loading Events...</span>
                </span>
              </Badge>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-16 w-96 mx-auto bg-background/20 dark:bg-background-dark/20" />
              <Skeleton className="h-16 w-80 mx-auto bg-background/20 dark:bg-background-dark/20" />
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>

            <Skeleton className="h-6 w-[700px] max-w-full mx-auto bg-background/20 dark:bg-background-dark/20" />
          </div>
        </div>
      </section>

      {/* Events Section Skeleton */}
      <section className="py-12 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          {/* Tabs skeleton */}
          <div className="flex justify-center mb-12">
            <Skeleton className="h-14 w-96 bg-background/20 dark:bg-background-dark/20 rounded-xl" />
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl overflow-hidden h-full flex flex-col"
              >
                <div className="p-6 relative z-10 flex-1">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 bg-background/20 dark:bg-background-dark/20" />
                      <Skeleton className="h-6 w-16 bg-background/20 dark:bg-background-dark/20" />
                    </div>
                    <Skeleton className="h-6 w-full bg-background/20 dark:bg-background-dark/20" />
                    <Skeleton className="h-4 w-3/4 bg-background/20 dark:bg-background-dark/20" />

                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 bg-background/20 dark:bg-background-dark/20" />
                          <Skeleton className="h-4 w-32 bg-background/20 dark:bg-background-dark/20" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20 bg-background/20 dark:bg-background-dark/20" />
                        <Skeleton className="h-4 w-16 bg-background/20 dark:bg-background-dark/20" />
                      </div>
                      <Skeleton className="h-2 w-full bg-background/20 dark:bg-background-dark/20" />
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 relative z-10 mt-auto">
                  <Skeleton className="h-10 w-full bg-background/20 dark:bg-background-dark/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
