import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

// Local dummy data for rooms
const dummyRooms = [
  {
    id: 1,
    name: "Deluxe Suite",
    price: 2000,
    type: "Luxury Room",
    image: assets.roomImg1,
  },
  {
    id: 2,
    name: "Family Suite",
    price: 1500,
    type: "Family Suite",
    image: assets.roomImg2,
  },
  {
    id: 3,
    name: "Single Bed",
    price: 800,
    type: "Single Bed",
    image: assets.roomImg3,
  },
];

const Listroom = () => {
  const [rooms] = useState(dummyRooms);
  return (
    <>
      <div>
        <Title
          title="Listing"
          subTitle="view, edit or manage all listed kamra."
          align="left"
        />
        <p className="text-gray-600 mt-8">All rooms</p>
        <div className="w-full max-w-3xl text-left border border-gray-400 rounded-lg max-h-80 overflow-y-scroll mt-4">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Room Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="py-2 px-4">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-12 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold">{room.name}</td>
                  <td className="py-2 px-4">{room.type}</td>
                  <td className="py-2 px-4">₹{room.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Listroom;
