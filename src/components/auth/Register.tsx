"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const departments = ["Development", "Marketing", "Social Media"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error(error.message);
      setLoading(false);
      return;
    }
  
    // Ensure user is authenticated before inserting into 'users' table
    if (!data.user) {
      console.error("User registration failed.");
      setLoading(false);
      return;
    }
  
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: data.user.id, // Use the authenticated user's ID
        name,
        email,
        role: "member",
        department_id: departments.indexOf(department).toString(),
        approved: false,
      },
    ]);
  
    if (dbError) {
      console.error(dbError.message);
    } else {
      router.push("/pending-approval");
    }
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      <form onSubmit={handleRegister} className="p-8 bg-card/90 dark:bg-card-dark/90 rounded-3xl shadow-2xl border border-primary/40 space-y-6">
        <h2 className="text-4xl font-extrabold text-foreground text-center">Join the Tech Galaxy</h2>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-full" />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full" />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full" />
        <Select onValueChange={setDepartment}>
          <SelectTrigger className="rounded-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent className="bg-card dark:bg-card-dark rounded-2xl">
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent rounded-full py-6 text-lg font-bold">
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}