"use client";

import { useEffect } from "react";

export default function ArticleViewTracker({ articleId }) {
  useEffect(() => {
    if (!articleId) return;

    const trackView = async () => {
      try {
        await fetch(`/api/articles/${articleId}/view`, {
          method: "POST",
        });
      } catch (error) {
        console.error(
          "Failed to track article view:",
          error
        );
      }
    };

    trackView();
  }, [articleId]);

  return null;
}