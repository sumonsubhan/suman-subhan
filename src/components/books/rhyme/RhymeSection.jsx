import NewBooks from "@/components/home/newBooks/NewBooks";
import NewBookSlider from "@/components/bookSlider/BookSlider";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";

const RhymeSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex gap-2 items-center">
          <IoBookSharp className="text-3xl" />
          <h1 className="text-xl sm:text-2xl font-bold">ছড়া</h1>
        </div>
        <Link className="flex items-center gap-2" href="/books">
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>

      {/* Poems SLider */}
      <NewBookSlider></NewBookSlider>
    </div>
  );
};

export default RhymeSection;