import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { FaThreads } from "react-icons/fa6";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { getToken, axios, currency, user, setShowHotelReg } = useAppContext();
  const [dashboarddata, setDashboarddata] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [needsRegistration, setNeedsRegistration] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success && data.dashboarddata) {
        setDashboarddata(data.dashboarddata);
      } else {
        setDashboarddata({
          bookings: [],
          totalBookings: 0,
          totalRevenue: 0,
        });

        if (data.needsRegistration) {
          setNeedsRegistration(true);
          toast.error(
            "Hotel registration required. Please register your hotel first."
          );
        } else {
          toast.error(data.message || "No dashboard data received.");
        }
      }
    } catch (error) {
      setDashboarddata({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
      });
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <>
      <div>
        <Title
          align="left"
          font="outfit"
          title="Dashboard"
          subTitle="Welcome back! Manage bookings, rooms, and hotel listings—all in one place."
        />

        {needsRegistration && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-yellow-800 font-semibold mb-2">
              Hotel Registration Required
            </h3>
            <p className="text-yellow-700 mb-3">
              Your account is marked as a hotel owner, but no hotel is
              registered. Please register your hotel to continue.
            </p>
            <button
              onClick={() => setShowHotelReg(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Register Hotel Now
            </button>
          </div>
        )}

        {!needsRegistration && (
          <>
            <div className="flex gap-4">
              {/* total booking */}
              <div className="border border-primary/10 bg-primary/3 flex rounded p-4 pr-8">
                <img
                  src={assets.totalBookingIcon}
                  alt="booking-img"
                  className="max-sm:hidden h-10"
                />
                <div className="flex flex-col sm:ml-4 font-medium">
                  <p className="text-blue-500 text-lg">Total Booking</p>
                  <p className="text-neutral-500 text-base">
                    {dashboarddata.totalBookings}
                  </p>
                </div>
              </div>

              {/* total revenue */}
              <div className="border border-primary/10 bg-primary/3 flex rounded p-4 pr-8">
                <img
                  src={assets.totalRevenueIcon}
                  alt="booking-img"
                  className="max-sm:hidden h-10"
                />
                <div className="flex flex-col sm:ml-4 font-medium">
                  <p className="text-blue-500 text-lg">Total Revenue</p>
                  <p className="text-neutral-500 text-base">
                    {currency} {dashboarddata.totalRevenue}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {!needsRegistration && (
          <>
            {/* Recent Booking */}
            <h2 className="text-xl text-blue-950/70 font-medium mb-5 mt-7">
              Recent Booking
            </h2>
            <div className="w-full max-w-3xl text-left border border-gray-400 rounded-lg max-h-80 overflow-y-scroll">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-gray-800 font-medium">
                      User Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                      Room Name
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Total Amount
                    </th>
                    <th className="py-3 px-4 text-gray-800 font-medium text-center">
                      Payment Status
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {dashboarddata.bookings.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4 text-gray-800 border-t border-gray-400">
                        {item.user.username}
                      </td>
                      <td className="py-3 px-4 text-gray-800 border-t border-gray-400">
                        {item.room.roomType}
                      </td>
                      <td className="py-3 px-4 text-gray-800 border-t text-center border-gray-400">
                        {currency} {item.totalPrice}
                      </td>
                      <td className="py-3 px-4 text-gray-100 border-t text-center border-gray-400">
                        <button
                          className={`py-2 px-4 text-xs rounded-4xl mx-auto ${
                            item.isPaid
                              ? "bg-green-400"
                              : "bg-amber-200 text-amber-800"
                          }`}
                        >
                          {item.isPaid ? "Completed" : "Pending"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
