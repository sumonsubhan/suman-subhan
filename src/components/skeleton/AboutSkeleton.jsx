const AboutSkeleton = () => {
  return (
    <section className="my-8 px-4 md:px-6 lg:px-10 xl:px-30 animate-pulse">
      {/* Header */}
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="h-4 w-40 rounded bg-gray-200" />

        <div className="h-10 w-56 rounded bg-gray-200 md:h-14 md:w-72" />

        <div className="w-full max-w-4xl space-y-3">
          <div className="h-4 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-200" />
          <div className="mx-auto h-4 w-3/4 rounded bg-gray-200" />
        </div>

        <div className="h-1 w-20 rounded bg-gray-300" />
      </div>

      {/* Content */}
      <div className="my-12 flex flex-col gap-10 lg:flex-row">
        {/* Left */}
        <div className="w-full lg:max-w-md">
          <div className="h-[500px] w-full rounded-lg bg-gray-200" />

          <div className="mt-6 rounded-lg bg-gray-100 p-6 md:p-8">
            <div className="space-y-4">
              <div className="h-6 rounded bg-gray-200" />
              <div className="h-6 w-5/6 rounded bg-gray-200" />
              <div className="mt-6 h-4 w-32 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <div className="h-8 w-52 rounded bg-gray-200" />

          <div className="my-6 h-px w-full bg-gray-300" />

          <div className="mb-8 space-y-3">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="mt-1 h-6 w-6 rounded-full bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 rounded bg-gray-200" />
                  <div className="h-4 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="my-8 rounded-lg bg-gray-100 p-6">
            <div className="mb-5 h-7 w-64 rounded bg-gray-200" />

            <div className="space-y-3">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>

          <div className="my-8">
            <div className="mb-5 h-7 w-56 rounded bg-gray-200" />

            <div className="space-y-3">
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-lg bg-gray-100 p-6">
                <div className="mb-4 h-12 w-12 rounded bg-gray-200" />

                <div className="mb-4 h-6 w-40 rounded bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-4 rounded bg-gray-200" />
                  <div className="h-4 rounded bg-gray-200" />
                  <div className="h-4 w-4/5 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <div className="h-12 w-56 rounded-lg bg-gray-200" />
      </div>
    </section>
  );
};

export default AboutSkeleton;