import React, { useState } from "react";
import { facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Starrating from "../components/Starrating";
import { IoLocationSharp } from "react-icons/io5";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm transition-all hover:text-amber-600">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="accent-amber-500"
    />
    <span className="select-none font-light">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm transition-all hover:text-amber-600">
    <input
      type="radio"
      name="sortOption"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="accent-amber-500"
    />
    <span className="select-none font-light">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ["Single Bed", "Couple Room", "Luxury Room", "Family Room"];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 5000",
  ];

  const sortOptions = [
    " Price low to High",
    " Price High to Low ",
    "Newest First",
  ];

  return (
    <>
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-100 rounded-2xl shadow-lg px-4 md:px-12 py-10 mt-8 mb-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight text-center drop-shadow-lg">
          Hotel Rooms
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-600 mb-2 text-center max-w-2xl mx-auto">
          Take advantage of our exclusive deals and find the perfect room for
          your stay. Enjoy comfort, luxury, and convenience at the best prices.
        </p>
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-start justify-betweenpt-28 mmd:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div>
          <div className="flex flex-col items-start text-left"></div>
          {roomsDummyData.map((room) => (
            <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
              <img
                onClick={() => {
                  navigate(`/rooms/${room._id}`).scrollTo(0, 0);
                }}
                src={room.images[0]}
                alt="hotel-img"
                title="View Rooms Details"
                className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
              />

              <div className="md:w-1/2  flex flex-col gap-2">
                <p className="text-gray-600">{room.hotel.city}</p>
                <p
                  className="text-gray-800 text-3xl cursor-pointer"
                  onClick={() => {
                    navigate(`/rooms/${room._id}`).scrollTo(0, 0);
                  }}
                >
                  {room.hotel.name}
                </p>

                <div className="flex items-center">
                  <Starrating />
                  <p className="ml-3"> 200+ reviews</p>
                </div>

                <div className="flex items-center gap-1 text-gray-600 mt-2 text-sm">
                  <IoLocationSharp />
                  <span>{room.hotel.address}</span>
                </div>
                {/* room amenities */}
                <div className="flex flex-wrap gap-4 mt-2">
                  {room.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-white rounded-lg shadow-md px-3 py-2 min-w-[80px] hover:shadow-lg hover:bg-amber-50 transition-all duration-200"
                    >
                      <img
                        src={facilityIcons[item]}
                        alt={item}
                        className="w-7 h-7 mb-1"
                      />
                      <p className="text-xs font-medium text-gray-700 text-center capitalize">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* room price  */}
                <p className="text-xl font-medium text-gray-700">
                  ${room.pricePerNight} /night
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="bg-white w-80 border border-gray-300 rounded-xl shadow-lg text-gray-800 max-lg:mb-8 min-lg:mt-16">
          <div
            className={`flex items-center justify-between px-5 py-2.5 border-b border-gray-200`}
          >
            <p className="font-bold tracking-wide text-lg">FILTERS</p>
            <div className="text-xs cursor-pointer">
              <span
                onClick={() => setOpenFilters(!openFilters)}
                className="lg:hidden"
              >
                {openFilters ? "HIDE" : "SHOW"}
              </span>
              <span className="hidden lg:block text-amber-600 hover:underline">
                CLEAR
              </span>
            </div>
          </div>

          <div
            className={`${
              openFilters ? "h-auto" : "h-0 lg:h-auto"
            } overflow-hidden transition-all duration-700`}
          >
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
              {roomTypes.map((type, index) => (
                <CheckBox key={index} label={type} />
              ))}
            </div>

            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Sort By</p>
              {sortOptions.map((option, index) => (
                <RadioButton key={index} label={option} />
              ))}
            </div>

            <div className="px-5 pt-5 pb-5">
              <p className="font-medium text-gray-800 pb-2">Price Range</p>
              {priceRanges.map((range, index) => (
                <CheckBox key={index} label={range} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRooms;
