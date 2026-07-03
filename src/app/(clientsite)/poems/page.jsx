import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { getPoems } from "../../../../services/getPoems";
import PoemVideos from "@/components/videos/PoemVideos";
import Pagination from "@/components/pagination/Pagination";

const Poems = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { poems, totalPages } = await getPoems({
    page,
    limit: 8,
  });
  return (
    <div className="px-2 md:px-4 lg:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">শব্দসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        কবিতা ও আবৃত্তির এক অনন্য সংকলন। এখানে শব্দের ঝংকারে হৃদয়ের অনুভূতিগুলো
        প্রাণ পায় সুরের মূর্ছনায়।
      </p>

      <PoemVideos poems={poems}></PoemVideos>

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/poems`}
      ></Pagination>
    </div>
  );
};

export default Poems;
