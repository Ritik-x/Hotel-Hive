import React from "react";
import { cities } from "../assets/assets";
import { SlCalender } from "react-icons/sl";
import { MdContentPasteSearch } from "react-icons/md";

const Hero = () => {
  return (
    <>
      <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
        <p className="bg-amber-800 px-4 py-1 rounded-full mt-20">
          Stay better with HotelHive.
        </p>
        <h1 className="font-poppins text-2xl md:text-6xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max:w-xl mt-4">
          🏨 HotelHive — Your Smart Stay Companion
        </h1>

        <p className="max-w-130  mt-2 text-sm md:text-base">
          HotelHive is a modern, responsive hotel booking web application
          designed to simplify travel planning. It allows users to search,
          explore, and book curated hotel stays with ease and efficiency.
          Whether you're planning a weekend getaway or a business trip,
          HotelHive connects you to the right stay in just a few clicks.
        </p>
        <form
          className="
           text-gray-100 shadow-lg rounded-xl px-6 py-6 
          flex flex-col md:flex-row md:items-end gap-4 md:gap-6
          max-w-3xl w-full mt-8
        "
        >
          {/* Destination */}
          <div className="flex-1">
            <label
              className="flex items-center gap-2 font-medium text-sm mb-1"
              htmlFor="destinationInput"
            >
              <svg
                className="w-4 h-4 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                />
              </svg>
              Destination
            </label>
            <input
              list="destinations"
              id="destinationInput"
              type="text"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 text-sm outline-primary focus:ring-2 focus:ring-primary transition"
              placeholder="Type here"
              required
            />

            <datalist id="destinations">
              {" "}
              {cities.map((city, index) => (
                <option value={city} key={index} />
              ))}{" "}
            </datalist>
          </div>

          {/* Check In */}
          <div className="flex-1">
            <label
              className="flex items-center gap-2 font-medium text-sm mb-1"
              htmlFor="checkIn"
            >
              <SlCalender />
              Check in
            </label>
            <input
              id="checkIn"
              type="date"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 text-sm outline-primary focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Check Out */}
          <div className="flex-1">
            <label
              className="flex items-center gap-2 font-medium text-sm mb-1"
              htmlFor="checkOut"
            >
              <SlCalender />
              Check out
            </label>
            <input
              id="checkOut"
              type="date"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 text-sm outline-primary focus:ring-2 focus:ring-primary transition"
            />
          </div>

          {/* Guests */}
          <div className="flex-1">
            <label className="font-medium text-sm mb-1" htmlFor="guests">
              Guests
            </label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 mt-1 text-sm outline-primary focus:ring-2 focus:ring-primary transition"
              placeholder="0"
            />
          </div>

          {/* Search Button */}
          <button
            className="
              flex items-center justify-center gap-2 rounded-lg
              bg-primary hover:bg-secondary text-white font-semibold
              py-3 px-6 mt-2 md:mt-0 shadow transition-all duration-300
              w-full md:w-auto
            "
            type="submit"
          >
            <MdContentPasteSearch />

            <span>Search</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Hero;
