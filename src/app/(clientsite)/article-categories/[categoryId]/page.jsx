import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "../../../../../services/getArticle";
import Pagination from "@/components/pagination/Pagination";

const Articles = async ({ params, searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { categoryId } = await params;

  const { articles, totalPages } = await getArticles({
    categoryId,
    page,
    limit: 5,
  });

  if (articles.length === 0) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold">
          No articles found in this category
        </h1>

        <p className="mt-4 text-gray-500">
          The requested articles do not exist.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-bgprimary">
          {articles[0].category.title}
        </h1>

        <p className="mt-3 max-w-3xl text-gray-600 leading-8">
          {articles[0].category.description}
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-8">
        {articles.map((article) => (
          <Link
            href={`/articles/${article._id}`}
            key={article._id}
            className="group block"
          >
            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 p-4 md:p-5">
                {/* Image */}
                <div className="relative w-full md:w-[320px] lg:w-[360px] flex-shrink-0">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width:768px) 100vw,
                             (max-width:1024px) 320px,
                             360px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col">
                  {/* Category + Date */}
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-bgprimary">
                      {article.category.title}
                    </span>

                    <span>
                      {new Date(article.createdAt).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-bold leading-snug text-bgprimary transition-colors group-hover:text-blue-700">
                    {article.title}
                  </h2>

                  {/* Short Note */}
                  <p className="mt-4 line-clamp-3 text-gray-600 leading-8">
                    {article.shortNote}
                  </p>

                  {/* Read More */}
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 font-medium text-bgprimary transition-all group-hover:gap-3">
                      আরও পড়ুন
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/article-categories/${categoryId}`}
      />
    </section>
  );
};

export default Articles;
