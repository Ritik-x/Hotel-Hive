import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import Starrating from "../components/Starrating";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
// import { MdPhoneCallback } from "react-icons/md";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // check if room is available
  const checkAvailability = async () => {
    try {
      // check if checkin is greater than checkout
      if (checkInDate >= checkOutDate) {
        toast.error("Check-in date should be less than check-out date");
        return;
      }

      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // onSubmit handler function to check whether the room is available to book or not
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay At Hotel",
          },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );

        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          window.scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [rooms, id]);

  return (
    room && (
      <>
        <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
          {/* Room details */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <h1 className="text-3xl md:text-4xl">
              {room.hotel.name}{" "}
              <span className="font-inter text-sm">{room.roomType}</span>
            </h1>
            <p className="text-xs py-1.5 px-3 text-white bg-orange-400 rounded-full">
              20% off
            </p>
          </div>

          {/* room rating */}
          <div className="flex items-center gap-1 mt-2">
            <Starrating />
            <p className="text-sm text-gray-600 font-medium">2000+ reviews</p>
          </div>

          {/* room address */}
          <div className="flex items-center gap-1 text-gray-600 mt-2">
            <img src={assets.locationIcon} alt="" />
            <span>{room.hotel.address}</span>
          </div>

          {/* room image */}
          <div>
            <div>
              <img
                src={mainImage}
                alt="Room Image"
                className="w-full h-80 md:h-[28rem] object-cover object-center rounded-2xl shadow-2xl border-4 border-white bg-gradient-to-br from-orange-100 via-white to-orange-50 transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%236b7280'%3ENo Image Available%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Thumbnails */}
            {room && room.images && room.images.length > 1 && (
              <div className="flex gap-3 mt-4 justify-center">
                {room.images.map((image, index) => (
                  <img
                    onClick={() => setMainImage(image)}
                    key={index}
                    src={image}
                    alt={`Room Thumbnail ${index + 1}`}
                    className={`w-20 h-16 object-cover rounded-lg border-2 cursor-pointer transition-transform duration-200 hover:scale-105 hover:border-orange-400 ${
                      mainImage === image
                        ? "border-orange-500 ring-2 ring-orange-300"
                        : "border-gray-300"
                    }`}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='64' viewBox='0 0 80 64'%3E%3Crect width='80' height='64' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='8' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* room highlights */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-12 gap-8">
            <div className="flex flex-col max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Experience Luxury Like Never Before
              </h1>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-100 to-purple-100 shadow-md hover:shadow-lg transition-all border border-orange-200 hover:border-purple-400"
                    key={index}
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-6 h-6"
                    />
                    <p className="text-sm font-medium text-gray-700 capitalize">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* room price */}
            <p className="text-2xl font-extrabold text-purple-600 bg-orange-50 px-6 py-4 rounded-xl shadow-md border border-purple-200 self-start md:self-center">
              ${room.pricePerNight}{" "}
              <span className="text-lg font-medium text-gray-500">/ night</span>
            </p>
          </div>

          {/* checkin checkout form */}
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-2xl p-8 rounded-2xl mx-auto mt-16 max-w-6xl border border-gray-100 gap-6 md:gap-0"
          >
            <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-6 md:gap-12 text-gray-600 w-full">
              <div>
                <label
                  htmlFor="checkInDate"
                  className="font-semibold text-gray-700"
                >
                  Check-In
                </label>
                <input
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  type="date"
                  id="checkInDate"
                  placeholder="Check-in"
                  required
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 mt-1.5 outline-none focus:ring-2 focus:ring-purple-300 transition-all shadow-sm"
                />
              </div>
              <div className="w-px h-12 bg-gray-300/70 max-md:hidden mx-4" />

              <div>
                <label
                  htmlFor="checkOutDate"
                  className="font-semibold text-gray-700"
                >
                  Check-Out
                </label>
                <input
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate}
                  disabled={!checkInDate}
                  type="date"
                  id="checkOutDate"
                  placeholder="Check-out"
                  required
                  className="w-full rounded-lg border border-gray-300 py-2 px-3 mt-1.5 outline-none focus:ring-2 focus:ring-purple-300 transition-all shadow-sm"
                />
              </div>
              <div className="w-px h-12 bg-gray-300/70 max-md:hidden mx-4" />
              <div>
                <label htmlFor="guests" className="font-semibold text-gray-700">
                  Guests
                </label>
                <input
                  onChange={(e) => setGuests(e.target.value)}
                  value={guests}
                  type="number"
                  id="guests"
                  placeholder="1"
                  min="1"
                  required
                  className="max-w-20 rounded-lg border border-gray-300 px-3 py-2 mt-1.5 outline-none focus:ring-2 focus:ring-purple-300 transition-all shadow-sm"
                />
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-purple-400 to-orange-400 hover:from-orange-400 hover:to-purple-400 active:scale-95 transition-all text-white rounded-lg max-md:w-full max-md:mt-6 md:px-10 py-3 md:py-4 text-lg font-bold shadow-lg"
              type="submit"
            >
              {isAvailable ? "Book Now" : "Check Availability"}
            </button>
          </form>

          {/* common specifications for a room */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {roomCommonData.map((spec, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <img
                  src={spec.icon}
                  alt={`${spec.title}-icon`}
                  className="w-10 h-10 object-contain mr-2"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800 mb-1">
                    {spec.title}
                  </p>
                  <p className="text-gray-600 text-sm">{spec.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-base text-gray-700 leading-relaxed">
              Enjoy a perfect blend of elegance and comfort in this beautifully
              furnished room. Ideal for solo travelers, couples, or small
              families — with everything you need for a luxurious stay.
            </p>
          </div>
        </div>
      </>
    )
  );
};

export default RoomDetails;
