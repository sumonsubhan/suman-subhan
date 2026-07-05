"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const EventSlide = ({ events }) => {
  return (
    <div className="h-[150px] md:h-[250px] lg:h-[350px] p-4">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, Autoplay]}
        className="h-full"
      >
        {events.map((event) => (
          <SwiperSlide key={event._id}>
            <div className="relative w-full h-full">
              <Image
                src={event.coverImage}
                alt="Event Image"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlide;