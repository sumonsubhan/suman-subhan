import Image from "next/image";
import Link from "next/link";
import { getSongs } from "../../../../../services/getSongs";
import getEmbedUrl from "@/lib/embededURL";
import CommentSection from "@/components/comments/CommentSection";

export default async function VideoPlayerPage({ params }) {
  const { id } = await params;
  // Current song
  const currentSong = await getSongs({ id });

  if (!currentSong) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold">Song Not Found</h1>
      </div>
    );
  }

  // Recernt songs
  const { songs } = await getSongs({ limit: 6 });

  // Related songs
  const relatedSongs = songs
    .filter((song) => song._id !== currentSong._id)
    .slice(0, 5);

  // Convert YouTube watch URL to embed URL
  const embedUrl = getEmbedUrl(currentSong.videoURL);
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="xl:col-span-8">
          {/* Video */}
          <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={embedUrl}
              title={currentSong.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight">
            {currentSong.title}
          </h1>

          {/* Date */}
          <p className="mt-3 text-sm text-gray-500">
            {new Date(currentSong.createdAt).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Description */}
          <p className="mt-6 text-gray-700 leading-8 text-lg">
            {currentSong.description}
          </p>
        </div>

        {/* Sidebar */}
        <aside className="xl:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">আরও গান</h2>

            <div className="space-y-5">
              {relatedSongs.map((song) => (
                <Link
                  key={song._id}
                  href={`/songs/${song._id}`}
                  className="group flex gap-4 rounded-xl p-2 hover:bg-gray-100 transition"
                >
                  <div className="relative w-40 h-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={song.coverImage}
                      alt={song.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-bgprimary transition-colors">
                      {song.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {song.description}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(song.createdAt).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <CommentSection
        contentId={currentSong._id}
        contentType="song"
        contentTitle={currentSong.title}
        path={`/songs/${currentSong._id}`}
      />
    </section>
  );
}
