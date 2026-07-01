import Banner from "@/components/home/banner/Banner";
import Events from "@/components/home/events/Events";
import NewBooks from "@/components/home/newBooks/NewBooks";
import TrendingBooks from "@/components/home/trendingBooks/TrendingBooks";
import Poems from "@/components/home/videos/Poems";
import Songs from "@/components/home/videos/Songs";


export default function Home() {
  return (
    <div className="p-4 lg:px-30 py-5 flex flex-col gap-6">
      <Banner></Banner>
      <NewBooks></NewBooks>
      <TrendingBooks></TrendingBooks>
      <Songs></Songs>
      <Poems></Poems>
      <Events></Events>
    </div>
  );
}
