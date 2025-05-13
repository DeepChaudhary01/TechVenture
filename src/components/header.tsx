"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Code, Laptop, Users, Calendar, BookOpen, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function Header() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single();
        setUser(userData);
      }
    };
    fetchUser();

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-black/80 border-b border-primary/30 shadow-lg shadow-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Zap className="h-7 w-7 text-accent animate-pulse absolute -top-1 -left-1 opacity-70" />
            <Laptop className="h-6 w-6 text-primary relative z-10" />
          </div>
          <Link
            href="/"
            className="text-2xl font-bold text-foreground-dark hover:text-primary transition-colors relative group"
          >
            Tech<span className="text-accent">Club</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="space-x-1">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 items-center px-4 text-sm font-medium text-foreground-dark hover:text-accent hover:bg-accent/10 rounded-md transition-all">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-foreground-dark hover:text-accent hover:bg-accent/10">
                Projects
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 w-[400px] bg-card-dark rounded-xl shadow-2xl shadow-accent/20 border border-accent/20">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-br from-primary via-accent to-primary p-6 text-white overflow-hidden relative group"
                        href="/projects"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                        <div className="relative z-10">
                          <Code className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Our Projects
                          </div>
                          <p className="text-sm leading-tight">
                            Explore cutting-edge projects by our members
                          </p>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link href="/projects/web" legacyBehavior passHref>
                      <NavigationMenuLink className="block p-3 rounded-md hover:bg-accent/10 text-foreground-dark hover:text-accent transition-all">
                        <div className="text-sm font-medium flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Web Development
                        </div>
                        <p className="text-xs text-muted-dark">
                          Full-stack web applications
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects/mobile" legacyBehavior passHref>
                      <NavigationMenuLink className="block p-3 rounded-md hover:bg-accent/10 text-foreground-dark hover:text-accent transition-all">
                        <div className="text-sm font-medium flex items-center gap-2">
                          <Laptop className="h-4 w-4" />
                          Mobile Apps
                        </div>
                        <p className="text-xs text-muted-dark">
                          Cross-platform mobile solutions
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/events" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 items-center px-4 text-sm font-medium text-foreground-dark hover:text-accent hover:bg-accent/10 rounded-md transition-all">
                  Events
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/resources" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 items-center px-4 text-sm font-medium text-foreground-dark hover:text-accent hover:bg-accent/10 rounded-md transition-all">
                  Resources
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 items-center px-4 text-sm font-medium text-foreground-dark hover:text-accent hover:bg-accent/10 rounded-md transition-all">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href={`/dashboard/${user.role}`}
                className="text-foreground-dark hover:text-accent bg-transparent hover:bg-accent/10 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-transparent hover:border-accent/20"
              >
                Dashboard
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/30 text-white rounded-lg px-6 py-2 text-sm font-medium transition-all relative overflow-hidden group"
              onClick={() => router.push("/register")}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity -z-10 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite]"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Enter the Galaxy
              </span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}