"use client";

import { useEffect } from "react";

export function ScrollRestoration() {
  useEffect(() => {
    // Disable automatic scroll restoration to prevent unwanted scrolling on refresh
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}