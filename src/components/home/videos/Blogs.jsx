import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import BlogVideos from "@/components/videos/BlogVideos";
import { getBlogs } from "../../../../services/getBlogs";


const Blogs = async() => {
  const {blogs} = await getBlogs({limit:4})
  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          কথার কোলাজ
        </h1>

        <Link
          href="/blogs"
          className="flex items-center gap-2"
        >
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>

      {/* Videos */}
      <BlogVideos blogs={blogs}/>
    </section>
  );
};

export default Blogs;