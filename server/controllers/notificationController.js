import Trip from "../models/Trip.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUpcomingNotifications = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ userId: req.user._id }).sort({ startDate: 1 });
  const reminders = trips
    .filter((trip) => trip.status !== "completed")
    .slice(0, 5)
    .map((trip) => ({
      id: trip._id,
      title: `${trip.tripName} starts soon`,
      message: `Your ${trip.destination} trip begins on ${new Date(trip.startDate).toLocaleDateString()}.`
    }));

  res.json(reminders);
});
