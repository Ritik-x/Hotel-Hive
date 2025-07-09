import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";

//function to check wheather room is available or not

const checkAvailablity = async (checkInDate, checkOutDate, room) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkOutDate },
    });

    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

//  API to check availablity of room

// POST / api/bookings/check-availabliuty

export const checkAvailablityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailablity(checkInDate, checkOutDate, room);

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to create a new Booking
//POST /api /booking/ book

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    const user = req.user._id;

    const isAvailable = await checkAvailablity(checkInDate, checkOutDate, room);

    if (!isAvailable) {
      return res.json({ success: false, message: "Room Is not Available" });
    }

    //get total price from room

    const roomData = await Room.findById(room).populate("hotel");

    let totalPrice = roomData.pricePerNight;
    //calculate total price based on night

    const checkI = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkI.getTime();

    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    res.json({ success: true, message: "booking created successfully" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "failed ho gayi aapki booking" });
  }
};
//Api to get all bookings from user

//get /api/booking/user

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;

    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) {
      return res.json({ success: false, message: "No Hotel Found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({ success: true, dashboardData: { totalBookings, totalRevenue } });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
