const ArticleDetailsSkeleton = () => {
  return (
    <section className="animate-pulse py-10 lg:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Article Info */}
        <div className="mx-auto max-w-5xl">
          {/* Banner */}
          <div className="aspect-[16/6] w-full overflow-hidden rounded-3xl bg-gray-200"></div>

          {/* Content */}
          <div className="mt-8">
            {/* Category */}
            <div className="h-8 w-28 rounded-full bg-gray-200"></div>

            {/* Title */}
            <div className="mt-6 space-y-4">
              <div className="h-10 w-full rounded bg-gray-200"></div>
              <div className="h-10 w-4/5 rounded bg-gray-200"></div>
            </div>

            {/* Meta */}
            <div className="mt-6 flex items-center gap-4">
              <div className="h-5 w-40 rounded bg-gray-200"></div>
              <div className="h-5 w-28 rounded bg-gray-200"></div>
            </div>

            {/* Short Description */}
            <div className="mt-8 space-y-3">
              <div className="h-5 rounded bg-gray-200"></div>
              <div className="h-5 rounded bg-gray-200"></div>
              <div className="h-5 rounded bg-gray-200"></div>
              <div className="h-5 w-4/5 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Reading Area */}
        <article className="mx-auto mt-16 max-w-4xl rounded-3xl border border-[#e7dfcf] bg-[#f8f6f1] px-6 py-10 shadow-sm md:px-10 lg:px-16 lg:py-14">
          {/* Heading */}
          <div className="mb-8 h-8 w-1/2 rounded bg-gray-200"></div>

          {/* Paragraphs */}
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 w-5/6 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>

          {/* Image Placeholder */}
          <div className="my-10 h-72 w-full rounded-2xl bg-gray-200"></div>

          {/* More Paragraphs */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 rounded bg-gray-200"></div>
                <div className="h-5 w-2/3 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>

          {/* Blockquote */}
          <div className="my-10 border-l-4 border-gray-300 pl-6">
            <div className="h-5 w-4/5 rounded bg-gray-200"></div>
            <div className="mt-3 h-5 w-3/5 rounded bg-gray-200"></div>
          </div>

          {/* Final Paragraph */}
          <div className="space-y-3">
            <div className="h-5 rounded bg-gray-200"></div>
            <div className="h-5 rounded bg-gray-200"></div>
            <div className="h-5 w-4/5 rounded bg-gray-200"></div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ArticleDetailsSkeleton;