import React from "react";
import NewBookSlider from "./NewBookSlider";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const NewBooks = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          সাম্প্রতিক বই
        </h1>
        <Link className="flex items-center gap-2" href="/books">
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>
      <NewBookSlider></NewBookSlider>
    </div>
  );
};

export default NewBooks;
