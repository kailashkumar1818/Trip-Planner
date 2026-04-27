import Activity from "../models/Activity.js";
import Booking from "../models/Booking.js";
import Destination from "../models/Destination.js";
import Trip from "../models/Trip.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [users, trips, destinations, bookings, activities] = await Promise.all([
    User.countDocuments(),
    Trip.countDocuments(),
    Destination.countDocuments(),
    Booking.countDocuments(),
    Activity.countDocuments()
  ]);

  const latestTrips = await Trip.find().sort({ createdAt: -1 }).limit(5).populate("userId", "name email");

  res.json({
    stats: { users, trips, destinations, bookings, activities },
    latestTrips
  });
});
