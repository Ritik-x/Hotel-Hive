import React from "react";
import Title from "./Title";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <>
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30 ">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8">
          <Title
            align="left"
            title=" Exclusive Offers"
            subTitle="Small Description"
          />
          <button className="px-5 py-2 flex gap-2 text-base font-bold border-2 border-amber-400 rounded-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-md transition-all duration-300 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-600 hover:text-white hover:shadow-amber-400/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400">
            View All Offers <FaArrowAltCircleRight />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {exclusiveOffers.map((item) => (
            <div
              key={item._id}
              className="relative flex flex-col group items-start justify-between gap-4 p-8 rounded-xl text-white bg-no-repeat bg-cover bg-center min-h-[320px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 z-0" />
              <p className="px-4 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full z-10">
                {item.priceOff} %OFF
              </p>
              <div className="relative z-10">
                <p className="text-2xl font-bold drop-shadow-lg">
                  {item.title}
                </p>
                <p className="mt-2 text-base drop-shadow-md">
                  {item.description}
                </p>
                <p className="text-xs text-white/70 mt-3">
                  Expires {item.expiryDate}
                </p>
              </div>
              <button className="relative z-10 mt-4 px-5 py-2 flex gap-2 text-base font-bold border-2 border-amber-400 rounded-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-md transition-all duration-300 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-600 hover:text-white hover:shadow-amber-400/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400">
                View All Offers <FaArrowAltCircleRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExclusiveOffers;
