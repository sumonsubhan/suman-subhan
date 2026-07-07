import Banner from "@/components/home/banner/Banner";
import Events from "@/components/home/events/Events";
import NewBooks from "@/components/home/newBooks/NewBooks";
import TrendingBooks from "@/components/home/trendingBooks/TrendingBooks";
import Poems from "@/components/home/videos/Poems";
import Songs from "@/components/home/videos/Songs";

export const metadata = {
  title: "প্রচ্ছদ",

  description:
    "সুমন শুভানের অফিসিয়াল ওয়েবসাইটে বাংলা বই, নতুন বই, জনপ্রিয় বই, গান, কবিতা এবং সাংস্কৃতিক অনুষ্ঠান সম্পর্কে জানুন। Discover Bangla books, songs, poems, trending books, new releases, and cultural events.",

  keywords: [
    // Bangla
    "সুমন শুভান",
    "বাংলা বই",
    "নতুন বই",
    "জনপ্রিয় বই",
    "বাংলা সাহিত্য",
    "বাংলা গান",
    "বাংলা কবিতা",
    "সাংস্কৃতিক অনুষ্ঠান",
    "বাংলাদেশের সাহিত্য",

    // English
    "Suman Subhan",
    "Bangla books",
    "Bengali books",
    "New books",
    "Trending books",
    "Bangla literature",
    "Bengali literature",
    "Bangla songs",
    "Bangla poems",
    "Cultural events",
    "Bangladesh literature",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "সুমন শুভান | বাংলা বই, গান, কবিতা ও সংস্কৃতি",
    description:
      "বাংলা বই, গান, কবিতা, সাহিত্য এবং সাংস্কৃতিক অনুষ্ঠান এক জায়গায় আবিষ্কার করুন।",
    url: "/",
  },

  twitter: {
    title: "সুমন শুভান | বাংলা বই, গান, কবিতা ও সংস্কৃতি",
    description:
      "বাংলা বই, গান, কবিতা, সাহিত্য এবং সাংস্কৃতিক অনুষ্ঠান এক জায়গায় আবিষ্কার করুন।",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-4 py-5 lg:px-30">
      <Banner />
      <NewBooks />
      <TrendingBooks />
      <Songs />
      <Poems />
      <Events />
    </div>
  );
}