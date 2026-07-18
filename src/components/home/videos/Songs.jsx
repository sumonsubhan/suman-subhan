import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { getSongs } from "../../../../services/getSongs";
import SongVideos from "@/components/videos/SongVideos";


const Songs = async() => {
  const {songs} = await getSongs({limit:4})
  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          সুরসুধা
        </h1>

        <Link
          href="/songs"
          className="flex items-center gap-2"
        >
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>

      {/* Videos */}
      <SongVideos songs={songs}></SongVideos>
    </section>
  );
};

export default Songs;