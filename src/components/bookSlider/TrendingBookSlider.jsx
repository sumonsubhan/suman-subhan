"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export default function TrendingBookSlider({ books }) {
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
          slidesPerView: 4,
        },
        2000: {
          slidesPerView: 4,
        },
      }}
      modules={[Autoplay, Pagination]}
      className="pb-12"
    >
      {books.map((book) => (
        <SwiperSlide key={book._id} className="h-auto flex">
          <a
            key={book._id}
            href={book?.purchaseURL || "https://seller.rokomari.com/book/author/25823/sumon-subhan"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Cover */}
            <div className="flex justify-center bg-gray-50 p-4">
              <div className="relative aspect-[3/4] w-[200px]">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  sizes="140px"
                  className="rounded-lg object-cover shadow-md transition duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              {/* Title */}
              <h2 className="h-14 overflow-hidden text-lg font-bold leading-7 line-clamp-2">
                {book.title}
              </h2>

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

                  <span >✍️ সুমন সুবহান</span>
                </div>

                <div className="block rounded-lg bg-bgprimary py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90">
                  অর্ডার করুন
                </div>
              </div>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
