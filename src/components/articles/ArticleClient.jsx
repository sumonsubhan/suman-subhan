"use client";

import { useState } from "react";
import SearchArticle from "./SearchArticle";
import SearchResult from "./SearchResult";
import ArticleCategories from "./ArticleCategories";

export default function ArticleClient({ categories }) {
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  return (
    <>
      <div className="mx-auto my-8 w-full md:w-2/3 lg:w-1/3">
        <SearchArticle
          keyword={keyword}
          setKeyword={setKeyword}
          setResults={setResults}
        />
      </div>

      {keyword.trim() ? (
        <SearchResult
          articles={results}
          keyword={keyword}
        />
      ) : (
        <ArticleCategories categories={categories} />
      )}
    </>
  );
}