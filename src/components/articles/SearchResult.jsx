import Image from "next/image";
import Link from "next/link";

export default function SearchResult({
  articles,
  keyword,
}) {
  if (!articles.length) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-semibold">
          No articles found
        </h2>

        <p className="mt-3 text-gray-500">
          No results found for {keyword}
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 grid gap-8">
      {articles.map((article) => (
        <Link
          key={article._id}
          href={`/articles/${article._id}`}
          className="flex flex-col gap-6 rounded-xl border-2 border-gray-300 p-5 transition hover:shadow-lg md:flex-row"
        >
          <Image
            src={article.coverImage}
            alt={article.title}
            width={220}
            height={140}
            className="rounded-lg object-cover h-auto w-auto"
          />

          <div className="flex-1">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-bgprimary ">
              {article.category.title}
            </span>

            <h2 className="mt-3 text-2xl font-bold hover:text-blue-700">
              {article.title}
            </h2>

            <p className="mt-3 line-clamp-3 text-gray-600">
              {article.shortNote}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}