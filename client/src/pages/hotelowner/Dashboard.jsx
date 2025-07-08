import React, { useState } from "react";
import Title from "../../components/Title";
import { assets, dashboardDummyData } from "../../assets/assets";
import { FaThreads } from "react-icons/fa6";

const Dashboard = () => {
  const [dashboarddata, setDashboarddata] = useState(dashboardDummyData);
  return (
    <>
      <div>
        {" "}
        <Title
          align="left "
          font="outfit "
          title="Dashboard"
          subTitle="Welcome back! Manage bookings, rooms, and hotel listings—all in one place.

"
        />
        <div className="flex gap-4">
          {/* total booking */}
          <div className="border border-primary/10 bg-priamry/3  flex rounded  p-4 pr-8 ">
            <img
              src={assets.totalBookingIcon}
              alt="booking-img "
              className="max-sm:hidden h-10"
            />
            <div className="flex flex-col sm:ml-4 font-medium">
              {" "}
              <p className="text-blue-500 text-lg">Total Booking</p>
              <p className="text-neutral-500 text-base">
                {dashboarddata.totalBookings}
              </p>
            </div>
          </div>

          {/* total revenue */}
          <div className="border border-primary/10 bg-priamry/3  flex rounded  p-4 pr-8 ">
            <img
              src={assets.totalRevenueIcon}
              alt="booking-img "
              className="max-sm:hidden h-10"
            />
            <div className="flex flex-col sm:ml-4 font-medium">
              {" "}
              <p className="text-blue-500 text-lg">Total Revenue</p>
              <p className="text-neutral-500 text-base">
                $ {dashboarddata.totalRevenue}
              </p>
            </div>
          </div>
        </div>
        {/* Recent Booking */}
        <h2 className="text-xl text-blue-950/70 font-medium mb-5 mt-7">
          Recent Booking
        </h2>
        <div className="w-full max-w-3xl text-left border border-gray-400 rounded-lg max-h-80 overflow-y-scroll">
          <table className="w-full ">
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
                    $ {item.totalPrice}
                  </td>
                  <td className="py-3 px-4 text-gray-100 border-t text-center border-gray-400">
                    <button
                      className={`py-2 px-4 text-xs rounded-4xl mx-auto ${
                        item.isPaid
                          ? "bg-green-400 "
                          : " bg-amber-200 text-amber-800"
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
      </div>
    </>
  );
};

export default Dashboard;
