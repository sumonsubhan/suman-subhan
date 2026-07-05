import React from "react";
import EventSlide from "./EventSlide";
import { getEvents } from "../../../../services/getEvents";



const Events = async () => {
  const {events} = await getEvents({limit:5})
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