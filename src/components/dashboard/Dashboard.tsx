"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import MemberDashboard from "./MemberDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import CoreDashboard from "./CoreDashboard";
import SuperUserDashboard from "./SuperUserDashboard";

export default function Dashboard({ role }: { role: string }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (error || !data.approved) {
        router.push("/pending-approval");
      } else {
        setUser(data);
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  switch (role) {
    case "member":
      return <MemberDashboard user={user} />;
    case "volunteer":
      return <VolunteerDashboard user={user} />;
    case "core":
      return <CoreDashboard user={user} />;
    case "super_user":
      return <SuperUserDashboard user={user} />;
    default:
      return <div>Invalid Role</div>;
  }
}