"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

export default function BookSlider({ books = [] }) {
  // No books
  if (books.length === 0) {
    return null;
  }

  // Loop only when enough slides exist
  // Desktop shows maximum 4 slides
  const enableLoop = books.length > 4;

  // Pagination is useful only when there is more than one book
  const enablePagination = books.length > 1;

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={enableLoop}
      autoplay={
        enableLoop
          ? {
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      pagination={
        enablePagination
          ? {
              clickable: true,
            }
          : false
      }
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 4,
        },
      }}
      modules={[Autoplay, Pagination]}
      className="pb-12"
    >
      {books.map((book) => (
        <SwiperSlide key={book._id} className="h-auto">
          <Link
            href={`/books/${book._id}`}
            className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Cover */}
            <div className="flex justify-center bg-gray-50 p-4">
              <div className="relative aspect-[3/4] w-[200px]">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="200px"
                  className="rounded-lg object-cover shadow-md"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              {/* Title */}
              <h2 className="h-14 overflow-hidden text-lg font-bold leading-7 line-clamp-2">
                {book.title}
              </h2>

              {/* Category & Views */}
              <div className="mb-2 flex justify-between">
                <p className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  {book.category}
                </p>

                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  <p>Views: {book.views}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto border-t border-gray-100 pt-4 text-sm text-gray-500">
                <div className="mb-4 flex items-center justify-between">
                  <span>
                    {new Date(book.createdAt).toLocaleDateString("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span>✍️ সুমন সুবহান</span>
                </div>

                <p className="block rounded-lg bg-bgprimary py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90">
                  বইটি পড়ুন
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}