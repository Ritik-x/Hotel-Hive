import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import hotelRouter from "./routes/hotelroutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingroutes.js";
connectDB();

connectCloudinary();

console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Webhook needs raw body parsing
app.use("/api/clerk", bodyParser.raw({ type: "*/*" }));
app.post("/api/clerk", clerkWebHooks);

app.get("/", (req, res) => res.send("Api work kar"));
app.use("/api/user", userRouter);

app.use("/api/hotel", hotelRouter);
app.use("/api/rooms", roomRouter);

app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
