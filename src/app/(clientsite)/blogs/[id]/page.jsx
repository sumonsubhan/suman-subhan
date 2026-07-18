import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "../../../../../services/getBlogs";
import getEmbedUrl from "@/lib/embededURL";
import CommentSection from "@/components/comments/CommentSection";

export default async function BlogVideoPlayer({ params }) {
  const { id } = await params;
  // Current blog
  const currentBlog = await getBlogs({ id });

  if (!currentBlog) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold">Blog Not Found</h1>
      </div>
    );
  }

  // Recent blogs
  const { blogs } = await getBlogs({ limit: 6 });

  // Related blogs
  const relatedBlogs = blogs
    .filter((blog) => blog._id !== currentBlog._id)
    .slice(0, 5);

  // Convert YouTube watch URL to embed URL
  const embedUrl = getEmbedUrl(currentBlog.videoURL);

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="xl:col-span-8">
          {/* Video */}
          <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={embedUrl}
              title={currentBlog.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl md:text-4xl font-bold leading-tight">
            {currentBlog.title}
          </h1>

          {/* Date */}
          <p className="mt-3 text-sm text-gray-500">
            {new Date(currentBlog.createdAt).toLocaleDateString("bn-BD", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Description */}
          <p className="mt-6 text-gray-700 leading-8 text-lg">
            {currentBlog.description}
          </p>
        </div>

        {/* Sidebar */}
        <aside className="xl:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">আরও দেখুন</h2>

            <div className="space-y-5">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog._id}`}
                  className="group flex gap-4 rounded-xl p-2 hover:bg-gray-100 transition"
                >
                  <div className="relative w-40 h-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-bgprimary transition-colors">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {blog.description}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("bn-BD", {
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
        contentId={currentBlog._id}
        contentType="blog"
        contentTitle={currentBlog.title}
        path={`/blogs/${currentBlog._id}`}
      />
    </section>
  );
}
