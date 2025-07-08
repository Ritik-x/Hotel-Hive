import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

const FeaturedDestination = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Pick Your Paradise"
          subTitle="Escape the noise and unwind in handpicked rooms designed for peace, comfort, and unforgettable moments."
        />
        <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
          {roomsDummyData.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="px-5 py-2 my-16 text-base font-bold border-2 border-gray-400 text-shadow-white rounded-xl bg-gradient-to-r from-gray-300 via-amber-400 to-yellow-500 shadow-lg transition-all duration-300 ease-in-out text-gray-900 hover:from-amber-500 hover:via-yellow-400 hover:to-gray-900 hover:text-white hover:shadow-amber-400/60 hover:shadow-2xl hover:-translate-y-1 hover:border-white focus:outline-none focus:ring-2 focus:ring-gray-400 animate-gradient-x"
        >
          View All Destination
        </button>
      </div>
    </>
  );
};

export default FeaturedDestination;
