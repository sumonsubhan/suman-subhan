"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import BookCard from "../bookCard/BookCard";

export default function BookSlider() {
  return (
    <div className="">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
        <SwiperSlide>
          <BookCard></BookCard>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
