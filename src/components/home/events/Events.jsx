import React from "react";
import EventSlide from "./EventSlide";

const events = [
  {
    id: 1,
    img: "https://sumansubhan.com/assets/images/boimela_2026.jpeg",
  },
  {
    id: 2,
    img: "https://sumansubhan.com/assets/images/boimela_2026.jpeg",
  },
  {
    id: 3,
    img: "https://sumansubhan.com/assets/images/boimela_2026.jpeg",
  },
];

const Events = () => {
  return (
    <section className="mt-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        দৃষ্টিপাত
      </h1>

      <EventSlide events={events} />
    </section>
  );
};

export default Events;