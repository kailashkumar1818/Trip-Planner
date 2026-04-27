import express from "express";
import { createBooking, getBookingsForTrip } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/:tripId", getBookingsForTrip);
router.post("/:tripId", createBooking);

export default router;
