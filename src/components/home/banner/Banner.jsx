import Image from "next/image";
import Link from "next/link";
import React from "react";
import bannerImage from "../../../../public/asset/banner-home.jpg";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-6 sm:gap-8 md:gap-16 lg:gap-30 items-center">
      {/* Banner Texts */}
      <div>
        <h1 className="font-bold text-3xl md:text-4xl">
          শব্দে আঁকা অনুভূতি
        </h1>
        <p className="mb-6 md:mb-20 mt-4 text-justify">
          <q className="text-justify">
            পৃথিবীর পথে পথে কুড়িয়ে পাওয়া অভিজ্ঞতার নির্যাসই হলো সাহিত্য, যা
            ক্ষণস্থায়ী জীবনকে অমরতা দেয়  আর সময়ের বুকে এঁকে যায় অবিনশ্বর
            প্রতিচ্ছবি।
          </q>
        </p>

        <div className="flex gap-4 my-6">
          <Link
            className="px-4 py-2 rounded bg-bgprimary text-white"
            href="/article-categories"
          >
            নিবন্ধ পড়ুন
          </Link>
          <Link className="px-4 py-2 rounded border" href="/about">
            আমার সম্পর্কে
          </Link>
        </div>
      </div>

      <div>
        <Image
          src={bannerImage}
          alt="Banner Image"
          width={350}
          height={500}
          priority
          className="rounded w-full h-auto max-w-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
