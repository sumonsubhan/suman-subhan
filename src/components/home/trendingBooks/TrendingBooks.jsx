import React from 'react';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { getTrendingBooks } from '../../../../services/getTrendingBooks';
import TrendingBookSlider from '@/components/bookSlider/TrendingBookSlider';

const TrendingBooks = async() => {
   const {books} = await getTrendingBooks({limit:8})
    return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          পাঠক সমাদৃত
        </h1>
        <Link className="flex items-center gap-2" href="/trending-books">
          আরো দেখুন
          <FaArrowRightLong />
        </Link>
      </div>
        <TrendingBookSlider books={books}></TrendingBookSlider>
    </div>
    );
};

export default TrendingBooks;