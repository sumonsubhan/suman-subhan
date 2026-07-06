"use client";

import { useEffect } from "react";

export default function SearchArticle({
  keyword,
  setKeyword,
  setResults,
}) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }

      const res = await fetch(
        `/api/articles/search?q=${encodeURIComponent(keyword)}`,
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      setResults(data);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, setResults]);

  return (
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="নিবন্ধ খুঁজুন..."
      className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-bgprimary"
    />
  );
}