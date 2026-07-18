import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPoems } from "../../../../services/getPoems";
import PoemVideos from "@/components/videos/PoemVideos";


const Poems = async() => {
const {poems} = await getPoems({limit:4})
  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
         শব্দসুধা
        </h1>

        <Link
          href="/poems"
          className="flex items-center gap-2"
        >
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>

      {/* Videos */}
      <PoemVideos poems={poems}></PoemVideos>
    </section>
  );
};

export default Poems;