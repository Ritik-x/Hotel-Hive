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

  const deleteRoom = async (roomId) => {
    try {
      // Show confirmation dialog
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this room? This action cannot be undone."
      );

      if (!isConfirmed) {
        return;
      }

      const { data } = await axios.delete(`/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success("Room deleted successfully");
        // Refresh the rooms list
        fetchRooms();
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
        <div className="w-full max-w-4xl text-left border border-gray-400 rounded-lg max-h-80 overflow-y-scroll mt-4">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Room Name</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No rooms found. Add your first room!
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
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
                    <td className="py-2 px-4">
                      <button
                        onClick={() => deleteRoom(room._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Listroom;
