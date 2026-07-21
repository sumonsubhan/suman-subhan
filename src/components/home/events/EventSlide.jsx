"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

const EventSlide = ({ events = [] }) => {
  // No events
  if (events.length === 0) {
    return null;
  }

  // Loop only if there are multiple events
  const enableLoop = events.length > 1;

  return (
    <div className="h-[150px] p-4 md:h-[250px] lg:h-[350px]">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={30}
        loop={enableLoop}
        mousewheel={{
          forceToAxis: true,
        }}
        autoplay={
          enableLoop
            ? {
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={
          events.length > 1
            ? {
                clickable: true,
              }
            : false
        }
        modules={[Mousewheel, Pagination, Autoplay]}
        className="h-full"
      >
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <div className="relative h-full w-full">
              <Image
                src={event.coverImage}
                alt={event.title || "Event Image"}
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className="rounded-xl object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlide;