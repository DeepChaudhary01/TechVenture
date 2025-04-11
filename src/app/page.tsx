"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeIcon, CalendarIcon, Users2Icon, LightbulbIcon, RocketIcon, 
         TrendingUpIcon, Zap, Star, Laptop, ArrowRight, Code, 
         Sparkles} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ["hero", "features", "events"];
      const sectionElements = sections.map(s => document.getElementById(s));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && window.scrollY >= element.offsetTop - 300) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = (intensity) => {
    return {
      transform: `translate(${mousePosition.x / 100 * intensity}px, ${mousePosition.y / 100 * intensity}px)`
    };
  };

  return (
    <div className="flex flex-col gap-0 bg-gradient-to-b from-background to-background-dark dark:from-background-dark dark:to-black">
      {/* Hero Section */}
      <section id="hero" className="min-h-[93vh] flex items-center justify-center relative overflow-hidden">
        {/* Interactive background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background dark:from-background-dark/50 dark:via-background-dark dark:to-black z-0"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
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
              <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20" 
                variant="outline">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
                  <span className="text-foreground dark:text-foreground-dark">
                    College Tech Club 2025
                  </span>
                </span>
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground dark:text-foreground-dark leading-tight">
              <span className="relative">
                Innovate
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x"> Create</span> 
              <br />
              <span className="relative">
                Collaborate
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
              </span>
            </h1>
            
            {/* Animated glowing line */}
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>
            
            <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[700px] mx-auto leading-relaxed">
              Join our community of tech enthusiasts to build cutting-edge projects, master new technologies, and shape the future of innovation together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 text-white rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="h-5 w-5 animate-pulse" />
                  Join the Club
                </span>
                <span className="absolute -bottom-0 left-0 w-full h-1 bg-white/30"></span>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-accent text-accent hover:bg-accent/10 rounded-xl px-8 py-6 text-lg font-medium transition-all relative overflow-hidden group">
                <span className="absolute inset-0 w-0 bg-accent/10 group-hover:w-full transition-all duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Explore Projects
                </span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Interactive scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-primary dark:border-accent flex items-start justify-center p-1">
            <div className="w-1 h-3 bg-primary dark:bg-accent rounded-full animate-[pulse_1.5s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Features Section with Interactive Tech-inspired Elements */}
<section id="features" className="py-5 relative overflow-hidden">
  {/* Tech-inspired background with animated gradients */}
  <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background to-background/90 dark:from-background-dark/80 dark:via-background-dark dark:to-background-dark/90 z-0"></div>
  
  {/* Animated grid continuation from hero */}
  <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background dark:to-background-dark"></div>
  </div>
  
  {/* Animated particles */}
  <div className="absolute inset-0 z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} 
        className="absolute w-2 h-2 rounded-full bg-accent/30 dark:bg-accent/50 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${10 + Math.random() * 15}s`
        }}
      ></div>
    ))}
  </div>
  
  {/* Parallax glow effects */}
  <div className="absolute left-20 top-40 w-80 h-80 bg-accent/20 dark:bg-accent/10 blur-3xl rounded-full opacity-70"
    style={{transform: `translateY(calc(var(--scroll) * -0.05))`}}></div>
  <div className="absolute right-10 bottom-60 w-96 h-96 bg-primary/20 dark:bg-primary/10 blur-3xl rounded-full opacity-60"
    style={{transform: `translateY(calc(var(--scroll) * 0.08))`}}></div>
  
  {/* Content container */}
  <div className="container px-4 md:px-6 mx-auto relative z-10">
    {/* Section header */}
    <div className="flex flex-col items-center text-center mb-16 space-y-6">
      <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-accent backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/10 dark:shadow-accent/10 border border-primary/20 dark:border-accent/20" 
        variant="outline">
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary dark:text-accent animate-pulse" />
          <span className="text-foreground dark:text-foreground-dark">Exclusive Features</span>
        </span>
      </Badge>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground dark:text-foreground-dark">
        <span className="relative">
          Learn.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x"> Build.</span> 
        <span className="relative">
          Grow.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"></span>
        </span>
      </h2>
      
      {/* Animated glowing line */}
      <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full animate-pulse"></div>
      
      <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[800px] mx-auto leading-relaxed">
        A playground for students to master tech, collaborate, and launch their careers with cutting-edge resources.
      </p>
    </div>
    
    {/* Features grid with interactive cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {[
        { 
          icon: Code, 
          title: "Code Labs", 
          desc: "Hands-on coding with mentors to level up fast. Access weekly workshops and gain practical skills.",
          color: "primary"
        },
        { 
          icon: RocketIcon, 
          title: "Project Forge", 
          desc: "Build real projects, from idea to demo. Get feedback from industry experts and build your portfolio.",
          color: "accent"
        },
        { 
          icon: CalendarIcon, 
          title: "Tech Jams", 
          desc: "Hackathons & talks to spark inspiration. Collaborate with peers and win prizes with innovative solutions.",
          color: "secondary"
        },
        { 
          icon: LightbulbIcon, 
          title: "Skill Vault", 
          desc: "Free resources to master any tech stack. Access tutorials, courses, and documentation handpicked by pros.",
          color: "primary"
        },
        { 
          icon: Users2Icon, 
          title: "Peer Circuit", 
          desc: "Connect with students and pros alike. Build your network and find mentors in your field of interest.",
          color: "accent"
        },
        { 
          icon: TrendingUpIcon, 
          title: "Career Boost", 
          desc: "Internships and advice to launch your career. Get resume reviews and interview prep from industry insiders.",
          color: "secondary"
        },
      ].map((feature, index) => (
        <div key={index} className="group relative perspective-1000">
          <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-primary/10 dark:border-primary/5 rounded-xl overflow-hidden transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/5 dark:group-hover:shadow-accent/5">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/10 to-transparent`}></div>
            </div>
            
            {/* Top border glow */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${feature.color} via-${feature.color}/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="p-6 relative z-10">
              <div className={`h-12 w-12 rounded-lg bg-${feature.color}/10 dark:bg-${feature.color}/20 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className={`h-6 w-6 text-${feature.color}`} />
              </div>
              
              <h3 className={`text-xl font-bold mb-2 text-foreground dark:text-foreground-dark group-hover:text-${feature.color} transition-colors`}>
                {feature.title}
              </h3>
              
              <p className="text-muted dark:text-muted-dark">
                {feature.desc}
              </p>
            </div>
            
            {/* Bottom progress bar that fills on hover */}
            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${feature.color} group-hover:w-full transition-all duration-700 ease-out`}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Events Section with Futuristic Elements */}
