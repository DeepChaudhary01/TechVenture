"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FloatingDepartmentIcon } from "@/components/DepartmentIcons";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [floatingIcons, setFloatingIcons] = useState([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set up listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate and position floating icons
  useEffect(() => {
    // Calculate base size responsive to screen size
    const baseSize = Math.min(windowSize.width, windowSize.height) * 0.2;

    // Generate icons with dynamic sizes
    const icons = [
      { color: "primary", department: "development", size: baseSize * 1.1 },
      { color: "secondary", department: "cybersecurity", size: baseSize * 1.0 },
      { color: "accent", department: "ai", size: baseSize * 0.85 },
      { color: "primary", department: "gamedev", size: baseSize * 0.95 },
      { color: "secondary", department: "design", size: baseSize * 0.85 },
      { color: "accent", department: "iot", size: baseSize * 0.9 },
    ];

    const viewportWidth = windowSize.width;
    const viewportHeight = windowSize.height;

    const initializedIcons = icons.map((icon) => ({
      ...icon,
      initialPosition: {
        x: Math.random() * (viewportWidth - icon.size * 2) + icon.size,
        y: Math.random() * (viewportHeight - icon.size * 2) + icon.size,
      },
      // Add varying speeds for more realistic movement
      speed: 0.2 + Math.random() * 0.4,
    }));

    setFloatingIcons(initializedIcons);
  }, [windowSize]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Handle form submission here (connect to backend, etc.)
    console.log("Form submitted:", formData);

    setIsLoading(false);
    alert("Sign up successful! Welcome to TechVenture!");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background with animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <FloatingDepartmentIcon
            key={index}
            color={icon.color}
            department={icon.department}
            size={icon.size}
            initialPosition={icon.initialPosition}
          />
        ))}
      </div>

      {/* Container */}
      <div className="w-full flex items-center justify-center max-w-4xl mx-auto">
        {/* Right side - Sign Up Form */}
        <div className="lg:w-7/12">
          <div className="bg-transparent backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sign In to TechVenture
              </h2>

              <ThemeToggle />
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-4">
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-colors flex items-center justify-center ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
