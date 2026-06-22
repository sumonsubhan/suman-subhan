import React from 'react';
import NewBookSlider from '../newBooks/NewBookSlider';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

const TrendingBooks = () => {
    return (
    <div className="my-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          ট্রেন্ডিং বই
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

export default TrendingBooks;