<section id="events" className="py-5 relative overflow-hidden">
  {/* Tech-inspired background with dark gradient */}
  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/90 dark:from-background-dark dark:via-background-dark/95 dark:to-background-dark/90 z-0"></div>
  
  {/* Circuit pattern overlay */}
  <div className="absolute inset-0 bg-[url('/grid.png')] dark:opacity-10 opacity-5 z-0">
    <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-background-dark to-transparent"></div>
  </div>
  
  {/* Floating orbs with different opacities */}
  <div className="absolute inset-0 z-0">
    {[...Array(15)].map((_, i) => (
      <div key={i} 
        className="absolute w-2 h-2 rounded-full bg-secondary/30 dark:bg-secondary/50 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 7}s`,
          animationDuration: `${10 + Math.random() * 15}s`
        }}
      ></div>
    ))}
  </div>
  
  {/* Content container */}
  <div className="container px-4 md:px-6 mx-auto relative z-10">
    {/* Section header */}
    <div className="flex flex-col items-center text-center mb-16 space-y-6">
      <Badge className="bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-secondary dark:text-secondary backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-secondary/10 dark:shadow-primary/10 border border-secondary/20 dark:border-primary/20" 
        variant="outline">
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-secondary dark:text-secondary animate-pulse" />
          <span className="text-foreground dark:text-foreground-dark">Upcoming Tech Events</span>
        </span>
      </Badge>
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground dark:text-foreground-dark">
        <span className="relative">
          Hack.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent"></span>
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-accent animate-gradient-x"> Learn.</span> 
        <span className="relative">
          Connect.
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></span>
        </span>
      </h2>
      
      {/* Animated glowing line */}
      <div className="w-32 h-1 bg-gradient-to-r from-secondary via-primary to-accent mx-auto rounded-full animate-pulse"></div>
      
      <p className="text-lg md:text-xl text-muted dark:text-muted-dark max-w-[800px] mx-auto leading-relaxed">
        Join the action—events designed for students to shine and expand their technical horizons.
      </p>
    </div>
    
    {/* Events cards with hover effects */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {[
        {
          type: "Workshop",
          title: "NextJS Bootcamp",
          date: "March 20, 2025 • 3:00 PM",
          desc: "Master modern web development with professional mentors guiding you through building a complete application.",
          color: "primary",
          icon: CodeIcon,
        },
        {
          type: "Hackathon",
          title: "48-Hour Tech Blitz",
          date: "April 5-7, 2025 • Tech Building",
          desc: "Team up, hack, and win big with $5000 in prizes! Create solutions for real-world problems in this intense challenge.",
          color: "accent",
          icon: RocketIcon,
        },
        {
          type: "Tech Talk",
          title: "AI Future Lab",
          date: "April 15, 2025 • 5:00 PM",
          desc: "Learn about cutting-edge AI from industry experts, with hands-on demos and networking opportunities after the talk.",
          color: "secondary",
          icon: LightbulbIcon,
        },
      ].map((event, index) => (
        <div key={index} className="group relative perspective-1000">
          <div className="relative bg-background/50 dark:bg-background-dark/50 backdrop-blur-lg border border-secondary/10 dark:border-accent/5 rounded-xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-secondary/5 dark:group-hover:shadow-accent/5 h-full flex flex-col">
            {/* Ambient glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br from-${event.color}/10 to-transparent`}></div>
            </div>
            
            {/* Top border glow */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-${event.color} via-${event.color}/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="p-6 relative z-10 flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={`bg-${event.color}/10 dark:bg-${event.color}/20 text-${event.color} px-3 py-1 rounded-full text-sm font-medium`}>
                  <span className="flex items-center gap-2">
                    <event.icon className="h-3 w-3" />
                    {event.type}
                  </span>
                </Badge>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 text-foreground dark:text-foreground-dark group-hover:text-${event.color} transition-colors`}>
                {event.title}
              </h3>
              
              <div className="flex items-center text-muted dark:text-muted-dark mb-4 text-sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {event.date}
              </div>
              
              <p className="text-muted dark:text-muted-dark mb-6">
                {event.desc}
              </p>
            </div>
            
            <div className="p-6 pt-0 relative z-10 mt-auto">
              <Button className={`w-full bg-${event.color}/10 hover:bg-${event.color}/20 text-${event.color} border border-${event.color}/30 rounded-lg relative overflow-hidden group`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Now
                  <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
            
            {/* Bottom progress bar that fills on hover */}
            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${event.color} group-hover:w-full transition-all duration-700 ease-out`}></div>
          </div>
        </div>
      ))}
    </div>
    </div>
</section>

      {/* Floating navigation indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex">
        <div className="flex flex-col gap-4">
          {[
            { id: "hero", label: "Home", icon: Laptop },
            { id: "features", label: "Features", icon: Code },
            // { id: "events", label: "Events", icon: Calendar }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`w-3 h-12 rounded-full flex items-center justify-center group transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-primary/20 dark:bg-accent/20" 
                  : "bg-background/50 dark:bg-background-dark/50"
              }`}
            >
              <div className="relative">
                <span className={`absolute -left-16 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent text-xs px-2 py-1 rounded whitespace-nowrap`}>
                  {item.label}
                </span>
                <div className={`w-2 h-2 rounded-full ${
                  activeSection === item.id 
                    ? "bg-primary dark:bg-accent" 
                    : "bg-foreground/30 dark:bg-foreground-dark/30"
                }`}></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
