import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Rooms.js";

//function to check whether room is available or not
const checkAvailability = async (checkInDate, checkOutDate, room) => {
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

// API to check availability of room
// POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailability(
      checkInDate,
      checkOutDate,
      room
    );

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to create a new Booking
// POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;

    const user = req.user._id;

    const isAvailable = await checkAvailability(
      checkInDate,
      checkOutDate,
      room
    );

    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    // get total price from room
    const roomData = await Room.findById(room).populate("hotel");

    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    let totalPrice = roomData.pricePerNight;
    // calculate total price based on nights
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

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel bokking details",
      html: `    <h2> Your Booking Details </h2>
  <p> Dear ${req.user.username} , </p>


  <p> Thanks for booking the room  </p>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Booking created successfully" });
  } catch (error) {
    console.log("Booking creation error:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all bookings from user
// GET /api/bookings/user
export const getUserBookings = async (req, res) => {
  try {
    console.log("User object:", req.user); // Debug log
    console.log("User ID:", req.user._id); // Debug log

    const user = req.user._id;

    if (!user) {
      return res.json({ success: false, message: "User ID not found" });
    }

    // Find bookings and populate room and hotel data
    const bookings = await Booking.find({ user })
      .populate("room")
      .populate("hotel")
      .sort({ createdAt: -1 });

    console.log("Found bookings:", bookings.length);
    console.log("Sample booking:", bookings[0]);

    res.json({ success: true, bookings: bookings });
  } catch (error) {
    console.log("getUserBookings error:", error);
    console.log("Error stack:", error.stack);
    res.json({ success: false, message: "Failed to fetch bookings" });
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
    console.log("getHotelBookings error:", error);
    res.json({ success: false, message: error.message });
  }
};
