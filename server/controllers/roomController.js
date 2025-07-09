import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";
import { v2 as cloudinary } from "cloudinary";
// api to create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await findOne({ owner: req.auth.userId });

    if (!hotel) return res.json({ success: false, message: "no hotel found" });
    //upload image to cloudinary

    const uplaodImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);

      return response.secure_url;
    });
    //wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: pricePerNight,
      amentities: JSON.parse(amentites),
      images,
    });

    res.json({ success: true, message: "room Created Successfully" });

    // if hotel is found we have to upload hotel imgae and to upload we have to use cloudinary
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api to get a all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to get all rooms for specific hotels

export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel({ owner: req.auth.userId });

    const rooms = await roomRouter
      .find({ hotel: hotelData._id.toString() })
      .populate("hotel");

    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to toggle avialblity rom

export const toogleRoomAvailablity = async (req, res) => {
  try {
    const { roomId } = req.body;

    const roomData = await Room.findById(roomId);

    roomData.isAvailable = !roomData.isAvailable;

    await roomData.save(
      res.json({ success: true, message: "Room Availablity Updated" })
    );
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
