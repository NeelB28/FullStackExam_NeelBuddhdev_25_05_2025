"use client";
import { useEffect } from "react";

export default function ClientBodyWrapper({ children, className }) {
  useEffect(() => {
    // Clean up any browser extension classes after hydration
    const bodyClasses = document.body.className.split(" ");
    const allowedClasses = className.split(" ");

    // Remove any classes that aren't in our expected list
    const filteredClasses = bodyClasses.filter(
      (cls) => allowedClasses.includes(cls) || cls.startsWith("outfit_")
    );

    document.body.className = filteredClasses.join(" ");
  }, [className]);

  return <>{children}</>;
}
