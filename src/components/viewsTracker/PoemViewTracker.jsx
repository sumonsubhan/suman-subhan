"use client";

import { useEffect, useRef } from "react";

export default function PoemViewTracker({ poemId }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!poemId || tracked.current) {
      return;
    }

    tracked.current = true;

    fetch(`/api/poems/${poemId}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).catch((error) => {
      console.error("Failed to track poem view:", error);
    });
  }, [poemId]);

  return null;
}