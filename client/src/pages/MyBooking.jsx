import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { FaLocationDot } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="My Bookings"
          subTitle="Easy manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
          align="left"
        />
        <div className="text-center text-gray-500 py-10">
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="My Bookings"
          subTitle="Easy manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks."
          align="left"
        />

        <div className="max-w-6xl mt-8 w-full text-gray-800">
          <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-400 font-medium text-base py-2">
            <div className="w-1/3">Hotels</div>
            <div className="w-1/3">Date & Time</div>
            <div className="w-1/3">Payment</div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No bookings found. Start by booking a room!
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg p-5 my-6 flex flex-col md:grid md:grid-cols-[3fr_2fr_1fr] gap-4 items-center hover:shadow-2xl transition-shadow"
              >
                {/* hotel details */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
                  <img
                    src={
                      booking.room?.images?.[0] ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt="hotel-img"
                    className="md:w-36 w-full h-32 md:h-24 rounded-xl shadow object-cover border border-gray-200"
                  />
                  <div className="flex flex-col gap-2 md:ml-2 w-full">
                    <p className="text-xl font-semibold text-gray-900">
                      {booking.hotel?.name || "Hotel Name Not Available"}
                      <span className="text-base font-normal text-gray-500 ml-1">
                        ({booking.room?.roomType || "Room Type Not Available"})
                      </span>
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FaLocationDot className="text-orange-400" />
                      <span>
                        {booking.hotel?.address || "Address Not Available"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <img
                        src={assets.guestsIcon}
                        alt="guests-icon"
                        className="w-4 h-4"
                      />
                      <span>Guests: {booking.guests}</span>
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
                <div className="flex flex-col items-start justify-center pt-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        booking.isPaid ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></div>
                    <p
                      className={`text-sm ${
                        booking.isPaid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {booking.isPaid ? "Paid" : "Unpaid"}
                    </p>
                  </div>

                  {!booking.isPaid && (
                    <button className="px-4 py-2 mt-4 text-gray-700 border border-gray-500 text-xs rounded-full hover:text-white hover:bg-green-800 transition-all cursor-pointer">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyBooking;
