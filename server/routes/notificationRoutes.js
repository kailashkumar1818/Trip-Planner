import express from "express";
import { getUpcomingNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUpcomingNotifications);

export default router;
