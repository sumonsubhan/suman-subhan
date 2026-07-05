const SongsSkeleton = () => {
  return (
    <section className="animate-pulse px-2 py-10 md:px-4 lg:px-10">
      {/* Header */}
      <div className="mb-10">
        <div className="h-10 w-44 rounded bg-gray-200"></div>

        <div className="mt-5 space-y-3 max-w-3xl">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Song Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
          >
            {/* Cover Image */}
            <div className="h-[220px] w-full bg-gray-200"></div>

            {/* Content */}
            <div className="space-y-3 p-4">
              <div className="h-6 w-3/4 rounded bg-gray-200"></div>

              <div className="space-y-2">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-2">
        <div className="h-10 w-10 rounded-md bg-gray-200"></div>

        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 rounded-md bg-gray-200"
          ></div>
        ))}

        <div className="h-10 w-10 rounded-md bg-gray-200"></div>
      </div>
    </section>
  );
};

export default SongsSkeleton;