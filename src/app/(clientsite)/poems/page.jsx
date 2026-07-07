import { getPoems } from "../../../../services/getPoems";
import PoemVideos from "@/components/videos/PoemVideos";
import Pagination from "@/components/pagination/Pagination";

export const metadata = {
  title: "শব্দসুধা",

  description:
    "সুমন শুভানের কবিতা ও আবৃত্তির ভিডিও সংগ্রহ। বাংলা কবিতা, আবৃত্তি, সাহিত্য এবং কাব্যিক অনুভূতির এক সমৃদ্ধ ভাণ্ডার। Watch and listen to Bengali poems and recitations by Suman Subhan.",

  keywords: [
    // Bangla
    "সুমন শুভান",
    "শব্দসুধা",
    "বাংলা কবিতা",
    "কবিতা",
    "আবৃত্তি",
    "কবিতা ভিডিও",
    "বাংলা সাহিত্য",
    "কবিতা পাঠ",
    "কাব্য",

    // English
    "Suman Subhan",
    "Poems",
    "Bangla Poems",
    "Bengali Poems",
    "Poetry",
    "Poetry Videos",
    "Poem Recitation",
    "Bangla Poetry",
    "Recitation",
  ],

  alternates: {
    canonical: "/poems",
  },

  openGraph: {
    title: "শব্দসুধা | সুমন শুভান",
    description: "সুমন শুভানের কবিতা ও আবৃত্তির ভিডিও সংগ্রহ।",
    url: "/poems",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "শব্দসুধা | সুমন শুভান",
      },
    ],
  },

  twitter: {
    title: "শব্দসুধা | সুমন শুভান",
    description: "সুমন শুভানের কবিতা ও আবৃত্তির ভিডিও সংগ্রহ।",
    images: ["/og-image.jpg"],
  },
};

const Poems = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;

  const { poems, totalPages } = await getPoems({
    page,
    limit: 8,
  });

  // Handle empty state
  if (poems.length === 0) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold">শব্দসুধা</h1>
        <p className="mt-4 text-gray-600">
          বর্তমানে কোনো কবিতার ভিডিও নেই।
        </p>
      </section>
    );
  }

  // Return main page
  return (
    <div className="px-2 md:px-4 lg:px-10 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">শব্দসুধা</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        কবিতা ও আবৃত্তির এক অনন্য সংকলন। এখানে শব্দের ঝংকারে হৃদয়ের অনুভূতিগুলো
        প্রাণ পায় সুরের মূর্ছনায়।
      </p>

      <PoemVideos poems={poems}/>

      <Pagination
        page={page}
        totalPages={totalPages}
        baseUrl={`/poems`}
      />
    </div>
  );
};

export default Poems;
