const BookCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
      {/* Image */}
      <div className="flex justify-center pt-6">
        <div className="h-64 w-40 rounded-lg bg-gray-200"></div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="h-6 w-3/4 rounded bg-gray-200"></div>

          <div className="h-5 w-12 rounded-full bg-gray-200"></div>
        </div>

        <div className="h-4 w-1/2 rounded bg-gray-200"></div>

        <div className="h-10 w-full rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

const SectionSkeleton = () => {
  return (
    <section className="mt-14">
      {/* Section Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-8 w-36 rounded bg-gray-200"></div>

        <div className="h-5 w-20 rounded bg-gray-200"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

const BooksSkeleton = () => {
  return (
    <section className="animate-pulse px-4 py-5 lg:px-30">
      {/* Header */}

      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto h-10 w-56 rounded bg-gray-200"></div>

        <div className="mx-auto mt-8 h-[2px] w-28 bg-gray-300"></div>

        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="mx-auto h-4 w-3/4 rounded bg-gray-200"></div>
        </div>
      </div>

      {/*  Sections */}

      {Array.from({ length: 5 }).map((_, index) => (
        <SectionSkeleton key={index} />
      ))}
    </section>
  );
};

export default BooksSkeleton;