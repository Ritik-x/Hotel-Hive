import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  checkAvailablityAPI,
  createBooking,
  getHotelBookings,
  getUserBookings,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availablity", checkAvailablityAPI);

bookingRouter.post("/book", protect, createBooking);

bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);

export default bookingRouter;
