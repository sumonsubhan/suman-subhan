import NewBooks from "@/components/home/newBooks/NewBooks";
import BookSlider from "@/components/bookSlider/BookSlider";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { getBooks } from "../../../../services/getBooks";

const RhymeSection = async() => {
  const categorySlug = "rhymes";
  const {books} = await getBooks({
    categorySlug: categorySlug,
    limit: 5
  })
  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <div className="flex gap-2 items-center">
          <IoBookSharp className="text-3xl" />
          <h1 className="text-xl sm:text-2xl font-bold">ছড়া</h1>
        </div>
        <Link className="flex items-center gap-2" href={`/books/category/${categorySlug}`}>
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>

      {/* Poems SLider */}
      <BookSlider books={books}></BookSlider>
    </div>
  );
};

export default RhymeSection;