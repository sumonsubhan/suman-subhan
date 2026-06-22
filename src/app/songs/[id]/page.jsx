import Image from "next/image";
import Link from "next/link";
import { songs } from "@/data/songs";

const VideoPlayerPage = async ({ params }) => {
  const {id} = await params;
  const songId = Number(id);

  const currentSong = songs.find((song) => song.id === songId);
  const relatedSongs = songs.filter((song) => song.id !== songId);

  if (!currentSong) {
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
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src={currentSong.video}
              title={currentSong.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mt-5">
            {currentSong.title}
          </h1>

          <p className="text-gray-600 mt-3 leading-relaxed">
            {currentSong.description}
          </p>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4">
          <h2 className="text-xl font-bold mb-5">
            আরও গান
          </h2>

          <div className="space-y-4">
            {relatedSongs.map((song) => (
              <Link
                href={`/songs/${song.id}`}
                key={song.id}
                className="flex gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Image
                  src={song.cover}
                  alt={song.title}
                  width={160}
                  height={90}
                  className="rounded-lg object-cover w-[140px] h-[80px]"
                />

                <div>
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {song.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {song.description}
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