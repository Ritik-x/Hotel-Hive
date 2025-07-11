import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-hot-toast";

const Hotelreg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const token = await getToken();
      console.log("Token being sent:", token);

      const { data } = await axios.post(
        `/api/hotel/`,
        { name, address, contact, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowHotelReg(false)}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70"
      >
        <form
          onSubmit={onSubmitHandler}
          className="flex bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn"
        >
          <img
            src={assets.regImage}
            alt="reg-image"
            className="w-1/2 rounded-2xl object-cover hidden md:block"
          />

          <div
            className="relative flex flex-col items-center md:w-1/2 p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              onClick={() => setShowHotelReg(false)}
              src={assets.closeIcon}
              alt="close-icon"
              className="absolute top-6 right-6 h-6 w-6 cursor-pointer hover:scale-110 hover:bg-gray-200 rounded-full p-1 transition-all shadow"
            />

            <p className="text-3xl font-bold mt-6 mb-2 text-indigo-700">
              Register Your Hotel
            </p>
            {/* Hotel Name */}
            <div className="w-full mt-4">
              <label htmlFor="name" className="font-medium text-gray-600">
                Hotel Name
              </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Type Here"
                className="border border-gray-300 rounded-lg w-full px-4 py-3 mt-1 outline-indigo-400 font-light focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                required
              />
            </div>

            {/* phone */}
            <div className="w-full mt-4">
              <label htmlFor="contact" className="font-medium text-gray-600">
                Phone
              </label>
              <input
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                id="contact"
                type="text"
                placeholder="Type Here"
                className="border border-gray-300 rounded-lg w-full px-4 py-3 mt-1 outline-indigo-400 font-light focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                required
              />
            </div>

            {/* address */}
            <div className="w-full mt-4">
              <label htmlFor="address" className="font-medium text-gray-600">
                Address
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                id="address"
                type="text"
                placeholder="Type Here"
                className="border border-gray-300 rounded-lg w-full px-4 py-3 mt-1 outline-indigo-400 font-light focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                required
              />
            </div>

            {/* select city dropdown */}
            <div className="w-full mt-4 max-w-60 mr-auto">
              <label htmlFor="city" className="font-medium text-gray-600">
                City
              </label>

              <select
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="border border-gray-300 rounded-lg w-full px-4 py-3 mt-1 outline-indigo-500 font-light focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
                id="city"
                required
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <button className="bg-indigo-500 hover:bg-indigo-700 transition-all text-white mr-auto px-8 py-3 rounded-lg cursor-pointer mt-8 text-lg font-semibold shadow-md">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Hotelreg;
