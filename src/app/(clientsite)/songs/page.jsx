import Pagination from "@/components/pagination/Pagination";
import { getSongs } from "../../../../services/getSongs";
import SongVideos from "@/components/videos/SongVideos";

const Songs = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { songs, totalPages } = await getSongs({
    page,
    limit: 8,
  });
  return (
    <div className="px-2 md:px-4 lg:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">সুরসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        শব্দ আর সুরের এক মায়াবী মেলবন্ধন। এখানে আমাদের সঙ্গীতযাত্রা এবং বিশিষ্ট
        শিল্পীদের সাথে করা সহযোগিতামূলক কাজের সংকলন রয়েছে।
      </p>

      <SongVideos songs={songs}></SongVideos>
      <Pagination page={page} totalPages={totalPages} baseUrl="/songs" />
    </div>
  );
};

export default Songs;
