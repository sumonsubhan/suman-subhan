export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl animate-pulse px-4 py-8 md:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-10">
        <div className="h-9 w-64 rounded bg-gray-200"></div>

        <div className="mt-4 space-y-3">
          <div className="h-4 w-full rounded bg-gray-200"></div>
          <div className="h-4 w-11/12 rounded bg-gray-200"></div>
          <div className="h-4 w-2/3 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Article Skeletons */}
      <div className="space-y-8">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5"
          >
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Image */}
              <div className="w-full md:w-[320px] lg:w-[360px] flex-shrink-0">
                <div className="aspect-[16/9] rounded-xl bg-gray-200"></div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col">
                {/* Category & Date */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-7 w-28 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <div className="h-7 w-11/12 rounded bg-gray-200"></div>
                  <div className="h-7 w-3/4 rounded bg-gray-200"></div>
                </div>

                {/* Description */}
                <div className="mt-5 space-y-3">
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-full rounded bg-gray-200"></div>
                  <div className="h-4 w-5/6 rounded bg-gray-200"></div>
                </div>

                {/* Read More */}
                <div className="mt-6">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}