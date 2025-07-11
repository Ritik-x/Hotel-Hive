import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Listroom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, user, getToken } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

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
                  key={room._id || room.id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="py-2 px-4">
                    <img
                      src={room.images ? room.images[0] : assets.roomImg1}
                      alt={room.roomType || room.name}
                      className="h-12 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 font-semibold">
                    {room.roomType || room.name}
                  </td>
                  <td className="py-2 px-4">{room.roomType || room.type}</td>
                  <td className="py-2 px-4">
                    ₹{room.pricePerNight || room.price}
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

export default Listroom;
