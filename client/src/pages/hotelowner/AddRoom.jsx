import React, { useRef, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AMENITIES = [
  { label: "FREE WIFI", icon: assets.freeWifiIcon },
  { label: "FREE BREAKFAST", icon: assets.freeBreakfastIcon },
  { label: "ROOM SERVICE", icon: assets.roomServiceIcon },
  { label: "MOUNTAIN VIEW", icon: assets.mountainIcon },
  { label: "POOL ACCESS", icon: assets.poolIcon },
];

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: AMENITIES.reduce((acc, a) => ({ ...acc, [a.label]: false }), {}),
  });
  const fileInputRef = useRef();

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImages((prev) =>
        [
          ...prev,
          ...Array.from(e.dataTransfer.files).slice(0, 4 - prev.length),
        ].slice(0, 4)
      );
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - images.length);
    setImages((prev) => [...prev, ...files].slice(0, 4));
  };
  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Floating label input
  const FloatingInput = ({ label, type, value, onChange, ...props }) => (
    <div className="relative my-6">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="block w-full px-4 pt-6 pb-2 text-lg bg-white/80 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white shadow-inner peer"
        placeholder=" "
        {...props}
      />
      <label className="absolute left-4 top-2 text-gray-500 text-base transition-all duration-200 pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg peer-focus:top-2 peer-focus:text-base bg-white/80 px-1 rounded">
        {label}
      </label>
    </div>
  );
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      images.length === 0
    ) {
      toast.error("Pls fill all the details");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      // convert amenities into array & keep only enabled amenities
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      // add images into form data
      images.forEach((img) => {
        formData.append("images", img);
      });

      const { data } = await axios.post("/api/rooms", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        toast.success(data.message);

        setInputs({
          roomType: "",
          pricePerNight: "",
          amenities: {
            "FREE WIFI": false,
            "FREE BREAKFAST": false,
            "ROOM SERVICE": false,
            "MOUNTAIN VIEW": false,
            "POOL ACCESS": false,
          },
        });

        setImages([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-2">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left: Image upload */}
        <div className="md:w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-white/80 to-blue-50 relative">
          <div
            className={`w-full h-56 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 bg-white/70"
            }`}
            onClick={() => fileInputRef.current.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              disabled={images.length >= 4}
            />
            <img
              src={assets.uploadArea}
              alt="Upload"
              className="w-14 h-14 opacity-70 mb-2"
            />
            <span className="text-gray-500 text-sm">
              {images.length < 4
                ? dragActive
                  ? "Drop images here"
                  : "Drag & drop or click to upload (max 4)"
                : "Max 4 images"}
            </span>
          </div>
          {/* Image previews */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            {images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${idx}`}
                  className="h-20 w-20 object-cover rounded-xl border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                  className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-pink-600 transition-colors"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Form fields */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <Title
            align="left"
            font="outfit"
            title="Add your room"
            subTitle="Fill the details carefully and accurately. Room details, pricing, and amenities enhance the user booking experience."
          />
          <FloatingInput
            label="Room Type"
            type="text"
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            maxLength={32}
          />
          <FloatingInput
            label="Price per Night (₹)"
            type="number"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            min={0}
          />
          <div className="mt-8">
            <p className="text-gray-800 font-semibold mb-2">Amenities</p>
            <div className="grid grid-cols-2 gap-3">
              {AMENITIES.map((a) => (
                <label
                  key={a.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm cursor-pointer border border-gray-200 bg-white/70 hover:bg-blue-50 transition-all ${
                    inputs.amenities[a.label] ? "ring-2 ring-blue-400" : ""
                  }`}
                >
                  <img src={a.icon} alt={a.label} className="w-6 h-6" />
                  <input
                    type="checkbox"
                    checked={inputs.amenities[a.label]}
                    onChange={() =>
                      setInputs({
                        ...inputs,
                        amenities: {
                          ...inputs.amenities,
                          [a.label]: !inputs.amenities[a.label],
                        },
                      })
                    }
                    className="accent-purple-500 scale-110"
                  />
                  <span className="select-none text-sm font-medium">
                    {a.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl mt-10 text-lg tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 animate-bounce"
          >
            {loading ? "Adding..." : " ✨ Add Room "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
