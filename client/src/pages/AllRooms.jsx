import React, { useState, useMemo } from "react";
import { facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import Starrating from "../components/Starrating";
import { IoLocationSharp } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

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
      onChange={() => onChange(label)}
      className="accent-amber-500"
    />
    <span className="select-none font-light">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms = roomsDummyData, currency } = useAppContext();
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");

  const roomTypes = ["Single Bed", "Couple Room", "Luxury Room", "Family Room"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 5000",
  ];
  const sortOptions = [
    "Price Low To High",
    "Price High To Low",
    "Newest First",
  ];

  // handle changes for filter and sorting
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type] = [...updatedFilters[type], value];
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // function to check if room matches the selected room types
  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  };

  // function to check if room matches the selected price ranges
  const matchesPriceRange = (room) => {
    if (selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });
  };

  // function to sort rooms based on the selected sort option
  const sortRooms = (a, b) => {
    if (selectedSort === "Price Low To High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High To Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };

  // filter destination
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };

  // filter rooms and sort on selected filters
  const filterRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesRoomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [rooms, selectedFilters, selectedSort, searchParams]);

  // clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  };

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
      <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 mmd:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div>
          <div className="flex flex-col items-start text-left"></div>
          {filterRooms.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No rooms found matching your criteria.
            </div>
          ) : (
            filterRooms.map((room) => (
              <div
                key={room._id}
                className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
              >
                <img
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    window.scrollTo(0, 0);
                  }}
                  src={room.images[0]}
                  alt="hotel-img"
                  title="View Rooms Details"
                  className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3ENo Image Available%3C/text%3E%3C/svg%3E";
                  }}
                />

                <div className="md:w-1/2  flex flex-col gap-2">
                  <p className="text-gray-600">{room.hotel.city}</p>
                  <p
                    className="text-gray-800 text-3xl cursor-pointer"
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      window.scrollTo(0, 0);
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
                    {currency} {room.pricePerNight} /night
                  </p>
                </div>
              </div>
            ))
          )}
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
              <span
                className="hidden lg:block text-amber-600 hover:underline"
                onClick={clearFilters}
              >
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
                <CheckBox
                  key={index}
                  label={type}
                  selected={selectedFilters.roomType.includes(type)}
                  onChange={(checked) =>
                    handleFilterChange(checked, type, "roomType")
                  }
                />
              ))}
            </div>

            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Sort By</p>
              {sortOptions.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option}
                  selected={selectedSort === option}
                  onChange={handleSortChange}
                />
              ))}
            </div>

            <div className="px-5 pt-5 pb-5">
              <p className="font-medium text-gray-800 pb-2">Price Range</p>
              {priceRanges.map((range, index) => (
                <CheckBox
                  key={index}
                  label={`$${range}`}
                  selected={selectedFilters.priceRange.includes(range)}
                  onChange={(checked) =>
                    handleFilterChange(checked, range, "priceRange")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRooms;
