const HomeSkeleton = () => {
  return (
    <main className="animate-pulse px-4 py-5 lg:px-30 flex flex-col gap-10">

      {/* Banner */}

      <section className="grid gap-8 lg:grid-cols-2 items-center">
        <div className="space-y-5">
          <div className="h-5 w-32 rounded bg-gray-200"></div>

          <div className="space-y-3">
            <div className="h-10 w-3/4 rounded bg-gray-200"></div>
            <div className="h-10 w-2/3 rounded bg-gray-200"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>

          <div className="flex gap-4 pt-4">
            <div className="h-11 w-32 rounded-lg bg-gray-200"></div>
            <div className="h-11 w-32 rounded-lg bg-gray-200"></div>
          </div>
        </div>

        <div className="mx-auto h-[380px] w-[280px] rounded-xl bg-gray-200"></div>
      </section>

      {/* Books Section */}

      {[1, 2].map((section) => (
        <section key={section} className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-40 rounded bg-gray-200"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <div className="flex justify-center p-6">
                  <div className="h-56 w-40 rounded bg-gray-200"></div>
                </div>

                <div className="px-5 pb-5 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-gray-200"></div>

                  <div className="h-4 w-1/2 rounded bg-gray-200"></div>

                  <div className="h-10 rounded-lg bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Songs + Poems */}

      {[1, 2].map((section) => (
        <section key={section} className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-28 rounded bg-gray-200"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="aspect-video bg-gray-200"></div>

                <div className="space-y-3 p-4">
                  <div className="h-5 rounded bg-gray-200"></div>

                  <div className="h-4 rounded bg-gray-200"></div>

                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>

                  <div className="h-8 w-28 rounded-full bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Featured Event */}

      <section className="space-y-6">
        <div className="h-8 w-32 rounded bg-gray-200"></div>

        <div className="overflow-hidden rounded-xl bg-white border border-gray-200">
          <div className="h-[180px] md:h-[260px] lg:h-[340px] bg-gray-200"></div>
        </div>
      </section>

    </main>
  );
};

export default HomeSkeleton;