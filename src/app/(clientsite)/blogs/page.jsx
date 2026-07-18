import Pagination from "@/components/pagination/Pagination";
import { getBlogs } from "../../../../services/getBlogs";
import BlogVideos from "@/components/videos/BlogVideos";

export const metadata = {
  title: "সুর ও শ্রুতি",

  description:
    "সুমন শুভানের লেখা ও সুরে বাংলা গানের ভিডিও সংগ্রহ। মৌলিক বাংলা গান, সঙ্গীত, গীতিকবিতা ও সুরের এক সমৃদ্ধ ভাণ্ডার। Listen to original Bengali songs written and composed by Suman Subhan.",

  keywords: [
    // Bangla
    "সুমন শুভান",
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
    title: "সুর ও শ্রুতি | সুমন শুভান",
    description: "সুমন শুভানের লেখা ও সুরে বাংলা গানের ভিডিও সংগ্রহ।",
    url: "/songs",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "সুর ও শ্রুতি | সুমন শুভান",
      },
    ],
  },

  twitter: {
    title: "সুর ও শ্রুতি | সুমন শুভান",
    description: "সুমন শুভানের লেখা ও সুরে বাংলা গানের ভিডিও সংগ্রহ।",
    images: ["/og-image.jpg"],
  },
};

const Blogs = async ({ searchParams }) => {
  const search = await searchParams;
  const page = Number(search.page) || 1;
  const { blogs, totalPages } = await getBlogs({
    page,
    limit: 8,
  });

  // Handle empty state

  if (blogs.length === 0) {
  return (
    <section className="py-20 text-center">
      <h1 className="text-3xl font-bold">সুর ও শ্রুতি</h1>

      <p className="mt-4 text-gray-600">
        বর্তমানে কোনো ভিডিও নেই।
      </p>
    </section>
  );
}

  return (
    <div className="py-10">
      <h1 className="text-3xl md:text-4xl font-bold">সুর ও শ্রুতি</h1>

      <p className="mt-5 mb-10 text-gray-600 leading-relaxed">
        নিজস্ব কথা ও সুরের এক নান্দনিক মেলবন্ধন। ভাবনার গভীরে লালিত সুরগুলোই
        এখানে গান হয়ে শ্রোতার মন ছুঁয়ে যাওয়ার অপেক্ষায়।
      </p>

      <BlogVideos blogs={blogs}/>
      <Pagination page={page} totalPages={totalPages} baseUrl="/blogs" />
    </div>
  );
};

export default Blogs;
