import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import feedingRoutineRoutes from "./routes/feedingRoutineRoutes.mjs";
import livestockRoutes from "./routes/livestockRoutes.mjs";
import purchaseRoutes from "./routes/purchaseRoutes.mjs";
import shelterRoutes from "./routes/shelterRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import authMiddleware from "./middleware/authMiddleware.mjs";
import housingRequirementRoutes from "./routes/housingRequirementRoutes.mjs";
import veterinaryRoutes from "./routes/veterinaryRoutes.mjs";
import resourceManagementRoutes from "./routes/resourceManagementRoutes.mjs";
import doctorTimeslotRateRoutes from "./routes/doctorTimeslotRateRoutes.mjs"
import shelterSpaceRoutes from "./routes/shelterSpaceRoutes.mjs"
import userPurchase from "./routes/userPurchase.mjs"
import addToCart from "./routes/addToCartRoute.mjs"

dotenv.config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use("/feeding-routines", feedingRoutineRoutes);
app.use("/livestock", livestockRoutes);
app.use("/purchases", authMiddleware, purchaseRoutes);
app.use("/shelters", shelterRoutes);
app.use("/users", userRoutes);
app.use("/housing-requirements", housingRequirementRoutes);
app.use("/appointment", veterinaryRoutes);
app.use("/resource", resourceManagementRoutes);
app.use("/doctor", doctorTimeslotRateRoutes);
app.use("/shelter-space", shelterSpaceRoutes);
app.use("/user-purchase", userPurchase);
app.use("/cart", addToCart);
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
