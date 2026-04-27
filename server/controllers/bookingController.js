import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBooking = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  const booking = await Booking.create({
    ...req.body,
    tripId: trip._id
  });

  res.status(201).json(booking);
});

export const getBookingsForTrip = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ tripId: req.params.tripId }).sort({ checkInDate: 1 });
  res.json(bookings);
});
