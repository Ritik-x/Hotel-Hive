import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddLocationAlt } from "react-icons/md";

// import { assets } from "../assets/assets";
import { CiStar } from "react-icons/ci";

const HotelCard = ({ room, index }) => {
  return (
    <>
      <Link
        to={"/rooms/" + room._id}
        onClick={() => scrollTo(0, 0)}
        key={room._id}
        className="relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray -500-80 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
      >
        <img
          src={room.images[0]}
          alt=""
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3ENo Image Available%3C/text%3E%3C/svg%3E";
          }}
        />
        {index % 2 === 0 && (
          <p className="font-medium px-4 py-2 absolute top-3 left-6 text-xs bg-white text-gray-600  rounded-full">
            Best Seller
          </p>
        )}
        <div className="p-5 pt-6 flex flex-col h-full justify-between">
          <div className="space-y-3">
            <p className="font-poppins text-xl font-bold text-gray-800">
              {room.hotel.name}
            </p>
            <div className="flex items-center gap-2 text-yellow-600 text-base">
              <CiStar className="text-2xl" />
              <span className="font-semibold">4.2</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MdOutlineAddLocationAlt className="text-lg" />
              <span>{room.hotel.address}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-700">
              <span className="text-2xl text-amber-600 font-bold">
                ${room.pricePerNight}
              </span>{" "}
              <span className="text-base font-normal text-gray-500">
                /night
              </span>
            </p>
            <button className="px-5 py-2 text-base font-bold border-2 border-amber-400 text-shadow-white rounded-xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-lg transition-all duration-300 ease-in-out text-gray-900 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-600 hover:text-white hover:shadow-amber-400/60 hover:shadow-2xl hover:-translate-y-1 hover:border-white focus:outline-none focus:ring-2 focus:ring-amber-400 animate-gradient-x">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;
