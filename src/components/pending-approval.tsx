export default function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <div className="p-8 bg-card/90 dark:bg-card-dark/90 rounded-3xl shadow-2xl border border-primary/40 text-center space-y-6">
        <h2 className="text-4xl font-extrabold text-foreground">Awaiting Approval</h2>
        <p className="text-lg text-muted-foreground dark:text-muted-dark">
          Your registration is pending approval by a Super User. Check back soon!
        </p>
      </div>
    </div>
  );
}