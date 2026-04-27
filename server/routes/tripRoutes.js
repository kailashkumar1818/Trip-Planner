import express from "express";
import {
  createActivity,
  createTrip,
  deleteTrip,
  getTripById,
  getTripHistory,
  getTrips,
  updateTrip
} from "../controllers/tripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getTrips).post(createTrip);
router.get("/history/list", getTripHistory);
router.post("/:tripId/activities", createActivity);
router.route("/:id").get(getTripById).put(updateTrip).delete(deleteTrip);

export default router;
