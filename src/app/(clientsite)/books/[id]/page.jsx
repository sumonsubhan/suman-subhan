import Image from "next/image";
import { getContent } from "../../../../../services/getContent";
import Pagination from "@/components/pagination/Pagination";
import { CiPen } from "react-icons/ci";
import Link from "next/link";
import BookViewTracker from "@/components/viewsTracker/BookViewTracker";

export default async function BookDetails({ params, searchParams }) {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { id } = await params;


  const { contents, total, totalPages } = await getContent({
    bookId: id,
    page,
    limit: 8,
  });

  const book = contents[0]?.book;

  return (
    <section className="my-6">
      {/* Incriment book view */}
      <BookViewTracker bookId={id}/>

      {/* Header */}
      <div className="my-10">
        <h1 className="text-3xl font-bold md:text-4xl">
          {book?.title ?? "Book"}
        </h1>

        <div className="flex justify-between items-center mt-2 text-gray-600">
          <p className="">মোট অধ্যায়: {total}</p>
          <a
            href={
              book?.purchaseURL ||
              "https://seller.rokomari.com/book/author/25823/sumon-subhan"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            অর্ডার করুন
          </a>
        </div>
      </div>

      {/* Empty State */}
      {contents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center">
          <h2 className="text-2xl font-semibold">কোনো অধ্যায় পাওয়া যায়নি</h2>

          <p className="mt-3 text-gray-500">
            এই বিভাগে এখনো কোনো অধ্যায় যোগ করা হয়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {contents.map((content) => (
            <Link
              key={content._id}
              href={`/books/content/${content._id}`}
              className="group h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl p-4 border border-gray-200 bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={content.coverImage}
                    alt={content.title}
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
                  <h2 className="text-lg font-bold leading-7 line-clamp-2">
                    {content.title}
                  </h2>

                  {/* Short Note */}
                  <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-2">
                    {content.shortNote}
                  </p>
                </div>

                <div className="flex items-center gap-2 my-2">
                  <p className="text-yellow-800">
                    <CiPen />
                  </p>
                  <p className="text-gray-500">সুমন সুবাহান</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/books/${id}`}
      />
    </section>
  );
}
