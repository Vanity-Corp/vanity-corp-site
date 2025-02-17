"use client";
import React from "react";
import { usePathname } from "next/navigation";

function HideNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar =
    ["/login", "/signup"].includes(pathname) ||
    pathname.startsWith("/dashboard");

  return <>{!hideNavbar ? children : null}</>;
}

export default HideNavbar;
