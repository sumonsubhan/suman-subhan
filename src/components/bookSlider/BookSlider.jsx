"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

export default function BookSlider({ books }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
        2000: {
          slidesPerView: 4,
        },
      }}
      modules={[Autoplay, Pagination]}
      className="pb-12"
    >
      {books.map((book) => (
        <SwiperSlide key={book._id} className="h-auto">
          <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {/* Cover */}
            <div className="bg-gray-50 py-2">
              <div className="relative mx-auto aspect-[3/4] w-50">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="160px"
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              {/* Category */}
              <div className="mb-3 flex justify-end">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {book.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="line-clamp-2 min-h-[52px] text-lg font-bold leading-6">
                {book.title}
              </h2>

              {/* Book */}
              <p className="mt-2 line-clamp-1 text-sm text-gray-500">
                {book.bookName}
              </p>

              {/* Button */}
              <Link
                href={`/books/${book._id}`}
                className="mt-5 rounded-lg bg-bgprimary py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
              >
                বইটি পড়ুন
              </Link>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
