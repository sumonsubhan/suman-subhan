import Image from "next/image";
import Link from "next/link";
import { poems } from "@/data/poems";

const VideoPlayerPage = async ({ params }) => {
  const {id} = await params;
  const poemId = Number(id);

  const currentPoem = poems.find((poem) => poem.id === poemId);
  const relatedpoems = poems.filter((poem) => poem.id !== poemId);

  if (!currentPoem) {
    return (
      <div className="p-10 text-center">
        <h1>Video Not Found</h1>
      </div>
    );
  }

    
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Video Section */}
        <div className="xl:col-span-8">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={currentPoem.video}
              title={currentPoem.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mt-5">
            {currentPoem.title}
          </h1>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {currentPoem.description}
          </p>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4">
          <h2 className="text-xl font-bold mb-5">
            আরও দেখুন
          </h2>

          <div className="space-y-4">
            {relatedpoems.map((poem) => (
              <Link
                href={`/poems/${poem.id}`}
                key={poem.id}
                className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Image
                  src={poem.cover}
                  alt={poem.title}
                  width={160}
                  height={90}
                  className="rounded-lg object-cover w-[140px] h-[80px]"
                />

                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {poem.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {poem.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;