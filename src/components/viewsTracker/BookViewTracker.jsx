"use client";

import { useEffect, useRef } from "react";

export default function BookViewTracker({ bookId }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!bookId || tracked.current) {
      return;
    }

    tracked.current = true;

    fetch(`/api/books/${bookId}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).catch((error) => {
      console.error("Failed to track book view:", error);
    });
  }, [bookId]);

  return null;
}