import Image from "next/image";
import Link from "next/link";
import { getPoems } from "../../../../../services/getPoems";

export default async function VideoPlayerPage({ params }) {
  const { id } = await params;

  // Current poem
  const currentPoem = await getPoems({id});

  if (!currentPoem) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold">Poem Not Found</h1>
      </div>
    );
  }

  // All poems
  const {poems} = await getPoems({limit:6});

  // Related poems
  const relatedPoems = poems
    .filter((poem) => poem._id !== currentPoem._id)
    .slice(0, 5);

  // Convert YouTube watch URL to embed URL
  const embedUrl = currentPoem.videoURL.includes("watch?v=")
    ? currentPoem.videoURL.replace("watch?v=", "embed/")
    : currentPoem.videoURL;

  return (
    <section className="px-4 md:px-8 lg:px-12 xl:px-20 py-10">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="xl:col-span-8">
          {/* Video */}
          <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={embedUrl}
              title={currentPoem.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight">
            {currentPoem.title}
          </h1>

          {/* Date */}
          <div className="flex gap-6 items-center mt-3 font-semibold text-gray-500">
            <p className="">
              {new Date(currentPoem.createdAt).toLocaleDateString("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="">
              বইঃ {currentPoem.bookTitle}
            </p>
          </div>

          {/* Description */}
          <p className="mt-6 text-bgprimary leading-8 text-xl">
            {currentPoem.description}
          </p>
        </div>

        {/* Sidebar */}
        <aside className="xl:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">আরও দেখুন</h2>

            <div className="space-y-5">
              {relatedPoems.map((poem) => (
                <Link
                  key={poem._id}
                  href={`/poems/${poem._id}`}
                  className="group flex gap-4 rounded-xl p-2 hover:bg-gray-100 transition"
                >
                  <div className="relative w-40 h-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={poem.coverImage}
                      alt={poem.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-bgprimary transition-colors">
                      {poem.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {poem.description}
                    </p>

                    <div className="flex justify-between">
                      <p className="mt-2 text-xs text-bgprimary">
                        {new Date(poem.createdAt).toLocaleDateString("bn-BD", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="mt-2 text-xs text-bgprimary">
                        বইঃ {poem.bookTitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
