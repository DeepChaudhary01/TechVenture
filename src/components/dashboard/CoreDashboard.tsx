import React from "react";

export default function CoreDashboard({ user }: { user: any }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
      <div className="container space-y-12">
        <h1 className="text-5xl font-extrabold text-foreground">Core Dashboard, {user.name}</h1>
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-accent/40">
          <h2 className="text-3xl font-bold text-foreground mb-4">Manage Events</h2>
          <p className="text-muted-foreground dark:text-muted-dark">Event management coming soon!</p>
        </div>
        <div className="bg-card/90 dark:bg-card-dark/90 rounded-3xl p-8 border border-accent/40">
          <h2 className="text-3xl font-bold text-foreground mb-4">Manage Teams</h2>
          <p className="text-muted-foreground dark:text-muted-dark">Team management coming soon!</p>
        </div>
      </div>
    </div>
  );
}