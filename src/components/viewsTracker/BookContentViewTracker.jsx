"use client";

import { useEffect, useRef } from "react";

export default function BookContentViewTracker({ contentId }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!contentId || tracked.current) {
      return;
    }

    tracked.current = true;

    fetch(`/api/bookContents/${contentId}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).catch((error) => {
      console.error("Failed to track song view:", error);
    });
  }, [contentId]);

  return null;
}