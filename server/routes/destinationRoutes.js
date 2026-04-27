import express from "express";
import {
  createDestination,
  getDestinations,
  updateDestination
} from "../controllers/destinationController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDestinations);
router.post("/", protect, authorize("admin"), createDestination);
router.put("/:id", protect, authorize("admin"), updateDestination);

export default router;
