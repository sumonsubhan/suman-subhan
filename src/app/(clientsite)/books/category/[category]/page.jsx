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
    <section className="px-4 py-12 md:px-8 lg:px-12">
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
              className="group h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl p-4 border border-gray-200 bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Cover */}
                <div className="bg-gray-50 py-2">
                  <div className="relative mx-auto aspect-[3/4] w-50">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      sizes="160px"
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Category */}
                  <div className="mb-3 flex justify-between">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {book.category}
                    </span>
                    <div className="flex items-center gap-4  bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 rounded-2xl">
                      <IoEye />
                      <p>{book.views}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="line-clamp-2 min-h-[52px] text-lg font-bold leading-6 my-2">
                    {book.title}
                  </h2>

                  {/* Button */}
                  <div className="rounded-lg bg-bgprimary py-2 text-center text-sm font-medium text-white transition hover:opacity-90">
                    বইটি পড়ুন
                  </div>
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
