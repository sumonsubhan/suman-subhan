export default function Loading() {
  return (
    <section className="px-4 md:px-8 lg:px-12 xl:px-20 py-12 animate-pulse">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="h-5 w-36 bg-gray-300 rounded mx-auto mb-4" />

        <div className="h-10 md:h-12 w-64 md:w-80 bg-gray-300 rounded mx-auto mb-6" />

        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto" />
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
        </div>
      </div>

      {/* Albums Grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl bg-white shadow-md"
          >
            {/* Image */}
            <div className="h-[180px] md:h-[200px] bg-gray-300" />

            {/* Content */}
            <div className="p-5 flex justify-between items-center">
              <div className="h-6 w-36 bg-gray-300 rounded" />

              <div className="h-5 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-12 p-10 md:p-20 rounded-xl bg-gray-200">
        <div className="h-6 bg-gray-300 rounded w-5/6 mx-auto" />
        <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mt-4" />
      </div>
    </section>
  );
}