import { getSongs } from "../../../../services/getSongs";
import SongVideos from "@/components/videos/SongVideos";

const Songs = async() => {
  const songs = await getSongs();
  return (
    <div className="px-2 md:px-4 lg:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">সুরসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        শব্দ আর সুরের এক মায়াবী মেলবন্ধন। এখানে আমাদের সঙ্গীতযাত্রা এবং
        বিশিষ্ট শিল্পীদের সাথে করা সহযোগিতামূলক কাজের সংকলন রয়েছে।
      </p>

      <SongVideos songs={songs}></SongVideos>
    </div>
  );
};

export default Songs;