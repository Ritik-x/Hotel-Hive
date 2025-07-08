import React from "react";
import Title from "../components/Title";
import { FaLocationDot } from "react-icons/fa6";

import { assets, userBookingsDummyData } from "../assets/assets";
const MyBooking = () => {
  const bookings = userBookingsDummyData;
  return (
    <>
      <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 ">
        <Title
          title="My Bookings"
          subTitle="Easy manage your past , current , and upcoming hotel reseversations in one place . Plan your trips seamlessly with just a few clicks "
          align="left"
        />

        <div className="max-w-6xl mt-8 w-full text-gray-800">
          <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-400 font-medium text-base py-2">
            <div className="w-1/3">Hotels</div>
            <div className="w-1/3">Date & Time </div>
            <div className="w-1/3">Payment</div>
          </div>

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-lg p-5 my-6 flex flex-col md:grid md:grid-cols-[3fr_2fr_1fr] gap-4 items-center hover:shadow-2xl transition-shadow"
            >
              {/* hotel details */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
                <img
                  src={booking.room.images[0]}
                  alt="hotel-img"
                  className="md:w-36 w-full h-32 md:h-24 rounded-xl shadow object-cover border border-gray-200"
                />
                <div className="flex flex-col gap-2 md:ml-2 w-full">
                  <p className="text-xl font-semibold text-gray-900">
                    {booking.hotel.name}
                    <span className="text-base font-normal text-gray-500 ml-1">
                      ({booking.room.roomType})
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FaLocationDot className="text-orange-400" />
                    <span>{booking.hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img
                      src={assets.guestsIcon}
                      alt="guests-icon"
                      className="w-4 h-4"
                    />
                    <span>Guests: {booking.guest}</span>
                  </div>
                  <p className="text-base text-purple-700 font-bold">
                    Total: ${booking.totalPrice}
                  </p>
                </div>
              </div>

              {/* date and time */}
              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                <div>
                  <p>Check-In</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>

                <div>
                  <p>Check-Out</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              {/* payment status */}
              <div className="flex flex-col items-start justify-center pt-3 ">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      booking.isPaid ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></div>
                  <p
                    className={`text-sm  h-3 w-3 rounded-full ${
                      booking.isPaid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {" "}
                    {booking.isPaid ? "Paid" : "UnPaid"}{" "}
                  </p>
                </div>

                {!booking.isPaid && (
                  <button className="px-4 py-2 mt-4 text-shadow-white border-border-gray-500 text-xs rounded-4xl hover:text-white hover:bg-green-800 transition-all cursor-pointer">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBooking;
