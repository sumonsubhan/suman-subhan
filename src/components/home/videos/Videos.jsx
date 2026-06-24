import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const videos = [
  {
    id: 1,
    link: "https://www.youtube.com/embed/SCUVtGdvRqs?si=YSL_TWZOgyET-y8h",
  },
  {
    id: 2,
    link: "https://www.youtube.com/embed/SCLL_WhuDfE?si=f9zMrWoPcHlnr3NC",
  },
  {
    id: 3,
    link: "https://www.youtube.com/embed/QCSYSkBVvbw?si=l8v3mXhw71QPj5Tq",
  },
  {
    id: 4,
    link: "https://www.youtube.com/embed/NK3yJFc0Cgw?si=3EaUKNX63giibIQ9",
  },
];

const Videos = () => {
  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          সুর ও শ্রুতি
        </h1>

        <Link
          href="/videos"
          className="flex items-center gap-2 text-sm sm:text-base"
        >
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>

      {/* Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-full max-w-xl aspect-video"
          >
            <iframe
              className="w-full h-full rounded-xl shadow-md"
              src={video.link}
              title={`YouTube video ${video.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videos;