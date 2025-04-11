import React from "react";
import Link from "next/link";
import { Laptop, Github, Linkedin, Twitter, Instagram, Zap, Code, Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-12 md:py-16 relative overflow-hidden">
      {/* Background with subtle grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background-dark to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 z-0"></div>
      
      {/* Glow effects */}
      <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-primary opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute -right-40 -bottom-40 w-80 h-80 bg-accent opacity-20 blur-3xl rounded-full"></div>
      
      {/* Content */}
      <div className="container flex flex-col md:flex-row justify-between gap-8 relative z-10">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Zap className="h-7 w-7 text-accent animate-pulse absolute -top-1 -left-1 opacity-70" />
              <Laptop className="h-6 w-6 text-primary relative z-10" />
            </div>
            <span className="text-xl font-bold text-foreground-dark">
              Tech<span className="text-accent">Club</span>
            </span>
          </div>
          <p className="text-sm text-muted-dark">
            Empowering students to innovate and excel in technology since 2025.
            <span className="block mt-2 text-primary">Creating the future, one line of code at a time.</span>
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="#" className="text-muted-dark hover:text-accent transition-colors relative group">
              <Github className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-muted-dark hover:text-primary transition-colors relative group">
              <Linkedin className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-muted-dark hover:text-secondary transition-colors relative group">
              <Twitter className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-muted-dark hover:text-accent transition-colors relative group">
              <Instagram className="h-5 w-5" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground-dark mb-2 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              Navigation
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-dark">
              <Link href="/" className="hover:text-primary transition-colors relative group w-fit">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/projects" className="hover:text-primary transition-colors relative group w-fit">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/events" className="hover:text-primary transition-colors relative group w-fit">
                Events
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/resources" className="hover:text-primary transition-colors relative group w-fit">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors relative group w-fit">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground-dark mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              Resources
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-dark">
              <Link href="/workshops" className="hover:text-accent transition-colors relative group w-fit">
                Workshops
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/tutorials" className="hover:text-accent transition-colors relative group w-fit">
                Tutorials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/blog" className="hover:text-accent transition-colors relative group w-fit">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/faq" className="hover:text-accent transition-colors relative group w-fit">
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-foreground-dark mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-secondary" />
              Connect
            </h3>
            <div className="flex flex-col gap-3 text-sm text-muted-dark">
              <Link href="mailto:contact@techclub.edu" className="hover:text-secondary transition-colors relative group w-fit">
                contact@techclub.edu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors relative group w-fit">
                Room 301, Tech Building
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12 pt-4 border-t border-primary/10 relative z-10">
        <p className="text-xs text-muted-dark text-center">
          © {new Date().getFullYear()} TechClub. All rights reserved.
          <span className="block mt-1 text-accent/50">Where Innovation Meets Inspiration</span>
        </p>
      </div>
    </footer>
  );
}