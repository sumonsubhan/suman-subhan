import React from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import BookSlider from "../../bookSlider/BookSlider";
import { getBooks } from "../../../../services/getBooks";

const NewBooks = async() => {
  const {books} = await getBooks({limit:8})
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
      <BookSlider books={books}></BookSlider>
    </div>
  );
};

export default NewBooks;
