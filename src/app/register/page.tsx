"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FloatingDepartmentIcon } from "@/components/DepartmentIcons";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const departments = [
  { label: "Development", value: "development" },
  { label: "Cyber Security", value: "cybersecurity" },
  { label: "AI & ML", value: "ai" },
  { label: "Game Development", value: "gamedev" },
  { label: "UI/UX Design", value: "design" },
  { label: "IoT", value: "iot" },
];

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "",
    prn: "",
    rollNo: "",
    skills: "",
    interestedDepartments: [],
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [departmentError, setDepartmentError] = useState(false);
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

  // Check password match
  useEffect(() => {
    if (formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

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

  const handleDepartmentChange = (checked: boolean, value: string) => {
    let updatedDepartments = [...formData.interestedDepartments]
  
    if (checked) {
      if (updatedDepartments.length >= 3) {
        setDepartmentError(true)
        return
      }
      updatedDepartments.push(value)
    } else {
      updatedDepartments = updatedDepartments.filter((v) => v !== value)
    }
  
    setFormData((prev) => ({
      ...prev,
      interestedDepartments: updatedDepartments,
    }))
    setDepartmentError(false)
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

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
      <div className="w-full max-w-6xl z-20 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left side - Branding */}
        <div className="lg:w-5/12 flex flex-col justify-center items-center lg:items-start space-y-6">
          <div className="text-center lg:text-left p-8 bg-transparent backdrop-blur-sm rounded-2xl border border-border/30">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TechVenture
            </h1>
            <p className="mt-3 text-lg text-muted dark:text-muted-dark">
              Your journey into the tech world starts here.
            </p>

            {/* Only show departments grid on non-mobile screens */}
            <div className="mt-8 space-y-6 hidden md:block">
              <h2 className="text-xl md:text-2xl font-semibold">
                Join Our Departments
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
                <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg border border-border/30 flex flex-col items-center text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="w-12 h-12 text-primary dark:text-primary-dark">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Enhanced Development/Computer Engineering Icon */}
                      <rect
                        x="15"
                        y="25"
                        width="70"
                        height="50"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />
                      <rect
                        x="15"
                        y="25"
                        width="70"
                        height="12"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                      <circle cx="21" cy="31" r="2" fill="currentColor" />
                      <circle cx="27" cy="31" r="2" fill="currentColor" />
                      <circle cx="33" cy="31" r="2" fill="currentColor" />

                      {/* Code elements */}
                      <path
                        d="M25,45 L15,55 L25,65"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <path
                        d="M75,45 L85,55 L75,65"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      <path
                        d="M60,42 L40,68"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        fill="none"
                      />

                      {/* Circuit board tracks */}
                      <path
                        d="M30,50 H50 M30,60 H70"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="1 2"
                      />
                      <circle cx="30" cy="50" r="1.5" fill="currentColor" />
                      <circle cx="50" cy="50" r="1.5" fill="currentColor" />
                      <circle cx="30" cy="60" r="1.5" fill="currentColor" />
                      <circle cx="70" cy="60" r="1.5" fill="currentColor" />

                      {/* Base/Stand */}
                      <rect
                        x="20"
                        y="80"
                        width="60"
                        height="5"
                        rx="2"
                        fill="currentColor"
                        fillOpacity="0.3"
                      />
                      <path
                        d="M40,75 V80 M60,75 V80"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium mt-2">Development</h3>
                </div>

                <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg border border-border/30 flex flex-col items-center text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="w-12 h-12 text-secondary dark:text-secondary-dark">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Enhanced Cybersecurity Icon */}
                      <path
                        d="M50,15 C35,25 20,25 20,25 V55 C20,75 50,85 50,85 C50,85 80,75 80,55 V25 C80,25 65,25 50,15 Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />

                      {/* Lock body */}
                      <rect
                        x="35"
                        y="40"
                        width="30"
                        height="30"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />

                      {/* Lock mechanism and details */}
                      <path
                        d="M35,50 H65"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle cx="50" cy="55" r="5" fill="currentColor" />
                      <rect
                        x="48"
                        y="55"
                        width="4"
                        height="10"
                        rx="1"
                        fill="currentColor"
                      />

                      {/* Digital/Circuit Elements */}
                      <path
                        d="M30,30 H40 M60,30 H70"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="1 1"
                      />
                      <path
                        d="M25,35 H45 M55,35 H75"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="1 1"
                      />
                      <circle cx="40" cy="30" r="1.5" fill="currentColor" />
                      <circle cx="60" cy="30" r="1.5" fill="currentColor" />
                      <circle cx="45" cy="35" r="1.5" fill="currentColor" />
                      <circle cx="55" cy="35" r="1.5" fill="currentColor" />

                      {/* Binary data visualization */}
                      <text
                        x="37"
                        y="47"
                        fill="currentColor"
                        fontSize="4"
                        fontFamily="monospace"
                      >
                        10110
                      </text>
                      <text
                        x="45"
                        y="47"
                        fill="currentColor"
                        fontSize="4"
                        fontFamily="monospace"
                      >
                        01001
                      </text>

                      {/* Shield outline glow effect */}
                      <path
                        d="M50,20 C38,28 25,28 25,28 V53 C25,68 50,78 50,78 C50,78 75,68 75,53 V28 C75,28 62,28 50,20 Z"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.5"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium mt-2">Cyber Security</h3>
                </div>

                <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg border border-border/30 flex flex-col items-center text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="w-12 h-12 text-accent dark:text-accent-dark">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Enhanced AI/Data Science Icon */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />

                      {/* Brain structure */}
                      <path
                        d="M30,30 Q50,15 70,30"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M25,45 Q35,55 45,43"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M55,43 Q65,55 75,45"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M30,70 Q50,85 70,70"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />

                      {/* Neural network nodes with pulsing effect */}
                      <circle
                        cx="30"
                        cy="30"
                        r="4"
                        fill="currentColor"
                        fillOpacity="0.8"
                      >
                        <animate
                          attributeName="r"
                          values="3.5;4.5;3.5"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="70"
                        cy="30"
                        r="4"
                        fill="currentColor"
                        fillOpacity="0.8"
                      >
                        <animate
                          attributeName="r"
                          values="4;5;4"
                          dur="2.7s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="25"
                        cy="45"
                        r="3"
                        fill="currentColor"
                        fillOpacity="0.7"
                      >
                        <animate
                          attributeName="r"
                          values="2.5;3.5;2.5"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="75"
                        cy="45"
                        r="3"
                        fill="currentColor"
                        fillOpacity="0.7"
                      >
                        <animate
                          attributeName="r"
                          values="2.8;3.8;2.8"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx="50"
                        cy="50"
                        r="5"
                        fill="currentColor"
                        fillOpacity="0.9"
                      >
                        <animate
                          attributeName="r"
                          values="4.5;5.5;4.5"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Data visualization elements */}
                      <path
                        d="M35,60 H45 L55,50 L65,55"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="1 0"
                      />
                      <circle cx="35" cy="60" r="1.5" fill="currentColor" />
                      <circle cx="45" cy="60" r="1.5" fill="currentColor" />
                      <circle cx="55" cy="50" r="1.5" fill="currentColor" />
                      <circle cx="65" cy="55" r="1.5" fill="currentColor" />

                      {/* Neural connections with pulse animation */}
                      <path
                        d="M30,30 L50,50 L70,30"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.4;0.8;0.4"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M25,45 L50,50 L75,45"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.5;0.9;0.5"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M30,70 L50,50 L70,70"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeOpacity="0.6"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.4;0.7;0.4"
                          dur="2.8s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                  <h3 className="font-medium mt-2">AI</h3>
                </div>

                <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg border border-border/30 flex flex-col items-center text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="w-12 h-12 text-primary dark:text-primary-dark">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Game Dev Icon - 3D game environment */}
                      <path
                        d="M20,30 L50,15 L80,30 L50,45 Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />
                      <path
                        d="M20,30 L20,70 L50,85 L80,70 L80,30"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M50,45 L50,85"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <path
                        d="M20,70 L50,55 L80,70"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />

                      {/* Game character */}
                      <circle
                        cx="35"
                        cy="60"
                        r="5"
                        fill="currentColor"
                        fillOpacity="0.7"
                      />
                      <path
                        d="M32,57 L38,57"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M35,65 L35,72"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <path
                        d="M31,72 L39,72"
                        stroke="currentColor"
                        strokeWidth="1"
                      />

                      {/* Control elements */}
                      <circle
                        cx="65"
                        cy="40"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                      <circle cx="60" cy="40" r="2" fill="currentColor" />
                      <circle cx="70" cy="40" r="2" fill="currentColor" />
                      <circle cx="65" cy="35" r="2" fill="currentColor" />
                      <circle cx="65" cy="45" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <h3 className="font-medium mt-2">3D & Game Dev</h3>
                </div>

                <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg border border-border/30 flex flex-col items-center text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="w-12 h-12 text-secondary dark:text-secondary-dark">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Enhanced Design/Game Dev Icon */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />

                      {/* Color palette */}
                      <path
                        d="M25,35 A30,30 0 1,1 75,65"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />

                      {/* Game controller elements */}
                      <rect
                        x="30"
                        y="45"
                        width="40"
                        height="25"
                        rx="12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                      <circle cx="40" cy="55" r="3" fill="currentColor" />
                      <circle cx="60" cy="55" r="3" fill="currentColor" />
                      <rect
                        x="45"
                        y="65"
                        width="10"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      />
                      <path
                        d="M37,65 H43 M57,65 H63"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />

                      {/* 3D elements */}
                      <path
                        d="M20,20 L30,15 L40,20 L30,25 Z"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M20,20 V30 L30,35 L40,30 V20"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M30,25 V35"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="1 1"
                      />

                      {/* Color swatches */}
                      <circle
                        cx="25"
                        cy="35"
                        r="5"
                        fill="currentColor"
                        fillOpacity="0.7"
                      />
                      <circle
                        cx="35"
                        cy="25"
                        r="4"
                        fill="currentColor"
                        fillOpacity="0.5"
                      />
                      <circle
                        cx="65"
                        cy="25"
                        r="6"
                        fill="currentColor"
                        fillOpacity="0.3"
                      />
                      <circle
                        cx="75"
                        cy="45"
                        r="5"
                        fill="currentColor"
                        fillOpacity="0.4"
                      />
                      <circle
                        cx="65"
                        cy="65"
                        r="4"
                        fill="currentColor"
                        fillOpacity="0.6"
                      />

                      {/* Design tools */}
                      <path
                        d="M72,25 L80,17"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <circle
                        cx="82"
                        cy="15"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                      <path
                        d="M15,75 L25,65"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <rect
                        x="12"
                        y="75"
                        width="6"
                        height="10"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium mt-2">Designing</h3>
                </div>

                <div className="bg-transparent backdrop-blur-sm p-4 rounded-lg border border-border/30 flex flex-col items-center text-center hover:shadow-md transition-all hover:scale-105">
                  <div className="w-12 h-12 text-accent dark:text-accent-dark">
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Enhanced IoT Icon */}
                      {/* Central hub */}
                      <rect
                        x="40"
                        y="40"
                        width="20"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                      <circle cx="50" cy="50" r="3" fill="currentColor" />
                      <circle
                        cx="50"
                        cy="50"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2 1"
                      >
                        <animate
                          attributeName="r"
                          values="6;9;6"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Connected devices */}
                      <rect
                        x="15"
                        y="25"
                        width="15"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />
                      <rect
                        x="15"
                        y="55"
                        width="15"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />
                      <rect
                        x="70"
                        y="25"
                        width="15"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />
                      <rect
                        x="70"
                        y="55"
                        width="15"
                        height="20"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="currentColor"
                        fillOpacity="0.05"
                      />

                      {/* Device screens and details */}
                      <rect
                        x="17"
                        y="28"
                        width="11"
                        height="6"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                      <rect
                        x="17"
                        y="58"
                        width="11"
                        height="10"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                      <rect
                        x="72"
                        y="28"
                        width="11"
                        height="6"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />
                      <rect
                        x="72"
                        y="58"
                        width="11"
                        height="10"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="currentColor"
                        fillOpacity="0.2"
                      />

                      {/* Connection lines with animation */}
                      <path
                        d="M30,35 L40,45"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.3;0.9;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M30,65 L40,55"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.3;0.9;0.3"
                          dur="2.3s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M70,45 L60,35"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.3;0.9;0.3"
                          dur="1.7s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M70,55 L60,65"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      >
                        <animate
                          attributeName="stroke-opacity"
                          values="0.3;0.9;0.3"
                          dur="2.2s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* Device indicators */}
                      <circle cx="22.5" cy="38" r="2" fill="currentColor">
                        <animate
                          attributeName="fill-opacity"
                          values="0.6;1;0.6"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="22.5" cy="65" r="2" fill="currentColor">
                        <animate
                          attributeName="fill-opacity"
                          values="0.6;1;0.6"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="77.5" cy="38" r="2" fill="currentColor">
                        <animate
                          attributeName="fill-opacity"
                          values="0.6;1;0.6"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx="77.5" cy="65" r="2" fill="currentColor">
                        <animate
                          attributeName="fill-opacity"
                          values="0.6;1;0.6"
                          dur="1.3s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* WiFi/Signal indicators */}
                      <path
                        d="M22.5,35 Q22.5,40 25,40"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M77.5,35 Q77.5,40 75,40"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M50,35 Q50,30 55,25"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M50,35 Q50,30 45,25"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />

                      {/* Cloud computing element */}
                      <path
                        d="M40,15 Q35,15 35,20 Q30,20 30,25 Q30,30 35,30 H45 Q50,30 50,25 Q50,20 45,20 Q45,15 40,15"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.1"
                      />
                      <path
                        d="M37,25 H43 M40,22 V28"
                        stroke="currentColor"
                        strokeWidth="0.75"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium mt-2">IoT</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Sign Up Form */}
        <div className="lg:w-7/12">
          <div className="bg-transparent backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Join TechVenture
              </h2>

              <ThemeToggle />
            </div>

            <form onSubmit={handleSubmit} className="relative space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address *
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
                    Password *
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password *
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-md border ${
                      !passwordMatch ? "border-red-500" : "border-border/70"
                    } bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50`}
                  />
                  {!passwordMatch && (
                    <p className="text-xs text-red-500 mt-1">
                      Passwords don't match
                    </p>
                  )}
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Branch *
                  </label>
                  <Select
                    name="branch"
                    value={formData.branch}
                    onValueChange={(value) =>
                      handleChange({ target: { name: "branch", value } } as any)
                    }
                    required
                  >
                    <SelectTrigger className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50">
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-black bg-card">
                      <SelectItem value="computer-engineering">
                        Computer Engineering
                      </SelectItem>
                      <SelectItem value="information-technology">
                        Information Technology
                      </SelectItem>
                      <SelectItem value="artificial-intelligence-data-science">
                        AI & Data Science
                      </SelectItem>
                      <SelectItem value="electrical-engineering">
                        Electrical Engineering
                      </SelectItem>
                      <SelectItem value="mechanical-engineering">
                        Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="civil-engineering">
                        Civil Engineering
                      </SelectItem>
                      <SelectItem value="electronics">
                        Electronics & Communication
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* PRN (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    PRN <span className="text-xs text-muted">(Optional)</span>
                  </label>
                  <Input
                    name="prn"
                    value={formData.prn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Roll No (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Roll No{" "}
                    <span className="text-xs text-muted">(Optional)</span>
                  </label>
                  <Input
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Skills (Optional) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Skills <span className="text-xs text-muted">(Optional)</span>
                </label>
                <Textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List your technical skills (e.g., Python, UI/UX)"
                  className="w-full px-4 py-2 rounded-md border border-border/70 bg-transparent backdrop-blur-sm focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              {/* Interested Departments (Max 3) */}
              <div>
                <p className="text-sm font-medium mb-2">
                  Interested Departments:{" "}
                  <span className="text-xs text-muted">(Max 3)</span>
                </p>
                {departmentError && (
                  <p className="text-xs text-red-500 mb-2">
                    You can select a maximum of 3 departments
                  </p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {departments.map((dept) => (
                    <label
                      key={dept.value}
                      className="flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <Checkbox
                        checked={formData.interestedDepartments.includes(
                          dept.value
                        )}
                        onCheckedChange={(checked) =>
                          handleDepartmentChange(!!checked, dept.value)
                        }
                        className="w-4 h-4"
                      />
                      <span>{dept.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading || !passwordMatch}
                  className={`w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-colors flex items-center justify-center ${
                    isLoading || !passwordMatch
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        /* …spinner SVG… */
                      />
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
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
