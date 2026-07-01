import Image from "next/image";
import { getBooks } from "../../../../../services/getBooks";

export default async function BookDetails({ params }) {
  const { id } = await params;

  const book = await getBooks({ id });

  if (!book) {
    return (
      <section className="py-24 text-center">
        <h1 className="text-3xl font-bold">Book not found</h1>

        <p className="mt-4 text-gray-500">The requested book does not exist.</p>
      </section>
    );
  }

  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Book Info */}
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Cover */}
          <div className="flex justify-center">
            <div className="relative aspect-[3/4] w-64 overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                sizes="256px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 w-fit rounded-full bg-bgprimary/10 px-4 py-2 text-sm font-medium text-bgprimary">
              {book.category}
            </span>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {book.title}
            </h1>

            <p className="mt-3 text-lg text-gray-500">✍️ সুমন সুবাহান</p>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              {book.shortNote}
            </p>

            <div className="mt-8 border-t pt-5 text-sm text-gray-500">
              প্রকাশিত:{" "}
              {new Date(book.createdAt).toLocaleDateString("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Reading Area */}
        <article className="mx-auto mt-16 max-w-4xl rounded-3xl border border-[#e7dfcf] bg-[#f8f6f1] px-6 py-10 shadow-sm md:px-10 lg:px-16 lg:py-14">
          <div
             className="
      book-content
      prose
      prose-lg
      max-w-none

      text-[18px]
      leading-[2.25]
      text-justify

      prose-headings:mb-8
      prose-headings:font-bold

      prose-p:mb-7
      prose-p:text-gray-800

      prose-img:mx-auto
      prose-img:rounded-xl
      prose-img:shadow-lg

      prose-blockquote:border-l-4
      prose-blockquote:border-bgprimary
      prose-blockquote:pl-6
    "
    dangerouslySetInnerHTML={{
      __html: book.content,
    }}
          />
        </article>
      </div>
    </section>
  );
}
