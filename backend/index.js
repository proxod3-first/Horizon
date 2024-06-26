import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import hotelRoutes from "./routes/hotels.js";
import tenantRoutes from "./routes/tenants.js";
import userRoutes from "./routes/users.js";
import roomRoutes from "./routes/rooms.js";
import reviewRoutes from "./routes/reviews.js";
import ownerRoutes from "./routes/owners.js";
import complaintRoutes from "./routes/complaints.js";
import roomRequestRoutes from "./routes/roomRequests.js";
import paymentRequestRoutes from "./routes/paymentRequests.js";
import mealItemRoutes from "./routes/mealItems.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/hotels", hotelRoutes);
app.use("/tenants", tenantRoutes);
app.use("/user", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/reviews", reviewRoutes);
app.use("/owners", ownerRoutes);
app.use("/complaints", complaintRoutes);
app.use("/roomRequests", roomRequestRoutes);
app.use("/paymentRequests", paymentRequestRoutes);
app.use("/mealItems", mealItemRoutes);
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log("Server running on port: " + PORT))
  )
  .catch((error) => console.log(error.message));
