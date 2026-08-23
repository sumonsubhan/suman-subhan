"use client";

import { useEffect, useRef } from "react";

export default function SongViewTracker({ songId }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!songId || tracked.current) {
      return;
    }

    tracked.current = true;

    fetch(`/api/songs/${songId}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).catch((error) => {
      console.error("Failed to track song view:", error);
    });
  }, [songId]);

  return null;
}