import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommandedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommanded, setRecommanded] = useState([]);

  useEffect(() => {
    const filterHotels = () => {
      const filteredHotels = rooms
        .slice()
        .filter((room) => searchedCities.includes(room.hotel.city));
      setRecommanded(filteredHotels);
    };

    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommanded.length > 0 && (
      <>
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
          <Title
            title="Recommended Hotels"
            subTitle="Escape the noise and unwind in handpicked rooms designed for peace, comfort, and unforgettable moments."
          />
          <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
            {recommanded.slice(0, 4).map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default RecommandedHotels;
