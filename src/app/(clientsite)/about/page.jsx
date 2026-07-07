import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUniversity } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosSchool } from "react-icons/io";
import { IoBookSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import aboutImage from "../../../../public/asset/banner-about.jpg";

export const metadata = {
  title: "আপন আকর",

  description:
    "সুমন সুবহানের জীবন, শিক্ষা, সামরিক জীবন, সাহিত্যচর্চা, প্রকাশিত গ্রন্থ এবং সৃজনশীল যাত্রা সম্পর্কে বিস্তারিত জানুন। Learn about Suman Subhan's biography, education, military career, literary works, and creative journey.",

  keywords: [
    // Bangla
    "সুমন সুবহান",
    "সুমন সুবহান পরিচিতি",
    "সুমন সুবহান জীবনী",
    "লেখক সুমন সুবহান",
    "কবি সুমন সুবহান",
    "বাংলা সাহিত্যিক",
    "বাংলাদেশের লেখক",
    "সামরিক কর্মকর্তা",
    "নিরাপত্তা বিশ্লেষক",
    "প্রকাশিত গ্রন্থ",

    // English
    "Suman Subhan",
    "Suman Subhan biography",
    "About Suman Subhan",
    "Bangladeshi author",
    "Bengali writer",
    "Poet",
    "Novelist",
    "Military officer",
    "Security analyst",
    "Bangla literature",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "আমার সম্পর্কে | সুমন শুভান",
    description:
      "সুমন সুবহানের জীবন, সাহিত্য, সামরিক জীবন ও সৃজনশীল যাত্রা সম্পর্কে জানুন।",
    url: "/about",
    images: [
      {
        url: "/asset/banner-about.jpg",
        width: 1200,
        height: 630,
        alt: "সুমন সুবহান",
      },
    ],
  },

  twitter: {
    title: "আমার সম্পর্কে | সুমন শুভান",
    description:
      "সুমন সুবহানের জীবন, সাহিত্য, সামরিক জীবন ও সৃজনশীল যাত্রা সম্পর্কে জানুন।",
    images: ["/asset/banner-about.jpg"],
  },
};

const About = () => {
  return (
    <section className="my-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-5">
        <p className="text-sm md:text-base uppercase tracking-wider text-gray-500">
          পরিচয় ও জীবনধারা
        </p>

        <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl">আপন আকর</h1>

        <p className="text-base md:text-lg lg:text-xl max-w-4xl text-gray-700 leading-relaxed">
          সুমন সুবহান — কবি, কথাসাহিত্যিক এবং নিরাপত্তা বিশ্লেষক। দীর্ঘ ৩৩ বছরের
          গৌরবময় সামরিক জীবন শেষে তাঁর সাহিত্যের অবগাহন এক অনন্য মাত্রা লাভ
          করেছে।
        </p>

        <hr className="w-20 border-2 border-gray-400" />
      </div>

      {/* Main Content */}
      <article className="flex flex-col lg:flex-row gap-10 my-12">
        {/* Left Side */}
        <div className="w-full lg:max-w-md">
          <Image
            src={aboutImage}
            alt="সুমন সুবহান"
            width={350}
            height={500}
            priority
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />

          {/* Quote */}
          <div className="bg-gray-100 p-6 md:p-8 mt-6 border-l-4 border-bgprimary rounded-r-lg">
            <q className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-medium">
              শব্দের বুননে জীবনের সত্যকে খোঁজার এক নিরন্তর সাধনা।।
            </q>

            <p className="mt-6 text-gray-600 font-medium">— সুমন সুবহান</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          {/* Education */}
          <h2 className="font-bold text-2xl md:text-3xl">জীবন ও শিক্ষা</h2>

          <hr className="w-full border border-gray-300 my-6" />

          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 text-justify">
            সুমন সুবহান একজন বহুমুখী প্রতিভার অধিকারী। তাঁর শৈশব ও কৈশোর
            অতিবাহিত হয়েছে উত্তরবঙ্গের স্নিগ্ধ পরিবেশে। তাঁর শিক্ষাজীবনের
            প্রতিটি ধাপ তাঁর চারিত্রিক দৃঢ়তা এবং জ্ঞানপিপাসার পরিচয় দেয়।
          </p>

          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <FaSchool className="text-xl mt-1 shrink-0" />
              <span>
                <strong>রংপুর ক্যান্টনমেন্ট পাবলিক স্কুল:</strong> শৈশবের প্রথম
                পাঠ ও শৃঙ্খলার হাতেখড়ি।
              </span>
            </li>

            <li className="flex items-start gap-4">
              <IoIosSchool className="text-xl mt-1 shrink-0" />
              <span>
                <strong>কারমাইকেল কলেজ:</strong> উচ্চমাধ্যমিক শিক্ষার এক অনন্য
                অধ্যায়।
              </span>
            </li>

            <li className="flex items-start gap-4">
              <FaUniversity className="text-xl mt-1 shrink-0" />
              <span>
                <strong>চট্টগ্রাম বিশ্ববিদ্যালয় ও বিএমএ:</strong> স্নাতক ও
                সামরিক প্রশিক্ষণের সমন্বয়ে ব্যক্তিত্বের পূর্ণতা।
              </span>
            </li>
          </ul>

          {/* Military Life */}
          <div className="bg-gray-100 p-6 rounded-lg my-8">
            <h2 className="text-2xl font-bold mb-4">সামরিক জীবন ও দেশপ্রেম</h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
              সুমন সুবহান তাঁর জীবনের শ্রেষ্ঠ ৩৩টি বছর দেশমাতৃকার সেবায় উৎসর্গ
              করেছেন। ৯০-র দশকে শুরু হওয়া তাঁর এই সামরিক যাত্রা ছিল চ্যালেঞ্জ
              এবং সাহসিকতার এক অনন্য গাথা। বাংলাদেশ সেনাবাহিনীর একজন অভিজ্ঞ
              কর্মকর্তা হিসেবে তিনি বিভিন্ন গুরুত্বপূর্ণ দায়িত্ব পালন করেছেন।
              ২০২৪ সালের ফেব্রুয়ারিতে তিনি তাঁর বর্ণাঢ্য সামরিক জীবন থেকে অবসর
              গ্রহণ করেন। সামরিক জীবনের এই দীর্ঘ অভিজ্ঞতা তাঁর সাহিত্যকর্মে গভীর
              দেশপ্রেম এবং শৃঙ্খলার এক বিশেষ ছাপ রেখেছে।
            </p>
          </div>

          {/* Literature */}
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4">সাহিত্য ও সৃজনশীলতা</h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed text-justify">
              সেনাবাহিনীর কঠোর নিয়মের মাঝেও তাঁর ভেতরে বহমান ছিল এক সৃজনশীল
              প্রাণ। তিনি কেবল একজন যোদ্ধা নন, বরং এক নিভৃতচারী সাহিত্যিক। তাঁর
              কবিতায় ফুটে ওঠে জীবনের গভীর দর্শন, আর কথাসাহিত্যে তিনি তুলে ধরেন
              সমাজ ও মানুষের নিগূঢ় সত্য। বর্তমানে তিনি একজন নিবেদিতপ্রাণ
              নিরাপত্তা বিশ্লেষক হিসেবেও তাঁর প্রজ্ঞা বিনিময় করে যাচ্ছেন।
            </p>
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-3 h-full">
              <IoBookSharp className="text-4xl" />

              <h3 className="text-xl font-bold">প্রকাশিত গ্রন্থাবলি</h3>

              <p className="text-gray-700 leading-relaxed text-justify">
                কবিতা থেকে উপন্যাস — প্রতিটি পদচারণায় তিনি রেখেছেন তাঁর
                স্বকীয়তার স্বাক্ষর। তাঁর লেখায় ফুটে ওঠে ইতিহাস ও বর্তমানের
                মেলবন্ধন।
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-3 h-full">
              <TiWorld className="text-4xl" />

              <h3 className="text-xl font-bold">ভ্রমণ ও অভিজ্ঞতার প্রসার</h3>

              <p className="text-gray-700 leading-relaxed text-justify">
                পৃথিবীর নানা প্রান্ত ঘুরে দেখার অভিজ্ঞতা তাঁকে দিয়েছে বৈশ্বিক
                দৃষ্টিভঙ্গি। তাঁর ভ্রমণের অভিজ্ঞতাই তাঁর লেখার মূল রসদ।
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <Link
          href="/books"
          className="bg-bgprimary text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:opacity-90 transition-all duration-300"
        >
          বইয়ের ক্যাটালগ দেখুন
          <FaArrowRightLong />
        </Link>
      </div>
    </section>
  );
};

export default About;
