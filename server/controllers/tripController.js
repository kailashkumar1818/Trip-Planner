import Activity from "../models/Activity.js";
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const deriveStatus = (startDate, endDate) => {
  const today = new Date();
  if (today > new Date(endDate)) {
    return "completed";
  }
  if (today >= new Date(startDate) && today <= new Date(endDate)) {
    return "ongoing";
  }
  return "upcoming";
};

export const createTrip = asyncHandler(async (req, res) => {
  const status = deriveStatus(req.body.startDate, req.body.endDate);
  const trip = await Trip.create({
    ...req.body,
    status,
    userId: req.user._id
  });
  res.status(201).json(trip);
});

export const getTrips = asyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { userId: req.user._id };
  const trips = await Trip.find(query).sort({ startDate: 1 });
  res.json(trips);
});

export const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  if (req.user.role !== "admin" && trip.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Access denied" });
  }

  const [activities, bookings] = await Promise.all([
    Activity.find({ tripId: trip._id }).sort({ activityDate: 1 }),
    Booking.find({ tripId: trip._id }).sort({ checkInDate: 1 })
  ]);

  res.json({ ...trip.toObject(), activities, bookings });
});

export const updateTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  if (trip.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  Object.assign(trip, req.body);
  trip.status = deriveStatus(trip.startDate, trip.endDate);
  await trip.save();
  res.json(trip);
});

export const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  if (trip.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  await Promise.all([
    Activity.deleteMany({ tripId: trip._id }),
    Booking.deleteMany({ tripId: trip._id }),
    trip.deleteOne()
  ]);

  res.json({ message: "Trip deleted" });
});

export const getTripHistory = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ userId: req.user._id, status: "completed" }).sort({ endDate: -1 });
  res.json(trips);
});

export const createActivity = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  const activity = await Activity.create({
    ...req.body,
    tripId: trip._id
  });

  res.status(201).json(activity);
});
