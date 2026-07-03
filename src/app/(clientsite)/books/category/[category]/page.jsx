import Link from "next/link";
import Image from "next/image";
import { getBooks } from "../../../../../../services/getBooks";
import Pagination from "@/components/pagination/Pagination";

function truncateText(text, maxLength = 100) {
  if (!text) return "";

  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "..."
    : text;
}

export default async function CategoryBooks({ params, searchParams }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { category } = await params;
  

  const {books, totalPages} = await getBooks({
    categorySlug: category,
    page,
    limit:10,
  });

  return (
    <section className="px-4 py-12 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold md:text-4xl">
          {books[0].category}
        </h1>

        <p className="mt-2 text-gray-600">
          মোট বই: {books.length}
        </p>
      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center">
          <h2 className="text-2xl font-semibold">
            কোনো বই পাওয়া যায়নি
          </h2>

          <p className="mt-3 text-gray-500">
            এই বিভাগে এখনো কোনো বই যোগ করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {books.map((book) => (
            <Link
              key={book._id}
              href={`/books/${book._id}`}
              className="group h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl p-4 border border-gray-200 bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="
                      (max-width:768px) 50vw,
                      (max-width:1024px) 33vw,
                      (max-width:1280px) 25vw,
                      20vw
                    "
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col mt-3">
                  {/* Title */}
                  <h2 className="min-h-10 text-lg font-bold leading-7 line-clamp-2">
                    {book.title}
                  </h2>

                  {/* Short Note */}
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">
                    {truncateText(book.shortNote, 100)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
      <Pagination 
        page={page}
        totalPages={totalPages}
        baseUrl={`/books/category/${category}`}
      />
    </section>
  );
}