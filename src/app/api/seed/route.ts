import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await prisma.$transaction([
      prisma.registration.deleteMany(),
      prisma.event.deleteMany(),
      prisma.tag.deleteMany(),
    ]);

    const tags = await prisma.tag.createMany({
      data: [
        { name: "AI" },
        { name: "Git" },
        { name: "WebDev" },
      ],
    });

    await prisma.event.createMany({
      data: [
        {
          type: "Workshop",
          title: "Past Git Workshop",
          date: "May 1, 2025",
          time: "10:00 AM",
          location: "Lab A",
          description: "Version control basics and GitHub.",
          color: "blue",
          featured: false,
          attendees: 0,
        },
        {
          type: "Hackathon",
          title: "Upcoming AI Sprint",
          date: "July 15, 2025",
          time: "9:00 AM",
          location: "Auditorium",
          description: "Build AI apps in teams.",
          color: "green",
          featured: true,
          attendees: 0,
        },
      ],
    });

    return NextResponse.json({ success: true, message: "Seeded with 2 events" });
  } catch (err) {
    console.error("Seeding failed:", err);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
