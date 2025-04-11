"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("approved, role")
      .eq("id", data.user?.id)
      .single();

    if (userError || !userData?.approved) {
      console.error("User not approved or error fetching user");
      setLoading(false);
      return;
    }

    router.push(`/dashboard/${userData.role}`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <form onSubmit={handleLogin} className="p-8 bg-card/90 dark:bg-card-dark/90 rounded-3xl shadow-2xl border border-primary/40 space-y-6">
        <h2 className="text-4xl font-extrabold text-foreground text-center">Enter the Galaxy</h2>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full" />
        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent rounded-full py-6 text-lg font-bold">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}