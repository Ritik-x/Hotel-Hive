import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";
import { v2 as cloudinary } from "cloudinary";
// api to create a new room
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) return res.json({ success: false, message: "no hotel found" });
    //upload image to cloudinary

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    //wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight,
      amenities: JSON.parse(amenities),
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
    const hotelData = await Hotel.findOne({ owner: req.user._id });

    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );

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

// api to delete a room
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find the room and populate hotel to check ownership
    const room = await Room.findById(roomId).populate("hotel");

    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    // Check if the user owns the hotel
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel || room.hotel._id.toString() !== hotel._id.toString()) {
      return res.json({
        success: false,
        message: "Not authorized to delete this room",
      });
    }

    // Delete images from Cloudinary if they exist
    if (room.images && room.images.length > 0) {
      const deletePromises = room.images.map(async (imageUrl) => {
        try {
          // Extract public_id from Cloudinary URL
          const publicId = imageUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.log("Error deleting image from Cloudinary:", error);
        }
      });
      await Promise.all(deletePromises);
    }

    // Delete the room from database
    await Room.findByIdAndDelete(roomId);

    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.log("Delete room error:", error);
    res.json({ success: false, message: error.message });
  }
};
