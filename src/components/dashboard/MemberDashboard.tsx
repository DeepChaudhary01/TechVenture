import React from "react";

export default function MemberDashboard({ user }: { user: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
      <div className="container space-y-12">
        <h1 className="text-5xl font-extrabold text-foreground">Welcome, {user.name}</h1>
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-primary/40">
          <h2 className="text-3xl font-bold text-foreground mb-4">Your Profile</h2>
          <p>Email: {user.email}</p>
          <p>Department: {user.department.name}</p>
          <p>Role: {user.role}</p>
        </div>
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-primary/40">
          <h2 className="text-3xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground dark:text-muted-dark">Events will be listed here soon!</p>
        </div>
      </div>
    </div>
  );
}