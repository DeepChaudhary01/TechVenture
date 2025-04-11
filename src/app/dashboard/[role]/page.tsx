import Dashboard from "@/components/dashboard/Dashboard";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();
  const { role } = router.query;

  return <Dashboard role={role as string} />;
}