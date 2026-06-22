import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center">
      {/* Banner Texts */}
      <div>
        <h1 className="font-bold text-4xl">
          শব্দের গভীরে জীবনের <br /> প্রতিচ্ছবি
        </h1>
        <p className="my-8">
          <q>
            সাহিত্য হলো মানুষের হৃদয়ের সেই প্রতিফলন, যা সময়ের <br /> গণ্ডি
            পেরিয়ে অনন্তকালের কথা বলে।
          </q>
        </p>

        <div className="flex gap-4 my-6">
          <Link
            className="px-4 py-2 rounded bg-bgprimary text-white"
            href="/articles"
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
          className="rounded"
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1LzM2Ni1tai03NzAzLWZvbi1qai5qcGc.jpg"
          width={350}
          height={500}
          alt="banner-image"
        />
      </div>
    </div>
  );
};

export default Banner;
