import express from "express";
import {
  getClinics,
  getNearbyClinics,
  getClinic,
  createClinic,
  updateClinic,
} from "../controllers/clinicController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getClinics);
router.get("/nearby", getNearbyClinics);
router.get("/:id", getClinic);

// Admin only routes
router.post("/", protect, authorize("admin"), createClinic);
router.put("/:id", protect, authorize("admin"), updateClinic);

export default router;
