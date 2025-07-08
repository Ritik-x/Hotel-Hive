import express from "express";
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebHooks from "./controllers/clerkWebhooks.js";

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// ✅ Webhook needs raw body parsing
// app.use("/api/clerk", bodyParser.raw({ type: "*/*" }));
app.post("/api/clerk", clerkWebHooks); // ✅ Correct webhook route

app.get("/", (req, res) => res.send("Api work kar"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
