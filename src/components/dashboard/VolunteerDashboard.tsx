import React from "react";

export default function VolunteerDashboard({ user }: { user: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
      <div className="container space-y-12">
        <h1 className="text-5xl font-extrabold text-foreground">Welcome, Volunteer {user.name}</h1>
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-secondary/40">
          <h2 className="text-3xl font-bold text-foreground mb-4">Assigned Events</h2>
          <p className="text-muted-foreground dark:text-muted-dark">Your assigned events will appear here!</p>
        </div>
      </div>
    </div>
  );
}