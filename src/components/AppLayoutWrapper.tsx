"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { Toaster } from "./ui/toaster";

export const AppLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}
        <main className="flex-1">
          {children}
          <Toaster />
        </main>
      {!hideLayout && <Footer />}
    </>
  );
};
