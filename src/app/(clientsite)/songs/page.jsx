import Pagination from "@/components/pagination/Pagination";
import { getSongs } from "../../../../services/getSongs";
import SongVideos from "@/components/videos/SongVideos";

export const metadata = {
  title: "সুরসুধা",

  description:
    "সুমন সুবহানের লেখা ও সুরে বাংলা গানের ভিডিও সংগ্রহ। মৌলিক বাংলা গান, সঙ্গীত, গীতিকবিতা ও সুরের এক সমৃদ্ধ ভাণ্ডার। Listen to original Bengali songs written and composed by Suman Subhan.",

  keywords: [
    // Bangla
    "সুমন সুবহান",
    "সুরসুধা",
    "বাংলা গান",
    "মৌলিক গান",
    "গান",
    "সঙ্গীত",
    "বাংলা সঙ্গীত",
    "গীতিকবিতা",
    "গানের ভিডিও",
    "বাংলা সংস্কৃতি",

    // English
    "Suman Subhan",
    "Bangla Songs",
    "Bengali Songs",
    "Original Songs",
    "Music",
    "Bangla Music",
    "Lyrics",
    "Music Videos",
    "Bengali Music",
  ],

  alternates: {
    canonical: "/songs",
  },

  openGraph: {
    title: "সুরসুধা | সুমন সুবহান",
    description: "সুমন সুবহানের লেখা ও সুরে বাংলা গানের ভিডিও সংগ্রহ।",
    url: "/songs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সুরসুধা | সুমন সুবহান",
      },
    ],
  },

  twitter: {
    title: "সুরসুধা | সুমন সুবহান",
    description: "সুমন সুবহানের লেখা ও সুরে বাংলা গানের ভিডিও সংগ্রহ।",
    images: ["/og-image.jpg"],
  },
};

const Songs = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { songs, totalPages } = await getSongs({
    page,
    limit: 8,
  });

  // Handle empty state

  if (songs.length === 0) {
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-bold">সুরসুধা</h1>

      <p className="mt-4 text-gray-600">
        বর্তমানে কোনো গানের ভিডিও উপলব্ধ নেই।
      </p>
    </section>
  );
}

  return (
    <div className="py-10">
      <h1 className="text-3xl md:text-4xl font-bold">সুরসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        নিজস্ব কথা ও সুরের এক নান্দনিক মেলবন্ধন। ভাবনার গভীরে লালিত সুরগুলোই
        এখানে গান হয়ে শ্রোতার মন ছুঁয়ে যাওয়ার অপেক্ষায়।
      </p>

      <SongVideos songs={songs}/>
      <Pagination page={page} totalPages={totalPages} baseUrl="/songs" />
    </div>
  );
};

export default Songs;
