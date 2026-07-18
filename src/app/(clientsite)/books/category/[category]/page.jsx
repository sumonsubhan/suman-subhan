import Link from "next/link";
import Image from "next/image";
import { getBooks } from "../../../../../../services/getBooks";
import Pagination from "@/components/pagination/Pagination";
import { CiPen } from "react-icons/ci";
import { IoEye } from "react-icons/io5";

export default async function CategoryBooks({ params, searchParams }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { category } = await params;

  const { books, total, totalPages } = await getBooks({
    categorySlug: category,
    page,
    limit: 8,
  });

  const categoryName = books[0]?.category ?? "Books";
  return (
    <section className="py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold md:text-4xl">{categoryName}</h1>

        <p className="mt-2 text-gray-600">মোট বই: {total}</p>
      </div>

      {/* Empty State */}
      {books.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center">
          <h2 className="text-2xl font-semibold">কোনো বই পাওয়া যায়নি</h2>

          <p className="mt-3 text-gray-500">
            এই বিভাগে এখনো কোনো বই যোগ করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book._id}
              href={`/books/${book._id}`}
              className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Cover */}
              <div className="flex justify-center bg-gray-50 p-4">
                <div className="relative aspect-[3/4] w-[200px]">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="140px"
                    className="rounded-lg object-cover shadow-md transition duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                {/* Title */}
                <h2 className="h-14 overflow-hidden text-lg font-bold leading-7 line-clamp-2">
                  {book.title}
                </h2>

                {/* Category & views*/}
                <div className="flex justify-between mb-2">
                  <p className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {book.category}
                  </p>
                  <div className="bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 rounded-full">
                    <p>Views: {book.views}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-gray-400">
                      {new Date(book.createdAt).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    <span className="text-gray-500">✍️ সুমন সুবহান</span>
                  </div>

                  <p className="block rounded-lg bg-bgprimary py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90">
                    বইটি পড়ুন
                  </p>
                </div>
              </div>
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
